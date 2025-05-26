import { TransferenciaRepository } from "../../../domain/repositories/TransferenciaRepository";
import { Transferencia } from "../../../domain/entities/Transferencia";
import { TransferenciaModel } from "../schemas/TransferenciaSchema";
import { DatabaseError } from "../errors/DatabaseError";

export class MongoTransferenciaRepository implements TransferenciaRepository {
  async getTransferenciasPorRango(
    desde: Date,
    hasta: Date,
  ): Promise<Transferencia[]> {
    let docs;

    try {
      docs = await TransferenciaModel.find({
        fecha: { $gte: desde, $lte: hasta },
      }).lean();
    } catch (error) {
      throw new DatabaseError("Error al acceder a la base de datos.");
    }

    return docs.map((doc) =>
      Transferencia.crear(
        doc.empresaId,
        doc.cuentaDebito,
        doc.cuentaCredito,
        doc.importe,
        new Date(doc.fecha),
      ),
    );
  }
}
