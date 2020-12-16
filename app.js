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
    constructor(IDCuenta, NIFBeneficiario, NombreBeneficiario, NombreCuenta, saldo, TipoCuenta) {
        this._IDCuenta = IDCuenta;
        this._NIFBeneficiario = NIFBeneficiario;
        this._NombreBeneficiario = NombreBeneficiario;
        this._NombreCuenta = NombreCuenta;
        this._saldo = saldo;
        this._TipoCuenta = TipoCuenta;
    }

    muestraEstado() {
        console.log(`*** Cuenta: ${this._IDCuenta} *****`);
        console.log(`Nombre Beneficario: ${this._NombreBeneficiario}`);
        console.log(`Nombre Cuenta: ${this._NombreCuenta} `);
        console.log(`Tipo: ${this._TipoCuenta}`);
        console.log(`Saldo: ${this._saldo}`);
        console.log("******************************************")
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

console.log("** estado inicial ***");
cuentaA.muestraEstado();
cuentaB.muestraEstado();

/*
const libroContable = new LibroContable();
const transaccion = new Transaccion(cuentaB, cuentaA, 1800);
const libroContable = new LibroContable();
libroContable.realizaTransaccion(transaccion);

console.log("** estado final ***");
cuentaA.muestraEstado();
cuentaB.muestraEstado();

console.log("** Listado transacciones ***");
libroContable.listaTransacciones();
*/