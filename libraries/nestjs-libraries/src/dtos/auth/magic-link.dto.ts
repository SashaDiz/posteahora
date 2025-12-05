import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SendMagicLinkDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;
}

export class VerifyMagicLinkDto {
  @IsString()
  @IsDefined()
  token: string;
}

