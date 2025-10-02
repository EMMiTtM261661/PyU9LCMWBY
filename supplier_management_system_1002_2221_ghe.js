// 代码生成时间: 2025-10-02 22:21:43
 * manages supplier data and interactions.
 */

// Import necessary modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Define the global scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize the OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);

// Supplier class to handle supplier data
class Supplier {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  // Method to display supplier information
  displayInfo() {
    console.log(`Supplier ID: ${this.id}, Name: ${this.name}, Address: ${this.address}`);
  }
}

// Function to add a supplier to the scene
function addSupplier(supplier) {
  try {
    // Create a 3D object to represent the supplier
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const supplierMesh = new THREE.Mesh(geometry, material);

    // Set the position based on the supplier ID
    supplierMesh.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
    scene.add(supplierMesh);

    // Add interactivity to display supplier info on click
    supplierMesh.name = supplier.name;
    supplierMesh.addEventListener('click', () => {
      supplier.displayInfo();
    });
  } catch (error) {
    console.error('Error adding supplier:', error);
  }
}

// Function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// Initial setup and animation loop
function init() {
  camera.position.z = 5;
  animate();
}

// Example usage
const supplier1 = new Supplier(1, 'Supplier A', '123 Main St');
addSupplier(supplier1);

// Call the init function to start the scene
init();