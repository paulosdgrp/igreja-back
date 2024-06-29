import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async adminDashboard() {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() - 30));

    const totalCelulas = await this.prisma.celula.count();
    const totalMembros = await this.prisma.membro.count();
    const totalEncontros = await this.prisma.encontro.count({
      where: {
        data: {
          gte: priorDate,
          lte: today,
        },
      },
    });

    return {
      totalCelulas,
      totalMembros,
      totalEncontros,
    };
  }
}
