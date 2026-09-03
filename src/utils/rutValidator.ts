/**
 * Validador y formateador de RUT chileno según algoritmo Módulo 11
 */

export function cleanRUT(rut: string): string {
  return typeof rut === 'string' ? rut.replace(/[^0-9kK]/g, '').toUpperCase() : '';
}

export function formatRUT(rut: string): string {
  const clean = cleanRUT(rut);
  if (!clean) return '';
  if (clean.length === 1) return clean;

  const dv = clean.slice(-1);
  const cuerpo = clean.slice(0, -1);

  // Formato con puntos y guión: 12.345.678-K
  const formattedCuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedCuerpo}-${dv}`;
}

export function validateRUT(rut: string): { isValid: boolean; message: string } {
  const clean = cleanRUT(rut);
  
  if (!clean) {
    return { isValid: false, message: 'El RUT es obligatorio' };
  }

  if (clean.length < 8 || clean.length > 9) {
    return { isValid: false, message: 'Longitud de RUT inválida (ej. 76.123.456-K)' };
  }

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();

  // Calcular Dígito Verificador mediante Módulo 11
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperadoCalculado = 11 - (suma % 11);
  let dvEsperado = '';

  if (dvEsperadoCalculado === 11) {
    dvEsperado = '0';
  } else if (dvEsperadoCalculado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = dvEsperadoCalculado.toString();
  }

  if (dv !== dvEsperado) {
    return { isValid: false, message: 'Dígito verificador incorrecto' };
  }

  return { isValid: true, message: 'RUT válido' };
}

export function isCorporateEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const commonFreeDomains = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'live.com',
    'icloud.com',
    'mail.com',
    'proton.me',
    'protonmail.com'
  ];
  const domain = email.split('@')[1]?.toLowerCase().trim();
  return !commonFreeDomains.includes(domain);
}
