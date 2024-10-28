import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptService } from '../../transcript/services';
import { catchError, issue, Prompts } from 'src/utils';
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
    const [trascriptErr, transcript] = await catchError(
      this.transcriptService.getTranscription(videoId),
    );

    trascriptErr &&
      issue(trascriptErr.message, HttpStatus.INTERNAL_SERVER_ERROR);

    const [summaryErr, summary] = await catchError(
      this.openAiClient.chat.completions.create({
        temperature: queryParams.temperature ?? 0.2,
        model: queryParams.model ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: Prompts.summary },
          { role: 'user', content: String(transcript.text) },
        ],
      }),
    );

    summaryErr && issue(summaryErr.message, HttpStatus.INTERNAL_SERVER_ERROR);

    return summary;
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
