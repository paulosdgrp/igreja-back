import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async login(data: Prisma.UsuarioWhereInput) {
    return this.prisma.usuario.findFirst({
      where: data,
    });
  }

  createUsuario(data: Prisma.UsuarioCreateInput) {
    return this.prisma.usuario.create({
      data,
    });
  }

  async usuarioExiste(userName): Promise<boolean> {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        usuario: userName,
      },
    });

    return !!usuario;
  }
}
