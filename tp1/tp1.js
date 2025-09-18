//https://www.youtube.com/watch?v=BiW-Jc3sZus


// variables
let imagen;              
let colorDegrade;       

let columnas = 8;       
let filas = 13;         

let anchoRect;          
let altoRect;           


function preload() {
  // cargar la imagen antes de setup
  imagen = loadImage("F_1.jpg");
}

function setup() {
  createCanvas(800, 400);

  // asignar valor a las variables
  colorDegrade = color(0);
  anchoRect = width / 2 / columnas;
  altoRect = height / float(filas);

  noLoop();
}

function draw() {
  background(255);

  // pone la imagen a la mitad izquierda
  image(imagen, 0, 0, width / 2, height);

  // nos movemos a la mitad derecha para no dibujar sobre la imagen
  push();
  translate(width / 2, 0);
  dibujarCuadricula();
  pop();
}

// función sin retorno
function dibujarCuadricula() {
  for (let col = 0; col < columnas; col++) {
    for (let fil = 0; fil < filas; fil++) {

      // para saber si la fila es par o impar
      let invertido = (fil % 2 != 0);

      // dibuja el degradado en cada rectángulo
      dibujarDegrade(col * anchoRect, fil * altoRect, anchoRect, altoRect, invertido);
      
      // borde del rectángulo
      noFill();
      stroke(0);
      rect(col * anchoRect, fil * altoRect, anchoRect, altoRect);
    }
  }
}

// función con retorno
function obtenerColor(i, w, invertido) {
  let inter = map(i, 0, w, 0, 1);
  if (invertido) {
    inter = 1 - inter;
  }
  return lerpColor(color(255), colorDegrade, inter);
}

// dibuja el degradado
function dibujarDegrade(x, y, w, h, invertido) {
  noStroke();
  for (let i = 0; i < int(w); i++) {
    let c = obtenerColor(i, w, invertido);
    stroke(c);
    line(x + i, y, x + i, y + h);
  }
}

// eventos de teclado para cambiar color
function keyPressed() {
  if (key === 'r' || key === 'R') {
    colorDegrade = color(255, 0, 0); // rojo
  } else if (key === 'g' || key === 'G') {
    colorDegrade = color(0, 255, 0); // verde
  } else if (key === 'b' || key === 'B') {
    colorDegrade = color(0, 0, 255); // azul
  } else if (key === 'n' || key === 'N') {
    colorDegrade = color(0); // negro
  }
  redraw(); // vuelve a dibujar
}
