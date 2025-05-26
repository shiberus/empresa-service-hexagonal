"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazonSocial = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class RazonSocial {
    constructor(value) {
        this.value = value;
        if (value.trim().length === 0) {
            throw new ValidationError_1.ValidationError('Razón social no puede estar vacía.');
        }
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.RazonSocial = RazonSocial;
