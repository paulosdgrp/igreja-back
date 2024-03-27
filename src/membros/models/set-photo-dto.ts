import { IsBase64, IsNotEmpty } from 'class-validator';

export class SetPhotoDto {
  @IsBase64()
  foto: string;
}
