import { Injectable, NotFoundException } from '@nestjs/common';
import { Encontro } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEncontroDto } from './models/create-encontro-dto';

@Injectable()
export class EncontroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEncontroDto: CreateEncontroDto): Promise<Encontro> {
    const { celulaId, data, horario, observacoes } = createEncontroDto;

    return this.prisma.encontro.create({
      data: {
        celula: { connect: { id: celulaId } },
        data: data,
        horario: horario,
        observacoes: observacoes,
      },
    });
  }

  async findAll() {
    const findAllEncontros = this.prisma.encontro.findMany();

    if ((await findAllEncontros).length === 0) {
      throw new NotFoundException('Nenhuma célula encontrada');
    }

    return findAllEncontros;
  }

  async findOne(id: number) {
    const findOneEncontro = this.prisma.encontro.findFirst({
      where: {
        id: id,
      },
    });

    if (!(await findOneEncontro)) {
      throw new NotFoundException('Id inválido');
    }

    return findOneEncontro;
  }

  async remove(id: number) {
    this.prisma.encontro.delete({
      where: {
        id: id,
      },
    });
  }

  async addPresenca(encontroId: number, ids: number[]) {
    this.prisma
      .$executeRaw`INSERT INTO "encontro_presenca" ("encontroId", "membroId") VALUES ${ids.map((id) => `(${encontroId}, ${id})`).join(', ')}`;
  }
}
