"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAdherirEmpresa = void 0;
const express_validator_1 = require("express-validator");
exports.validarAdherirEmpresa = [
    (0, express_validator_1.body)('cuit')
        .notEmpty().withMessage('El CUIT es requerido.')
        .matches(/^\d{11}$/).withMessage('El CUIT debe tener 11 dígitos numéricos.'),
    (0, express_validator_1.body)('razonSocial').notEmpty().withMessage('La razón social es requerida.'),
    (0, express_validator_1.body)('fechaAdhesion')
        .optional()
        .isISO8601().withMessage('fechaAdhesion debe ser una fecha válida en formato ISO 8601'),
];
