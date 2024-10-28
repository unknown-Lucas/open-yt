import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { issue } from 'src/utils';
import { VideoService } from '../services';
import { Response } from 'express';

@Controller({ path: 'video' })
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('info/:videoId')
  async getVideoInfo(@Param('videoId') videoId: string) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);

    const videoData = await this.videoService.getVideoInfo(videoId);
    return videoData;
  }

  @Get('buffer/:type/:videoId')
  async getVideoBuffer(
    @Param('videoId') videoId: string,
    @Param('type') type: 'audio' | 'video',
    @Res() res: Response,
  ) {
    if (!videoId) issue('Video ID is required', HttpStatus.BAD_REQUEST);
    if (!type || (type !== 'audio' && type !== 'video'))
      issue('Buffer type is required', HttpStatus.BAD_REQUEST);
    const videoBase64: string = await this.videoService.getBlobFromData(
      videoId,
      type === 'audio',
    );
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(HttpStatus.OK).send(Buffer.from(videoBase64, 'base64'));
  }
}
