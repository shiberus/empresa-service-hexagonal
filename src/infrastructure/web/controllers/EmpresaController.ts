import { Request, Response, NextFunction } from "express";
import { AdherirEmpresaService } from "../../../application/services/AdherirEmpresaService";
import { GetEmpresasPorFechaAdhesionService } from "../../../application/services/GetEmpresasPorFechaAdhesionService";
import { GetEmpresasConTransferenciasService } from "../../../application/services/GetEmpresasConTransferenciasService";
import { empresaToDTO } from "../dto/empresa.dto";

export class EmpresaController {
  constructor(
    private readonly adherirEmpresaService: AdherirEmpresaService,
    private readonly getEmpresasAdheridasService: GetEmpresasPorFechaAdhesionService,
    private readonly getEmpresasConTransferenciasService: GetEmpresasConTransferenciasService,
  ) {}

  adherirEmpresa = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { cuit, razonSocial, fechaAdhesion } = req.body;
    const fecha = fechaAdhesion ? new Date(fechaAdhesion) : new Date();

    try {
      const empresaId = await this.adherirEmpresaService.ejecutar(
        cuit,
        razonSocial,
        fecha,
      );

      res
        .status(201)
        .json({ mensaje: "Empresa adherida exitosamente", empresaId });
    } catch (error) {
      next(error);
    }
  };

  getEmpresasAdheridasUltimoMes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hoy = new Date();
      const haceUnMes = new Date(hoy);
      haceUnMes.setMonth(haceUnMes.getMonth() - 1);

      const empresas = await this.getEmpresasAdheridasService.ejecutar(
        haceUnMes,
        hoy,
      );
      res.json(empresas.map(empresaToDTO));
    } catch (error) {
      next(error);
    }
  };

  getEmpresasConTransferenciasUltimoMes = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hoy = new Date();
      const haceUnMes = new Date(hoy);
      haceUnMes.setMonth(haceUnMes.getMonth() - 1);

      const empresas = await this.getEmpresasConTransferenciasService.ejecutar(
        haceUnMes,
        hoy,
      );
      res.json(empresas.map(empresaToDTO));
    } catch (error) {
      next(error);
    }
  };
}
