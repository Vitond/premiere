import * as THREE from 'three';
import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls';

let renderer;
let scene;
let camera;
let geometry = new THREE.BufferGeometry();
let positions = [];
let colors = [];
let x, y, z;

let width = window.innerWidth;
let height = window.innerHeight;

const count = 10000;

const size = 1000;
const tempCanvas = document.createElement('canvas');
const ctx = tempCanvas.getContext('2d');
tempCanvas.width = size;
tempCanvas.height = size;

let randomValuesArray = [];
let randomValuesArray2 = [];
let randomValuesArray3 = [];
for (let i = 0; i < count; i++) {
    randomValuesArray.push(Math.random());
    randomValuesArray2.push(Math.random());
    randomValuesArray3.push(Math.random());
}

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const container = document.getElementById('container');
    
    camera = new THREE.PerspectiveCamera(90, width / height);
    camera.position.z = 1000;

    //const controls = new OrbitControls(camera, renderer.domElement);

    const texture = (new THREE.TextureLoader).load("img/particle.png");
    const material = new THREE.PointsMaterial({
        size: 10,
        vertexColors: THREE.VertexColors,
        map: texture,
        alphaTest: 0.5
    })

    for (let i = 0; i < count; i++) {
        //x = Math.sin(i)*100;
        //y = Math.cos(i)*100;
       
        x = i;
        y = i/2;
        z = Math.random()*1000;

    
        positions.push(x);
        positions.push(y);
        positions.push(z);
    
        colors.push((x/count)*0.2+Math.random()*0.8);
        colors.push((y/count)*0.4 + Math.random()*0.2);
        colors.push(0.3 + Math.random()*0.2);
        //colors.push(1)
        //colors.push(1)
        //colors.push(1);
        //colors.push(1);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    container.appendChild(renderer.domElement);
};


let j = 0;
const render = () => {
    j++;
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
    let position = geometry.getAttribute('position');
    // position.array = position.array.map((n, i) => {
    //     return positions[i];
    // });
    let positions = [];
    // for (let i = 0; i <=count ; i++) {
    //     x = Math.sin(i)*100;
    //     y = Math.cos(i)*100;
    //     z = -i*2 + j*2;
    
    //     positions.push(x);
    //     positions.push(y);
    //     positions.push(z);
    // }
    for (let i = 0; i < count; i++) {
             
        x = (randomValuesArray[i]-0.5)*900
        y = (randomValuesArray2[i]-0.5)*900;
        z = (randomValuesArray3[i]-0.5)*900;
        if (i >= 0) {
            x = Math.sin(i/9 + j/400)*90 + Math.cos(i/100)*200
            y = Math.cos(i/70 + j/2000)*900 + Math.sin(j/1000)*10
            z = Math.sin(i/16 + j/600)*900
        }  
        positions.push(x);
        positions.push(y);
        positions.push(z);
    }
    position.array = new Float32Array(positions);
    position.needsUpdate = true;
    if (j%10 === 0) {
       
    }
};

init();
renderer.setSize(width, height);
render();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;
});

const timerElement = document.getElementById('timer');
const endTimer = () => {
    timerElement.style.opacity = 0;
    const audio = new Audio('music/music.mp3');
    audio.play()
};

let ended = false;
//const date2 = new Date(+(new Date()) + 10000);
const countdown = () => {
    const now = new Date();
    const date2 = new Date(2022, 3, 20, 19, 45);
     
    let timeDiff = date2 - now;
    
    if (timeDiff < 1000) {
        ended = true;
    }
    
   
    
    if (!ended) {
        const hours = Math.floor(timeDiff / (3600*1000))
        updateHours(hours);
        timeDiff = timeDiff - hours*3600*1000;
        const minutes = Math.floor(timeDiff/ (60*1000))
        updateMinutes(minutes)
        timeDiff = timeDiff - minutes*60*1000
        const seconds = Math.floor(timeDiff/1000)
        updateSeconds(seconds);
        setTimeout(countdown, 500)
    } else {
        endTimer();
    }
}

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const updateHours = (h) => {
    hoursElement.innerHTML = h + "<span>h</span>";
};
const updateMinutes = (m) => {
    minutesElement.innerHTML = m + "<span>m</span>";
};
const updateSeconds = (s) => {
    secondsElement.innerHTML = s + "<span>s</span>";
};


const start = () => {
    countdown();
    
};

const entrance = document.getElementById('entrance');
const content = document.getElementById('content');

entrance.addEventListener('mousedown', () => {
    entrance.classList.toggle('hidden');
    content.classList.toggle('hidden');
    start();
})
