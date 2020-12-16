/**
 * Class Cuenta
 *
 * CAMPOS:
 * ID Cuenta
 * Beneficiario NIF
 * Nombre beneficiario
 * Nombre cuenta.
 * saldo
 * Tipo de cuenta
 *
 * MÉTODOS:
 * MuestraEstado
 *
 * CONSTRUCTOR:
 * ID de Cuenta
 * nif del benficiario
 * nombre de la cuenta
 * saldo inicial
 *
 */

class Cuenta {
  constructor(
    idCuenta,
    nifBeneficiario,
    nombreBeneficiario,
    nombreCuenta,
    saldo,
    tipoCuenta
  ) {
    this._idCuenta = idCuenta;
    this._nifBeneficiario = nifBeneficiario;
    this._nombreBeneficiario = nombreBeneficiario;
    this._nombreCuenta = nombreCuenta;
    this._saldo = saldo;
    this._tipoCuenta = tipoCuenta;
  }

  muestraEstado() {
    console.log(`*** Cuenta: ${this._idCuenta} *****`);
    console.log(`Nombre Beneficiario: ${this._nombreBeneficiario}`);
    console.log(`Nombre Cuenta: ${this._nombreCuenta} `);
    console.log(`Tipo: ${this._tipoCuenta}`);
    console.log(`Saldo: ${this._saldo}`);
    console.log("******************************************");
  }

  get tipoCuenta() {
    return this._tipoCuenta;
  }

  get idCuenta() {
    return this._idCuenta;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(saldoNuevo) {
    this._saldo = saldoNuevo;
  }
}

/**
 * Class Transaccion
 *
 * CAMPOS:
 * Cuenta origen.
 * Cuenta destino.
 * Cantidad a tranferir.
 *
 * MÉTODOS:
 * RealizaTransaccion(cantidad) -> hace efectiva la
 * transacción (calculado la comisión y deduciendo de cada
 * cuenta la cantidad correspondiente)
 *
 */

class Transaccion {
  constructor(cuentaOrigen, cuentaDestino, cantidad) {
    this._cuentaOrigen = cuentaOrigen;
    this._cuentaDestino = cuentaDestino;
    this._cantidad = cantidad;
    this._comision = 0;
  }

  calcularComision(tipoCuenta) {
    switch (tipoCuenta) {
      case "empresa":
        return 0.5;
      case "particular":
        return 1;
    }

    return -1;
  }

  realizaTransaccion() {
    this._comision = this.calcularComision(this._cuentaOrigen.tipoCuenta);

    const saldoOrigenNuevo =
      this._cuentaOrigen.saldo - this._cantidad - this._comision;
    const saldoDestinoNuevo = this._cuentaDestino.saldo + this._cantidad;

    this._cuentaOrigen.saldo = saldoOrigenNuevo;
    this._cuentaDestino.saldo = saldoDestinoNuevo;
  }

  get cuentaOrigen() {
    return this._cuentaOrigen;
  }

  get cuentaDestino() {
    return this._cuentaDestino;
  }

  get cantidad() {
    return this._cantidad;
  }

  get comision() {
    return this._comision;
  }
}

/**
 * Class LibroContable
 *
 * CAMPOS:
 * Array de transacciones
 *
 * MÉTODOS:
 * Realiza transacción -> recibe como parámetros dos cuentas
 * y realiza una transacción (la añade al listado de transacciones).
 *
 * Lista transacciones -> lista todas las transacciones que
 * se han realizado.
 */

class LibroContable {
  constructor() {
    this._transacciones = [];
  }

  realizaTransaccion(transaccion) {
    transaccion.realizaTransaccion();
    this._transacciones.push(transaccion);
  }

  listaTransacciones() {
    console.log("**** Transacciones *****");
    console.log("");
    this._transacciones.map((transaccion) => {
      console.log(`Origen: ${transaccion.cuentaOrigen.idCuenta}`);
      console.log(`Destino: ${transaccion.cuentaDestino.idCuenta}`);
      console.log(`Cuantía: ${transaccion.cantidad}`);
      console.log(`Comision: ${transaccion.comision}`);
      console.log("************************");
    });
  }
}

const cuentaA = new Cuenta(
  "ES6621000418401234567891 ",
  "12345678X",
  "Juan Perez",
  "Nomina",
  1400,
  "particular"
);

const cuentaB = new Cuenta(
  "ES1000492352082414205416",
  "A84939209",
  "Gestiones SL",
  "gastos",
  84400,
  "empresa"
);

const cuentaC = new Cuenta(
  "ES10004923452082414200017",
  "W215039209",
  "Sonia Garcia",
  "comun",
  5000,
  "particular"
);

console.log("** estado inicial ***");
cuentaA.muestraEstado();
cuentaB.muestraEstado();

const transaccion = new Transaccion(cuentaB, cuentaA, 1800);

const libroContable = new LibroContable();
libroContable.realizaTransaccion(transaccion);

console.log("** estado final ***");
cuentaA.muestraEstado();
cuentaB.muestraEstado();

console.log("** Listado transacciones ***");
libroContable.listaTransacciones();
