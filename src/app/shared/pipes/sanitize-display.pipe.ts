import { Pipe, PipeTransform } from '@angular/core';

/** Escapa caracteres HTML en texto mostrado desde inputs/mock (defensa en profundidad) */
@Pipe({ name: 'sanitizeDisplay', standalone: true })
export class SanitizeDisplayPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value == null) return '';
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
