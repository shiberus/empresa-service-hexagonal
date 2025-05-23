import { CUIT } from '../value-objects/CUIT';
import { RazonSocial } from '../value-objects/RazonSocial';

export class Empresa {
  constructor(
    public readonly id: string,
    public readonly cuit: CUIT,
    public readonly razonSocial: RazonSocial,
    public readonly fechaAdhesion: Date
  ) {}

  static crear(id: string, cuit: string, razonSocial: string, fecha: Date): Empresa {
    return new Empresa(
      id,
      new CUIT(cuit),
      new RazonSocial(razonSocial),
      fecha
    );
  }
}