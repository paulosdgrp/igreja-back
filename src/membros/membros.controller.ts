import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../decorators/auth.decorator';
import { TipoUsuario } from '../usuario/models/tipo-usuario';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './models/create-membro.dto';
import { SetPhotoDto } from './models/set-photo-dto';
import { CelulaService } from 'src/celula/celula.service';

@ApiTags('membros')
@Controller('/membros')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MembrosController {
  constructor(
    private readonly membrosService: MembrosService,
    private readonly celulaService: CelulaService,
  ) {}

  @Get()
  @ApiQuery({ name: 'tipo_membro', required: false })
  @Roles(TipoUsuario.ADMIN, TipoUsuario.SECRETARIO)
  async getAllMembers() {
    return this.membrosService.membroComCelula();
  }

  @Get('/anfitrioes')
  async getAllAnfitrioes() {
    const celulas = await this.celulaService.findAll();
    const anfitrioesIds = celulas
      .map((celula) => celula.anfitriaoId)
      .filter((id) => id !== null);

    return this.membrosService.membros({
      where: { id: { notIn: anfitrioesIds }, tipo_membro: 4 },
    });
  }

  @Get('/lideres')
  async getAllLideres() {
    const celulas = await this.celulaService.findAll();
    const lideresIds = celulas.map((celula) => celula.liderId);
    return this.membrosService.membros({
      where: { id: { notIn: lideresIds }, tipo_membro: 2 },
    });
  }

  @Get('/lideres_treinamento')
  async getAllLideresTreinamento() {
    const celulas = await this.celulaService.findAll();
    const lideresTreinamentoIds = celulas.map(
      (celula) => celula.liderEmTreinamentoId,
    );
    return this.membrosService.membros({
      where: { id: { notIn: lideresTreinamentoIds }, tipo_membro: 3 },
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
      tipo_membro,
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
      tipo_membro,
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
      fs.mkdirSync(`public/membros`, { recursive: true });
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
        data_nascimento: new Date(data_nascimento).toISOString(),
        cristao,
        novo_convertido,
        escola_de_lideres,
        descubra,
      },
    });
  }
}
