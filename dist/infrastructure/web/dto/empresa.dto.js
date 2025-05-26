"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaToDTO = empresaToDTO;
function empresaToDTO(empresa) {
    return {
        id: empresa.id,
        cuit: empresa.cuit.value,
        razonSocial: empresa.razonSocial.value,
        fechaAdhesion: empresa.fechaAdhesion.toISOString()
    };
}
