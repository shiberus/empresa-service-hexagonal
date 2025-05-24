import { Transferencia } from "../entities/Transferencia";

export interface TransferenciaRepository {
  getTransferenciasPorRango(desde: Date, hasta: Date): Promise<Transferencia[]>;
}
