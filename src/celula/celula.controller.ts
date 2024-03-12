import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CelulaService } from './celula.service';
import { CreateCelulaDto } from './models/create-celula.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('celulas')
@Controller('celulas')
export class CelulaController {
  constructor(private readonly celulaService: CelulaService) {}

  @Post()
  create(@Body(ValidationPipe) createCelulaDto: CreateCelulaDto) {
    return this.celulaService.create(createCelulaDto);
  }

  @Get()
  findAll() {
    return this.celulaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.celulaService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.celulaService.remove(+id);
  }
}
