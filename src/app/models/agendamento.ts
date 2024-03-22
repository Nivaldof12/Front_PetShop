import { PerfilPet } from "./perfilpet";

export interface Agendamento {
    id?: number;
    perfilPet: PerfilPet;
    dia: string;
    tipo: string;
    observacao: string;
    horaInicio?: number;
    horaFim?: number;
  }  