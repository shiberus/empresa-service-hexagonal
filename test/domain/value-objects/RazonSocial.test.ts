import { RazonSocial } from '../../../src/domain/value-objects/RazonSocial';

describe('Empresa', () => {
  it('should create a valid razon social', () => {
    const razonSocial = new RazonSocial('Mi Empresa S.A.');
    expect(razonSocial.value).toBe('Mi Empresa S.A.');
  });

  it('should throw with empty razón social', () => {
    expect(() =>
      new RazonSocial('')
    ).toThrow('Razón social no puede estar vacía.');
  });
});