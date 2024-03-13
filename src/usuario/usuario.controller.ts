import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioDto } from './models/usuario.dto';
import { UsuarioService } from './usuario.service';
import { AuthService } from '../auth/auth.service';
import { TipoUsuario } from './models/tipo-usuario';
import { LoginDto } from './models/login.dto';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @Post('admin')
  async createAdmin(@Body() body: UsuarioDto) {
    const { nome, senha, usuario } = body;

    if (await this.usuarioService.usuarioExiste(usuario)) {
      throw new BadRequestException(`O usuário já existe`);
    }

    return this.usuarioService.createUsuario({
      nome,
      senha,
      tipo_usuario: 1,
      usuario,
    });
  }

  @Post('secretario')
  async createSecretario(@Body() body: UsuarioDto) {
    const { nome, senha, usuario } = body;

    if (await this.usuarioService.usuarioExiste(usuario)) {
      throw new BadRequestException(`O usuário já existe`);
    }

    return this.usuarioService.createUsuario({
      nome,
      senha,
      tipo_usuario: 2,
      usuario,
    });
  }

  @Post('anfitriao')
  async createAnfitriao(@Body() body: UsuarioDto) {
    const { nome, senha, usuario } = body;

    if (await this.usuarioService.usuarioExiste(usuario)) {
      throw new BadRequestException(`O usuário já existe`);
    }

    return this.usuarioService.createUsuario({
      nome,
      senha,
      tipo_usuario: 3,
      usuario,
    });
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { senha, usuario } = body;

    const data = await this.usuarioService.login({
      senha,
      usuario,
    });

    if (!data) throw new UnauthorizedException('Usuário ou senha inválidos');

    const token = await this.authService.generateToken({
      id: data.id,
      username: data.usuario,
      roles: [data.tipo_usuario] as TipoUsuario[],
    });

    return {
      ...data,
      senha: undefined,
      usuario: undefined,
      token: token.access_token,
    };
  }
}
