import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf0f0f0); 

/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-2, 1, 0.3)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// DOM Element for description
const descriptionElement = document.getElementById('description');

// Function to update the description position
function updateDescription() {
    // Project the computer model's position to screen coordinates
    const vector = new THREE.Vector3(0, 0.5, 0); // Adjust this to the model's center position
    vector.project(camera);

    // Convert normalized device coordinates to screen space
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

    // Update the description element's position
    descriptionElement.style.left = `${x}px`;
    descriptionElement.style.top = `${y}px`;
    descriptionElement.style.display = 'block';
}


/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const orbitControls = new OrbitControls(camera, renderer.domElement);

/**
 * Light
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
scene.add(ambientLight);

// Directional Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

/**
 * Objects 
 */

// temp object


const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
sphere.position.x = 1.5;
sphere.position.y = 3.5;
// scene.add(sphere)

// Temporary Computer Model (from SketchFab ni)
gltfLoader.load(
  '/models/computer/scene.gltf',
  (gltf) => 
  {
    const computer = gltf.scene;
    computer.scale.set(1.5, 1.5, 1.5);
    computer.position.set(0, -1, 0);
    computer.rotation.y = THREE.MathUtils.degToRad(-50);
    scene.add(computer);
    
    orbitControls.target.set(0, 0.5, 0);
    orbitControls.update();
    
    renderer.render(scene, camera);

    updateDescription()
  }
)

// Render the scene
const animate = function(){

  requestAnimationFrame(animate);
  orbitControls.update();
  renderer.render(scene, camera);

  updateDescription()
};

animate();

// Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateDescription()
});


// git config --global user.name "Kian"
// git config --global user.email "kians3ra@gmail.com"
