"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cuenta = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class Cuenta {
    constructor(numero) {
        if (!numero || !/^\d{10,20}$/.test(numero)) {
            // Solo digitos, longitud entre 10 y 20 caracteres
            throw new ValidationError_1.ValidationError('Número de cuenta inválido.');
        }
        this._numero = numero;
    }
    get numero() {
        return this._numero;
    }
    equals(other) {
        return this._numero === other._numero;
    }
    toString() {
        return this._numero;
    }
}
exports.Cuenta = Cuenta;
