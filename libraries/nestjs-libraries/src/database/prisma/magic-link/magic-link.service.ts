import { Injectable } from '@nestjs/common';
import { MagicLinkRepository } from '@gitroom/nestjs-libraries/database/prisma/magic-link/magic-link.repository';

@Injectable()
export class MagicLinkService {
  constructor(private _magicLinkRepository: MagicLinkRepository) {}

  createMagicLink(email: string): Promise<string> {
    return this._magicLinkRepository.createMagicLink(email);
  }

  verifyMagicLink(token: string): Promise<string | null> {
    return this._magicLinkRepository.verifyMagicLink(token);
  }

  cleanupExpiredLinks(): Promise<void> {
    return this._magicLinkRepository.cleanupExpiredLinks();
  }
}

