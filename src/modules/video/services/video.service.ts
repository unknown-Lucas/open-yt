import { HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import { getUrlFromVideoId, issue } from 'src/utils';
import { youtubeDl } from 'youtube-dl-exec';
import { getInfo } from 'ytdl-core';

@Injectable()
export class VideoService {
  async getVideoInfo(videoId: string) {
    try {
      return await getInfo(getUrlFromVideoId(videoId));
    } catch (error) {
      issue(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBlobFromData(videoId: string, onlyAudio: boolean) {
    const filePath = `temp/audio/${videoId}`;
    try {
      await youtubeDl(getUrlFromVideoId(videoId), {
        audioQuality: 0,
        audioFormat: 'mp3',
        output: filePath,
        extractAudio: onlyAudio || undefined,
      });
    } catch (error) {
      issue(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!existsSync(filePath)) issue('Video not found', HttpStatus.NOT_FOUND);

    const fileData = readFileSync(filePath, { encoding: 'base64' });

    unlinkSync(filePath);

    return fileData;
  }
}
