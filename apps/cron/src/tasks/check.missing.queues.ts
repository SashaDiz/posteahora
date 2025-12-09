import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostsService } from '@gitroom/nestjs-libraries/database/prisma/posts/posts.service';
import { BullMqClient } from '@gitroom/nestjs-libraries/bull-mq-transport-new/client';
import dayjs from 'dayjs';

@Injectable()
export class CheckMissingQueues {
  constructor(
    private _postService: PostsService,
    private _workerServiceProducer: BullMqClient
  ) {}
  @Cron('0 * * * *')
  async handleCron() {
    const list = await this._postService.searchForMissingThreeHoursPosts();
    
    // Early return if no posts to process
    if (!list || list.length === 0) {
      return;
    }

    // Batch fetch job states instead of N+1 queries
    const queue = this._workerServiceProducer.getQueue('post');
    const [waitingJobs, delayedJobs] = await Promise.all([
      queue.getJobs(['waiting'], 0, -1).catch((): any[] => []),
      queue.getJobs(['delayed'], 0, -1).catch((): any[] => [])
    ]);
    
    const existingJobIds = new Set([
      ...waitingJobs.map(j => j.id?.toString()),
      ...delayedJobs.map(j => j.id?.toString())
    ]);
    
    const notExists = list.filter((p) => !existingJobIds.has(p.id));

    for (const job of notExists) {
      this._workerServiceProducer.emit('post', {
        id: job.id,
        options: {
          delay: dayjs(job.publishDate).diff(dayjs(), 'millisecond'),
        },
        payload: {
          id: job.id,
          delay: dayjs(job.publishDate).diff(dayjs(), 'millisecond'),
        },
      });
    }
  }
}
