import { Empresa } from '../entities/Empresa';

export interface EmpresaRepository {
  guardar(empresa: Empresa): Promise<void>;
  obtenerEmpresasAdheridasDesde(fecha: Date): Promise<Empresa[]>;
  obtenerEmpresasPorCuits(cuits: string[]): Promise<Empresa[]>;
}
