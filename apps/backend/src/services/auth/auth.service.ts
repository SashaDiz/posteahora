import { Injectable } from '@nestjs/common';
import { Provider, User } from '@prisma/client';
import { CreateOrgUserDto } from '@gitroom/nestjs-libraries/dtos/auth/create.org.user.dto';
import { LoginUserDto } from '@gitroom/nestjs-libraries/dtos/auth/login.user.dto';
import { UsersService } from '@gitroom/nestjs-libraries/database/prisma/users/users.service';
import { OrganizationService } from '@gitroom/nestjs-libraries/database/prisma/organizations/organization.service';
import { AuthService as AuthChecker } from '@gitroom/helpers/auth/auth.service';
import { ProvidersFactory } from '@gitroom/backend/services/auth/providers/providers.factory';
import dayjs from 'dayjs';
import { NotificationService } from '@gitroom/nestjs-libraries/database/prisma/notifications/notification.service';
import { ForgotReturnPasswordDto } from '@gitroom/nestjs-libraries/dtos/auth/forgot-return.password.dto';
import { EmailService } from '@gitroom/nestjs-libraries/services/email.service';
import { NewsletterService } from '@gitroom/nestjs-libraries/newsletter/newsletter.service';
import { MagicLinkService } from '@gitroom/nestjs-libraries/database/prisma/magic-link/magic-link.service';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _organizationService: OrganizationService,
    private _notificationService: NotificationService,
    private _emailService: EmailService,
    private _magicLinkService: MagicLinkService
  ) {}
  async canRegister(provider: string) {
    if (process.env.DISABLE_REGISTRATION !== 'true' || provider === Provider.GENERIC) {
      return true;
    }

    return (await this._organizationService.getCount()) === 0;
  }

  async routeAuth(
    provider: Provider,
    body: CreateOrgUserDto | LoginUserDto,
    ip: string,
    userAgent: string,
    addToOrg?: boolean | { orgId: string; role: 'USER' | 'ADMIN'; id: string }
  ) {
    if (provider === Provider.LOCAL) {
      if (process.env.DISALLOW_PLUS && body.email.includes('+')) {
        throw new Error('Email with plus sign is not allowed');
      }
      const user = await this._userService.getUserByEmail(body.email);
      if (body instanceof CreateOrgUserDto) {
        if (user) {
          throw new Error('Email already exists');
        }

        if (!(await this.canRegister(provider))) {
          throw new Error('Registration is disabled');
        }

        const create = await this._organizationService.createOrgAndUser(
          body,
          ip,
          userAgent
        );

        const addedOrg =
          addToOrg && typeof addToOrg !== 'boolean'
            ? await this._organizationService.addUserToOrg(
                create.users[0].user.id,
                addToOrg.id,
                addToOrg.orgId,
                addToOrg.role
              )
            : false;

        const obj = { addedOrg, jwt: await this.jwt(create.users[0].user) };
        await this._emailService.sendEmail(
          body.email,
          'Activate your account',
          `Click <a href="${process.env.FRONTEND_URL}/auth/activate/${obj.jwt}">here</a> to activate your account`
        );
        return obj;
      }

      if (!user || !AuthChecker.comparePassword(body.password, user.password)) {
        throw new Error('Invalid user name or password');
      }

      if (!user.activated) {
        throw new Error('User is not activated');
      }

      return { addedOrg: false, jwt: await this.jwt(user) };
    }

    const user = await this.loginOrRegisterProvider(
      provider,
      body as CreateOrgUserDto,
      ip,
      userAgent
    );

    const addedOrg =
      addToOrg && typeof addToOrg !== 'boolean'
        ? await this._organizationService.addUserToOrg(
            user.id,
            addToOrg.id,
            addToOrg.orgId,
            addToOrg.role
          )
        : false;
    return { addedOrg, jwt: await this.jwt(user) };
  }

  public getOrgFromCookie(cookie?: string) {
    if (!cookie) {
      return false;
    }

    try {
      const getOrg: any = AuthChecker.verifyJWT(cookie);
      if (dayjs(getOrg.timeLimit).isBefore(dayjs())) {
        return false;
      }

      return getOrg as {
        email: string;
        role: 'USER' | 'ADMIN';
        orgId: string;
        id: string;
      };
    } catch (err) {
      return false;
    }
  }

  private async loginOrRegisterProvider(
    provider: Provider,
    body: CreateOrgUserDto,
    ip: string,
    userAgent: string
  ) {
    const providerInstance = ProvidersFactory.loadProvider(provider);
    const providerUser = await providerInstance.getUser(body.providerToken);

    if (!providerUser) {
      throw new Error('Invalid provider token');
    }

    const user = await this._userService.getUserByProvider(
      providerUser.id,
      provider
    );
    if (user) {
      return user;
    }

    if (!(await this.canRegister(provider))) {
      throw new Error('Registration is disabled');
    }

    const create = await this._organizationService.createOrgAndUser(
      {
        company: body.company || 'My Company',
        email: providerUser.email,
        password: '',
        provider,
        providerId: providerUser.id,
      },
      ip,
      userAgent
    );

    await NewsletterService.register(providerUser.email);

    return create.users[0].user;
  }

  async forgot(email: string) {
    const user = await this._userService.getUserByEmail(email);
    if (!user || user.providerName !== Provider.LOCAL) {
      return false;
    }

    const resetValues = AuthChecker.signJWT({
      id: user.id,
      expires: dayjs().add(20, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
    });

    await this._notificationService.sendEmail(
      user.email,
      'Reset your password',
      `You have requested to reset your passsord. <br />Click <a href="${process.env.FRONTEND_URL}/auth/forgot/${resetValues}">here</a> to reset your password<br />The link will expire in 20 minutes`
    );
  }

  forgotReturn(body: ForgotReturnPasswordDto) {
    const user = AuthChecker.verifyJWT(body.token) as {
      id: string;
      expires: string;
    };
    if (dayjs(user.expires).isBefore(dayjs())) {
      return false;
    }

    return this._userService.updatePassword(user.id, body.password);
  }

  async activate(code: string) {
    const user = AuthChecker.verifyJWT(code) as {
      id: string;
      activated: boolean;
      email: string;
    };
    if (user.id && !user.activated) {
      const getUserAgain = await this._userService.getUserByEmail(user.email);
      if (getUserAgain.activated) {
        return false;
      }
      await this._userService.activateUser(user.id);
      user.activated = true;
      await NewsletterService.register(user.email);
      return this.jwt(user as any);
    }

    return false;
  }

  oauthLink(provider: string, query?: any) {
    const providerInstance = ProvidersFactory.loadProvider(
      provider as Provider
    );
    return providerInstance.generateLink(query);
  }

  async checkExists(provider: string, code: string) {
    const providerInstance = ProvidersFactory.loadProvider(
      provider as Provider
    );
    const token = await providerInstance.getToken(code);
    const user = await providerInstance.getUser(token);
    if (!user) {
      throw new Error('Invalid user');
    }
    const checkExists = await this._userService.getUserByProvider(
      user.id,
      provider as Provider
    );
    if (checkExists) {
      return { jwt: await this.jwt(checkExists) };
    }

    return { token };
  }

  async sendMagicLink(email: string): Promise<boolean> {
    if (!this._emailService.hasProvider()) {
      throw new Error('Email service is not configured');
    }

    const token = await this._magicLinkService.createMagicLink(email);
    const magicLinkUrl = `${process.env.FRONTEND_URL}/auth/magic-link?token=${token}`;

    await this._emailService.sendEmail(
      email,
      'Sign in to your account',
      `
        <p>Click the button below to sign in to your account. This link will expire in 15 minutes.</p>
        <p style="margin: 24px 0;">
          <a href="${magicLinkUrl}" style="
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
          ">Sign In</a>
        </p>
        <p style="color: #666; font-size: 14px;">
          If you didn't request this email, you can safely ignore it.
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">
          Or copy and paste this link: ${magicLinkUrl}
        </p>
      `
    );

    return true;
  }

  async verifyMagicLink(
    token: string,
    ip: string,
    userAgent: string
  ): Promise<{ jwt: string; isNewUser: boolean } | null> {
    const email = await this._magicLinkService.verifyMagicLink(token);
    
    if (!email) {
      return null;
    }

    // Check if user exists with MAGIC_LINK provider
    let user = await this._userService.getUserByProvider(email, Provider.MAGIC_LINK);
    
    if (user) {
      return { jwt: await this.jwt(user), isNewUser: false };
    }

    // Check if user exists with LOCAL provider (same email)
    const localUser = await this._userService.getUserByEmail(email);
    if (localUser) {
      // User exists with LOCAL provider, allow login via magic link
      return { jwt: await this.jwt(localUser), isNewUser: false };
    }

    // If registration is disabled and no existing user, return null with special flag
    if (!(await this.canRegister(Provider.MAGIC_LINK as string))) {
      throw new Error('Registration is disabled. Please contact an administrator.');
    }

    // Create new user with MAGIC_LINK provider
    const create = await this._organizationService.createOrgAndUser(
      {
        company: 'My Company',
        email,
        password: '',
        provider: Provider.MAGIC_LINK,
        providerId: email,
      },
      ip,
      userAgent
    );

    await NewsletterService.register(email);

    return { jwt: await this.jwt(create.users[0].user), isNewUser: true };
  }

  private async jwt(user: User) {
    return AuthChecker.signJWT(user);
  }
}
