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
      endereco,
      liderEmTreinamentoId,
      liderId,
      anfitriaoId,
    } = createCelulaDto;

    return this.prisma.celula.create({
      data: {
        nome_celula: nome_celula,
        lider: liderId ? { connect: { id: liderId } } : undefined,
        liderEmTreinamento: liderEmTreinamentoId
          ? { connect: { id: liderEmTreinamentoId } }
          : undefined,
        anfitriao: anfitriaoId ? { connect: { id: anfitriaoId } } : undefined,
        endereco: endereco,
      },
    });
  }

  async findAll() {
    return this.prisma.celula.findMany();
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
