import { Module } from '@nestjs/common';
import { CelulaService } from './celula.service';
import { CelulaController } from './celulas.controller';

@Module({
  controllers: [CelulaController],
  providers: [CelulaService],
})
export class CelulaModule {}
