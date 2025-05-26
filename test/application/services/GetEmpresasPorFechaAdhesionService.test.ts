import { Empresa } from "../../../src/domain/entities/Empresa";
import { EmpresaRepository } from "../../../src/domain/repositories/EmpresaRepository";
import { GetEmpresasPorFechaAdhesionService } from "../../../src/application/services/GetEmpresasPorFechaAdhesionService";

describe("GetEmpresasPorFechaAdhesionService", () => {
  it("debería devolver las empresas adheridas entre dos fechas", async () => {
    const empresa1 = {} as Empresa;
    const empresa2 = {} as Empresa;

    const mockRepo: EmpresaRepository = {
      getEmpresasPorFechaAdhesion: jest
        .fn()
        .mockResolvedValue([empresa1, empresa2]),
      guardar: jest.fn(),
      getEmpresasPorIds: jest.fn(),
      cuitEsUnico: jest.fn(),
    };

    const service = new GetEmpresasPorFechaAdhesionService(mockRepo);

    const desde = new Date("2025-04-01");
    const hasta = new Date("2025-04-30");

    const empresas = await service.ejecutar(desde, hasta);

    expect(empresas).toEqual([empresa1, empresa2]);
    expect(mockRepo.getEmpresasPorFechaAdhesion).toHaveBeenCalledWith(
      desde,
      hasta,
    );
  });
});
