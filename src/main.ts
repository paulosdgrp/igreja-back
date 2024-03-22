/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('API da Igreja')
    .setDescription(
      'Esta API gerencia as operações de uma igreja, incluindo a gestão de células, membros, encontros, lares anfitriões e muito mais. Permite o cadastro e a administração de todas as atividades e participantes envolvidos.',
    )
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('usuarios', 'Operações relacionadas aos usuários da igreja')
    .addTag('celulas', 'Gerenciamento das células da igreja')
    .addTag('membros', 'Gerenciamento dos membros da igreja')
    .addTag('encontros', 'Organização e acompanhamento dos encontros')
    .addBearerAuth()
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
