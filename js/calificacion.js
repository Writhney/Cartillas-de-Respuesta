'use strict';

let documentReady = () => {
    let imgPreviewLoad = document.getElementById('imgPreviewLoad');
    let fileCartillas = document.getElementById('subirCarpetaCartillas');
    /*
    fileCartillas.addEventListener('change',function (){
        console.log("Cambio");
        
        //if(fileCartillas.files && fileCartillas.files[0]){
            var read = new FileReader();
            //console.log(imgPreviewLoad);
            
            read.onload = function(e){
                read = read.result;
                console.log("contenido: "+ read);
                
                imgPreviewLoad.innerHTML = ("<img src=" + read + "/>");
                imgPreviewLoad.innerHTML = ("<h1>Hola</h1>");
            }
            read.readAsDataURL(this.files[0]);
            //reader.readAsDataURL(fileCartillas.files[0]);
        //}
    });
    */
    fileCartillas.addEventListener('change',function (e){
        let reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=function(){
        let preview = document.getElementById('imgPreviewLoad');
        let image = document.createElement('img');
            image.src=reader.result;
            console.log(reader); 
            image.style.width="200px";
            preview.append(image);
           
        }
    })

}
document.addEventListener('DOMContentLoaded', documentReady);