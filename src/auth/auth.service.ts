import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { firstValueFrom, from, map } from 'rxjs';
import { UsuarioLogado } from '../models/usuario-logado';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: UsuarioLogado, options?: JwtSignOptions) {
    const { nome, id, tipo_usuario } = user;
    const payload = { nome, id, tipo_usuario };

    return {
      access_token: this.jwtService.sign(payload, options),
    };
  }

  async validateToken(token: string): Promise<UsuarioLogado> {
    return firstValueFrom(
      from(this.jwtService.verifyAsync(token)).pipe(
        map((decoded) => decoded as UsuarioLogado),
      ),
    );
  }
}
