/** Normaliza errores HTTP/RxJS/mock a mensaje legible para el usuario */
export function extraerMensajeError(error: unknown, fallback = 'Ha ocurrido un error.'): string {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message || fallback;

  const e = error as { error?: { mensaje?: string }; mensaje?: string; message?: string };
  return e.error?.mensaje ?? e.mensaje ?? e.message ?? fallback;
}
