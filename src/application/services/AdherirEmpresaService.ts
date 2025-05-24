import { Empresa } from "../../domain/entities/Empresa";
import { EmpresaRepository } from "../../domain/repositories/EmpresaRepository";
import { v4 as uuidv4 } from "uuid";

export class AdherirEmpresaService {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async ejecutar(cuit: string, razonSocial: string, fechaAdhesion: Date): Promise<string> {
    const id = uuidv4();
    const empresa = Empresa.crear(id, cuit, razonSocial, fechaAdhesion);
    await this.empresaRepository.guardar(empresa);
    return empresa.id;
  }
}