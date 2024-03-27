import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty } from 'class-validator';

export class SetPhotoDto {
  @IsBase64()
  @ApiProperty({ type: String, description: 'foto'})
  foto: string;
}
