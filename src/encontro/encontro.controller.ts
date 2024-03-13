import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncontroService } from './encontro.service';
import { CreateEncontroDto } from './models/create-encontro-dto';

@ApiTags('encontros')
@Controller('encontros')
export class EncontroController {
  constructor(private readonly encontroService: EncontroService) {}

  @Post()
  create(@Body(ValidationPipe) createEncontroDto: CreateEncontroDto) {
    return this.encontroService.create(createEncontroDto);
  }

  @Get()
  findAll() {
    return this.encontroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.encontroService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encontroService.remove(+id);
  }
}
