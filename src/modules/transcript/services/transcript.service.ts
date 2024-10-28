import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AssemblyAI } from 'assemblyai';
import { existsSync, unlinkSync } from 'fs';
import { catchError, getUrlFromVideoId, issue } from 'src/utils';
import { youtubeDl } from 'youtube-dl-exec';

@Injectable()
export class TranscriptService {
  constructor(
    @Inject('ASSEMBLY_AI_CLIENT') private readonly assemblyClient: AssemblyAI,
  ) {}

  async getTranscription(videoId) {
    const filePath = `temp/audio/${videoId}`;

    const [err] = await catchError(
      youtubeDl(getUrlFromVideoId(videoId), {
        audioQuality: 0,
        audioFormat: 'mp3',
        output: filePath,
        extractAudio: true,
      }),
    );

    err && issue(err.message, HttpStatus.INTERNAL_SERVER_ERROR);

    if (!existsSync(filePath)) issue('Audio not found', HttpStatus.NOT_FOUND);

    const transcript = await this.assemblyClient.transcripts.transcribe({
      audio: filePath,
      language_detection: true,
      language_confidence_threshold: 0.8,
      speaker_labels: true,
      format_text: false,
      speech_model: 'best',
    });

    if (existsSync(filePath)) unlinkSync(filePath);

    return transcript;
  }
}
