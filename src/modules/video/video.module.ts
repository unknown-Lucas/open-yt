import { Module } from '@nestjs/common';
import { VideoController } from './controllers';
import { VideoService } from './services';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
