"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importe = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class Importe {
    constructor(pesos) {
        if (isNaN(pesos) || pesos <= 0) {
            throw new ValidationError_1.ValidationError('El importe debe ser un número positivo mayor a 0.');
        }
        // Se convierte a centavos para evadir el manejo de decimales
        this._centavos = Math.round(pesos * 100);
    }
    get centavos() {
        return this._centavos;
    }
    get value() {
        return this._centavos / 100;
    }
    equals(other) {
        return this._centavos === other._centavos;
    }
    toString() {
        return `$${this.value.toFixed(2)}`;
    }
}
exports.Importe = Importe;
