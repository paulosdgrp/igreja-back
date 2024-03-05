import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { firstValueFrom, from, map } from 'rxjs';
import { UsuarioLogado } from '../models/usuario-logado';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: UsuarioLogado, options?: JwtSignOptions) {
    const { username, id, roles } = user;
    const payload = { username, id, roles };

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
