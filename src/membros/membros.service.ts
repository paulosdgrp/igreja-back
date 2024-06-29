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
    include?: Prisma.MembroInclude;
  }): Promise<Membro[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.membro.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        encontroPresencas: {
          include: {
            encontro: {
              select: {
                data: true,
                celula: {
                  select: {
                    nome_celula: true,
                    id: true,
                  },
                },
              },
            },
          },
          orderBy: {
            encontro: {
              data: 'desc',
            },
          },
          take: 1,
        },
      },
    });
  }

  membroComCelula() {
    return this.prisma.$queryRaw`
      SELECT m.*,
        COALESCE(ca.nome_celula, cl.nome_celula, clt.nome_celula) AS nome_celula,
        COALESCE(ca.id, cl.id, clt.id) AS id_celula
        FROM membros m
        LEFT JOIN celulas ca ON ca.anfitriaoId = m.id AND m.tipo_membro = 4
        LEFT JOIN celulas cl ON cl.liderId = m.id AND m.tipo_membro = 2
        LEFT JOIN celulas clt ON clt.liderEmTreinamentoId = m.id AND m.tipo_membro = 3
    `;
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
