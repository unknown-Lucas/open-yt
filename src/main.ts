import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('OPEN-YT')
    .setDescription(
      'Public API that offers summaries, transcriptions , mind maps and summaries from YouTube videos powered by OpenAI and AssemblyAI',
    )
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
