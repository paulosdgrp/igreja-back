import { Module } from '@nestjs/common';
import { EncontroController } from './encontro.controller';
import { EncontroService } from './encontro.service';

@Module({
  controllers: [EncontroController],
  providers: [EncontroService],
})
export class EncontroModule {}
