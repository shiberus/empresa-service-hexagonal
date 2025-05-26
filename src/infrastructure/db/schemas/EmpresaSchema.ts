import { Schema, model } from "mongoose";

const EmpresaSchema = new Schema({
  _id: { type: String, required: true },
  cuit: { type: String, required: true, unique: true },
  razonSocial: { type: String, required: true },
  fechaAdhesion: { type: Date, required: true },
});

export const EmpresaModel = model("Empresa", EmpresaSchema);
