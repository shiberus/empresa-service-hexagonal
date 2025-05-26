"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaModel = void 0;
const mongoose_1 = require("mongoose");
const EmpresaSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    cuit: { type: String, required: true },
    razonSocial: { type: String, required: true },
    fechaAdhesion: { type: Date, required: true }
});
exports.EmpresaModel = (0, mongoose_1.model)('Empresa', EmpresaSchema);
