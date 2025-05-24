import { Transferencia } from '../../../src/domain/entities/Transferencia';
import { Cuenta } from '../../../src/domain/value-objects/Cuenta';
import { Importe } from '../../../src/domain/value-objects/Importe';

describe('Transferencia', () => {
  const validEmpresaId = 'abc-123';
  const validCuentaDebito = '0123456789';
  const validCuentaCredito = '9876543210';
  const validImporte = 1000;

  it('should create a Transferencia with valid data', () => {
    const transferencia = Transferencia.crear(
      validEmpresaId,
      validCuentaDebito,
      validCuentaCredito,
      validImporte
    );

    expect(transferencia.empresaId).toBe(validEmpresaId);
    expect(transferencia.cuentaDebito.numero).toBe(validCuentaDebito);
    expect(transferencia.cuentaCredito.numero).toBe(validCuentaCredito);
    expect(transferencia.importe.value).toBe(1000);
    expect(transferencia.fecha).toBeInstanceOf(Date);
  });

  it('should throw if empresaId is empty', () => {
    expect(() => {
      Transferencia.crear(
        '',
        validCuentaDebito,
        validCuentaCredito,
        validImporte
      );
    }).toThrow('El ID de la empresa es requerido.');
  });

  it('should throw if cuentaDebito is invalid', () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        '',
        validCuentaCredito,
        validImporte
      );
    }).toThrow();
  });

  it('should throw if cuentaCredito is invalid', () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        '',
        validImporte
      );
    }).toThrow();
  });

  it('should throw if importe is negative', () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        validCuentaCredito,
        -100
      );
    }).toThrow();
  });

  it('should use current date if no fecha is provided', () => {
    const before = new Date();
    const transferencia = Transferencia.crear(
      validEmpresaId,
      validCuentaDebito,
      validCuentaCredito,
      validImporte
    );
    const after = new Date();

    expect(transferencia.fecha.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(transferencia.fecha.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
