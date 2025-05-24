import { Importe } from '../value-objects/Importe';
import { Cuenta } from '../value-objects/Cuenta';

export class Transferencia {
  private readonly _empresaId: string;
  private readonly _cuentaDebito: Cuenta;
  private readonly _cuentaCredito: Cuenta;
  private readonly _importe: Importe;
  private readonly _fecha: Date;

  private constructor(
    empresaId: string,
    cuentaDebito: Cuenta,
    cuentaCredito: Cuenta,
    importe: Importe,
    fecha: Date
  ) {
    this._empresaId = empresaId;
    this._cuentaDebito = cuentaDebito;
    this._cuentaCredito = cuentaCredito;
    this._importe = importe;
    this._fecha = fecha;
  }

  static crear(
    empresaId: string,
    cuentaDebito: string,
    cuentaCredito: string,
    importe: number,
    fecha?: Date
  ): Transferencia {
    if (!empresaId) throw new Error('El ID de la empresa es requerido.');

    const cuentaDebitoVO = new Cuenta(cuentaDebito);
    const cuentaCreditoVO = new Cuenta(cuentaCredito);
    const importeVO = new Importe(importe);
    const fechaFinal = fecha ?? new Date();

    return new Transferencia(
      empresaId,
      cuentaDebitoVO,
      cuentaCreditoVO,
      importeVO,
      fechaFinal
    );
  }

  get empresaId(): string {
    return this._empresaId;
  }

  get cuentaDebito(): Cuenta {
    return this._cuentaDebito;
  }

  get cuentaCredito(): Cuenta {
    return this._cuentaCredito;
  }

  get importe(): Importe {
    return this._importe;
  }

  get fecha(): Date {
    return this._fecha;
  }
}
