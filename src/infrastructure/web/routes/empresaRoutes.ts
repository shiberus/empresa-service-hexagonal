import { Router } from "express";
import { empresaController } from "../dependencyInjection";
import { body } from "express-validator";

const router = Router();

// POST /empresas - Adherir empresa
router.post(
  "/",
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
  empresaController.adherirEmpresa,
);

// GET /empresas/adheridas - Empresas adheridas el último mes
router.get("/adheridas", empresaController.getEmpresasAdheridasUltimoMes);

// GET /empresas/con-transferencias - Empresas que hicieron transferencias el último mes
router.get(
  "/con-transferencias",
  empresaController.getEmpresasConTransferenciasUltimoMes,
);

export default router;
