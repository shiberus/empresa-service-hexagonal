import { Empresa } from "../../domain/entities/Empresa";
import { EmpresaRepository } from "../../domain/repositories/EmpresaRepository";

export class GetEmpresasPorFechaAdhesionService {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async ejecutar(desde: Date, hasta: Date): Promise<Empresa[]> {
    return await this.empresaRepository.getEmpresasPorFechaAdhesion(
      desde,
      hasta,
    );
  }
}
