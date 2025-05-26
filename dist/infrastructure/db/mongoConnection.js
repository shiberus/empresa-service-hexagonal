"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToMongo = async (mongoUri) => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Conectado a MongoDB correctamente');
    }
    catch (error) {
        console.error('Error al conectarse a MongoDB:', error);
        process.exit(1);
    }
};
exports.connectToMongo = connectToMongo;
