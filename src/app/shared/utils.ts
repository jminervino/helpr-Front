import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Perfil } from '../core/models/pessoa';

const PERFIL_ORDER: Perfil[] = [Perfil.ADMIN, Perfil.CLIENTE, Perfil.TECNICO];

/** Backend: ADMIN=0, CLIENTE=1, TECNICO=2. Converte checkboxes [Admin, Cliente, Tecnico] em números. */
export function perfilsToBackend(checked: boolean[]): number[] {
  return checked.map((c, i) => (c ? i : -1)).filter((n) => n >= 0);
}

/** Converte array de números (resposta da API) em [Admin, Cliente, Tecnico] para o form. */
export function profileCheckedFromNumbers(perfils: number[]): boolean[] {
  return [
    perfils.includes(0),
    perfils.includes(1),
    perfils.includes(2),
  ];
}

export function selectedPerfils(array: boolean[]): Perfil[] {
  return array
    .map((checked, i) => (checked ? PERFIL_ORDER[i] : null))
    .filter((p): p is Perfil => p !== null);
}

/** Para APIs que retornam perfils como string[] (ex.: pessoa por email). */
export function profileChecked(array: string[]): boolean[] {
  return [
    array.includes('ADMIN'),
    array.includes('CLIENTE'),
    array.includes('TECNICO'),
  ];
}

export function someTrue(control: AbstractControl): ValidationErrors | null {
  return !control.value.some((v: boolean) => v) ? { sometrue: true } : null;
}

// ---------------------------------------------------------------------------
// Prioridade / Status — conversão string ↔ inteiro para o backend
// Backend: BAIXA=0, MEDIA=1, ALTA=2 | ABERTO=0, ANDAMENTO=1, ENCERRADO=2
// ---------------------------------------------------------------------------

const PRIORIDADE_TO_INT: Record<string, number> = { BAIXA: 0, MEDIA: 1, ALTA: 2 };
const PRIORIDADE_FROM_INT: Record<number, string> = { 0: 'BAIXA', 1: 'MEDIA', 2: 'ALTA' };
const STATUS_TO_INT: Record<string, number> = { ABERTO: 0, ANDAMENTO: 1, ENCERRADO: 2 };
const STATUS_FROM_INT: Record<number, string> = { 0: 'ABERTO', 1: 'ANDAMENTO', 2: 'ENCERRADO' };

export function prioridadeToBackend(value: string): number {
  return PRIORIDADE_TO_INT[value] ?? 0;
}

export function prioridadeFromBackend(value: number | string): string {
  if (typeof value === 'string') return value;
  return PRIORIDADE_FROM_INT[value] ?? 'BAIXA';
}

export function statusToBackend(value: string): number {
  return STATUS_TO_INT[value] ?? 0;
}

export function statusFromBackend(value: number | string): string {
  if (typeof value === 'string') return value;
  return STATUS_FROM_INT[value] ?? 'ABERTO';
}
