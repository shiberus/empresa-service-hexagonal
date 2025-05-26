import { ValidationError } from "../errors/ValidationError";
export class Importe {
  private readonly _centavos: number;

  constructor(pesos: number) {
    if (isNaN(pesos) || pesos <= 0) {
      throw new ValidationError(
        "El importe debe ser un número positivo mayor a 0.",
      );
    }

    // Se convierte a centavos para evadir el manejo de decimales
    this._centavos = Math.round(pesos * 100);
  }

  get centavos(): number {
    return this._centavos;
  }

  get value(): number {
    return this._centavos / 100;
  }

  equals(other: Importe): boolean {
    return this._centavos === other._centavos;
  }

  toString(): string {
    return `$${this.value.toFixed(2)}`;
  }
}
