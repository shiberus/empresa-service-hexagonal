import { body } from "express-validator";

export const validarAdherirEmpresa = [
  body("cuit")
    .notEmpty()
    .withMessage("El CUIT es requerido.")
    .matches(/^\d{11}$/)
    .withMessage("El CUIT debe tener 11 dígitos numéricos."),
  body("razonSocial").notEmpty().withMessage("La razón social es requerida."),
  body("fechaAdhesion")
    .optional()
    .isISO8601()
    .withMessage("fechaAdhesion debe ser una fecha válida en formato ISO 8601"),
];
