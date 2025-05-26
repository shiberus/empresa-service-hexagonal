import { Empresa } from "../entities/Empresa";

export interface EmpresaRepository {
  guardar(empresa: Empresa): Promise<void>;
  getEmpresasPorFechaAdhesion(desde: Date, hasta: Date): Promise<Empresa[]>;
  getEmpresasPorIds(ids: string[]): Promise<Empresa[]>;
  cuitEsUnico(cuit: string): Promise<boolean>;
}
