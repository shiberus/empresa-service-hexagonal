"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoEmpresaRepository = void 0;
const Empresa_1 = require("../../../domain/entities/Empresa");
const EmpresaSchema_1 = require("../schemas/EmpresaSchema");
const DatabaseError_1 = require("../errors/DatabaseError");
class MongoEmpresaRepository {
    async guardar(empresa) {
        try {
            await EmpresaSchema_1.EmpresaModel.create({
                _id: empresa.id,
                cuit: empresa.cuit.value,
                razonSocial: empresa.razonSocial.value,
                fechaAdhesion: empresa.fechaAdhesion
            });
        }
        catch (error) {
            throw new DatabaseError_1.DatabaseError('Error al acceder a la base de datos.');
        }
    }
    async getEmpresasPorFechaAdhesion(desde, hasta) {
        let docs;
        try {
            docs = await EmpresaSchema_1.EmpresaModel.find({
                fechaAdhesion: { $gte: desde, $lte: hasta }
            }).lean();
        }
        catch (error) {
            throw new DatabaseError_1.DatabaseError('Error al acceder a la base de datos.');
        }
        return docs.map(doc => Empresa_1.Empresa.crear(doc._id, doc.cuit, doc.razonSocial, new Date(doc.fechaAdhesion)));
    }
    async getEmpresasPorIds(ids) {
        let docs;
        try {
            docs = await EmpresaSchema_1.EmpresaModel.find({ _id: { $in: ids } }).lean();
        }
        catch (error) {
            throw new DatabaseError_1.DatabaseError('Error al acceder a la base de datos.');
        }
        return docs.map(doc => Empresa_1.Empresa.crear(doc._id, doc.cuit, doc.razonSocial, new Date(doc.fechaAdhesion)));
    }
}
exports.MongoEmpresaRepository = MongoEmpresaRepository;
