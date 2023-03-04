document.addEventListener("DOMContentLoaded", () => {

    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    
    
    
    
    /*
    function fadeOut(){
        if(audio.volume.toFixed(2)  >= 0.1){
            audio.volume -= 0.1;
            setTimeout(fadeOut, 100);
        }else{
           
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
    }*/

    const audio = document.querySelector("audio");
    const track = document.querySelector("#track");
    const images = [...document.querySelectorAll('.image')]

    let mouseDownAt     = 0; 
    let movedPercentage = 0; 
    let prevPercentage  = 0;

    window.addEventListener("mousedown" ,(e) => handleOnDown(e));
    window.addEventListener("mouseup"   ,(e) => handleOnUp(e)  );
    window.addEventListener("mousemove" ,(e) => handleOnMove(e));
    /*window.ontouchstart = e => handleOnDown(e.touches[0]);
    window.ontouchend = e => handleOnUp(e.touches[0]);
    window.ontouchmove = e => handleOnMove(e.touches[0]);*/

    const handleOnDown = e => {
            /*audio.play()*/
            mouseDownAt = parseInt(e.clientX)
            console.log(audio.volume)
        }

        
    const handleOnUp = () => {
        /*audio.pause()*/
        mouseDownAt = 0;
        movedPercentage = prevPercentage
    }
    const handleOnMove = e => {
         if((mouseDownAt) === 0) return
        const mouseDelta = parseFloat(mouseDownAt) - e.clientX;    
        /*No estoy usando el ancho de la pantalla para determinar la velocidad del scroll*/
        /*const   maxDelta = window.innerWidth / 2;*/ 
        const percentage = (mouseDelta / 2000) * -100;
        const nextPercentageUnconstrained = parseFloat(movedPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        prevPercentage = nextPercentage;

    }

    /* Puse ambas animaciones  en la misma funcion. Queda revisar si puedo sacar el for loop de la animacion*/

    function animateImages(){
        for (image of images){
            let elRect    =   image.getBoundingClientRect();
            let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
            let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
            image.animate({objectPosition: `${posicion}% center`}, {duration: 1200, fill: "forwards"})
                                }
                                track.animate({transform: `translate3d(${prevPercentage}%, -50%, 0)`},{duration: 1000, fill: "forwards"});
                                request = requestAnimationFrame(function(){animateImages()})

                            }
       
    request = requestAnimationFrame(function(){animateImages()})
 
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

/*const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;*/