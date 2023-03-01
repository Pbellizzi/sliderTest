document.addEventListener("DOMContentLoaded", () => {
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


    const audio = document.querySelector("audio");
    let track = document.querySelector("#track");
    let images = [...document.querySelectorAll('.image')]

    let mouseDownAt = 0; 
    let movedPercentage = 0; 
    let prevPercentage = 0;

    window.addEventListener("mousedown" ,(e) => handleOnDown(e));
    window.addEventListener("mousemove" ,(e) => handleOnMove(e));
    window.addEventListener("mouseup"   ,(e) => handleOnUp(e)  );

    /*window.ontouchstart = e => handleOnDown(e.touches[0]);
    window.ontouchend = e => handleOnUp(e.touches[0]);
    window.ontouchmove = e => handleOnMove(e.touches[0]);*/

    for (image of images){
        let elRect    =   image.getBoundingClientRect();
        let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
        let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
        /*image.style.objectPosition = `${posicion}% center`*/
        image.setAttribute = ("objectPosition",`${posicion}% center`)
                        }
    
    function animateImages(){
        for (image of images){
                let elRect    =   image.getBoundingClientRect();
                let posicionUnconstrained  =  (elRect.left + elRect.width /2) / window.innerWidth * 100
                let posicion = Math.max(Math.min(posicionUnconstrained, 100), 0)
                image.animate({objectPosition: `${posicion}% center`}, {duration: 1200, fill: "forwards"})
                                }
                window.requestAnimationFrame(animateImages)

                            }

    const handleOnDown = e => {
        mouseDownAt = parseInt(e.clientX)
        }

    const handleOnUp = () => {
            audio.pause();
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

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, {duration: 1000, fill: "forwards"});
    }

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
                }         
        );*/



    window.requestAnimationFrame(animateImages)
                   
})