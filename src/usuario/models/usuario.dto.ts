import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPositive, IsString } from 'class-validator';
import { TipoUsuario } from './tipo-usuario';
import { SetPhotoDto } from 'src/membros/models/set-photo-dto';

export class UsuarioDto extends SetPhotoDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Nome do usuário' })
  nome: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Nome de usuário' })
  usuario: string;

  @IsPositive()
  @IsEnum(TipoUsuario)
  @ApiProperty({
    type: TipoUsuario,
    description: 'Tipo de usuário',
    enum: TipoUsuario,
  })
  tipo_usuario: TipoUsuario;

  @IsString()
  @ApiProperty({ type: String, description: 'Senha' })
  senha: string;
}
