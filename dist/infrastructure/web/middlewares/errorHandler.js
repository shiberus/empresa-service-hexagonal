"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ValidationError_1 = require("../../../domain/errors/ValidationError");
const DatabaseError_1 = require("../../db/errors/DatabaseError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError_1.ValidationError) {
        res.status(400).json({ error: err.message });
        return;
    }
    if (err instanceof DatabaseError_1.DatabaseError) {
        res.status(500).json({ error: err.message });
        return;
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
