import { Module } from '@nestjs/common';
import { TranscriptService } from '../transcript/services';
import { MindMapController } from './controllers';
import { MindMapService } from './services';

@Module({
  imports: [],
  controllers: [MindMapController],
  providers: [TranscriptService, MindMapService],
})
export class MindMapModule {}
