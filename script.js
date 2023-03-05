document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector("#track");
    const images = [...document.querySelectorAll('.image')]
    let control = images[0].getBoundingClientRect().left
    let mouseDownAt     = 0; 
    let movedPercentage = 0; 
    let prevPercentage  = 0;
    let posiciones = images.map(calcularPosicion)
    let old_posiciones = images.map(calcularPosicion)
    let transform = ''
    let old_transform = '' // esto parece jankear la animacion si lo pongo en el animateImages()

    for (let i = 0; i < images.length; i++) { 
            images[i].style.objectPosition = posiciones[i]
        }

    function calcularPosicion(image){
            let elRect  =   image.getBoundingClientRect();
        if  (elRect.left + elRect.width <= 0 && elRect.right - elRect.width - window.innerWidth >= 0) return 0
            let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
            let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
            posicion = `${posicion}% center`
            return posicion
    }  

    function mapPosiciones(){
        if (!(images[0].getBoundingClientRect().left == control)) {
            posiciones = images.map(calcularPosicion)
            control = images[0].getBoundingClientRect().left
            console.log(1)
        }
    }
    
    let fps = 60
    function loop(){
        mapPosiciones()
        setTimeout(loop, 1000 / fps)
    }
    loop()

    window.addEventListener("mousedown",(e) =>{
        mouseDownAt = e.clientX
    })

    window.addEventListener("mouseup"   ,(e) => {
        mouseDownAt = 0;
        movedPercentage = prevPercentage
    })

    window.addEventListener("mousemove" ,(e) => {
        if(mouseDownAt) {
            const mouseDelta = parseFloat(mouseDownAt) - e.clientX;    
            /*No estoy usando el ancho de la pantalla para determinar la velocidad del scroll*/
            /*const   maxDelta = window.innerWidth / 2;*/ 
            const percentage = (mouseDelta / 2000) * -100;
            const nextPercentageUnconstrained = parseFloat(movedPercentage) + percentage;
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
            prevPercentage = nextPercentage;
            transform =  `translate3d(${nextPercentage}%, -50%, 0)`
        }
    })



/* Puse ambas animaciones  en la misma funcion. 
Saque toda modificacion de atributos de la animacion. 
Tambien verifico que algo haya cambiado antes de animar*/ 

function animateImages(){
        if (!(images[0].getBoundingClientRect().left == control)){
        for (let i = 0; i < images.length; i++) { 
            if(posiciones[i] != old_posiciones[i]){
                //images[i].animate({objectPosition: `${posiciones[i]}% center`}, {duration: 1000, fill: "forwards"})
                images[i].animate({objectPosition: posiciones[i]}, {duration: 1200, fill: "forwards"})
                old_posiciones[i] = posiciones [i]
            }
        }}
        track.animate({transform: transform},{duration: 1000, fill: "forwards"});
        window.requestAnimationFrame(animateImages)        
    }
    window.requestAnimationFrame(animateImages)             
})


/*Ideas*/

    /*document.addEventListener( 'visibilitychange' , function() {
        if (document.hidden) {
            console.log('bye');
            window.cancelAnimationFrame(animateImages)
        } else {
            console.log('well back');
            window.requestAnimationFrame(animateImages)
            track.getAnimations().map((animation) => animation.finished)
        }
    }, false );*/

/*
    Promise.all(track.getAnimations().map((animation) => animation.finished)).then(
            () => {
                        for (image of images){
                        let elRect    =   image.getBoundingClientRect();
                        let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
                        let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
                        image.animate({
                            objectPosition: `${posicion}% center`
                        }, {duration: 300, fill: "forwards"}); }
               ;*/
/*
               Promise.all(image.getAnimations().map((animation) => animation.finished)).then(() => {
                console.log(3) 
                cancelAnimationFrame(request)}
                )
*/

/*const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;*/

  /*  Aca trato de resolver con matemática 

    function calculatePosicion(image){
        let elRect    =   image.getBoundingClientRect();
        let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
        let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
        return posicion
    }
    const posiciones = images.map(calculatePosicion)

    function animateImages(){
        for (let i = 0; i < images.length; i++) { 
            if(images[i].getBoundingClientRect().left >= -images[i].getBoundingClientRect().width
            && images[i].getBoundingClientRect().right <= (window.innerWidth) + images[i].getBoundingClientRect().width)
            { 
            let posicionFinal = Math.max(Math.min(posiciones[i]+prevPercentage*2, 100), 0)
            images[i].animate({objectPosition: `${(posicionFinal)}% center`}, {duration: 1200, fill: "forwards"})
            console.log(posiciones[1]+prevPercentage)
        }
        }
    track.animate({transform: `translate3d(${prevPercentage}%, -50%, 0)`},{duration: 1000, fill: "forwards"});
    request = requestAnimationFrame(function(){animateImages()})
    }
*/

/* Debounce para eliminar la animacion cuando termino
function debounce(fn, duration) {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(fn, duration)
    }
  }
*/


/* Audio Stuff
    function fadeOut(){
        if(audio.volume.toFixed(2)  >= 0.1){
            audio.volume -= 0.1;
            setTimeout(fadeOut, 100);
        }else{
            audio.pause
        }
    }

    function fadeIn(){
        if(audio.paused){audio.play()}
        
        if(audio.volume.toFixed(2) <= 0.8){
            audio.volume += 0.1;
            setTimeout(fadeIn, 100);
        }else{
            return;
        }
    }
*/

/*
    function animateImages2(){
        for (image of images){
            let elRect    =   image.getBoundingClientRect();
            let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
            let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
            image.animate({objectPosition: `${posicion}% center`}, {duration: 1200, fill: "forwards"})
            console.log(2)
        }
        track.animate({transform: `translate3d(${prevPercentage}%, -50%, 0)`},{duration: 1000, fill: "forwards"});      
            requestAnimationFrame(function(){animateImages()})
    }*/
     