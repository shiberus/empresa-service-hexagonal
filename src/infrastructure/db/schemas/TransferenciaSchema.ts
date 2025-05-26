import { Schema, model } from "mongoose";

const TransferenciaSchema = new Schema({
  empresaId: { type: String, required: true },
  cuentaDebito: { type: String, required: true },
  cuentaCredito: { type: String, required: true },
  importe: { type: Number, required: true },
  fecha: { type: Date, required: true },
});

export const TransferenciaModel = model("Transferencia", TransferenciaSchema);
