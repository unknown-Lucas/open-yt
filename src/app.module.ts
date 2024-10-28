import { Module } from '@nestjs/common';

import {
  TranscriptModule,
  VideoModule,
  SummaryModule,
  MindMapModule,
} from './modules';
import { AssemblyAiModule, OpenAiModule } from './shared';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    //? GLOBAL
    OpenAiModule,
    AssemblyAiModule,
    ThrottlerModule.forRoot([
      {
        limit: 10,
        ttl: 6000,
      },
    ]),
    //? FEATURES
    VideoModule,
    TranscriptModule,
    SummaryModule,
    MindMapModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
