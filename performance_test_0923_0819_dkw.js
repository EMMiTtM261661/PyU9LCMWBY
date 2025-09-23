// 代码生成时间: 2025-09-23 08:19:07
const THREE = require('three');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Function to add a large number of objects to the scene for performance testing
function addManyObjects() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  for (let i = 0; i < 10000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 100000 - 50000;
    mesh.position.y = Math.random() * 100000 - 50000;
    mesh.position.z = Math.random() * 100000 - 50000;
    scene.add(mesh);
  }
}

// Function to run the performance test
function runTest() {
  console.time('Render Time');

  try {
    addManyObjects();
    camera.position.z = 100;
    renderer.render(scene, camera);
    console.timeEnd('Render Time');
  } catch (error) {
    console.error('An error occurred during the performance test:', error);
  }
}

// Start the test when the window is fully loaded
window.addEventListener('load', () => {
  runTest();
});