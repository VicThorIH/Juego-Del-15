'use strict'
const solucion =   ["1", "2", "3", "4",
                    "5", "6", "7", "8",
                    "9", "10","11","12",
                    "13","14","15","0"];

 var tablero = ["1", "2", "3", "4",
                "5", "6", "7", "8",
                "9", "10","11","12",
                "15","13","14","0"];

/*var tablero = ["1", "2", "3", "4",
                "5", "6", "7", "8",
                "9", "10","11","12",
                "13","14","15","0"];
*/
var NO_MOVIMIENTOS = 0;
var MEJOR_SOLUCION = [];
var SOLUCION_ACTUAL = [];


var PRUFUNDIDAD = 0;

function profundidad_quince(tabl, movimiento_ant){
    
    if (tabl.toString() == solucion.toString()){
        
        if (SOLUCION_ACTUAL.length < MEJOR_SOLUCION.length || MEJOR_SOLUCION.length == 0) {
            MEJOR_SOLUCION = [];
            for (const paso in SOLUCION_ACTUAL) {
                MEJOR_SOLUCION.push(SOLUCION_ACTUAL[paso]);
            }
            console.log("Solucion: ", MEJOR_SOLUCION);
        }
        return;
    }

    if ( PROFUNDIDAD_MAXIMA <= SOLUCION_ACTUAL.length) {
        return;
    }

    if((SOLUCION_ACTUAL.length >= MEJOR_SOLUCION.length) && MEJOR_SOLUCION.length != 0){
        return;
    }

    var nuevo_mov = -1;
    var ya_movidos = [];
    for (let index = 0; index < 4; index++) {
        if (index != 0){
            regresar_cero(tabl, ya_movidos[ya_movidos.length - 1]);
        }
        //Verificar que haya movimientos
        if (calcular_mov_restantes(tabl.indexOf("0"),ya_movidos,movimiento_ant).length === 0){
            break;
        }

        NO_MOVIMIENTOS ++;
        
        //console.log("Regresado ", tabl);
        nuevo_mov = mover_cero(tabl, ya_movidos, movimiento_ant);
        ya_movidos.push(nuevo_mov);
        SOLUCION_ACTUAL.push(ya_movidos[ya_movidos.length - 1]);

        profundidad_quince(tabl, nuevo_mov);
        SOLUCION_ACTUAL.splice(SOLUCION_ACTUAL.length - 1);
        
    }
    


}

//MUEVE HACIA ALGUN LADO EL ESPACIO EN BLANCO TOMANDO EN CUENTA LAS MANESILLAS DEL RELOJ Y DEVUELVE EL MOVIMIENTO REALIZADO
function mover_cero(t, ya_realizados, mov_ant){//mov_ant = Movimientos ya realizados en ese nivel de profunddida + movimiento del que vengo
    var index = t.indexOf("0");
    var mov_restantes = calcular_mov_restantes(index, ya_realizados, mov_ant);

    if (mov_restantes.length === 0){
        return 0;
    }
    if (mov_restantes.includes(6)){
        var aux = t[index + 4];
        t[index + 4] = t[index];
        t[index] = aux;
        return 6;

    }else if (mov_restantes.includes(9)){
        var aux = t[index - 1];
        t[index - 1] = t[index];
        t[index] = aux;
        return 9;
    }else if (mov_restantes.includes(12)) {
        var aux = t[index - 4];
        t[index - 4] = t[index];
        t[index] = aux;
        return 12;

    }else if (mov_restantes.includes(3)){
        var aux = t[index + 1];
        t[index + 1] = t[index];
        t[index] = aux;
        return 3;

    }

}


function regresar_cero(t, p_ant){

    var index = t.indexOf("0");

    if (p_ant === -1){
        return;
    }else if (p_ant === 12) {
        var aux = t[index + 4];
        t[index + 4] = "0";
        t[index] = aux;
    } else if (p_ant === 3){
        var aux = t[index - 1];
        t[index - 1] = "0";
        t[index] = aux;
    }else if (p_ant === 6){
        var aux = t[index - 4];
        t[index - 4] = "0";
        t[index] = aux;
    }else if (p_ant === 9){
        var aux = t[index + 1];
        t[index + 1] = "0";
        t[index] = aux;
    }

}

function calcular_mov_restantes(p, movs_ya_realizados, mov_ant){//INTRODUCIR POSISCION ACTUAL Y ULTIMO MOVIMIENTO
    //console.log("Movimientos ya hechos", movs_ya_realizados);
    var movs_restantes = [12, 3, 6, 9];

    for (let index = 0; index < movs_ya_realizados.length; index++) {
        movs_restantes.splice(movs_restantes.indexOf(movs_ya_realizados[index]),1);
    }

    //console.log("Sin realizados ", movs_restantes);
    

    if (mov_ant === 12) {
        movs_restantes.splice(movs_restantes.indexOf(6),1);

    } else if (mov_ant === 3){
        movs_restantes.splice(movs_restantes.indexOf(9),1);

    }else if (mov_ant === 6){
        movs_restantes.splice(movs_restantes.indexOf(12),1);

    }else if (mov_ant === 9){
        movs_restantes.splice(movs_restantes.indexOf(3),1);
    }
    //console.log("Sin anterior ", movs_restantes);
    
    if (p === 0){
        movs_restantes.splice(movs_restantes.indexOf(12),1);
        movs_restantes.splice(movs_restantes.indexOf(9),1);
    }else if (p === 3){
        movs_restantes.splice(movs_restantes.indexOf(12),1);
        movs_restantes.splice(movs_restantes.indexOf(3),1);
    }else if (p === 12){
        movs_restantes.splice(movs_restantes.indexOf(9),1);
        movs_restantes.splice(movs_restantes.indexOf(6),1);
    }else if (p === 15){
        movs_restantes.splice(movs_restantes.indexOf(6),1);
        movs_restantes.splice(movs_restantes.indexOf(3),1);
    }else if (p === 1 || p === 2){
        movs_restantes.splice(movs_restantes.indexOf(12),1);
    }else if (p === 4 || p === 8){
        movs_restantes.splice(movs_restantes.indexOf(9),1);
    }else if (p === 7 || p === 11){
        movs_restantes.splice(movs_restantes.indexOf(3),1);
    }else if (p === 13 || p === 14){
        movs_restantes.splice(movs_restantes.indexOf(6),1);
    }
    
    //console.log("Movimientos posibles: " + movs_restantes.toString() + "\n");
    return movs_restantes;
}

function revolver_tablero(t, cant){
    var cont = 0;
    var anterior = -1;
    while (cont < cant) {
        var aux, i = t.indexOf("0");
        var movs_posibles = calcular_mov_restantes(i,[],anterior);
        var random = Math.floor(Math.random() * (4 - 0)) + 0;

        if (random === 0 && movs_posibles.includes(12)) {
            aux = t[i - 4];
            t[i] = aux;
            t[i - 4] = "0";
            cont ++;
            anterior = 12;
            console.log("Arriba");
        }else if (random === 1 && movs_posibles.includes(3)){
            aux = t[i + 1];
            t[i] = aux;
            t[i + 1] = "0";
            cont ++;
            anterior = 3;
            console.log("Derecha");
        }else if (random === 2 && movs_posibles.includes(6)){
            aux = t[i + 4];
            t[i] = aux;
            t[i + 4] = "0";
            cont ++;
            anterior = 6;
            console.log("Abajo");
        }else if (random === 3 && movs_posibles.includes(9)){
            aux = t[i - 1];
            t[i] = aux;
            t[i - 1] = "0";
            cont ++;
            anterior = 9;
            console.log("Izquierda");
        }
    }
    
    console.log(t);
}

function numero_separado_comas(numero){
    var n = '';
    var num = String(numero).split('');
    for (let index = 0; index < num.length; index++) {
        if (((num.length - index) % 3) === 0){
            n += ',';
        }
        n += String(num[index]);
        
    }
    return n;
}


var PROFUNDIDAD_MAXIMA = 20;
//revolver_tablero(tablero, 10);
console.time("profundidad_quince");
profundidad_quince(tablero, -1);
console.timeEnd("profundidad_quince");


console.log("La Mejor Solucion ", MEJOR_SOLUCION);
console.log("Nodos Visitados: " + numero_separado_comas(NO_MOVIMIENTOS));
console.log("");