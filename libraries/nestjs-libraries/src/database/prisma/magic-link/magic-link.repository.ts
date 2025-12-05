import { PrismaRepository } from '@gitroom/nestjs-libraries/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class MagicLinkRepository {
  constructor(private _magicLink: PrismaRepository<'magicLink'>) {}

  async createMagicLink(email: string): Promise<string> {
    // Generate a secure random token
    const token = randomBytes(32).toString('hex');
    
    // Set expiration to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Invalidate any existing unused magic links for this email
    await this._magicLink.model.magicLink.updateMany({
      where: {
        email,
        used: false,
      },
      data: {
        used: true,
      },
    });

    // Create new magic link
    await this._magicLink.model.magicLink.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return token;
  }

  async verifyMagicLink(token: string): Promise<string | null> {
    const magicLink = await this._magicLink.model.magicLink.findUnique({
      where: {
        token,
      },
    });

    if (!magicLink) {
      return null;
    }

    // Check if expired or already used
    if (magicLink.used || new Date() > magicLink.expiresAt) {
      return null;
    }

    // Mark as used
    await this._magicLink.model.magicLink.update({
      where: {
        id: magicLink.id,
      },
      data: {
        used: true,
      },
    });

    return magicLink.email;
  }

  async cleanupExpiredLinks(): Promise<void> {
    await this._magicLink.model.magicLink.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { used: true, createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
        ],
      },
    });
  }
}

