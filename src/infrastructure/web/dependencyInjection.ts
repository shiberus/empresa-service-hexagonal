import { EmpresaController } from "./controllers/EmpresaController";
import { MongoEmpresaRepository } from "./../db/repositories/MongoEmpresaRepository";
import { MongoTransferenciaRepository } from "./../db/repositories/MongoTransferenciaRepository";
import { AdherirEmpresaService } from "./../../application/services/AdherirEmpresaService";
import { GetEmpresasPorFechaAdhesionService } from "./../../application/services/GetEmpresasPorFechaAdhesionService";
import { GetEmpresasConTransferenciasService } from "./../../application/services/GetEmpresasConTransferenciasService";

const empresaRepository = new MongoEmpresaRepository();
const transferenciaRepository = new MongoTransferenciaRepository();

const adherirEmpresaService = new AdherirEmpresaService(empresaRepository);
const getEmpresasAdheridasElUltimoMes = new GetEmpresasPorFechaAdhesionService(
  empresaRepository,
);
const getEmpresasConTransferenciasElUltimoMes =
  new GetEmpresasConTransferenciasService(
    transferenciaRepository,
    empresaRepository,
  );

export const empresaController = new EmpresaController(
  adherirEmpresaService,
  getEmpresasAdheridasElUltimoMes,
  getEmpresasConTransferenciasElUltimoMes,
);
