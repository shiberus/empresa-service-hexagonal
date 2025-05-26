"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
const CUIT_1 = require("../value-objects/CUIT");
const RazonSocial_1 = require("../value-objects/RazonSocial");
const ValidationError_1 = require("../errors/ValidationError");
class Empresa {
    constructor(id, cuit, razonSocial, fechaAdhesion) {
        this.id = id;
        this.cuit = cuit;
        this.razonSocial = razonSocial;
        this.fechaAdhesion = fechaAdhesion;
    }
    static crear(id, cuit, razonSocial, fecha) {
        if (!id || id.trim() === '') {
            throw new ValidationError_1.ValidationError('El id no puede estar vacío');
        }
        if (!fecha) {
            throw new ValidationError_1.ValidationError('La fecha de adhesión es requerida');
        }
        const now = new Date();
        if (fecha.getTime() > now.getTime()) {
            throw new ValidationError_1.ValidationError('La fecha de adhesión no puede ser futura');
        }
        return new Empresa(id, new CUIT_1.CUIT(cuit), new RazonSocial_1.RazonSocial(razonSocial), fecha);
    }
}
exports.Empresa = Empresa;
