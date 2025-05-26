import { EmpresaRepository } from "../../../domain/repositories/EmpresaRepository";
import { Empresa } from "../../../domain/entities/Empresa";
import { EmpresaModel } from "../schemas/EmpresaSchema";
import { DatabaseError } from "../errors/DatabaseError";

export class MongoEmpresaRepository implements EmpresaRepository {
  async guardar(empresa: Empresa): Promise<void> {
    try {
      await EmpresaModel.create({
        _id: empresa.id,
        cuit: empresa.cuit.value,
        razonSocial: empresa.razonSocial.value,
        fechaAdhesion: empresa.fechaAdhesion,
      });
    } catch (error) {
      throw new DatabaseError("Error al acceder a la base de datos.");
    }
  }

  async getEmpresasPorFechaAdhesion(
    desde: Date,
    hasta: Date,
  ): Promise<Empresa[]> {
    let docs;
    try {
      docs = await EmpresaModel.find({
        fechaAdhesion: { $gte: desde, $lte: hasta },
      }).lean();
    } catch (error) {
      throw new DatabaseError("Error al acceder a la base de datos.");
    }

    return docs.map((doc) =>
      Empresa.crear(
        doc._id,
        doc.cuit,
        doc.razonSocial,
        new Date(doc.fechaAdhesion),
      ),
    );
  }

  async getEmpresasPorIds(ids: string[]): Promise<Empresa[]> {
    let docs;
    try {
      docs = await EmpresaModel.find({ _id: { $in: ids } }).lean();
    } catch (error) {
      throw new DatabaseError("Error al acceder a la base de datos.");
    }

    return docs.map((doc) =>
      Empresa.crear(
        doc._id,
        doc.cuit,
        doc.razonSocial,
        new Date(doc.fechaAdhesion),
      ),
    );
  }

  async cuitEsUnico(cuit: string): Promise<boolean> {
    const exists = await EmpresaModel.exists({ cuit });
    return !exists;
  }
}
