import { Importe } from "../../../src/domain/value-objects/Importe";

describe("Importe", () => {
  it("should create a valid Importe from pesos", () => {
    const importe = new Importe(123.45);
    expect(importe.centavos).toBe(12345);
    expect(importe.value).toBeCloseTo(123.45, 2);
    expect(importe.toString()).toBe("$123.45");
  });

  it("should round to nearest centavo", () => {
    const importe = new Importe(0.015); // rounds to 2 centavos
    expect(importe.centavos).toBe(2);
    expect(importe.value).toBeCloseTo(0.02, 2);
  });

  it("should throw on 0", () => {
    expect(() => new Importe(0)).toThrow(
      "El importe debe ser un número positivo mayor a 0.",
    );
  });

  it("should throw on negative value", () => {
    expect(() => new Importe(-5)).toThrow(
      "El importe debe ser un número positivo mayor a 0.",
    );
  });

  it("should throw on NaN", () => {
    expect(() => new Importe(NaN)).toThrow(
      "El importe debe ser un número positivo mayor a 0.",
    );
  });

  it("equals should return true for equal centavos", () => {
    const a = new Importe(99.99);
    const b = new Importe(99.99);
    expect(a.equals(b)).toBe(true);
  });

  it("equals should return false for different values", () => {
    const a = new Importe(100);
    const b = new Importe(99.99);
    expect(a.equals(b)).toBe(false);
  });
});
