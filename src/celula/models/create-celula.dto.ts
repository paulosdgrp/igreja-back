import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCelulaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da célula' })
  nome_celula: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Secretário da célula' })
  secretarioId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Latitude da célula' })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Longitude da célula' })
  longitude: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço da célula' })
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Anfitriãop da célula' })
  anfitriaoId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id do líder' })
  liderId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id do líder em treinamento' })
  liderEmTreinamentoId: number;
}
