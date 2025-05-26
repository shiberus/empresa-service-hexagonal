"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationResult = handleValidationResult;
const express_validator_1 = require("express-validator");
function handleValidationResult(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Errores de validación',
            errors: errors.array()
        });
    }
    next();
}
