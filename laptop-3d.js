import * as THREE from "three";

const stage = document.getElementById("laptopStage");
const canvas = document.getElementById("laptopCanvas");
const loading = document.getElementById("laptopLoading");

if (stage && canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    stage.clientWidth / stage.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 3.1, 8.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const laptop = new THREE.Group();
  laptop.rotation.set(-0.12, 0.42, 0);
  scene.add(laptop);

  // Matériaux inspirés d’un MacBook : aluminium brossé, clavier noir et écran verre.
  const aluminumTexture = (() => {
    const c = document.createElement("canvas");
    c.width = 256; c.height = 256;
    const ctx = c.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 256, 256);
    g.addColorStop(0, "#d9dce0");
    g.addColorStop(.5, "#aeb4ba");
    g.addColorStop(1, "#e7e9eb");
    ctx.fillStyle = g; ctx.fillRect(0,0,256,256);
    for(let i=0;i<900;i++){
      const x=Math.random()*256, y=Math.random()*256;
      ctx.fillStyle=`rgba(255,255,255,${Math.random()*.055})`;
      ctx.fillRect(x,y,Math.random()*45+8,.6);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(5,5);
    return t;
  })();

  const materials = {
    body: new THREE.MeshStandardMaterial({
      color: 0xc7cbd0, metalness: 0.92, roughness: 0.22, map: aluminumTexture
    }),
    edge: new THREE.MeshStandardMaterial({
      color: 0x9fa5ab, metalness: 0.95, roughness: 0.2, map: aluminumTexture
    }),
    screen: new THREE.MeshStandardMaterial({
      color: 0x11151b, metalness: 0.18, roughness: 0.12,
      emissive: 0x0b111c, emissiveIntensity: 0.28
    }),
    key: new THREE.MeshStandardMaterial({
      color: 0x17191c, metalness: 0.15, roughness: 0.42
    }),
    trackpad: new THREE.MeshStandardMaterial({
      color: 0xb8bdc2, metalness: 0.7, roughness: 0.24
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x0b1017, metalness: 0.25, roughness: 0.08,
      transmission: 0.04, clearcoat: 0.7, clearcoatRoughness: 0.12
    })
  };
  const base = new THREE.Group();
  laptop.add(base);

  const baseMesh = new THREE.Mesh(
    new THREE.BoxGeometry(5.7, 0.28, 3.65),
    materials.body
  );
  baseMesh.position.y = 0;
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  base.add(baseMesh);

  const keyboardPlate = new THREE.Mesh(
    new THREE.BoxGeometry(5.15, 0.10, 2.65),
    materials.edge
  );
  keyboardPlate.position.set(0, 0.19, -0.18);
  keyboardPlate.castShadow = true;
  base.add(keyboardPlate);

  const keyGeometry = new THREE.BoxGeometry(0.32, 0.055, 0.25);
  const keyGroup = new THREE.Group();
  keyGroup.position.set(-1.95, 0.29, -0.92);
  base.add(keyGroup);

  for (let row = 0; row < 5; row++) {
    const count = row === 4 ? 8 : 11;
    for (let col = 0; col < count; col++) {
      const key = new THREE.Mesh(keyGeometry, materials.key);
      key.position.x = col * 0.38 + (row === 4 ? 0.55 : 0);
      key.position.z = row * 0.36;
      key.castShadow = true;
      keyGroup.add(key);
    }
  }

  const trackpad = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 0.07, 0.95),
    materials.trackpad
  );
  trackpad.position.set(0, 0.29, 1.02);
  trackpad.castShadow = true;
  base.add(trackpad);

  const hinge = new THREE.Group();
  hinge.position.set(0, 0.18, -1.58);
  base.add(hinge);

  const lid = new THREE.Group();
  lid.position.set(0, 0, 0);
  hinge.add(lid);

  const screenFrame = new THREE.Mesh(
    new THREE.BoxGeometry(5.65, 3.55, 0.20),
    materials.body
  );
  screenFrame.position.set(0, 1.77, 0);
  screenFrame.rotation.x = -Math.PI / 2;
  screenFrame.castShadow = true;
  lid.add(screenFrame);

  const screenPanel = new THREE.Mesh(
    new THREE.BoxGeometry(5.05, 2.95, 0.035),
    materials.glass
  );
  screenPanel.position.set(0, 1.77, -0.12);
  screenPanel.rotation.x = -Math.PI / 2;
  lid.add(screenPanel);

  const logo = new THREE.Mesh(
    new THREE.CircleGeometry(0.23, 32),
    new THREE.MeshStandardMaterial({
      color: 0xf2f4f6,
      metalness: 0.85,
      roughness: 0.18,
      emissive: 0x111111,
      emissiveIntensity: 0.08
    })
  );
  logo.position.set(0, 3.34, -0.13);
  logo.rotation.x = -Math.PI / 2;
  lid.add(logo);

  // Lights
  scene.add(new THREE.HemisphereLight(0xf4f7fb, 0x1b1e22, 2.4));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
  keyLight.position.set(5, 7, 6);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xff8a65, 1.1, 14);
  rimLight.position.set(-4, 2.5, -3);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x9db8ff, 1.0, 12);
  fillLight.position.set(4, 1, 3);
  scene.add(fillLight);

  // Ground shadow
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 10),
    new THREE.ShadowMaterial({ color: 0x2e211d, opacity: 0.16 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.38;
  ground.receiveShadow = true;
  scene.add(ground);

  let targetRotY = 0.42;
  let targetRotX = -0.12;
  let zoom = 8.2;
  let targetZoom = 8.2;
  let autoRotate = false;
  let opened = false;
  let targetLid = -0.05;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  function rotateBy(delta) {
    targetRotY += delta;
  }

  function resetView() {
    targetRotY = 0.42;
    targetRotX = -0.12;
    targetZoom = 8.2;
    targetLid = -0.05;
    opened = false;
    autoRotate = false;
    updateAutoButton();
  }

  function updateAutoButton() {
    const btn = document.getElementById("rotateButton");
    if (!btn) return;
    btn.classList.toggle("is-active", autoRotate);
    btn.innerHTML = autoRotate
      ? '<i class="fa-solid fa-pause"></i> Stop'
      : '<i class="fa-solid fa-arrows-rotate"></i> Auto';
  }

  document.getElementById("rotateLeftButton")?.addEventListener("click", () => {
    rotateBy(-Math.PI / 4);
  });

  document.getElementById("rotateRightButton")?.addEventListener("click", () => {
    rotateBy(Math.PI / 4);
  });

  document.getElementById("rotateButton")?.addEventListener("click", () => {
    autoRotate = !autoRotate;
    updateAutoButton();
  });

  document.getElementById("openButton")?.addEventListener("click", () => {
    opened = !opened;
    targetLid = opened ? -0.72 : -0.05;
    const btn = document.getElementById("openButton");
    btn.innerHTML = opened
      ? '<i class="fa-solid fa-laptop"></i> Fermer'
      : '<i class="fa-solid fa-laptop"></i> Ouvrir';
  });

  document.getElementById("resetButton")?.addEventListener("click", resetView);

  document.getElementById("componentsButton")?.addEventListener("click", () => {
    const btn = document.getElementById("componentsButton");
    const visible = keyGroup.visible;
    keyGroup.visible = !visible;
    trackpad.visible = !visible;
    btn.classList.toggle("is-active", !visible);
    btn.innerHTML = !visible
      ? '<i class="fa-solid fa-eye-slash"></i> Masquer'
      : '<i class="fa-solid fa-microchip"></i> Composants';
  });

  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(e.pointerId);
  });

  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    targetRotY += dx * 0.012;
    targetRotX = THREE.MathUtils.clamp(targetRotX + dy * 0.008, -0.7, 0.55);
  });

  function stopDrag() {
    dragging = false;
    stage.classList.remove("is-dragging");
  }

  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);
  stage.addEventListener("pointerleave", stopDrag);

  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    targetZoom = THREE.MathUtils.clamp(targetZoom + e.deltaY * 0.006, 5.8, 11);
  }, { passive: false });

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  window.addEventListener("resize", resize);

  function animate() {
    requestAnimationFrame(animate);

    if (autoRotate && !dragging) targetRotY += 0.006;

    laptop.rotation.y += (targetRotY - laptop.rotation.y) * 0.08;
    laptop.rotation.x += (targetRotX - laptop.rotation.x) * 0.08;
    lid.rotation.x += (targetLid - lid.rotation.x) * 0.10;
    camera.position.z += (targetZoom - camera.position.z) * 0.08;
    camera.lookAt(0, 0.9, 0);

    renderer.render(scene, camera);
  }

  resize();
  loading?.classList.add("is-hidden");
  updateAutoButton();
  animate();
}
