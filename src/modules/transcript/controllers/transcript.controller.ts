import { Controller, Get, HttpStatus, Param, Sse } from '@nestjs/common';
import { issue } from 'src/utils';
import { TranscriptService } from '../services';
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller({ path: 'transcript' })
export class TranscriptController {
  constructor(private readonly transcriptionService: TranscriptService) {}

  @Get('static/:videoId')
  async getTranscription(@Param('videoId') videoId: string) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);
    return await this.transcriptionService.getTranscription(videoId);
  }
}
