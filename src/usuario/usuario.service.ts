import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async login(data: Prisma.UsuarioWhereInput, senha: string) {
    const user = await this.prisma.usuario.findFirst({
      where: data,
    });

    if (user && (await bcrypt.compare(senha, user.senha))) {
      return user;
    }

    return null;
  }

  createUsuario(data: Prisma.UsuarioCreateInput) {
    return this.prisma.usuario.create({
      data,
    });
  }

  getUsuarios(where: Prisma.UsuarioWhereInput) {
    return this.prisma.usuario.findMany({
      where,
    });
  }

  getUsuario(id: number) {
    return this.prisma.usuario.findFirst({
      where: {
        id,
      },
    });
  }

  setPhoto(id: number, path: string) {
    return this.prisma.usuario.update({
      where: {
        id,
      },

      data: {
        foto: path,
      },
    });
  }

  async usuarioExiste(userName: string): Promise<boolean> {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        usuario: userName,
      },
    });

    return !!usuario;
  }
}
