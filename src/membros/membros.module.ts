import { Module } from '@nestjs/common';

import { MembrosController } from './membros.controller';
import { MembrosService } from './membros.service';
import { CelulaService } from 'src/celula/celula.service';

@Module({
  imports: [],
  controllers: [MembrosController],
  providers: [MembrosService, CelulaService],
})
export class MembrosModule {}
