import { Module } from '@nestjs/common';

import { MembrosController } from './membros.controller';
import { MembrosService } from './membros.service';

@Module({
  imports: [],
  controllers: [MembrosController],
  providers: [MembrosService],
})
export class MembrosModule {}
