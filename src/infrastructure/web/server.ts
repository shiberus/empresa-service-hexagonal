import express from "express";
import { connectToMongo } from "../db/mongoConnection";
import empresaRoutes from "./routes/empresaRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../../config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use("/empresas", empresaRoutes);
app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI || "";

connectToMongo(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
