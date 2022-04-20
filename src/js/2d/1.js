import perlin from './perlin';

console.log(perlin(0, 1, 0));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`

const count = 700;
const radius = 100;

let c = 0;
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(100, 400*perlin(0, c/10, 0), 10, 10)
    ctx.save()
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
        let angle = i*2*Math.PI/count
        let x = Math.cos(angle)*radius + 10*(perlin(i/10, c/10, 0) - 0.5)
        let y = Math.sin(angle)*radius + 10*(perlin(i/10, c/9, 0) - 0.5)
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    c++;
    window.requestAnimationFrame(draw)
}   
draw()