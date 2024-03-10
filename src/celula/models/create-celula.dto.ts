import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCelulaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da célula' })
  nome_celula: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do secretário' })
  secretarioId: number;

  // @IsArray()
  // @IsOptional()
  // @ApiProperty({ description: 'IDs dos membros', type: [Number] })
  // membrosIds?: number[];

  // @IsNumber()
  // @IsOptional()
  // @ApiProperty({ description: 'ID do Lar Anfitrião' })
  // larAnfitriaoId?: number;
}
