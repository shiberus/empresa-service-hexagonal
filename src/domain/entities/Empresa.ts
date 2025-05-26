import { CUIT } from "../value-objects/CUIT";
import { RazonSocial } from "../value-objects/RazonSocial";
import { ValidationError } from "../errors/ValidationError";

export class Empresa {
  constructor(
    public readonly id: string,
    public readonly cuit: CUIT,
    public readonly razonSocial: RazonSocial,
    public readonly fechaAdhesion: Date,
  ) {}

  static crear(
    id: string,
    cuit: string,
    razonSocial: string,
    fecha: Date,
  ): Empresa {
    if (!id || id.trim() === "") {
      throw new ValidationError("El id no puede estar vacío");
    }

    if (!fecha) {
      throw new ValidationError("La fecha de adhesión es requerida");
    }

    const now = new Date();
    if (fecha.getTime() > now.getTime()) {
      throw new ValidationError("La fecha de adhesión no puede ser futura");
    }

    return new Empresa(id, new CUIT(cuit), new RazonSocial(razonSocial), fecha);
  }
}
