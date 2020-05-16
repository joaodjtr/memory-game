"use strict"

const sectionHome = document.getElementById('home')
let canvas, ctx, confsNum, confs, w, h

function initializeCanvas(){
    canvas = document.createElement('canvas')
    canvas.classList.add('confetti')
    sectionHome.appendChild(canvas)
    ctx = canvas.getContext('2d')
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight * 2
    confsNum = Math.floor(w / 8)
    confs = new Array(confsNum).fill().map(_ => new Confetti)
}

initializeCanvas()

export const initConfetti = () =>{
    if(!document.getElementsByClassName('confetti')[0]) initializeCanvas()
    loop()
} 

export const clearConfetti = () => {
    if(canvas) sectionHome.removeChild(canvas)
}
function loop() {
  requestAnimationFrame(loop);
	ctx.clearRect(0,0,w,h);
  
  confs.forEach((conf) => {
    conf.update();
    conf.draw();
  })
}

function Confetti () {
    const colours = ['#ff9aa2','#ffb7b2','#ffdac1','#e2f0cb','#b5ead7','#c7ceea'];

    this.x = Math.round(Math.random() * w);
    this.y = Math.round(Math.random() * h)-(h/2);
    this.rotation = Math.random()*360;

    const size = Math.random()*(w/60);
    this.size = size < 15 ? 15 : size;

    this.color = colours[Math.floor(colours.length * Math.random())];
    
    this.speed = this.size/3;
    
    const opacity = Math.random();
    this.opacity = opacity < 50 ? 75 : opacity

    this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
}

Confetti.prototype.border = function() {
  if (this.y >= h) {
    this.y = h;
  }
}

Confetti.prototype.update = function() {
  this.y += this.speed;
  
  if (this.y <= h) {
    this.x += this.shiftDirection/3;
    this.rotation += this.shiftDirection*this.speed/100;
  }

  if (this.y > h) this.border();
};

Confetti.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
  ctx.lineTo(this.x, this.y);
  ctx.closePath();
  ctx.globalAlpha = this.opacity;
  ctx.fillStyle = this.color;
  ctx.fill();
};