"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTransferenciaRepository = void 0;
const Transferencia_1 = require("../../../domain/entities/Transferencia");
const TransferenciaSchema_1 = require("../schemas/TransferenciaSchema");
const DatabaseError_1 = require("../errors/DatabaseError");
class MongoTransferenciaRepository {
    async getTransferenciasPorRango(desde, hasta) {
        let docs;
        try {
            docs = await TransferenciaSchema_1.TransferenciaModel.find({
                fecha: { $gte: desde, $lte: hasta }
            }).lean();
        }
        catch (error) {
            throw new DatabaseError_1.DatabaseError('Error al acceder a la base de datos.');
        }
        return docs.map(doc => Transferencia_1.Transferencia.crear(doc.empresaId, doc.cuentaDebito, doc.cuentaCredito, doc.importe, new Date(doc.fecha)));
    }
}
exports.MongoTransferenciaRepository = MongoTransferenciaRepository;
