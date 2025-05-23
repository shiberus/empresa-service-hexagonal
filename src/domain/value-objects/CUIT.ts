export class CUIT {
  constructor(public readonly value: string) {
    if (!/^\d{11}$/.test(value)) {
      throw new Error('CUIT inválido. Debe tener 11 dígitos numéricos.');
    }
  }

  equals(other: CUIT): boolean {
    return this.value === other.value;
  }
}
