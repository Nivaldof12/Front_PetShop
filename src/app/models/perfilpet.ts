import { Usuario } from "./usuario";

export interface PerfilPet {
  id?: number;
  nome: string;
  raca: string;
  idade: number;
  usuario?: Usuario;
}