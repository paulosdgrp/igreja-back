import { Injectable, NotFoundException } from '@nestjs/common';
import { Celula } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCelulaDto } from './models/create-celula.dto';

@Injectable()
export class CelulaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCelulaDto: CreateCelulaDto): Promise<Celula> {
    const {
      nome_celula,
      secretarioId,
      endereco,
      latitude,
      longitude,
      liderEmTreinamentoId,
      liderId,
    } = createCelulaDto;

    return this.prisma.celula.create({
      data: {
        nome_celula: nome_celula,
        secretario: { connect: { id: secretarioId } },
        lider: { connect: { id: liderId } },
        liderEmTreinamento: { connect: { id: liderEmTreinamentoId } },
        endereco: endereco,
        latitude: latitude,
        longitude: longitude,
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
    this.prisma.celula.delete({
      where: {
        id: id,
      },
    });
  }

  async addMembros(celulaId: number, ids: number[]) {
    this.prisma
      .$executeRaw`INSERT INTO "celula_membro" ("celulaId", "membroId") VALUES ${ids.map((id) => `(${celulaId}, ${id})`).join(', ')}`;
  }

  async countAll() {
    return this.prisma.celula.count();
  }
}
