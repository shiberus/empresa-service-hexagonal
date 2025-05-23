export interface TransferenciaRepository {
  obtenerEmpresaIdsQueTransfirieronDesde(fecha: Date): Promise<string[]>;
}
