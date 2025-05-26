import { GetEmpresasConTransferenciasService } from "../../../src/application/services/GetEmpresasConTransferenciasService";
import { Empresa } from "../../../src/domain/entities/Empresa";
import { EmpresaRepository } from "../../../src/domain/repositories/EmpresaRepository";
import { Transferencia } from "../../../src/domain/entities/Transferencia";
import { TransferenciaRepository } from "../../../src/domain/repositories/TransferenciaRepository";

describe("GetEmpresasConTransferenciasService", () => {
  it("debe devolver las empresas que hicieron transferencias en un rango de fechas", async () => {
    const transferencia1 = { empresaId: "id1" } as Transferencia;
    const transferencia2 = { empresaId: "id2" } as Transferencia;
    const transferencia3 = { empresaId: "id1" } as Transferencia; // mismo id1 para test de unicidad

    const empresa1 = {} as Empresa;
    const empresa2 = {} as Empresa;

    const mockTransferenciaRepo: TransferenciaRepository = {
      getTransferenciasPorRango: jest
        .fn()
        .mockResolvedValue([transferencia1, transferencia2, transferencia3]),
    };

    const mockEmpresaRepo: EmpresaRepository = {
      getEmpresasPorIds: jest.fn().mockResolvedValue([empresa1, empresa2]),
      getEmpresasPorFechaAdhesion: jest.fn(),
      guardar: jest.fn(),
      cuitEsUnico: jest.fn(),
    };

    const service = new GetEmpresasConTransferenciasService(
      mockTransferenciaRepo,
      mockEmpresaRepo,
    );

    const desde = new Date("2025-04-01");
    const hasta = new Date("2025-04-30");

    const empresas = await service.ejecutar(desde, hasta);

    expect(empresas).toEqual([empresa1, empresa2]);
    expect(
      mockTransferenciaRepo.getTransferenciasPorRango,
    ).toHaveBeenCalledWith(desde, hasta);
    expect(mockEmpresaRepo.getEmpresasPorIds).toHaveBeenCalledWith([
      "id1",
      "id2",
    ]);
  });
});
