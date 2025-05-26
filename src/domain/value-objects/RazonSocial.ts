import { ValidationError } from "../errors/ValidationError";
export class RazonSocial {
  constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new ValidationError("Razón social no puede estar vacía.");
    }
  }

  equals(other: RazonSocial): boolean {
    return this.value === other.value;
  }
}
