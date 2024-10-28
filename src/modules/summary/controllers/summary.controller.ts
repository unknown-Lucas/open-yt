import { Controller, Get, Param, HttpStatus, Query, Sse } from '@nestjs/common';
import { issue } from 'src/utils';
import { videoSummaryQuery } from '../../../shared';
import { SummaryService } from '../services';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller({ path: 'summary' })
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('static/:videoId')
  async getVideoSummary(
    @Param('videoId') videoId: string,
    @Query() query: videoSummaryQuery,
  ) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);

    return this.summaryService.getStaticSummary(videoId, query);
  }

  @Sse('stream/:videoId')
  getVideoSummaryStream(
    @Param('videoId') videoId: string,
    @Query() query: videoSummaryQuery,
  ) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);

    return this.summaryService.getSummaryStream(videoId, query);
  }
}
