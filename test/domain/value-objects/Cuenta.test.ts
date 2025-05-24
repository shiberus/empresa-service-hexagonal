import { Cuenta } from '../../../src/domain/value-objects/Cuenta';

describe('Cuenta', () => {
  it('should create a valid Cuenta', () => {
    const cuenta = new Cuenta('1234567890');
    expect(cuenta.numero).toBe('1234567890');
    expect(cuenta.toString()).toBe('1234567890');
  });

  it('should throw if the account number is too short', () => {
    expect(() => new Cuenta('12345')).toThrow('Número de cuenta inválido.');
  });

  it('should throw if the account number is too long', () => {
    expect(() => new Cuenta('1'.repeat(21))).toThrow('Número de cuenta inválido.');
  });

  it('should throw if the account number contains letters', () => {
    expect(() => new Cuenta('1234ABC789')).toThrow('Número de cuenta inválido.');
  });

  it('should throw if the account number is empty', () => {
    expect(() => new Cuenta('')).toThrow('Número de cuenta inválido.');
  });

  it('equals should return true for same account number', () => {
    const a = new Cuenta('1234567890');
    const b = new Cuenta('1234567890');
    expect(a.equals(b)).toBe(true);
  });

  it('equals should return false for different account numbers', () => {
    const a = new Cuenta('1234567890');
    const b = new Cuenta('0987654321');
    expect(a.equals(b)).toBe(false);
  });
});