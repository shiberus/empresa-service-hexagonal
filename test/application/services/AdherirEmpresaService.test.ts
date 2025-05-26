import { AdherirEmpresaService } from "../../../src/application/services/AdherirEmpresaService";
import { EmpresaRepository } from "../../../src/domain/repositories/EmpresaRepository";
import { Empresa } from "../../../src/domain/entities/Empresa";
import { ValidationError } from "../../../src/domain/errors/ValidationError";

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

describe("AdherirEmpresaService", () => {
  const mockEmpresaRepository: jest.Mocked<EmpresaRepository> = {
    guardar: jest.fn(),
    getEmpresasPorFechaAdhesion: jest.fn(),
    getEmpresasPorIds: jest.fn(),
    cuitEsUnico: jest.fn().mockResolvedValue(true),
  };

  const service = new AdherirEmpresaService(mockEmpresaRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and save a valid empresa", async () => {
    const cuit = "20123456789";
    const razonSocial = "Empresa S.A.";
    const fecha = new Date();

    const id = await service.ejecutar(cuit, razonSocial, fecha);

    expect(id).toBe("mock-uuid");
    expect(mockEmpresaRepository.guardar).toHaveBeenCalledTimes(1);

    const savedEmpresa = (mockEmpresaRepository.guardar as jest.Mock).mock
      .calls[0][0];
    expect(savedEmpresa).toBeInstanceOf(Empresa);
    expect(savedEmpresa.id).toBe("mock-uuid");
    expect(savedEmpresa.cuit.value).toBe(cuit);
    expect(savedEmpresa.razonSocial.value).toBe(razonSocial);
    expect(savedEmpresa.fechaAdhesion).toEqual(fecha);
  });

  it("should throw if the empresa has invalid data", async () => {
    const invalidCuit = "123";
    const razonSocial = "Empresa S.A.";
    const fecha = new Date();

    await expect(
      service.ejecutar(invalidCuit, razonSocial, fecha),
    ).rejects.toThrow("CUIT inválido");

    expect(mockEmpresaRepository.guardar).not.toHaveBeenCalled();
  });

  it("should call cuitEsUnico with the provided CUIT", async () => {
    mockEmpresaRepository.cuitEsUnico.mockResolvedValue(true);

    await service.ejecutar("20304050607", "Empresa S.A.", new Date());

    expect(mockEmpresaRepository.cuitEsUnico).toHaveBeenCalledWith(
      "20304050607",
    );
  });

  it("should throw a ValidationError if CUIT is not unique", async () => {
    mockEmpresaRepository.cuitEsUnico.mockResolvedValue(false);

    await expect(
      service.ejecutar("20304050607", "Empresa S.A.", new Date()),
    ).rejects.toThrow(ValidationError);

    expect(mockEmpresaRepository.cuitEsUnico).toHaveBeenCalledWith(
      "20304050607",
    );
    expect(mockEmpresaRepository.guardar).not.toHaveBeenCalled();
  });
});
