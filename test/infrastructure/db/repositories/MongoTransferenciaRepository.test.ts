import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { TransferenciaModel } from "../../../../src/infrastructure/db/schemas/TransferenciaSchema";
import { MongoTransferenciaRepository } from "../../../../src/infrastructure/db/repositories/MongoTransferenciaRepository";
import { Transferencia } from "../../../../src/domain/entities/Transferencia";
import { DatabaseError } from "../../../../src/infrastructure/db/errors/DatabaseError";

describe("MongoTransferenciaRepository", () => {
  let mongoServer: MongoMemoryServer;
  let repository: MongoTransferenciaRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
    repository = new MongoTransferenciaRepository();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await TransferenciaModel.deleteMany({});
  });

  it("should fetch transferencias between dates", async () => {
    const t1 = new TransferenciaModel({
      empresaId: "empresa-1",
      cuentaDebito: "1234567890",
      cuentaCredito: "0987654321",
      importe: 1500,
      fecha: new Date("2024-04-15"),
    });
    const t2 = new TransferenciaModel({
      empresaId: "empresa-2",
      cuentaDebito: "1111222233",
      cuentaCredito: "3333222211",
      importe: 2500,
      fecha: new Date("2024-05-01"),
    });

    await t1.save();
    await t2.save();

    const result: Transferencia[] = await repository.getTransferenciasPorRango(
      new Date("2024-04-01"),
      new Date("2024-04-30")
    );

    expect(result).toHaveLength(1);
    expect(result[0].empresaId).toBe("empresa-1");
  });
  it("throws DatabaseError when Mongoose throws", async () => {
    jest.spyOn(TransferenciaModel, "find").mockReturnValueOnce({
      lean: () => Promise.reject(new DatabaseError("Mongo Error")),
    } as any);

    const desde = new Date("2023-04-01");
    const hasta = new Date("2023-04-30");
    await expect(
      repository.getTransferenciasPorRango(desde, hasta)
    ).rejects.toThrow(DatabaseError);
  });
});
