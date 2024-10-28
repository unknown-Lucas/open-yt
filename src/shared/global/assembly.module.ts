import { Global, Module } from '@nestjs/common';
import { AssemblyAI } from 'assemblyai';

@Global()
@Module({
  providers: [
    {
      provide: 'ASSEMBLY_AI_CLIENT',
      useFactory: () => {
        return new AssemblyAI({
          apiKey: process.env.ASSEMBLY_AI_API_KEY,
        });
      },
    },
  ],
  exports: ['ASSEMBLY_AI_CLIENT'],
})
export class AssemblyAiModule {}
