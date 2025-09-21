// 代码生成时间: 2025-09-21 08:39:37
// threejs_sort_algorithm.js

// 引入THREEJS库
const THREE = require('three');

// 定义一个排序算法类
class SortAlgorithm {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.clock = new THREE.Clock();
    }

    // 生成一组随机数
    generateRandomNumbers(count, min, max) {
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return numbers;
    }

    // 可视化排序算法的过程
    visualizeSorting(numbers, sortFunc) {
        const geometry = new THREE.Geometry();

        numbers.forEach((value, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: true
            });
            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(0.1, value * 0.1, 0.1),
                material
            );
            cube.position.x = index * 0.2;
            cube.position.y = 0;
            cube.position.z = -5;
            geometry.vertices.push(cube.position);
        });

        this.scene.add(new THREE.Line(geometry.vertices, new THREE.LineBasicMaterial({
            color: 0x0000ff
        })));

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);

            const delta = this.clock.getDelta();
            let i = 0;
            while (i < numbers.length) {
                const nextIndex = sortFunc(i);
                if (nextIndex !== i) {
                    const temp = numbers[i];
                    numbers[i] = numbers[nextIndex];
                    numbers[nextIndex] = temp;
                    const cube1 = new THREE.Mesh(
                        new THREE.BoxGeometry(0.1, numbers[i] * 0.1, 0.1),
                        material
                    );
                    const cube2 = new THREE.Mesh(
                        new THREE.BoxGeometry(0.1, numbers[nextIndex] * 0.1, 0.1),
                        material
                    );
                    cube1.position.x = i * 0.2;
                    cube2.position.x = nextIndex * 0.2;

                    cube1.position.y = 0;
                    cube2.position.y = 0;

                    this.scene.remove(geometry.vertices[i]);
                    this.scene.remove(geometry.vertices[nextIndex]);

                    geometry.vertices[i] = cube1.position;
                    geometry.vertices[nextIndex] = cube2.position;

                    this.scene.add(cube1);
                    this.scene.add(cube2);

                    i = 0;
                } else {
                    i++;
                }
            }

            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    // 简单的冒泡排序算法
    bubbleSort(numbers) {
        for (let i = 0; i < numbers.length - 1; i++) {
            for (let j = 0; j < numbers.length - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    const temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;
                }
            }
        }
        return numbers.length - 1;
    }
}

// 使用示例
const sortAlgorithm = new SortAlgorithm();
const numbers = sortAlgorithm.generateRandomNumbers(50, 1, 50);
sortAlgorithm.visualizeSorting(numbers, sortAlgorithm.bubbleSort);

// 监听窗口大小变化
window.addEventListener('resize', () => {
    sortAlgorithm.camera.aspect = window.innerWidth / window.innerHeight;
    sortAlgorithm.camera.updateProjectionMatrix();
    sortAlgorithm.renderer.setSize(window.innerWidth, window.innerHeight);
});