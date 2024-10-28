import { HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import { catchError, getUrlFromVideoId, issue } from 'src/utils';
import { youtubeDl } from 'youtube-dl-exec';
import { getInfo } from 'ytdl-core';

@Injectable()
export class VideoService {
  async getVideoInfo(videoId: string) {
    const [err, info] = await catchError(getInfo(getUrlFromVideoId(videoId)));
    err && issue(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    return info;
  }

  async getBlobFromData(videoId: string, onlyAudio: boolean) {
    const filePath = `temp/audio/${videoId}`;

    const [err] = await catchError(
      youtubeDl(getUrlFromVideoId(videoId), {
        audioQuality: 0,
        audioFormat: 'mp3',
        output: filePath,
        extractAudio: onlyAudio || undefined,
      }),
    );

    err && issue(err.message, HttpStatus.INTERNAL_SERVER_ERROR);

    if (!existsSync(filePath)) issue('Video not found', HttpStatus.NOT_FOUND);

    const fileData = readFileSync(filePath, { encoding: 'base64' });

    unlinkSync(filePath);

    return fileData;
  }
}
