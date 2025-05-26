"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdherirEmpresaService = void 0;
const Empresa_1 = require("../../domain/entities/Empresa");
const uuid_1 = require("uuid");
class AdherirEmpresaService {
    constructor(empresaRepository) {
        this.empresaRepository = empresaRepository;
    }
    /**
     * Guarda una empresa en la base de datos.
     * @throws {ValidationError} Si los datos de la empresa no son válidos.
     */
    async ejecutar(cuit, razonSocial, fechaAdhesion) {
        const id = (0, uuid_1.v4)();
        const empresa = Empresa_1.Empresa.crear(id, cuit, razonSocial, fechaAdhesion);
        await this.empresaRepository.guardar(empresa);
        return empresa.id;
    }
}
exports.AdherirEmpresaService = AdherirEmpresaService;
