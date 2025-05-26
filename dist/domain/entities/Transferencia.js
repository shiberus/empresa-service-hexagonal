"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transferencia = void 0;
const Importe_1 = require("../value-objects/Importe");
const Cuenta_1 = require("../value-objects/Cuenta");
const ValidationError_1 = require("../errors/ValidationError");
class Transferencia {
    constructor(empresaId, cuentaDebito, cuentaCredito, importe, fecha) {
        this._empresaId = empresaId;
        this._cuentaDebito = cuentaDebito;
        this._cuentaCredito = cuentaCredito;
        this._importe = importe;
        this._fecha = fecha;
    }
    static crear(empresaId, cuentaDebito, cuentaCredito, importe, fecha) {
        if (!empresaId)
            throw new ValidationError_1.ValidationError('El ID de la empresa es requerido.');
        const cuentaDebitoVO = new Cuenta_1.Cuenta(cuentaDebito);
        const cuentaCreditoVO = new Cuenta_1.Cuenta(cuentaCredito);
        const importeVO = new Importe_1.Importe(importe);
        const fechaFinal = fecha ?? new Date();
        return new Transferencia(empresaId, cuentaDebitoVO, cuentaCreditoVO, importeVO, fechaFinal);
    }
    get empresaId() {
        return this._empresaId;
    }
    get cuentaDebito() {
        return this._cuentaDebito;
    }
    get cuentaCredito() {
        return this._cuentaCredito;
    }
    get importe() {
        return this._importe;
    }
    get fecha() {
        return this._fecha;
    }
}
exports.Transferencia = Transferencia;
