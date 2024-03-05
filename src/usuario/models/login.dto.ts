import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Nome de usuário' })
  usuario: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Senha' })
  senha: string;
}
