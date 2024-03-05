import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CelulaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CelulaCreateInput) {
    const { nome_celula, larAnfitriao, secretario } = data;
    const membros = [] as unknown;
    await this.prismaService.celula.create({
      data: {
        nome_celula,
        larAnfitriao,
        secretario,
        membros,
      },
    });
  }
}
