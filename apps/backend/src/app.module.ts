import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from '@gitroom/backend/api/api.module';
import { PoliciesGuard } from '@gitroom/backend/services/auth/permissions/permissions.guard';
import { PublicApiModule } from '@gitroom/backend/public-api/public.api.module';
import { AgentModule } from '@gitroom/nestjs-libraries/agent/agent.module';
import { BullMqModule } from '@gitroom/nestjs-libraries/bull-mq-transport-new/bull.mq.module';
import { ThirdPartyModule } from '@gitroom/nestjs-libraries/3rdparties/thirdparty.module';
import { ChatModule } from '@gitroom/nestjs-libraries/chat/chat.module';
import { DatabaseModule } from '@gitroom/nestjs-libraries/database/prisma/database.module';
import { ThrottlerBehindProxyGuard } from '@gitroom/nestjs-libraries/throttler/throttler.provider';
import { VideoModule } from '@gitroom/nestjs-libraries/videos/video.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { FILTER } from '@gitroom/nestjs-libraries/sentry/sentry.exception';
import { CheckMissingQueues } from '@gitroom/cron/tasks/check.missing.queues';
import { PostNowPendingQueues } from '@gitroom/cron/tasks/post.now.pending.queues';
import { PostsController } from '@gitroom/workers/app/posts.controller';
import { PlugsController } from '@gitroom/workers/app/plugs.controller';

@Global()
@Module({
  imports: [
    SentryModule.forRoot(),
    BullMqModule,
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThirdPartyModule,
    VideoModule,
    ChatModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 3600000,
        limit: process.env.API_LIMIT ? Number(process.env.API_LIMIT) : 30,
      },
    ]),
  ],
  controllers: [PostsController, PlugsController],
  providers: [
    FILTER,
    CheckMissingQueues,
    PostNowPendingQueues,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
  ],
  exports: [
    BullMqModule,
    DatabaseModule,
    ApiModule,
    PublicApiModule,
    AgentModule,
    ThrottlerModule,
    ChatModule,
  ],
})
export class AppModule {}
