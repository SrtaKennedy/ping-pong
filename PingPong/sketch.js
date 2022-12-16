//Variáveis da Bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// Variáveis da Velocidade da Bolinha:
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da Raquete:
let xRaquete = 8;
let yRaquete = 150;

//Variáveis do Oponente:
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do Jogo: 
let meusPontos = 0;
let pontosDoOponente = 0;

//Sons do Jogo:
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(150);
  mostraBolinha();
  movimentoDaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoDaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}
 
function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentoDaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio> width || 
     xBolinha - raio< 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentoDaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento &&
     yBolinha - raio < yRaquete + raqueteAltura &&
     yBolinha + raio > yRaquete)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();  
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
    if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(220, 20, 60);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 182, 193));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 182, 193));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function gameLoop() {
    updateKeyPresses()
    updateStates()
    drawAll()
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);