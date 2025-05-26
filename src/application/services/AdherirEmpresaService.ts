import { Empresa } from "../../domain/entities/Empresa";
import { ValidationError } from "../../domain/errors/ValidationError";
import { EmpresaRepository } from "../../domain/repositories/EmpresaRepository";
import { v4 as uuidv4 } from "uuid";

export class AdherirEmpresaService {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  /**
   * Guarda una empresa en la base de datos.
   * @throws {ValidationError} Si los datos de la empresa no son válidos.
   */
  async ejecutar(
    cuit: string,
    razonSocial: string,
    fechaAdhesion: Date,
  ): Promise<string> {
    const cuitEsUnico = await this.empresaRepository.cuitEsUnico(cuit);
    if (!cuitEsUnico) {
      throw new ValidationError("El CUIT ya existe en el sistema.");
    }
    const id = uuidv4();
    const empresa = Empresa.crear(id, cuit, razonSocial, fechaAdhesion);
    await this.empresaRepository.guardar(empresa);
    return empresa.id;
  }
}
