"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmpresasConTransferenciasService = void 0;
class GetEmpresasConTransferenciasService {
    constructor(transferenciaRepository, empresaRepository) {
        this.transferenciaRepository = transferenciaRepository;
        this.empresaRepository = empresaRepository;
    }
    async ejecutar(desde, hasta) {
        const transferencias = await this.transferenciaRepository.getTransferenciasPorRango(desde, hasta);
        const empresaIdsUnicos = [...new Set(transferencias.map(t => t.empresaId))];
        const empresas = await this.empresaRepository.getEmpresasPorIds(empresaIdsUnicos);
        return empresas;
    }
}
exports.GetEmpresasConTransferenciasService = GetEmpresasConTransferenciasService;
