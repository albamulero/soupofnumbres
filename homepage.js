let $canvas = document.getElementById("lienzo")
let ctx = $canvas.getContext("2d")
let var1

let numeros = []

/************************************
 * La funcion lienzo, pinta el tablero del juego...
 * Desde lienzo sellama a generador_numeros(), rellenar_cuadro()
 **************************************/


function lienzo() {

    // Creamos las lineas horizontales

    for (x = 0; x <= 499; x = x + 50) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 499);
    }

    // Creamos las lienas vertical

    for (y = 0; y <= 499; y = y + 50) {
        ctx.moveTo(0, y);
        ctx.lineTo(499, y);
    }

    // Creamos un bucle para generar los numeros y asignar su posicion en el tablero

    generador_numeros()

    // Rellenamos el cuadro con los numeros que tenemos en el array
    rellenar_cuadro()

    // Ponemos a la escucha la grilla

    $canvas.addEventListener("click", function(e) {

        // Este es un metodo para restar el margen del body y que solo me salga el valor de la grilla

        var canvaspos = $canvas.getBoundingClientRect();
        nclientX = e.clientX - canvaspos.left
        nclientY = e.clientY - canvaspos.top

        posicion_array = 0

        // Vamos a recorrer el array buscando la poiscion que nos llega...
        //alert(nclientX + " : " + nclientY)

        for(n = 0; n <= 100; n++){

            if (nclientX > numeros[n][2] && nclientX < numeros[n][4] && nclientY > numeros[n][1] && nclientY < numeros[n][3]){
                
                // Pasamos el numero al validador del juego
                regla_juego(numeros[n][0])

            }
        }

        
    })

    // Aqui creamos elo timer

    let segundos = 0
    let seg_text = document.getElementById("timer")
    let crono = setInterval(cronometro, 1000)

    function cronometro(){

        if(segundos==60){
            clearInterval(crono)
            alert("Se termino tu tiempo!!!!")
           // document.getElementById("timer").innerHTML = tiempo.toLocaleTimeString()

        }else{
            seg_text.innerHTML = segundos
            segundos++

        }
    }


    function rellenar_cuadro() {

        // Voy a recorrer las columnas

        for(n = 0; n < 100; n++){
            ctx.font = "14px arial"
            ctx.fillText(numeros[n][0], numeros[n][2]+ 10, numeros[n][1] + 10)
            

        }
    }

    function generador_numeros() {

        let pos_x = 0
        let pos_y = 0
        let pos_xx = 50
        let pos_yy = 50

        for (n = 0; n <= 100; n++) {

            //console.log(n)
            let aleatorio = Math.round(Math.random() * 1000);
            //console.log(aleatorio);
            numeros.push([aleatorio, pos_x, pos_y, pos_xx, pos_yy])
            //numeros[0].push(aleatorio)

            pos_x = pos_x + 50
            pos_xx = pos_xx + 50

            if(pos_x == 500){
                pos_x = 0
                pos_xx = 50
                pos_y = pos_y + 50
                pos_yy = pos_yy + 50
            }
                
           //console.log(numeros[n][0] + " : " + numeros[n][1] + " : "  + numeros[n][2])

        }

    }


    function regla_juego(num) {

        numero_mas_bajo = true

        // Vamos a comporbar que es el numero mas bajo del array...
        // Recorremos el array y comprobamos que no encontremos ninguno mayor
        
        for(n = 0; n < 100; n++){

            console.log(numeros[n][0])

            if( num > numeros[n][0]){
                numero_mas_bajo = false
            }
        }

        // Si es el numero mas bajo lo barramos del array...
        // Pintamos encima del numero para taparlo....
        // En caso contario informamos...

        //alert(numero_mas_bajo)
        
        if(numero_mas_bajo==true){

            // Pintamos ese espacio...
            // Borramos el numero del array...
            
            for(n = 0; n < 100; n++){
                if(num == numeros[n][0]){

                    ctx.fillStyle = "#F8F8FF"
                    ctx.fillRect(numeros[n][2], numeros[n][1], 50, 50)
                    numeros[n][0] = 1000000;
                }
            }

        }else{ 
            alert(num + ": no es el numeor mas bajo, sigue intentandolo...")
        }
    }
}


