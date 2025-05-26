"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferenciaModel = void 0;
const mongoose_1 = require("mongoose");
const TransferenciaSchema = new mongoose_1.Schema({
    empresaId: { type: String, required: true },
    cuentaDebito: { type: String, required: true },
    cuentaCredito: { type: String, required: true },
    importe: { type: Number, required: true }, // en pesos
    fecha: { type: Date, required: true }
});
exports.TransferenciaModel = (0, mongoose_1.model)('Transferencia', TransferenciaSchema);
