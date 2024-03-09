import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCelulaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id Usuario' })
  uuid: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da célula' })
  nome_celula: string;
}
