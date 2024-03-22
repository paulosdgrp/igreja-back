import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMembroDto } from './models/create-membro.dto';
import { MembrosService } from './membros.service';
import { Roles } from '../decorators/auth.decorator';
import { TipoUsuario } from '../usuario/models/tipo-usuario';
import * as fs from 'fs';
import { SetPhotoDto } from './models/set-photo-dto';

@ApiTags('membros')
@Controller('/membros')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MembrosController {
  constructor(private readonly membrosService: MembrosService) {}

  @Get()
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Roles(TipoUsuario.ADMIN, TipoUsuario.SECRETARIO)
  getAllMembers(
    @Query('skip', {
      transform: (value) => parseInt(value),
    })
    skip?: number,
    @Query('take', {
      transform: (value) => parseInt(value),
    })
    take?: number,
  ) {
    return this.membrosService.membros({
      skip: skip || 0,
      take: take || 10,
    });
  }

  @Get(':id')
  async getMemberById(@Param('id') id: string) {
    const membro = await this.membrosService.membro({ id: +id });
    if (!membro) throw new HttpException('Membro não encontrado', 404);
    return membro;
  }

  @Post()
  async createMember(@Body() body: CreateMembroDto) {
    const {
      nome,
      telefone,
      sexo,
      data_nascimento,
      cristao,
      novo_convertido,
      escola_de_lideres,
      descubra,
      foto,
    } = body;
    const mask = /[0-9]/g;
    const telefoneSemFormatacao = telefone.match(mask).join('');

    const membro = await this.membrosService.createMembro({
      nome,
      telefone: telefoneSemFormatacao,
      sexo,
      data_nascimento,
      cristao,
      novo_convertido,
      escola_de_lideres,
      descubra,
    });

    if (foto) {
      await this.setPhoto(membro.id.toString(), { foto });
    }

    return membro;
  }

  @Put(':id/photo')
  async setPhoto(@Param('id') id: string, @Body() body: SetPhotoDto) {
    const { foto } = body;
    const membro = await this.membrosService.membro({ id: +id });
    if (!membro) throw new HttpException('Membro não encontrado', 404);

    const buffer = Buffer.from(foto.split(',')[1], 'base64');
    const imagePath = `membros/${membro.id}.png`;
    try {
      fs.mkdirSync(`public/membros`, { recursive: true } );
    } catch (e) {
        console.log('Cannot create folder ', e);
    }
    fs.writeFileSync(`public/${imagePath}`, buffer);
    await this.membrosService.setPhoto(membro.id, imagePath);

    membro.foto = imagePath;
    return membro;
  }

  @Put(':id')
  async updateMember(@Param('id') id: string, @Body() body: CreateMembroDto) {
    const {
      nome,
      telefone,
      sexo,
      data_nascimento,
      cristao,
      novo_convertido,
      escola_de_lideres,
      descubra,
    } = body;

    const mask = /[0-9]/g;
    const telefoneSemFormatacao = telefone.match(mask).join('');

    const membro = await this.membrosService.membro({ id: +id });
    if (!membro) throw new HttpException('Membro não encontrado', 404);

    return this.membrosService.updateMembro({
      where: { id: +id },
      data: {
        nome,
        telefone: telefoneSemFormatacao,
        sexo,
        data_nascimento,
        cristao,
        novo_convertido,
        escola_de_lideres,
        descubra,
      },
    });
  }
}
