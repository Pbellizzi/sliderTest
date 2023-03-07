const track = document.querySelector("#track");
const images = [...document.querySelectorAll('.image')];
let control = images[0].getBoundingClientRect().left; /*imagen arbitraria para controla si algo se movio*/ 
let mouseDownAt     = 0; 
let movedPercentage = 0; 
let prevPercentage  = 0;
let posiciones = [] 
let old_posiciones = []
let transform = 0;
let old_transform = 0;  // este control parece jankear la animacion si lo pongo en el animateImages()
//let xPosition = clientX



function lerp(start, end, t) {
    return start * (1-t) + end * t;
}   

let fps = 60; /*esto es para el loop que calcula las posiciones de las imagenes*/ 

function init() {
    posiciones = images.map(calcularPosicion);
    old_posiciones = images.map(calcularPosicion);
    for (let i = 0; i < images.length; i++) { 
        images[i].style.objectPosition = `${posiciones[i]}% center`
    }
  } 


function calcularPosicion(image){
    let elRect  =   image.getBoundingClientRect();
    if  (elRect.left + elRect.width <= 0 && elRect.right - elRect.width - window.innerWidth >= 0) return 0;
    let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100;
    let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0);  
    return posicion;
};

function mapPosiciones(){
    if (!(images[0].getBoundingClientRect().left == control)) {
        posiciones = images.map(calcularPosicion);
        control = images[0].getBoundingClientRect().left;

    };
};
function onMouseMove(e){
    if(mouseDownAt >= 0) {
        const mouseDelta = parseFloat(mouseDownAt) - e.clientX;    
        /*No estoy usando el ancho de la pantalla para determinar la velocidad del scroll*/
        /*const   maxDelta = window.innerWidth / 2;*/
        const percentage = (mouseDelta / 2000) * -100;
        const nextPercentageUnconstrained = parseFloat(movedPercentage) + percentage;
        let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        transform = nextPercentage
        
        //nextPercentage = lerp(prevPercentage,nextPercentage,0.1)
        //transform =  `translate3d(${nextPercentage}%, -50%, 0)`;
        prevPercentage = nextPercentage;  
    }
}

function onMouseDown(e){
    mouseDownAt = e.clientX;
}

function onMouseUp(e){
    mouseDownAt = -1;
    movedPercentage = prevPercentage;
}

function arrows(e) {
    let actual,siguiente,anterior
    switch (e.code) {
        case "ArrowLeft":
            actual = images[images.indexOf(document.getElementById("current"))]
            anterior = images[images.indexOf(document.getElementById("current"))-1]

            if (anterior) {
                actual.click();
                anterior.click()};
            break;
        case "ArrowRight":
            actual = images[images.indexOf(document.getElementById("current"))]
            siguiente = images[images.indexOf(document.getElementById("current"))+1]

            if (siguiente) {
                actual.click();
                siguiente.click()};
           
            break;
        case "ArrowUp":
            // Up pressed
            break;
        case "ArrowDown":
            // Down pressed
            break;
    }
}

//-----------------------------------------------------------------------------////-----------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", () => {


    
    init()

    function loop(){
        mapPosiciones();
        setTimeout(loop, 1000 / fps);
    };
    loop();


    window.addEventListener("mousedown",onMouseDown)
    window.addEventListener("mouseup",onMouseUp)
    window.addEventListener("mousemove" , onMouseMove)

    let listeners = 1
    for (image of images){
    image.addEventListener("click", function(e) {
        if (listeners === 1){
            this.setAttribute("id","current");
            console.log(this)
            window.addEventListener('keydown',arrows);
            cancelAnimationFrame(request);
            window.removeEventListener("mousedown",onMouseDown);
            window.removeEventListener("mouseup",onMouseUp);
            window.removeEventListener("mousemove",onMouseMove);     
            /*quizás meter un lerp con un intervalo acá*/
            e.currentTarget.animate([{width: "40vmin"},{width: "100vw"}],{duration: 700, fill: "forwards"});
            e.currentTarget.animate([{height: "56vmin"},{height: "100vh"}],{duration: 700, fill: "forwards"});
            /*for (image of images){if (image != e.currentTarget){
                image.style.display = "none"
                image.animate([{width: "40vmin"},{width: "100vw"}],{duration: 700, fill: "forwards"});
                image.animate([{height: "56vmin"},{height: "100vh"}],{duration: 700, fill: "forwards"});
            }}*/
            for (image of images){if (image != e.currentTarget){
                image.animate([{width: "40vmin"},{width: "0vw"}],{duration: 700, fill: "forwards"});
                image.animate([{height: "56vmin"},{height: "0vh"}],{duration: 700, fill: "forwards"});
            }}
            track.animate({transform: `translate3d(0px, -50%, 0)`},{duration: 700, fill: "forwards"});
            track.animate([{gap: "3vmin"},{gap: "0px"}],{duration: 700, fill: "forwards"});
            track.animate([{left: "50%"},{left: "0%"}],{duration: 700, fill: "forwards"});
            listeners = 0   
        } else {
            track.animate({transform: `translate3d(${old_transform}%, -50%, 0)`},{duration: 700, fill: "forwards"});
            track.animate([{gap: "0px"},{gap: "3vmin"}],{duration: 700, fill: "forwards"});
            track.animate([{left: "0%"},{left: "50%"}],{duration: 700, fill: "forwards"});
            e.currentTarget.animate([{width: "100vw"},{width: "40vmin"}],{duration: 700, fill: "forwards"});
            e.currentTarget.animate([{height: "100vh"},{height: "56vmin"}],{duration: 700, fill: "forwards"});
            /*for (image of images){if (image != e.currentTarget){
                image.animate([{width: "100vw"},{width: "40vmin"}],{duration: 700, fill: "forwards"});
                image.animate([{height: "100vh"},{height: "56vmin"}],{duration: 700, fill: "forwards"});
                image.style.display = "block"
            }}*/
            for (image of images){if (image != e.currentTarget){
                image.animate([{width: "0vw"},{width: "40vmin"}],{duration: 700, fill: "forwards"});
                image.animate([{height: "0vh"},{height: "56vmin"}],{duration: 700, fill: "forwards"});
            }}
            setTimeout(function() {
                window.addEventListener("mousedown",onMouseDown)
                window.addEventListener("mouseup",onMouseUp)
                window.addEventListener("mousemove" , onMouseMove)
                animateImages()
            }, 600);
            listeners = 1
            this.removeAttribute("id")
            window.removeEventListener('keydown',arrows)
        }
        
        
        //this.classList.toggle("is-active");

    })
    };
    

/* Puse ambas animaciones  en la misma funcion. 
Saque toda modificacion de atributos de la animacion. 
Tambien verifico que algo haya cambiado antes de animar*/ 

    function animateImages(){
        if (!(images[0].getBoundingClientRect().left == control)){
        for (let i = 0; i < images.length; i++) { 
            if(posiciones[i] != old_posiciones[i]){
                posiciones[i] = lerp(old_posiciones[i],posiciones[i],0.5)
                images[i].animate({objectPosition: `${posiciones[i]}% center`}, {duration: 3000, fill: "forwards"});
                old_posiciones[i] = posiciones [i];
            }
        }}
        if(transform != old_transform){
        transform = lerp(old_transform,transform,0.5)
        track.animate({transform: `translate3d(${transform}%, -50%, 0)`},{duration: 2000, fill: "forwards"});    
        //track.animate({transform: transform},{duration: 2000, fill: "forwards"});  
        old_transform = transform
    }  
        request = window.requestAnimationFrame(animateImages);        
    }
    request = window.requestAnimationFrame(animateImages);
});


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
     
    
 // Este Lerp va frenando cuando se acerca al final
/*function lerp(start, end, t) {
    return start * (1-t) + end * t;
}   
    50 a 100 con t = 0.5
    1 - 75
    2 - 87.5  
    3 - 93.75
    etc
*/
