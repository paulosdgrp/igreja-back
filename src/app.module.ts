import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MembrosModule } from './membros/membros.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [MembrosModule, AuthModule, PrismaModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
