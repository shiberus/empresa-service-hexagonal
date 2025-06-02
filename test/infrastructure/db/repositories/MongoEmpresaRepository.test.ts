import { MongoEmpresaRepository } from "../../../../src/infrastructure/db/repositories/MongoEmpresaRepository";
import { EmpresaModel } from "../../../../src/infrastructure/db/schemas/EmpresaSchema";
import { Empresa } from "../../../../src/domain/entities/Empresa";
import { DatabaseError } from "../../../../src/infrastructure/db/errors/DatabaseError";

jest.mock("../../../../src/infrastructure/db/schemas/EmpresaSchema");

describe("MongoEmpresaRepository", () => {
  let repo: MongoEmpresaRepository;

  beforeEach(() => {
    repo = new MongoEmpresaRepository();
    jest.clearAllMocks();
  });

  describe("guardar", () => {
    it("should call create with correct parameters", async () => {
      const mockUpdate = jest.spyOn(EmpresaModel, "create");

      const empresa = Empresa.crear(
        "uuid-123",
        "20304050607",
        "Empresa S.A.",
        new Date("2023-05-01"),
      );

      await repo.guardar(empresa);

      expect(mockUpdate).toHaveBeenCalledWith({
        _id: empresa.id,
        cuit: empresa.cuit.value,
        razonSocial: empresa.razonSocial.value,
        fechaAdhesion: empresa.fechaAdhesion,
      });
    });

    it('should throw DatabaseError when create fails', async () => {
      jest.spyOn(EmpresaModel, 'create').mockRejectedValueOnce(new Error('Mongo error'));

      const empresa = Empresa.crear(
        'uuid-123',
        '20304050607',
        'Empresa S.A.',
        new Date('2023-05-01')
      );

      await expect(repo.guardar(empresa)).rejects.toThrow(DatabaseError);
    });
  });

  describe("getEmpresasPorFechaAdhesion", () => {
    it("should return an array of Empresa objects", async () => {
      const fakeDocs = [
        {
          _id: "uuid-1",
          cuit: "20304050607",
          razonSocial: "Empresa Uno",
          fechaAdhesion: new Date("2023-04-15"),
        },
        {
          _id: "uuid-2",
          cuit: "30102030405",
          razonSocial: "Empresa Dos",
          fechaAdhesion: new Date("2023-04-20"),
        },
      ];

      jest.spyOn(EmpresaModel, "find").mockReturnValueOnce({
        lean: () => Promise.resolve(fakeDocs),
      } as any);

      const desde = new Date("2023-04-01");
      const hasta = new Date("2023-04-30");

      const empresas = await repo.getEmpresasPorFechaAdhesion(desde, hasta);

      expect(empresas.length).toBe(2);
      expect(empresas[0]).toBeInstanceOf(Empresa);
      expect(empresas[0].id).toBe("uuid-1");
      expect(empresas[0].cuit.value).toBe("20304050607");
      expect(empresas[1].razonSocial.value).toBe("Empresa Dos");
    });
    it('throws DatabaseError when Mongoose throws', async () => {
      jest.spyOn(EmpresaModel, 'find').mockReturnValueOnce({
        lean: () => Promise.reject(new DatabaseError("Mongo Error")),
      } as any);

      const desde = new Date("2023-04-01");
      const hasta = new Date("2023-04-30");
      await expect(repo.getEmpresasPorFechaAdhesion(desde, hasta)).rejects.toThrow(DatabaseError);
    });
  });

  describe("getEmpresasPorIds", () => {
    it("should return an array of Empresa objects for given IDs", async () => {
      const fakeDocs = [
        {
          _id: "uuid-3",
          cuit: "50607080901",
          razonSocial: "Empresa Tres",
          fechaAdhesion: new Date("2023-03-10"),
        },
      ];

      jest.spyOn(EmpresaModel, "find").mockReturnValue({
        lean: () => Promise.resolve(fakeDocs),
      } as any);

      const ids = ["uuid-3"];

      const empresas = await repo.getEmpresasPorIds(ids);

      expect(empresas.length).toBe(1);
      expect(empresas[0].id).toBe("uuid-3");
      expect(empresas[0]).toBeInstanceOf(Empresa);
    });
     it('throws DatabaseError when Mongoose throws', async () => {
      jest.spyOn(EmpresaModel, 'find').mockReturnValueOnce({
        lean: () => Promise.reject(new DatabaseError("Mongo Error")),
      } as any);

      await expect(repo.getEmpresasPorIds(['some-id'])).rejects.toThrow(DatabaseError);
    });
  });

  describe("cuitEsUnico", () => {
    it("should return true if no company exists with given CUIT", async () => {
      const spy = jest.spyOn(EmpresaModel, "exists").mockResolvedValue(null);

      const result = await repo.cuitEsUnico("20304050607");

      expect(result).toBe(true);
      expect(spy).toHaveBeenCalledWith({ cuit: "20304050607" });
    });

    it("should return false if a company exists with the given CUIT", async () => {
      const spy = jest
        .spyOn(EmpresaModel, "exists")
        .mockResolvedValue({ _id: "someid" });

      const result = await repo.cuitEsUnico("20304050607");

      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith({ cuit: "20304050607" });
    });
  });
});
