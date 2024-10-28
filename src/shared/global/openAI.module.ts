import { Global, Module } from '@nestjs/common';
import OpenAI from 'openai';

@Global()
@Module({
  providers: [
    {
      provide: 'OPEN_AI_CLIENT',
      useFactory: () => {
        return new OpenAI({
          apiKey: process.env.OPEN_AI_API_KEY,
          project: process.env.OPEN_AI_PROJECT_KEY,
          organization: process.env.OPEN_AI_ORGANIZATION_KEY,
        });
      },
    },
  ],
  exports: ['OPEN_AI_CLIENT'],
})
export class OpenAiModule {}
