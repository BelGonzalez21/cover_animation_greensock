const cursor_circle = document.querySelector('.cursor-circle');
const cursor = document.querySelectorAll('.cursor'); //we use querySelectorAll, so it selects all the coordinates where the mouse is.
const elements = document.querySelectorAll('.getHover');
const image_wrap = document.querySelector('.image-wrap');

//the timeline is a container for multiple animations
//we can use timeline.to() , timeline.from(), timeline.fromTo() --are methods
let timeline = gsap.timeline({
    default: {  //since its repeat several times, we can make it a default setting
        duration: 1.4,
        ease: 'power3.inOut'
    }
});
 
timeline
    .to(".image-wrap",
        {
            height: "550px",
            backgroundSize: '100%',
            duration: 1.5,
            ease: "power4.inOut", //we get the animation easing from greensock > docs > eases > power4 with inOut
            backgroundSize: "100%", //cambie en el css y esto lo reduce cuando se descubre todo
        }) //this allows us animate from the current state ti wherever state we spicify in there
    .to(".image-wrap", //segunda animation
        {
            height: "250px",
            backgroundPosition: "50% 58%",
            // duration: 1.3,
            y: "0", //lo lleva arriba
            // ease: "power3.inOut",
        },
        1.5
    )
    .from('.big-name',
        {
            y: getYDistant('.big-name'), //r1
            // duration: 1.3,
            // ease: "power3.inOut",

        },
        1.5 //third parameter - position parameter- means that both animations will start at 1.5 after the previous animation
    )
    .from('.hide',
        {
            opacity: '0',
            // duration: 1.2,
            // ease: "power3.inOut",
        },
        1.5 //start at the same time than the text
    );

//function that return the distance between the test and the bottom edge of the screen, so when is animated it won't show until the photo make its transformation if the screen is bigger than the distant y:'1000px' in r1.

function getYDistant(el) {
    return (
        window.innerHeight - document.querySelector(el).getBoundingClientRect().top
    );
} //el is the .big-name -the text


window.addEventListener('mousemove', (e) => { 
    // console.log('hello');
    let xPosition = e.clientX; //use of clientX to get the mouse position
    let yPosition = e.clientY;
    // console.log(xPosition, yPosition);
    cursor.forEach((el) => {
        el.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
        el.style.opacity= '1';
    });
});

elements.forEach(el => {
    el.addEventListener('mouseover', () => {
        // console.log('hovered!'); //identifica todos los links
        cursor_circle.classList.add('biggerCursor')
    });
    el.addEventListener('mouseout', () => {
        // console.log('hovered!'); //identifica todos los links
        cursor_circle.classList.remove('biggerCursor')
    });
});
image_wrap.addEventListener('mousemove', (e) => {
    // console.log('moving');
    let rect = image_wrap.getBoundingClientRect() //image top and left position
    x = e.clientX - rect.left, //mouse x position within the image
    y = e.clientY - rect.top;  //mouse y position within the image
    // console.log(x, y);
    let xSpeed = 0.008;
    let ySpeed = 0.02;

    let xMoving = x - image_wrap.clientWidth / 2;
    let yMoving = y - image_wrap.clientHeight / 2;
    // console.log(xMoving, yMoving); //show the position relative to the center of the image.
    image_wrap.style.backgroundPosition = `calc(50% + ${xMoving * xSpeed}px) calc(58% + ${yMoving * ySpeed}px)`
});

setTimeout(() => {
    image_wrap.style.pointerEvents = 'auto';
}, timeline.endTime() * 1000);
