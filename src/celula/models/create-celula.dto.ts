import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCelulaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da célula' })
  nome_celula: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço da célula' })
  endereco: string;

  @IsNumber()
  @ApiProperty({ description: 'Id do líder' })
  liderId: number;

  @IsNumber()
  @ApiProperty({ description: 'Id do líder em treinamento' })
  liderEmTreinamentoId: number;

  @IsNumber()
  @ApiProperty({ description: 'Id do anfitrião' })
  anfitriaoId: number;
}
