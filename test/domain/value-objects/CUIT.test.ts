import { CUIT } from "../../../src/domain/value-objects/CUIT";

describe('Empresa', () => {
  it('should create a valid empresa', () => {
    const cuit = new CUIT('20123456789');

    expect(cuit.value).toBe('20123456789');
  });

  it('should throw with invalid CUIT', () => {
    expect(() =>
      new CUIT('1234')
    ).toThrow('CUIT inválido');
  });
});