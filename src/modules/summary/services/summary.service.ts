import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptService } from '../../transcript/services';
import { issue, Prompts } from 'src/utils';
import { videoSummaryQuery } from '../../../shared';
import { Observable } from 'rxjs';

@Injectable()
export class SummaryService {
  constructor(
    @Inject('OPEN_AI_CLIENT') private readonly openAiClient: OpenAI,
    private readonly transcriptService: TranscriptService,
  ) {}

  async getStaticSummary(
    videoId: string,
    { ...queryParams }: videoSummaryQuery,
  ) {
    try {
      const videoTranscript =
        await this.transcriptService.getTranscription(videoId);

      return await this.openAiClient.chat.completions.create({
        temperature: queryParams.temperature ?? 0.2,
        model: queryParams.model ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: Prompts.summary },
          { role: 'user', content: String(videoTranscript.text) },
        ],
      });
    } catch (error) {
      issue(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getSummaryStream(videoId: string, { ...queryParams }: videoSummaryQuery) {
    return new Observable((observer) => {
      try {
        this.transcriptService
          .getTranscription(videoId)
          .then(async (transcript) => {
            const stream = await this.openAiClient.chat.completions.create({
              messages: [
                { role: 'system', content: Prompts.summary },
                { role: 'user', content: String(transcript.text) },
              ],
              temperature: queryParams.temperature ?? 0.2,
              model: queryParams.model ?? 'gpt-4o-mini',
              stream: true,
            });
            for await (const chunk of stream) {
              observer.next({ data: chunk });
            }
          });
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
