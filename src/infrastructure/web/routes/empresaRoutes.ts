import { Router } from "express";
import { empresaController } from "../dependencyInjection";
import { body } from "express-validator";

const router = Router();

/**
 * @swagger
 * /empresas/adherir:
 *   post:
 *     summary: Registra una nueva empresa en el sistema
 *     description: Adhiere una nueva empresa. El CUIT debe ser único. Si no se especifica una fecha de adhesión, se usará la fecha actual. No se permite registrar empresas con fechas futuras.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmpresaInput'
 *     responses:
 *       201:
 *         description: Empresa adherida correctamente
 *       400:
 *         description: Error de validación
 */
router.post(
  "/adherir",
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

/**
 * @swagger
 * /empresas/adheridas:
 *   get:
 *     summary: Obtiene las empresas adheridas en el último mes
 *     description: Retorna una lista de empresas que se adhirieron desde la misma fecha del mes anterior hasta hoy.
 *     responses:
 *       200:
 *         description: Lista de empresas adheridas recientemente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmpresaOutput'
 */
router.get("/adheridas", empresaController.getEmpresasAdheridasUltimoMes);

/**
 * @swagger
 * /empresas/con-transferencias:
 *   get:
 *     summary: Obtiene las empresas con transferencias en el último mes
 *     description: Retorna una lista de empresas que realizaron transferencias desde la misma fecha del mes anterior hasta hoy.
 *     responses:
 *       200:
 *         description: Lista de empresas con transferencias recientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmpresaOutput'
 */
router.get(
  "/con-transferencias",
  empresaController.getEmpresasConTransferenciasUltimoMes,
);

export default router;
