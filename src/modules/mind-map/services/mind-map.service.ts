import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TranscriptService } from '../../transcript/services';
import { videoSummaryQuery } from 'src/shared';
import { issue, Prompts } from 'src/utils';

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
    try {
      const videoTranscript =
        await this.transcriptService.getTranscription(videoId);

      return await this.openAiClient.chat.completions.create({
        temperature: queryParams.temperature ?? 0.2,
        model: queryParams.model ?? 'gpt-4o-mini',
        messages: [
          { role: 'system', content: Prompts.mindMap },
          { role: 'user', content: String(videoTranscript.text) },
        ],
      });
    } catch (error) {
      issue(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
