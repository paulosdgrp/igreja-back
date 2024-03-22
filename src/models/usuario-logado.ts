import { TipoUsuario } from '../usuario/models/tipo-usuario';

export interface UsuarioLogado {
  id: number;
  nome,
  tipo_usuario: TipoUsuario;
}
