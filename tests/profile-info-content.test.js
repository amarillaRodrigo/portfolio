import { describe, expect, it } from 'vitest';
import { profileInfoContent } from '../src/data/profileInfoContent';

describe('contenido de perfil para Info', () => {
  it('expone un objeto completo sin placeholders', () => {
    expect(profileInfoContent).toMatchObject({
      resumen: expect.any(String),
      formaDeTrabajar: expect.any(Array),
      stackPrincipal: expect.any(Array),
      microLogros: expect.any(Array),
      lineaPersonal: expect.any(String),
      contacto: expect.objectContaining({
        email: expect.any(String),
        linkedin: expect.any(String),
        github: expect.any(String),
      }),
    });

    const serializado = JSON.stringify(profileInfoContent).toLowerCase();
    expect(serializado).not.toContain('placeholder');
    expect(serializado).not.toContain('example@email.com');
  });

  it('define entre 2 y 3 micro-logros con señal de medición', () => {
    expect(profileInfoContent.microLogros.length).toBeGreaterThanOrEqual(2);
    expect(profileInfoContent.microLogros.length).toBeLessThanOrEqual(3);

    for (const logro of profileInfoContent.microLogros) {
      expect(logro).toMatch(/(\d+%?|\d+x|\d+\s*(ms|s|min|h)|\d+\s*(semanas|meses))/i);
    }
  });

  it('prioriza email como canal principal de contacto', () => {
    expect(profileInfoContent.contacto).toMatchObject({
      primario: 'email',
      email: expect.any(String),
      emailHref: expect.stringMatching(/^mailto:/),
    });
  });
});
