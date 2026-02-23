export interface Pessoa {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  // Campo da API: "perfils" (mantido por compatibilidade com backend)
  perfils: Perfil[] | string[];
  dataCriacao?: string;
}

export interface Cliente extends Pessoa {}

export interface Tecnico extends Pessoa {}

export enum Perfil {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  TECNICO = 'TECNICO',
}
