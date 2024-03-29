import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { SetPhotoDto } from 'src/membros/models/set-photo-dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './models/login.dto';
import { UsuarioDto } from './models/usuario.dto';
import { UsuarioService } from './usuario.service';
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

    const secretario = await this.usuarioService.createUsuario({
      nome,
      senha,
      tipo_usuario: 2,
      usuario,
    });

    if (body.foto) {
      return await this.setPhoto(secretario.id, { foto: body.foto });
    }

    return secretario;
  }

  @Put(':id/photo')
  async setPhoto(@Param('id') id: number, @Body() body: SetPhotoDto) {
    const { foto } = body;
    const secretario = await this.usuarioService.getUsuario(+id);
    if (!secretario) throw new HttpException('Usuário não encontrado', 404);

    const buffer = Buffer.from(foto.split(',')[1], 'base64');
    const imagePath = `secretarios/${secretario.id}.png`;
    try {
      fs.mkdirSync(`public/membros`, { recursive: true });
    } catch (e) {
      console.log('Cannot create folder ', e);
    }
    fs.writeFileSync(`public/${imagePath}`, buffer);
    await this.usuarioService.setPhoto(secretario.id, imagePath);

    secretario.foto = imagePath;
    return secretario;
  }

  @Get('secretario')
  async getSecretario() {
    const secretarios = await this.usuarioService.getUsuarios({
      celulaSecretariada: null,
      tipo_usuario: 2
    });

    secretarios.forEach((s) => (s.senha = undefined));
    return secretarios;
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const { senha, usuario } = body;

    const data = await this.usuarioService.login({
      senha,
      usuario,
    });

    if (!data) throw new UnauthorizedException('Usuário ou senha inválidos');

    const token = await this.authService.generateToken(
      {
        id: data.id,
        nome: data.nome,
        tipo_usuario: data.tipo_usuario,
      },
      {
        expiresIn: 60 * 60 * 24,
      },
    );

    return {
      ...data,
      senha: undefined,
      usuario: undefined,
      token: token.access_token,
    };
  }
}
