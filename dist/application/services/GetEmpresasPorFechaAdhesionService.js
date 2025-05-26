"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmpresasPorFechaAdhesionService = void 0;
class GetEmpresasPorFechaAdhesionService {
    constructor(empresaRepository) {
        this.empresaRepository = empresaRepository;
    }
    async ejecutar(desde, hasta) {
        return await this.empresaRepository.getEmpresasPorFechaAdhesion(desde, hasta);
    }
}
exports.GetEmpresasPorFechaAdhesionService = GetEmpresasPorFechaAdhesionService;
