document.addEventListener("DOMContentLoaded", () => {

    const viewport = document.querySelector(".fdlxr-viewport");
    const track = document.querySelector(".fdlxr-track");

    const prevBtn = document.querySelector(".fdlxr-prev");
    const nextBtn = document.querySelector(".fdlxr-next");

    const indicators = document.querySelector(".fdlxr-indicators");

    let cards = [...document.querySelectorAll(".fdlxr-card")];

    let current = 0;

    const autoplayTime = 5000;
    let autoplay;

    //----------------------------------------------------
    // QUANTOS CARDS APARECEM
    //----------------------------------------------------

    function visibleCards(){

        if(window.innerWidth <= 768) return 1;

        if(window.innerWidth <= 992) return 2;

        return 3;

    }

    //----------------------------------------------------

    function gap(){

        return parseFloat(getComputedStyle(track).gap);

    }

    //----------------------------------------------------

    function cardWidth(){

        return cards[0].offsetWidth + gap();

    }

    //----------------------------------------------------

    function maxIndex(){

        return cards.length - visibleCards();

    }

    //----------------------------------------------------

    function move(){

        track.style.transform =
        `translateX(-${current * cardWidth()}px)`;

        updateIndicators();

    }

    //----------------------------------------------------

    function next(){

        if(current >= maxIndex()){

            current = 0;

        }else{

            current++;

        }

        move();

    }

    //----------------------------------------------------

    function prev(){

        if(current <= 0){

            current = maxIndex();

        }else{

            current--;

        }

        move();

    }

    //----------------------------------------------------
    // INDICADORES
    //----------------------------------------------------

    function createIndicators(){

        indicators.innerHTML = "";

        for(let i=0;i<=maxIndex();i++){

            const dot = document.createElement("button");

            dot.className = "fdlxr-dot";

            if(i===0){

                dot.classList.add("active");

            }

            dot.addEventListener("click",()=>{

                current = i;

                move();

                restartAutoplay();

            });

            indicators.appendChild(dot);

        }

    }

    //----------------------------------------------------

    function updateIndicators(){

        const dots = document.querySelectorAll(".fdlxr-dot");

        dots.forEach(dot=>dot.classList.remove("active"));

        if(dots[current]){

            dots[current].classList.add("active");

        }

    }

    //----------------------------------------------------

    nextBtn.addEventListener("click",()=>{

        next();

        restartAutoplay();

    });

    prevBtn.addEventListener("click",()=>{

        prev();

        restartAutoplay();

    });

    //----------------------------------------------------
    // SWIPE
    //----------------------------------------------------

    let startX = 0;

    let endX = 0;

    viewport.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

    });

    viewport.addEventListener("touchmove",(e)=>{

        endX = e.touches[0].clientX;

    });

    viewport.addEventListener("touchend",()=>{

        if(startX-endX>60){

            next();

        }

        if(endX-startX>60){

            prev();

        }

        restartAutoplay();

        startX=0;

        endX=0;

    });

    //----------------------------------------------------
    // AUTOPLAY
    //----------------------------------------------------

    function startAutoplay(){

        autoplay = setInterval(next, autoplayTime);

    }

    function stopAutoplay(){

        clearInterval(autoplay);

    }

    function restartAutoplay(){

        stopAutoplay();

        startAutoplay();

    }

    viewport.addEventListener("mouseenter",stopAutoplay);

    viewport.addEventListener("mouseleave",startAutoplay);

    //----------------------------------------------------
    // RESPONSIVO
    //----------------------------------------------------

    window.addEventListener("resize",()=>{

        if(current>maxIndex()){

            current=maxIndex();

        }

        createIndicators();

        move();

    });

    //----------------------------------------------------

    createIndicators();

    move();

    startAutoplay();

});