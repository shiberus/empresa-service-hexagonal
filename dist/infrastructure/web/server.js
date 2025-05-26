"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = require("../db/mongoConnection");
const empresaRoutes_1 = __importDefault(require("./routes/empresaRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/empresas', empresaRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const MONGO_URI = process.env.MONGO_URI || "";
(0, mongoConnection_1.connectToMongo)(MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
