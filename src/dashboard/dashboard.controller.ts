import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/auth.decorator';
import { TipoUsuario } from 'src/usuario/models/tipo-usuario';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('admin')
  @Roles(TipoUsuario.ADMIN)
  getDashboardAdmin() {
    return this.dashboardService.adminDashboard();
  }
}
