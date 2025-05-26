"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencyInjection_1 = require("../dependencyInjection");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// POST /empresas - Adherir empresa
router.post("/", (0, express_validator_1.body)("cuit")
    .notEmpty()
    .withMessage("El CUIT es requerido.")
    .matches(/^\d{11}$/)
    .withMessage("El CUIT debe tener 11 dígitos numéricos."), (0, express_validator_1.body)("razonSocial").notEmpty().withMessage("La razón social es requerida."), (0, express_validator_1.body)("fechaAdhesion")
    .optional()
    .isISO8601()
    .withMessage("fechaAdhesion debe ser una fecha válida en formato ISO 8601"), dependencyInjection_1.empresaController.adherirEmpresa);
// GET /empresas/adheridas - Empresas adheridas el último mes
router.get("/adheridas", dependencyInjection_1.empresaController.getEmpresasAdheridasUltimoMes);
// GET /empresas/con-transferencias - Empresas que hicieron transferencias el último mes
router.get("/con-transferencias", dependencyInjection_1.empresaController.getEmpresasConTransferenciasUltimoMes);
exports.default = router;
