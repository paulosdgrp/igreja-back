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
}
