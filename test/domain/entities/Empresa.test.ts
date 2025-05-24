import { Empresa } from '../../../src/domain/entities/Empresa';

describe('Empresa', () => {
  const validCUIT = '20123456789';
  const validRazonSocial = 'Acme Corp';
  const validFecha = new Date();
  const validId = 'some-uuid';
  it('should create a valid Empresa', () => {
    const empresa = Empresa.crear(validId, validCUIT, validRazonSocial, validFecha);
    expect(empresa).toBeInstanceOf(Empresa);
    expect(empresa.id).toBe(validId);
    expect(empresa.cuit.value).toBe(validCUIT);
    expect(empresa.razonSocial.value).toBe(validRazonSocial);
    expect(empresa.fechaAdhesion).toEqual(validFecha);
  });

  it('should throw if id is empty', () => {
    expect(() => Empresa.crear('', validCUIT, validRazonSocial, validFecha))
      .toThrow('El id no puede estar vacío');
  });

  it('should throw if fecha is undefined', () => {
    expect(() => Empresa.crear(validId, validCUIT, validRazonSocial, undefined as any))
      .toThrow('La fecha de adhesión es requerida');
  });

  it('should throw if fecha is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    expect(() => Empresa.crear(validId, validCUIT, validRazonSocial, futureDate))
      .toThrow('La fecha de adhesión no puede ser futura');
  });

  it('should throw with invalid CUIT', () => {
    expect(() =>
      Empresa.crear(validId, '1234', validRazonSocial, validFecha)
    ).toThrow();
  });

  it('should throw with empty razón social', () => {
    expect(() =>
      Empresa.crear(validId, validCUIT, '', validFecha)
    ).toThrow();
  });
});