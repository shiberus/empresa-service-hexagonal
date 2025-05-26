import { Transferencia } from "../../../src/domain/entities/Transferencia";

describe("Transferencia", () => {
  const validEmpresaId = "abc-123";
  const validCuentaDebito = "0123456789";
  const validCuentaCredito = "9876543210";
  const validImporte = 1000;
  const validFecha = new Date();

  it("should create a Transferencia with valid data", () => {
    const transferencia = Transferencia.crear(
      validEmpresaId,
      validCuentaDebito,
      validCuentaCredito,
      validImporte,
      validFecha,
    );

    expect(transferencia.empresaId).toBe(validEmpresaId);
    expect(transferencia.cuentaDebito.numero).toBe(validCuentaDebito);
    expect(transferencia.cuentaCredito.numero).toBe(validCuentaCredito);
    expect(transferencia.importe.value).toBe(1000);
    expect(transferencia.fecha).toBeInstanceOf(Date);
  });

  it("should throw if empresaId is empty", () => {
    expect(() => {
      Transferencia.crear(
        "",
        validCuentaDebito,
        validCuentaCredito,
        validImporte,
        validFecha,
      );
    }).toThrow("El ID de la empresa es requerido.");
  });

  it("should throw if cuentaDebito is invalid", () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        "",
        validCuentaCredito,
        validImporte,
        validFecha,
      );
    }).toThrow();
  });

  it("should throw if cuentaCredito is invalid", () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        "",
        validImporte,
        validFecha,
      );
    }).toThrow();
  });

  it("should throw if importe is negative", () => {
    expect(() => {
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        validCuentaCredito,
        -100,
        validFecha,
      );
    }).toThrow();
  });

  it("should throw if fecha is undefined", () => {
    expect(() =>
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        validCuentaCredito,
        validImporte,
        undefined as any,
      ),
    ).toThrow("La fecha de la transferencia es requerida");
  });

  it("should throw if fecha is in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    expect(() =>
      Transferencia.crear(
        validEmpresaId,
        validCuentaDebito,
        validCuentaCredito,
        validImporte,
        futureDate,
      ),
    ).toThrow("La fecha de la transferencia no puede ser futura");
  });
});
