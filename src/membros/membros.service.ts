import { Injectable } from '@nestjs/common';
import { Membro, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembrosService {
  constructor(private readonly prisma: PrismaService) {}

  async membros(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MembroWhereUniqueInput;
    where?: Prisma.MembroWhereInput;
    orderBy?: Prisma.MembroOrderByWithRelationInput;
  }): Promise<Membro[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.membro.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async membro(
    membroWhereUniqueInput: Prisma.MembroWhereUniqueInput,
  ): Promise<Membro | null> {
    return this.prisma.membro.findUnique({
      where: membroWhereUniqueInput,
    });
  }

  async createMembro(data: Prisma.MembroCreateInput): Promise<Membro> {
    return this.prisma.membro.create({
      data,
    });
  }

  async updateMembro(params: {
    where: Prisma.MembroWhereUniqueInput;
    data: Prisma.MembroUpdateInput;
  }): Promise<Membro> {
    const { where, data } = params;
    return this.prisma.membro.update({
      data,
      where,
    });
  }

  async setPhoto(membroId: number, imagePath: string) {
    await this.prisma.membro.update({
      where: { id: membroId },
      data: {
        foto: imagePath,
      },
    });
  }
}
