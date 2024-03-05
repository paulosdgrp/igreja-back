import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [],
})
export class UsuarioModule {}
