import { Empresa } from "../../domain/entities/Empresa";
import { EmpresaRepository } from "../../domain/repositories/EmpresaRepository";
import { TransferenciaRepository } from "../../domain/repositories/TransferenciaRepository";

export class GetEmpresasConTransferenciasService {
  constructor(
    private readonly transferenciaRepository: TransferenciaRepository,
    private readonly empresaRepository: EmpresaRepository,
  ) {}

  async ejecutar(desde: Date, hasta: Date): Promise<Empresa[]> {
    const transferencias =
      await this.transferenciaRepository.getTransferenciasPorRango(
        desde,
        hasta,
      );

    const empresaIdsUnicos = [
      ...new Set(transferencias.map((t) => t.empresaId)),
    ];
    const empresas =
      await this.empresaRepository.getEmpresasPorIds(empresaIdsUnicos);

    return empresas;
  }
}
