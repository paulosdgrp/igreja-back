import { Injectable } from '@nestjs/common';
import { CreateCelulaDto } from './models/create-celula.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CelulaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCelulaDto: CreateCelulaDto) {
    const { nome_celula, uuid } = createCelulaDto;
    return this.prisma.celula.create({
      data: {
        nome_celula: nome_celula,
        secretario: {
          connect: { id: uuid },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.celula.findMany();
  }

  async findOne(id: number) {
    return this.prisma.celula.findFirst({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.celula.delete({
      where: {
        id: id,
      },
    });
  }
}
