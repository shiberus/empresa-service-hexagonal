import mongoose from "mongoose";

export const connectToMongo = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Conectado a MongoDB correctamente");
  } catch (error) {
    console.error("Error al conectarse a MongoDB:", error);
    process.exit(1);
  }
};
