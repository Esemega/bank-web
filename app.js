/**
 * Class Account
 *
 * FIELDS:
 * ID Cuenta
 * Beneficiario NIF
 * Nombre beneficiario
 * Nombre cuenta.
 * saldo
 * Tipo de cuenta
 *
 * METHODS:
 * MuestraEstado
 *
 * CONSTRUCTOR:
 * ID de Cuenta
 * nif del benficiario
 * nombre de la cuenta
 * saldo inicial
 *
 */

class Account {
  constructor(
    accountId,
    beneficiaryId,
    beneficiaryName,
    accountName,
    balance,
    accountType
  ) {
    this._accountId = accountId;
    this._beneficiaryId = beneficiaryId;
    this._beneficiaryName = beneficiaryName;
    this._accountName = accountName;
    this._balance = balance;
    this._accountType = accountType;
  }

  showStatus() {
    console.log(`*** Cuenta: ${this._accountId} *****`);
    console.log(`Nombre Beneficiario: ${this._beneficiaryName}`);
    console.log(`Nombre Cuenta: ${this._accountName} `);
    console.log(`Tipo: ${this._accountType}`);
    console.log(`Saldo: ${this._balance}`);
    console.log("******************************************");
  }

  get accountType() {
    return this._accountType;
  }

  get accountId() {
    return this._accountId;
  }

  get balance() {
    return this._balance;
  }

  set balance(newValue) {
    this._balance = newValue;
  }
}

/**
 * Class Transaccion
 *
 * FIELDS:
 * Cuenta origen.
 * Cuenta destino.
 * Cantidad a tranferir.
 *
 * METHODS:
 * RealizaTransaccion(cantidad) -> hace efectiva la
 * transacción (calculado la comisión y deduciendo de cada
 * cuenta la cantidad correspondiente)
 *
 */

class Transfer {
  constructor(originAccount, destinationAccount, quantity) {
    this._originAccount = originAccount;
    this._destinationAccount = destinationAccount;
    this._quantity = quantity;
    this._fee = 0;
  }

  getFee(accountType) {
    switch (accountType) {
      case "empresa":
        return 0.5;
      case "particular":
        return 1;
    }

    return -1;
  }

  makeTransfer() {
    this._fee = this.getFee(this._originAccount.accountType);

    const newOriginBalance =
      this._originAccount.balance - this._quantity - this._fee;
    const newDestinationBalance = this._destinationAccount.balance + this._quantity;

    this._originAccount.balance = newOriginBalance;
    this._destinationAccount.balance = newDestinationBalance;
  }

  get originAccount() {
    return this._originAccount;
  }

  get destinationAccount() {
    return this._destinationAccount;
  }

  get quantity() {
    return this._quantity;
  }

  get fee() {
    return this._fee;
  }
}

/**
 * Class LibroContable
 *
 * FIELDS:
 * Array de transacciones
 *
 * METHODS:
 * Realiza transacción -> recibe como parámetros dos cuentas
 * y realiza una transacción (la añade al listado de transacciones).
 *
 * Lista transacciones -> lista todas las transacciones que
 * se han realizado.
 */

class Ledger {
  constructor() {
    this._transfers = [];
  }

  makeTransfer(transfer) {
    transfer.makeTransfer();
    this._transfers.push(transfer);
  }

  listTransfers() {
    console.log("**** Transacciones *****");
    console.log("");
    this._transfers.map((transfer) => {
      console.log(`Origen: ${transfer.originAccount.accountId}`);
      console.log(`Destino: ${transfer.destinationAccount.accountId}`);
      console.log(`Cuantía: ${transfer.quantity}`);
      console.log(`Comision: ${transfer.fee}`);
      console.log("************************");
    });
  }
}

const accountA = new Account(
  "ES6621000418401234567891 ",
  "12345678X",
  "Juan Perez",
  "Nomina",
  1400,
  "particular"
);

const accountB = new Account(
  "ES1000492352082414205416",
  "A84939209",
  "Gestiones SL",
  "gastos",
  84400,
  "empresa"
);


console.log("** estado inicial ***");
accountA.showStatus();
accountB.showStatus();

const transfer = new Transfer(accountB, accountA, 1800);

const ledger = new Ledger();
ledger.makeTransfer(transfer);

console.log("** estado final ***");
accountA.showStatus();
accountB.showStatus();

console.log("** Listado transacciones ***");
ledger.listTransfers();
