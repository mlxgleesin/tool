import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import model from './model/scene.gltf';

function App() {
  // const model = require('./model/scene.gltf');
  const loader = new GLTFLoader();
  console.log('loader loaded', model);
  loader.load(
    model,
    function (gltf) {
      console.log(gltf.scene);
      scene.add(gltf.scene);
    },
    function (xhr) {
      //侦听模型加载进度
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      //加载出错时的回调
      console.log('An error happened');
    },
  );

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 'blue' });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  camera.position.z = 5;

  (function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  })();
}

export default App;
