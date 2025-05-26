"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUIT = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class CUIT {
    constructor(value) {
        this.value = value;
        if (!/^\d{11}$/.test(value)) {
            throw new ValidationError_1.ValidationError('CUIT inválido. Debe tener 11 dígitos numéricos.');
        }
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.CUIT = CUIT;
