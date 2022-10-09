'use strict';

let documentReady = () => {
    const contenedorPreguntas = document.getElementById('contenedorPreguntas');
    const botonGenerar = window.document.getElementById('botonGenerar');
    const botonImprimir = window.document.getElementById('botonImprimir');
    let cartilla = window.document.getElementById('cartilla');
    

    //RELOJ
    let mueveReloj = () => {
        let relojPantalla = window.document.getElementById('relojPantalla');
        
        //const contenedorReloj = window.document.getElementById('contenedorReloj');
        let momentoActual = new Date();
        let hora = momentoActual.getHours();
        let minuto = momentoActual.getMinutes();
        let segundo = momentoActual.getSeconds();
        
        let horaImprimible = hora + " : " + minuto + " : " + segundo;
        
        relojPantalla.innerHTML=`${horaImprimible}`;        
    }   
    //setInterval(mueveReloj,1000);

    //LEER TXT DATOS
    let file = document.getElementById("inputFile");
    file.addEventListener("change", function(){
        var leerDatos = new FileReader();
        leerDatos.onload = function (){
            leerDatos = leerDatos.result
            console.log("Datos: ",leerDatos);
            let cadenaDatos = leerDatos.split(",",4);
            console.log(cadenaDatos);

            let dni = document.getElementById('dni');
            let nombres = document.getElementById('nombres');
            let apellidos = document.getElementById('apellidos');
            let carrera = document.getElementById('carrera');
            let arrayElementos = [
                dni,nombres,apellidos,carrera
            ];

            for (let index = 0; index < cadenaDatos.length; index++) {
                arrayElementos[index].innerHTML = `
                ${cadenaDatos[index]}`        
            }
        }
        leerDatos.readAsText(this.files[0]);
    });
    

    //GENERAR CARTILLA
    let generarCartilla = (e) => {
        crearContenedorPreguntas();
        e.preventDefault();
        const valoresAlternativas = ["A", "B", "C", "D", "E", "F"];
        let cantidad_Preguntas = document.getElementById('cantidadPreguntas').value;
        let cantidad_Alternativas = document.getElementById('cantidadAlternativas').value;
        
        //poner en un array cada section, limpiar antes de ejecutar
        let contenedorAlternativas = '';
        preguntas.innerHTML = '';
        //contenedorPreguntas.innerHTML = '';

        for (let index = 1; index <= cantidad_Preguntas; index++) {
            //cantidad de preguntas solo hasta 10
            for (let index = 0; index < cantidad_Alternativas; index++) {
                contenedorAlternativas += `<li class="alternativa">${valoresAlternativas[index]}</li>`
            }
                var unaSeccion = preguntas.innerHTML += `
                <ol class="pregunta-lista">
                    <li class="numero">${index}</li>
                    ${contenedorAlternativas}
                </ol>
            `;
            contenedorAlternativas = '';
        };

        function crearContenedorPreguntas() {
            //contenedorPreguntas="";
            contenedorPreguntas.innerHTML = `
            <section class="preguntas" id="preguntas">
            ${unaSeccion}
            </section>
            `;
        };

        let estiloPreguntas = document.getElementById('preguntas');
        //console.log(cantidad_Preguntas);
        if(cantidad_Preguntas>10){
            estiloPreguntas.style.background= "--box-shadow:";
            estiloPreguntas.style.columnCount= 2;
            //classList
        }
        else{
            estiloPreguntas.style.background = "--box-shadow:";
        };
    }

    function valoresValidos (){
        let cantidad_Preguntas = document.getElementById('cantidadPreguntas').value;
        let cantidad_Alternativas = document.getElementById('cantidadAlternativas').value;
        console.log(cantidad_Preguntas);
        console.log(cantidad_Alternativas);

        if(cantidad_Alternativas<=6 && cantidad_Preguntas<=100){
            botonGenerar.addEventListener('click', generarCartilla);
        }
        else{
            alert("Ingrese valores validos");
        }
    } 
    botonGenerar.addEventListener('click', valoresValidos());
    
    function generarPDF(){
        console.log('presionando boton imprimir');
        cartilla = window.document.getElementById('cartilla');
        let doc = new jsPDF('p', 'pt', 'letter');
        const margin = 10;
        const scale = (doc.internal.pageSize.width - margin*2)/ document.body.scrollWidth;
        doc.html(cartilla, {
            x: margin,
            y: margin,
            html2canvas: {
                scale: scale*1.2,
            },
            callback: function(doc){
                doc.save('cartilla.pdf');
                doc.output('dataurlnewwindow', {filename: 'cartilla.pdf'})
            }
        })
    }

    botonImprimir.addEventListener('click', ()=>{
        console.log('presionando boton imprimir');
        cartilla = window.document.getElementById('cartilla');
        let doc = new jsPDF('p', 'pt', 'letter');
        const margin = 10;
        const scale = (doc.internal.pageSize.width - margin*2)/ document.body.scrollWidth;
        doc.html(cartilla, {
            x: margin,
            y: margin,
            html2canvas: {
                scale: scale*0.8,
            },
            callback: function(doc){
                doc.save('cartilla.pdf');
                doc.output('dataurlnewwindow', {filename: 'cartilla.pdf'})
            }
        })
    });
    
    
   /*
    let generarPDF = (e) => {
        
        let cartilla = document.getElementById('cartilla');
        html2canvas(cartilla).then((result) => {
            let image = result.toDataURL('image/png');
            let pdf = new jsPDF('p', 'px', 'letter');
            pdf.addImage(image, 'PNG',50,50,100,200 );
            pdf.save('cartilla.pdf');
        }).catch((err) => {
            console.log(err);
        });
        //cartilla.print();
        //window.print();
        
    }
    */
   

}
document.addEventListener('DOMContentLoaded', documentReady);