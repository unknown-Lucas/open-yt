import { Controller, Get, Param, HttpStatus, Query } from '@nestjs/common';
import { issue } from 'src/utils';
import { Throttle } from '@nestjs/throttler';
import { MindMapService } from '../services';
import { videoSummaryQuery } from 'src/shared';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller({ path: 'mind-map' })
export class MindMapController {
  constructor(private readonly mindMapService: MindMapService) {}

  @Get(':videoId')
  async getVideoMindMap(
    @Param('videoId') videoId: string,
    @Query() query: videoSummaryQuery,
  ) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);

    return await this.mindMapService.getStaticMindMap(videoId, query);
  }
}
