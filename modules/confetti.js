"use strict"

const sectionHome = document.getElementById('home')
let canvas, ctx, confsNum, confs, w, h, req
let counter = 0

function initializeCanvas(){
    canvas = document.createElement('canvas')
    canvas.classList.add('confetti')
    canvas.classList.add(counter)
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
  if(req) cancelAnimationFrame(req)
  if(typeof canvas === 'object') sectionHome.removeChild(canvas)
}

function loop() {
  req = requestAnimationFrame(loop);
	ctx.clearRect(0,0,w,h);
  
  confs.forEach((conf) => {
    conf.update();
    conf.draw();
  })
}

function Confetti () {
    const colours = ['#cc99c9','#9ec1cf','#9ee09e','#fdfd97','#feb144','#ff6663'];

    this.x = Math.round(Math.random() * w);
    this.y = Math.round(Math.random() * h)-(h/2);
    
    this.rotation = Math.random()*360;

    const size = Math.random()*(w/60);
    this.size = size < 15 ? 15 : size;

    this.color = colours[Math.floor(colours.length * Math.random())];
    
    this.speed = this.size/3;
    
    const opacity = Math.random();
    this.opacity = opacity < .5 ? .75 : opacity

    this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
}

Confetti.prototype.border = function() {
  this.y = h;
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