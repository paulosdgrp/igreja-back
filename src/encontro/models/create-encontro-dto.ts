import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEncontroDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id da célula' })
  celulaId: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Data do encontro' })
  data: Date;

  @ApiProperty({ description: 'Observações do encontro' })
  observacoes: string;
}
