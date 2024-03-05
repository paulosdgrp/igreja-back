import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/auth.decorator';
import { UsuarioLogado } from '../models/usuario-logado';
import { TipoUsuario } from '../usuario/models/tipo-usuario';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<TipoUsuario[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      const decoded = await this.authService.validateToken(token);
      request.user = decoded as UsuarioLogado;

      if (!requiredRoles) return true;
      return requiredRoles.some((role) => decoded.roles?.includes(role));
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
