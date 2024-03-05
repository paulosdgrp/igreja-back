import { TipoUsuario } from '../usuario/models/tipo-usuario';

export interface UsuarioLogado {
  username: string;
  id: number;
  roles: TipoUsuario[];
}
