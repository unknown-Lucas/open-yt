import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptService } from '../../transcript/services';
import { videoSummaryQuery } from 'src/shared';
import { catchError, issue, Prompts } from 'src/utils';

@Injectable()
export class MindMapService {
  constructor(
    @Inject('OPEN_AI_CLIENT') private readonly openAiClient: OpenAI,
    private readonly transcriptService: TranscriptService,
  ) {}

  async getStaticMindMap(
    videoId: string,
    { ...queryParams }: videoSummaryQuery,
  ) {
    const [trascriptErr, transcript] = await catchError(
      this.transcriptService.getTranscription(videoId),
    );

    trascriptErr &&
      issue(trascriptErr.message, HttpStatus.INTERNAL_SERVER_ERROR);

    const [mindMapErr, mindMap] = await catchError(
      this.openAiClient.chat.completions.create({
        temperature: queryParams.temperature ?? 0.2,
        model: queryParams.model ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: Prompts.mindMap },
          { role: 'user', content: String(transcript.text) },
        ],
      }),
    );

    mindMapErr && issue(mindMapErr.message, HttpStatus.INTERNAL_SERVER_ERROR);

    return mindMap;
  }
}
