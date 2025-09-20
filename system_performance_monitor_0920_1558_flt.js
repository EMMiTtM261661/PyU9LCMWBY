// 代码生成时间: 2025-09-20 15:58:22
// Import necessary libraries
const THREE = require('three');

// Define a class for the System Performance Monitor
class SystemPerformanceMonitor {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Initialize performance metrics object
    this.performanceMetrics = {
      cpuUsage: 0,
      ramUsage: 0,
      diskUsage: 0
    };
  }

  // Update the performance metrics
  updateMetrics(cpu, ram, disk) {
    this.performanceMetrics.cpuUsage = cpu;
    this.performanceMetrics.ramUsage = ram;
    this.performanceMetrics.diskUsage = disk;
  }

  // Render the performance metrics
  render() {
    this.camera.position.z = 5;

    // Create a new geometry for each metric
    const cpuGeometry = new THREE.ConeGeometry(1, 2, 4);
    const ramGeometry = new THREE.ConeGeometry(1, 2, 4);
    const diskGeometry = new THREE.ConeGeometry(1, 2, 4);

    // Calculate the height based on the metric value
    cpuGeometry.scale(this.performanceMetrics.cpuUsage, 1, 1);
    ramGeometry.scale(this.performanceMetrics.ramUsage, 1, 1);
    diskGeometry.scale(this.performanceMetrics.diskUsage, 1, 1);

    // Create materials for each metric
    const cpuMaterial = new THREE.MeshNormalMaterial();
    const ramMaterial = new THREE.MeshNormalMaterial();
    const diskMaterial = new THREE.MeshNormalMaterial();

    // Create meshes for each metric
    const cpuMesh = new THREE.Mesh(cpuGeometry, cpuMaterial);
    const ramMesh = new THREE.Mesh(ramGeometry, ramMaterial);
    const diskMesh = new THREE.Mesh(diskGeometry, diskMaterial);

    // Position the meshes
    cpuMesh.position.set(-1, 0, 0);
    ramMesh.position.set(0, 0, 0);
    diskMesh.position.set(1, 0, 0);

    // Add meshes to the scene
    this.scene.add(cpuMesh);
    this.scene.add(ramMesh);
    this.scene.add(diskMesh);

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  // Start the animation loop
  startAnimation() {
    const animate = () => {
      this.render();
      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Create an instance of the SystemPerformanceMonitor
const monitor = new SystemPerformanceMonitor();

// Start the animation loop
monitor.startAnimation();

// Example usage: Update metrics and trigger render
monitor.updateMetrics(0.75, 0.5, 0.85);
