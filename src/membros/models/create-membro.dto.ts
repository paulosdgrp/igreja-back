import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMembroDto {
  @IsString()
  @ApiProperty({ description: 'Nome' })
  nome: string;

  @IsString()
  @ApiProperty({ description: 'Telefone' })
  telefone: string;

  @IsString()
  @ApiProperty({ description: 'Sexo' })
  sexo: string;

  @IsDate()
  @ApiProperty({ description: 'Data de nascimento' })
  data_nascimento: Date;

  @IsBoolean()
  @ApiProperty({ description: 'É cristão?' })
  cristao: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'É novo convertido?' })
  novo_convertido: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'Já fez o descubra?' })
  descubra: boolean;

  @IsBoolean()
  @ApiProperty({ description: 'É da escola de líderes?' })
  escola_de_lideres: boolean;

  @IsBase64()
  @IsOptional()
  @ApiProperty({ description: 'Foto', required: false })
  foto?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Celula', required: false })
  idCelula: number;

  @IsNumber()
  @ApiProperty({ description: 'Tipo de membro', required: true })
  tipo_membro: number;
}
