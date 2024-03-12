import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCelulaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da célula' })
  nome_celula: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do secretário' })
  secretarioId: number;
}
