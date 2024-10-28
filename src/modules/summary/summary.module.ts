import { Module } from '@nestjs/common';
import { SummaryController } from './controllers';
import { SummaryService } from './services';
import { TranscriptService } from '../transcript/services';

@Module({
  imports: [],
  controllers: [SummaryController],
  providers: [SummaryService, TranscriptService],
})
export class SummaryModule {}
