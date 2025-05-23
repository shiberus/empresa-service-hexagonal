export class RazonSocial {
  constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new Error('Razón social no puede estar vacía.');
    }
  }

  equals(other: RazonSocial): boolean {
    return this.value === other.value;
  }
}
