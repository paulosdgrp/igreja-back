import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '../usuario/models/tipo-usuario';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
