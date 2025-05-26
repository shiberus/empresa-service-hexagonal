import { Empresa } from "../../../domain/entities/Empresa";

export function empresaToDTO(empresa: Empresa) {
  return {
    id: empresa.id,
    cuit: empresa.cuit.value,
    razonSocial: empresa.razonSocial.value,
    fechaAdhesion: empresa.fechaAdhesion.toISOString(),
  };
}
