import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface SceneObjectInteractions {
  chasmDistance: number;
  hasCrossedChasm: boolean;
  isNearChasm: boolean;
}

export class CrystalForestScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public container: HTMLDivElement;

  // Scene elements
  private crystals: THREE.Group[] = [];
  private particleSystem: THREE.Points | null = null;
  private grassMesh: THREE.InstancedMesh | null = null;
  private bridgeSlabs: THREE.Mesh[] = [];
  public isBridgeFormed: boolean = false;
  private bridgeAnimationProgress: number = 0;

  // Software WebGL flag
  public isSoftwareGl: boolean = false;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    
    // Camera 3rd Person initial position
    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      150
    );
    this.camera.position.set(0, 3.5, 6);

    // Software WebGL Detection
    this.isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // WebGL Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    this.setupEnvironment();
    this.buildTerrainAndGrass();
    this.buildGlowingCrystals();
    this.buildAncientRuins();
    this.buildFloatingParticles();
    this.buildChasmAndBridge();
  }

  private setupEnvironment() {
    // Mystical Twilight Sky & Fog
    this.scene.background = new THREE.Color(0x0f0b1e);
    this.scene.fog = new THREE.FogExp2(0x17102b, 0.035);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig
    // Warm Key Light
    const keyLight = new THREE.DirectionalLight(0xfef08a, 1.8);
    keyLight.position.set(15, 25, 10);
    if (!this.isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.left = -25;
      keyLight.shadow.camera.right = 25;
      keyLight.shadow.camera.top = 25;
      keyLight.shadow.camera.bottom = -25;
      keyLight.shadow.bias = -0.0005;
    }
    this.scene.add(keyLight);

    // Cool Twilight Hemisphere Fill
    const hemiLight = new THREE.HemisphereLight(0xa855f7, 0x1e1b4b, 1.2);
    this.scene.add(hemiLight);
  }

  private buildTerrainAndGrass() {
    // 1. Terrain Ground Mesh (Divided into Near Forest Shore & Far Forest Shore)
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e1233,
      roughness: 0.85,
      metalness: 0.1
    });

    // Near Shore (Playable start area: Z = +10 to Z = -20)
    const nearGroundGeo = new THREE.PlaneGeometry(35, 30);
    const nearGround = new THREE.Mesh(nearGroundGeo, groundMat);
    nearGround.rotation.x = -Math.PI / 2;
    nearGround.position.set(0, 0, -5);
    nearGround.receiveShadow = true;
    this.scene.add(nearGround);

    // Far Shore (Destination across Chasm: Z = -28 to Z = -50)
    const farGroundGeo = new THREE.PlaneGeometry(35, 22);
    const farGround = new THREE.Mesh(farGroundGeo, groundMat);
    farGround.rotation.x = -Math.PI / 2;
    farGround.position.set(0, 0, -39);
    farGround.receiveShadow = true;
    this.scene.add(farGround);

    // 2. Instanced 3D Grass Blades (1200 Blades swaying in wind)
    const bladeGeo = new THREE.ConeGeometry(0.08, 0.6, 3);
    bladeGeo.translate(0, 0.3, 0);

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.7,
      emissive: 0x10b981,
      emissiveIntensity: 0.2
    });

    const count = 1000;
    this.grassMesh = new THREE.InstancedMesh(bladeGeo, grassMat, count);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      // Scatter in near shore
      const x = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 28 - 5;
      const scale = 0.7 + Math.random() * 0.6;

      dummy.position.set(x, 0, z);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.rotation.x = (Math.random() - 0.5) * 0.2;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      this.grassMesh.setMatrixAt(i, dummy.matrix);
    }
    this.grassMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(this.grassMesh);
  }

  private buildGlowingCrystals() {
    // Glowing Blue (#38bdf8) and Purple (#c084fc) Octahedron Crystals
    const crystalGeo = new THREE.OctahedronGeometry(1.2, 0);

    const blueMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.2,
      transmission: this.isSoftwareGl ? 0 : 0.8,
      transparent: true,
      opacity: 0.95
    });

    const purpleMat = new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      emissiveIntensity: 1.8,
      roughness: 0.1,
      metalness: 0.2,
      transmission: this.isSoftwareGl ? 0 : 0.8,
      transparent: true,
      opacity: 0.95
    });

    // Preset crystal positions along the forest path
    const crystalPositions = [
      { x: -6, z: 2, mat: blueMat, scale: 1.2 },
      { x: 6, z: 0, mat: purpleMat, scale: 1.5 },
      { x: -7, z: -10, mat: purpleMat, scale: 1.8 },
      { x: 7, z: -12, mat: blueMat, scale: 1.4 },
      { x: -4, z: -18, mat: blueMat, scale: 2.0 }, // Near Chasm Edge
      { x: 4, z: -18, mat: purpleMat, scale: 2.0 }, // Near Chasm Edge
      { x: -5, z: -32, mat: purpleMat, scale: 1.6 },
      { x: 5, z: -32, mat: blueMat, scale: 1.6 }
    ];

    crystalPositions.forEach((pos, idx) => {
      const cluster = new THREE.Group();
      cluster.position.set(pos.x, 0, pos.z);

      // Main Crystal Pillar
      const main = new THREE.Mesh(crystalGeo, pos.mat);
      main.scale.set(pos.scale * 0.5, pos.scale, pos.scale * 0.5);
      main.rotation.y = idx * 0.5;
      main.castShadow = true;
      cluster.add(main);

      // Secondary Side Crystal Spikes
      for (let s = 0; s < 3; s++) {
        const spike = new THREE.Mesh(crystalGeo, pos.mat);
        spike.scale.set(pos.scale * 0.25, pos.scale * 0.5, pos.scale * 0.25);
        spike.position.set((s - 1) * 0.6, 0.2, (s % 2 === 0 ? 0.4 : -0.4));
        spike.rotation.z = (s - 1) * 0.4;
        cluster.add(spike);
      }

      // PointLight inside crystal
      const light = new THREE.PointLight(pos.mat === blueMat ? 0x38bdf8 : 0xc084fc, 2.5, 10);
      light.position.y = 1.0;
      cluster.add(light);

      this.crystals.push(cluster);
      this.scene.add(cluster);
    });
  }

  private buildAncientRuins() {
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.9,
      metalness: 0.1
    });

    // 1. Ancient Chasm Gateway Pillars (Z = -19)
    const pillarGeo = new THREE.CylinderGeometry(0.8, 1.0, 5, 8);

    const leftPillar = new THREE.Mesh(pillarGeo, stoneMat);
    leftPillar.position.set(-6, 2.5, -19);
    leftPillar.castShadow = true;
    this.scene.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, stoneMat);
    rightPillar.position.set(6, 2.5, -19);
    rightPillar.castShadow = true;
    this.scene.add(rightPillar);

    // Ancient Archway Header over Chasm Entrance
    const archGeo = new THREE.BoxGeometry(14, 1.2, 1.2);
    const archHeader = new THREE.Mesh(archGeo, stoneMat);
    archHeader.position.set(0, 5.4, -19);
    archHeader.castShadow = true;
    this.scene.add(archHeader);

    // Carved Rune Inscription on Archway
    const runeGeo = new THREE.BoxGeometry(10, 0.4, 0.1);
    const runeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const runeMesh = new THREE.Mesh(runeGeo, runeMat);
    runeMesh.position.set(0, 5.4, -18.3);
    this.scene.add(runeMesh);
  }

  private buildFloatingParticles() {
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Cyan to Purple color gradient
      colors[i * 3] = Math.random() > 0.5 ? 0.22 : 0.75;
      colors[i * 3 + 1] = 0.74;
      colors[i * 3 + 2] = 0.98;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particleSystem);
  }

  private buildChasmAndBridge() {
    // 1. Chasm Abyss Gap (Z = -20 to Z = -28)
    // Deep Glowing Purple Plasma Plane below
    const plasmaGeo = new THREE.PlaneGeometry(40, 10);
    const plasmaMat = new THREE.MeshBasicMaterial({
      color: 0x7e22ce,
      side: THREE.DoubleSide
    });
    const plasmaPlane = new THREE.Mesh(plasmaGeo, plasmaMat);
    plasmaPlane.rotation.x = -Math.PI / 2;
    plasmaPlane.position.set(0, -6, -24);
    this.scene.add(plasmaPlane);

    // 2. Magical 3D Crystal Bridge Slabs (5 Slabs across gap)
    const slabGeo = new THREE.BoxGeometry(4.0, 0.4, 1.4);
    const bridgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.3,
      transmission: this.isSoftwareGl ? 0 : 0.7,
      transparent: true,
      opacity: 0.9
    });

    for (let i = 0; i < 5; i++) {
      const slab = new THREE.Mesh(slabGeo, bridgeMat);
      // Positioned across the gap Z = -20.5 to Z = -27.5
      const targetZ = -20.5 - i * 1.5;
      slab.position.set(0, -5, targetZ); // Start hidden below chasm
      slab.visible = false;
      this.bridgeSlabs.push(slab);
      this.scene.add(slab);
    }
  }

  /**
   * Trigger 3D Magical Bridge Assembly Animation when Math Formula is solved!
   */
  public triggerBridgeFormation() {
    this.isBridgeFormed = true;
    this.bridgeAnimationProgress = 0;
  }

  /**
   * Update scene animation & camera 3rd person tracking
   */
  public update(delta: number, playerX: number, playerZ: number) {
    // 1. Camera 3rd Person Smooth Follow
    const targetCamX = playerX;
    const targetCamY = 3.5;
    const targetCamZ = playerZ + 6.0;

    this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, targetCamX, 5, delta);
    this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, targetCamY, 5, delta);
    this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, targetCamZ, 5, delta);
    this.camera.lookAt(playerX, 1.6, playerZ - 2.0);

    // 2. Animate Floating Particles
    if (this.particleSystem) {
      const pos = this.particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += delta * 0.5; // Rise up
        if (pos[i * 3 + 1] > 15) pos[i * 3 + 1] = 0; // Reset to bottom
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Animate Crystals Rotation & Glow
    this.crystals.forEach((cluster, idx) => {
      cluster.rotation.y += delta * 0.3 * (idx % 2 === 0 ? 1 : -1);
    });

    // 4. Animate Magical 3D Bridge Formation Slabs
    if (this.isBridgeFormed && this.bridgeAnimationProgress < 1.0) {
      this.bridgeAnimationProgress += delta * 1.5;
      
      this.bridgeSlabs.forEach((slab, idx) => {
        const slabDelay = idx * 0.15;
        if (this.bridgeAnimationProgress > slabDelay) {
          slab.visible = true;
          const progress = Math.min(1.0, (this.bridgeAnimationProgress - slabDelay) * 3);
          const targetY = 0.0;
          // Smoothly rise out of abyss to ground level
          slab.position.y = -5 + progress * (targetY - (-5));
          if (slab.material instanceof THREE.MeshPhysicalMaterial) {
            slab.material.emissiveIntensity = 1.0 + Math.sin(Date.now() * 0.005) * 0.5;
          }
        }
      });
    }

    // 5. Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  public handleResize() {
    if (!this.container) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  public dispose() {
    this.renderer.dispose();
  }
}
