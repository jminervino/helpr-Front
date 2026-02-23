import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Perfil } from '../core/models/pessoa';

const PERFIL_ORDER: Perfil[] = [Perfil.ADMIN, Perfil.CLIENTE, Perfil.TECNICO];

export function selectedPerfils(array: boolean[]): Perfil[] {
  return array
    .map((checked, i) => (checked ? PERFIL_ORDER[i] : null))
    .filter((p): p is Perfil => p !== null);
}
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
