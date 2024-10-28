import { Module } from '@nestjs/common';
import { TranscriptController } from './controllers';
import { TranscriptService } from './services';

@Module({
  imports: [],
  exports: [TranscriptService],
  controllers: [TranscriptController],
  providers: [TranscriptService],
})
export class TranscriptModule {}
