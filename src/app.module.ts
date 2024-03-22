import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MembrosModule } from './membros/membros.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CelulaModule } from './celula/celula.module';
import { EncontroModule } from './encontro/encontro.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MembrosModule,
    AuthModule,
    PrismaModule,
    UsuarioModule,
    CelulaModule,
    EncontroModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
