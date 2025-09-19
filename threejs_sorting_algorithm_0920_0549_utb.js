// 代码生成时间: 2025-09-20 05:49:50
// threejs_sorting_algorithm.js
// This script implements a sorting algorithm visualized using THREE.js

// Import necessary THREE.js modules
import * as THREE from 'three';

// Function to create a bar for each element in the array
function createBar(scene, value, width, height, color) {
    const geometry = new THREE.BoxGeometry(width, height, 1);
    const material = new THREE.MeshBasicMaterial({color: color});
    const bar = new THREE.Mesh(geometry, material);
    bar.position.y = value / 2;
    scene.add(bar);
    return bar;
}

// Function to render the sorting algorithm animation
function animateSorting(scene, bars, sortingAlgorithm) {
    let currentIndex = 0;
    let maxIndex = bars.length - 1;
    let animationStep = 0;

    function animate() {
        requestAnimationFrame(animate);
        if (animationStep < sortingAlgorithm.length) {
            const {swapIndices, color} = sortingAlgorithm[animationStep];
            if (swapIndices !== undefined) {
                const tempBar = bars[swapIndices[0]].position.clone();
                bars[swapIndices[0]].position = bars[swapIndices[1]].position.clone();
                bars[swapIndices[1]].position = tempBar;
            }
            bars.forEach((bar, index) => {
                bar.material.color.set(color);
            });
            animationStep++;
        } else {
            cancelAnimationFrame(animate);
        }
    }
    animate();
}

// Function to initialize the scene and add bars based on the array values
function initScene(array) {
    const width = 0.4;
    const height = 0.4;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const bars = array.map((value) => createBar(scene, value, width, height, 0xCCCCCC));
    camera.position.z = 5;
    return {scene, bars};
}

// Example sorting algorithm (Bubble Sort)
const bubbleSortAlgorithm = [];
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            bubbleSortAlgorithm.push({swapIndices: [j, j + 1], color: 0xFF0000});
        } else {
            bubbleSortAlgorithm.push({color: 0xCCCCCC});
        }
    }
}

// Function to run the sorting algorithm
function runSortingAlgorithm(array) {
    try {
        const {scene, bars} = initScene(array);
        animateSorting(scene, bars, bubbleSortAlgorithm);
        // Render the scene
        function render() {
            renderer.render(scene, camera);
        }
        render();
    } catch (error) {
        console.error('Error running sorting algorithm:', error);
    }
}

// Example usage with an array of random numbers
const array = Array.from({length: 50}, () => Math.floor(Math.random() * 100));
runSortingAlgorithm(array);