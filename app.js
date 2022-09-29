const sizes= document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackground');

let prevColor = 'blue'; 
let animationEnd = true;

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){  //se debe colocar la propiedad primary en el html
    if(!animationEnd) return;
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color'); //select the show with the color selected
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);
    // console.log(color) //reconoce el color pero no lo cambia
    // console.log(primary) //me muestra si estan seleccionados los colores
    if(color ==  prevColor) return;

    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);

    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    prevGradient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

sizes.forEach(size => size.addEventListener('click', changeSize)); //to add the click event to each size element
colors.forEach(c => c.addEventListener('click', changeColor));

let x = window.matchMedia('(max-width: 1000px)'); 

function changeHeight(){ //funtion para matchear la altura del background con la imagen
    if(x.matches){ //x.match is like @media(max-width: 1000px)
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);