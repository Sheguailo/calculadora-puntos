// ======================================================
// CALCULADORA DE COMISIONES PDA / PDV
// ======================================================


// ======================================================
// CONFIGURACIÓN
// ======================================================


// Valores de los paquetes
const VALOR_PAQUETE_6000 = 6000;

const VALOR_PAQUETE_10000 = 10000;

const VALOR_OPACA_7000 = 7000;

const VALOR_OPACA_12000 = 12000;



// ------------------------------------------------------
// PAGO EN RECARGA
// ------------------------------------------------------

const RECARGA_6000 = 1500;

const RECARGA_7000 = 1500;

const RECARGA_10000 = 2000;

const RECARGA_12000 = 2000;



// ------------------------------------------------------
// GANANCIA ADICIONAL OFERTAS OPACAS
// ------------------------------------------------------

const BENEFICIO_OPACA_7000 = 2000;

const BENEFICIO_OPACA_12000 = 3000;



// ------------------------------------------------------
// PORCENTAJE ADICIONAL SOBRE RECARGAS
// ------------------------------------------------------

const PORCENTAJE_RECARGA = 0.055;



// ------------------------------------------------------
// COMISIÓN PDA
// ------------------------------------------------------

const COMISION_PDA = 0.15;



// ------------------------------------------------------
// CHIP
// ------------------------------------------------------

// Precio al usuario
const PRECIO_VENTA_CHIP = 5000;

// Valor del chip
const VALOR_CHIP = 1200;

// Ganancia por venta del chip
const GANANCIA_CHIP = 3800;

// Beneficio adicional exclusivo PDV
const BENEFICIO_CHIP_PDV = 1200;



// ======================================================
// FORMATO DE DINERO
// ======================================================

function dinero(valor) {

    return valor.toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    );

}



// ======================================================
// OBTENER TIPO DE PUNTO
// ======================================================

function obtenerTipoPunto() {

    const seleccionado =
        document.querySelector(
            'input[name="tipoPunto"]:checked'
        );

    return seleccionado.value;

}



// ======================================================
// OBTENER NÚMERO
// ======================================================

function obtenerNumero(id) {

    const elemento =
        document.getElementById(id);


    const valor =
        Number(elemento.value);


    if (
        isNaN(valor) ||
        valor < 0
    ) {

        return 0;

    }


    return valor;

}



// ======================================================
// CATEGORÍA PDA
// ======================================================

function categoriaPDA(gross) {


    // ORO
    if (gross >= 10) {

        return {

            nombre: "ORO",

            bono: 75000

        };

    }


    // PLATA
    if (gross >= 6) {

        return {

            nombre: "PLATA",

            bono: 50000

        };

    }


    // BRONCE
    return {

        nombre: "BRONCE",

        bono: 25000

    };

}



// ======================================================
// CATEGORÍA PDV
// ======================================================

function categoriaPDV(gross) {


    // FULL
    if (gross > 3) {

        return {

            nombre: "FULL",

            bono: 25000

        };

    }


    // BASIC
    if (gross >= 1) {

        return {

            nombre: "BASIC",

            bono: 15000

        };

    }


    // SIN CATEGORÍA
    return {

        nombre: "SIN CATEGORÍA",

        bono: 0

    };

}



// ======================================================
// ACTUALIZAR CATEGORÍA
// ======================================================

function actualizarTipo() {


    const tipo =
        obtenerTipoPunto();


    const gross =
        obtenerNumero("gross");


    const elemento =
        document.getElementById(
            "categoriaResultado"
        );



    if (tipo === "PDA") {


        const categoria =
            categoriaPDA(gross);


        elemento.innerHTML =

            `PDA → ${categoria.nombre}
            | Bono: ${dinero(categoria.bono)}`;

    }


    else {


        const categoria =
            categoriaPDV(gross);


        elemento.innerHTML =

            `PDV → ${categoria.nombre}
            | Bono: ${dinero(categoria.bono)}`;

    }

}



// ======================================================
// CALCULAR
// ======================================================

function calcular() {


    // ==================================================
    // TIPO
    // ==================================================

    const tipo =
        obtenerTipoPunto();



    // ==================================================
    // DATOS INGRESADOS
    // ==================================================

    const gross =
        obtenerNumero("gross");


    const paquetes6000 =
        obtenerNumero("paquetes6000");


    const paquetes10000 =
        obtenerNumero("paquetes10000");


    const opaca7000 =
        obtenerNumero("opaca7000");


    const opaca12000 =
        obtenerNumero("opaca12000");



    // ==================================================
    // CANTIDAD TOTAL DE CHIPS
    // ==================================================

    // Cada paquete reportado
    // representa un chip vendido.

    const chipsVendidos =

        paquetes6000 +

        paquetes10000 +

        opaca7000 +

        opaca12000;



    // ==================================================
    // GANANCIA POR VENTA DE CHIPS
    // ==================================================

    // $5.000 precio de venta
    // - $1.200 valor del chip
    // = $3.800 ganancia

    const gananciaChips =

        chipsVendidos *
        GANANCIA_CHIP;



    // ==================================================
    // VALOR DE LOS PAQUETES
    // ==================================================

    const valorPaquetes6000 =

        paquetes6000 *
        VALOR_PAQUETE_6000;


    const valorPaquetes10000 =

        paquetes10000 *
        VALOR_PAQUETE_10000;


    const valorOpaca7000 =

        opaca7000 *
        VALOR_OPACA_7000;


    const valorOpaca12000 =

        opaca12000 *
        VALOR_OPACA_12000;



    const valorTotalPaquetes =

        valorPaquetes6000 +

        valorPaquetes10000 +

        valorOpaca7000 +

        valorOpaca12000;



    // ==================================================
    // PAGO EN RECARGAS
    // ==================================================

    const recarga6000 =

        paquetes6000 *
        RECARGA_6000;


    const recarga7000 =

        opaca7000 *
        RECARGA_7000;


    const recarga10000 =

        paquetes10000 *
        RECARGA_10000;


    const recarga12000 =

        opaca12000 *
        RECARGA_12000;



    const pagoRecargas =

        recarga6000 +

        recarga7000 +

        recarga10000 +

        recarga12000;



    // ==================================================
    // BENEFICIO DEL 5,5%
    // ==================================================

    const beneficioRecarga =

        pagoRecargas *
        PORCENTAJE_RECARGA;



    // ==================================================
    // GANANCIA OFERTA OPACA
    // ==================================================

    const gananciaOpaca7000 =

        opaca7000 *
        BENEFICIO_OPACA_7000;


    const gananciaOpaca12000 =

        opaca12000 *
        BENEFICIO_OPACA_12000;



    // ==================================================
    // VARIABLES
    // ==================================================

    let categoria;

    let bonoCategoria = 0;

    let comisionPaquetes = 0;

    let beneficioPDV = 0;



    // ==================================================
    // PDA
    // ==================================================

    if (tipo === "PDA") {


        categoria =
            categoriaPDA(gross);


        bonoCategoria =
            categoria.bono;



        // ----------------------------------------------
        // COMISIÓN DEL 15%
        // ----------------------------------------------

        comisionPaquetes =

            valorTotalPaquetes *
            COMISION_PDA;


    }



    // ==================================================
    // PDV
    // ==================================================

    else {


        categoria =
            categoriaPDV(gross);


        bonoCategoria =
            categoria.bono;



        // ----------------------------------------------
        // BENEFICIO ADICIONAL DE $1.200 POR GROSS
        // ----------------------------------------------

        beneficioPDV =

            gross *
            BENEFICIO_CHIP_PDV;

    }



    // ==================================================
    // GANANCIA TOTAL
    // ==================================================

    const totalGanancia =

        bonoCategoria +

        comisionPaquetes +

        gananciaChips +

        beneficioPDV +

        pagoRecargas +

        beneficioRecarga +

        gananciaOpaca7000 +

        gananciaOpaca12000;



    // ==================================================
    // MOSTRAR RESULTADOS
    // ==================================================

    document.getElementById(
        "resultado"
    ).style.display = "block";



    // CATEGORÍA

    document.getElementById(
        "categoriaFinal"
    ).textContent =

        `${tipo} → ${categoria.nombre}`;



    // TOTAL

    document.getElementById(
        "totalGanancia"
    ).textContent =

        dinero(totalGanancia);



    // BONO

    document.getElementById(
        "textoBono"
    ).textContent =

        `Bono ${categoria.nombre}`;


    document.getElementById(
        "bonoCategoria"
    ).textContent =

        dinero(bonoCategoria);



    // COMISIÓN PDA

    document.getElementById(
        "comisionPaquetes"
    ).textContent =

        dinero(comisionPaquetes);



    // GANANCIA CHIPS

    document.getElementById(
        "gananciaChips"
    ).textContent =

        dinero(gananciaChips);



    // BENEFICIO PDV

    document.getElementById(
        "beneficioPDV"
    ).textContent =

        dinero(beneficioPDV);



    // RECARGAS

    document.getElementById(
        "pagoRecargas"
    ).textContent =

        dinero(pagoRecargas);



    // 5,5%

    document.getElementById(
        "beneficioRecarga"
    ).textContent =

        dinero(beneficioRecarga);



    // OPACA 7000

    document.getElementById(
        "gananciaOpaca7000"
    ).textContent =

        dinero(gananciaOpaca7000);



    // OPACA 12000

    document.getElementById(
        "gananciaOpaca12000"
    ).textContent =

        dinero(gananciaOpaca12000);



    // ==================================================
    // DETALLE DE VENTAS
    // ==================================================

    document.getElementById(
        "detalleGross"
    ).textContent =

        gross;



    document.getElementById(
        "detalleChips"
    ).textContent =

        chipsVendidos;



    document.getElementById(
        "detalle6000"
    ).textContent =

        paquetes6000;



    document.getElementById(
        "detalle10000"
    ).textContent =

        paquetes10000;



    document.getElementById(
        "detalleOpaca7000"
    ).textContent =

        opaca7000;



    document.getElementById(
        "detalleOpaca12000"
    ).textContent =

        opaca12000;



    // ==================================================
    // MOSTRAR / OCULTAR FILAS
    // ==================================================

    const filaComision =

        document.getElementById(
            "filaComision"
        );


    const filaBeneficioPDV =

        document.getElementById(
            "filaBeneficioPDV"
        );



    if (tipo === "PDA") {


        // PDA tiene 15%

        filaComision.style.display =
            "flex";


        // PDA NO tiene los $1.200 adicionales

        filaBeneficioPDV.style.display =
            "none";

    }


    else {


        // PDV NO tiene 15%

        filaComision.style.display =
            "none";


        // PDV sí tiene $1.200 por Gross

        filaBeneficioPDV.style.display =
            "flex";

    }



    // ==================================================
    // BAJAR AL RESULTADO
    // ==================================================

    document.getElementById(
        "resultado"
    ).scrollIntoView({

        behavior: "smooth"

    });

}



// ======================================================
// REINICIAR
// ======================================================

function reiniciar() {


    document.getElementById(
        "gross"
    ).value = 0;


    document.getElementById(
        "paquetes6000"
    ).value = 0;


    document.getElementById(
        "paquetes10000"
    ).value = 0;


    document.getElementById(
        "opaca7000"
    ).value = 0;


    document.getElementById(
        "opaca12000"
    ).value = 0;



    // Volver a PDA

    document.querySelector(
        'input[name="tipoPunto"][value="PDA"]'
    ).checked = true;



    // Ocultar resultado

    document.getElementById(
        "resultado"
    ).style.display = "none";



    actualizarTipo();



    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ======================================================
// ACTUALIZAR CATEGORÍA AL CAMBIAR GROSS
// ======================================================

document
    .getElementById("gross")
    .addEventListener(
        "input",
        actualizarTipo
    );



// ======================================================
// INICIALIZAR
// ======================================================

actualizarTipo();