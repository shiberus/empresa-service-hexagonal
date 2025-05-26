"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaController = void 0;
const empresa_dto_1 = require("../dto/empresa.dto");
class EmpresaController {
    constructor(adherirEmpresaService, getEmpresasAdheridasService, getEmpresasConTransferenciasService) {
        this.adherirEmpresaService = adherirEmpresaService;
        this.getEmpresasAdheridasService = getEmpresasAdheridasService;
        this.getEmpresasConTransferenciasService = getEmpresasConTransferenciasService;
        this.adherirEmpresa = async (req, res, next) => {
            const { cuit, razonSocial, fechaAdhesion } = req.body;
            const fecha = fechaAdhesion ? new Date(fechaAdhesion) : new Date();
            try {
                const empresaId = await this.adherirEmpresaService.ejecutar(cuit, razonSocial, fecha);
                res.status(201).json({ mensaje: 'Empresa adherida exitosamente', empresaId });
            }
            catch (error) {
                next(error);
            }
        };
        this.getEmpresasAdheridasUltimoMes = async (req, res, next) => {
            try {
                const hoy = new Date();
                const haceUnMes = new Date(hoy);
                haceUnMes.setMonth(haceUnMes.getMonth() - 1);
                const empresas = await this.getEmpresasAdheridasService.ejecutar(haceUnMes, hoy);
                res.json(empresas.map(empresa_dto_1.empresaToDTO));
            }
            catch (error) {
                next(error);
            }
        };
        this.getEmpresasConTransferenciasUltimoMes = async (req, res, next) => {
            try {
                const hoy = new Date();
                const haceUnMes = new Date(hoy);
                haceUnMes.setMonth(haceUnMes.getMonth() - 1);
                const empresas = await this.getEmpresasConTransferenciasService.ejecutar(haceUnMes, hoy);
                res.json(empresas.map(empresa_dto_1.empresaToDTO));
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.EmpresaController = EmpresaController;
