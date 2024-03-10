import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Celula, Prisma } from '@prisma/client';
import { CreateCelulaDto } from './models/create-celula.dto';

@Injectable()
export class CelulaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCelulaDto: CreateCelulaDto): Promise<Celula> {
    const { nome_celula, secretarioId } = createCelulaDto;

    return this.prisma.celula.create({
      data: {
        nome_celula: nome_celula,
        secretario: { connect: { id: secretarioId } },
      },
    });
  }

  async findAll() {
    const findAllCelulas = this.prisma.celula.findMany();

    if ((await findAllCelulas).length === 0) {
      throw new NotFoundException('Nenhuma célula encontrada');
    }

    return findAllCelulas;
  }

  async findOne(id: number) {
    const findOneCelula = this.prisma.celula.findFirst({
      where: {
        id: id,
      },
    });

    if (!(await findOneCelula)) {
      throw new NotFoundException('Id inválido');
    }

    return findOneCelula;
  }

  async remove(id: number) {
    const celulaRemoved = this.prisma.celula.delete({
      where: {
        id: id,
      },
    });
  }
}
