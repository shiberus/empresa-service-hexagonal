export class Cuenta {
  private readonly _numero: string;

  constructor(numero: string) {
    if (!numero || !/^\d{10,20}$/.test(numero)) {
      // Solo digitos, longitud entre 10 y 20 caracteres
      throw new Error('Número de cuenta inválido.');
    }
    this._numero = numero;
  }

  get numero(): string {
    return this._numero;
  }

  equals(other: Cuenta): boolean {
    return this._numero === other._numero;
  }

  toString(): string {
    return this._numero;
  }
}
