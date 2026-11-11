import * as THREE from 'three';
import { CharacterAvatar } from '../../types/characterTypes';

/**
 * Procedural 3D Anime Character Generator for Three.js
 * Builds 3-12 part composite 3D models of Anime Boy and Anime Girl
 * wearing futuristic fantasy-academy jackets with glowing neon accents.
 */
export class AnimeCharacter3D {
  public group: THREE.Group;
  public avatar: CharacterAvatar;
  
  // Body parts for walking/idle animations
  private headMesh: THREE.Group;
  private leftArm: THREE.Group;
  private rightArm: THREE.Group;
  private leftLeg: THREE.Group;
  private rightLeg: THREE.Group;
  private capeOrCollar: THREE.Mesh | null = null;
  private neonTrims: THREE.Mesh[] = [];

  private walkCycle: number = 0;

  constructor(avatar: CharacterAvatar) {
    this.avatar = avatar;
    this.group = new THREE.Group();
    this.headMesh = new THREE.Group();
    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();
    this.leftLeg = new THREE.Group();
    this.rightLeg = new THREE.Group();

    this.buildCharacter();
  }

  private buildCharacter() {
    const isMale = this.avatar.gender === 'male';
    const jacketColor = isMale ? 0x1e1b4b : 0x4c1d95;
    const neonColor = isMale ? 0x38bdf8 : 0xf472b6;
    const hairHex = parseInt((this.avatar.hairColor || (isMale ? '#1e1b4b' : '#312e81')).replace('#', ''), 16);

    // Shared Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.6,
      metalness: 0.05
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: jacketColor,
      roughness: 0.35,
      metalness: 0.2
    });

    const neonMat = new THREE.MeshStandardMaterial({
      color: neonColor,
      emissive: neonColor,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.5
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: hairHex,
      roughness: 0.4,
      metalness: 0.1
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5
    });

    const bootMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.4
    });

    // --- 1. TORSO & ACADEMY JACKET ---
    const torsoGroup = new THREE.Group();
    const jacketGeo = new THREE.BoxGeometry(0.7, 0.9, 0.45);
    const jacketMesh = new THREE.Mesh(jacketGeo, jacketMat);
    jacketMesh.position.y = 1.05;
    jacketMesh.castShadow = true;
    torsoGroup.add(jacketMesh);

    // Glowing Neon Accent Stripes on Chest/Collar
    const neonTrimGeo = new THREE.BoxGeometry(0.72, 0.1, 0.47);
    const neonTrim = new THREE.Mesh(neonTrimGeo, neonMat);
    neonTrim.position.y = 1.35;
    torsoGroup.add(neonTrim);
    this.neonTrims.push(neonTrim);

    const neonBeltGeo = new THREE.BoxGeometry(0.72, 0.08, 0.47);
    const neonBelt = new THREE.Mesh(neonBeltGeo, neonMat);
    neonBelt.position.y = 0.65;
    torsoGroup.add(neonBelt);
    this.neonTrims.push(neonBelt);

    // High Collar / Shirt Inner
    const shirtGeo = new THREE.CylinderGeometry(0.18, 0.2, 0.3, 8);
    const shirtMesh = new THREE.Mesh(shirtGeo, skinMat);
    shirtMesh.position.y = 1.48;
    torsoGroup.add(shirtMesh);

    this.group.add(torsoGroup);

    // --- 2. HEAD & ANIME HAIR ---
    this.headMesh.position.y = 1.75;
    const headGeo = new THREE.SphereGeometry(0.28, 16, 16);
    headGeo.scale(1, 1.1, 0.95);
    const headBase = new THREE.Mesh(headGeo, skinMat);
    headBase.castShadow = true;
    this.headMesh.add(headBase);

    // Anime Eyes (Glowing blue/purple pupils)
    const eyeMat = new THREE.MeshBasicMaterial({ color: isMale ? 0x38bdf8 : 0xc084fc });
    const eyeGeo = new THREE.PlaneGeometry(0.08, 0.12);

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.1, 0.02, 0.26);
    this.headMesh.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.1, 0.02, 0.26);
    this.headMesh.add(rightEye);

    // Hair Geometry Construction
    const hairGroup = new THREE.Group();
    if (isMale) {
      // Sasuke-style Spiky Hair locks
      const spikeGeo = new THREE.ConeGeometry(0.12, 0.4, 4);
      for (let i = 0; i < 7; i++) {
        const spike = new THREE.Mesh(spikeGeo, hairMat);
        const angle = (i / 6) * Math.PI - Math.PI / 2;
        spike.position.set(Math.cos(angle) * 0.22, 0.15 + Math.sin(Math.abs(angle)) * 0.1, -Math.sin(angle) * 0.08);
        spike.rotation.z = -angle * 0.5;
        hairGroup.add(spike);
      }
      // Top crown spike
      const topSpike = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.45, 5), hairMat);
      topSpike.position.set(0, 0.3, -0.05);
      hairGroup.add(topSpike);
    } else {
      // Hinata-style Hime Cut & Long Back Hair
      const backHairGeo = new THREE.BoxGeometry(0.55, 0.6, 0.3);
      const backHair = new THREE.Mesh(backHairGeo, hairMat);
      backHair.position.set(0, 0, -0.1);
      hairGroup.add(backHair);

      const sideBangsGeo = new THREE.BoxGeometry(0.12, 0.4, 0.15);
      const leftBang = new THREE.Mesh(sideBangsGeo, hairMat);
      leftBang.position.set(-0.25, -0.05, 0.18);
      hairGroup.add(leftBang);

      const rightBang = new THREE.Mesh(sideBangsGeo, hairMat);
      rightBang.position.set(0.25, -0.05, 0.18);
      hairGroup.add(rightBang);
    }

    this.headMesh.add(hairGroup);
    this.group.add(this.headMesh);

    // --- 3. ARMS ---
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.65, 8);
    armGeo.translate(0, -0.3, 0);

    // Left Arm
    const leftArmMesh = new THREE.Mesh(armGeo, jacketMat);
    leftArmMesh.castShadow = true;
    this.leftArm.position.set(-0.45, 1.4, 0);
    this.leftArm.add(leftArmMesh);

    // Left Glove Hand
    const handGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -0.65;
    this.leftArm.add(leftHand);

    this.group.add(this.leftArm);

    // Right Arm
    const rightArmMesh = new THREE.Mesh(armGeo, jacketMat);
    rightArmMesh.castShadow = true;
    this.rightArm.position.set(0.45, 1.4, 0);
    this.rightArm.add(rightArmMesh);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.y = -0.65;
    this.rightArm.add(rightHand);

    this.group.add(this.rightArm);

    // --- 4. LEGS & GLOWING BOOTS ---
    const legGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.65, 8);
    legGeo.translate(0, -0.3, 0);

    // Left Leg
    const leftLegMesh = new THREE.Mesh(legGeo, pantsMat);
    leftLegMesh.castShadow = true;
    this.leftLeg.position.set(-0.2, 0.6, 0);
    this.leftLeg.add(leftLegMesh);

    const bootGeo = new THREE.BoxGeometry(0.18, 0.18, 0.32);
    const leftBoot = new THREE.Mesh(bootGeo, bootMat);
    leftBoot.position.set(0, -0.65, 0.05);
    this.leftLeg.add(leftBoot);

    const soleGlowGeo = new THREE.BoxGeometry(0.19, 0.04, 0.33);
    const leftSoleGlow = new THREE.Mesh(soleGlowGeo, neonMat);
    leftSoleGlow.position.set(0, -0.74, 0.05);
    this.leftLeg.add(leftSoleGlow);

    this.group.add(this.leftLeg);

    // Right Leg
    const rightLegMesh = new THREE.Mesh(legGeo, pantsMat);
    rightLegMesh.castShadow = true;
    this.rightLeg.position.set(0.2, 0.6, 0);
    this.rightLeg.add(rightLegMesh);

    const rightBoot = new THREE.Mesh(bootGeo, bootMat);
    rightBoot.position.set(0, -0.65, 0.05);
    this.rightLeg.add(rightBoot);

    const rightSoleGlow = new THREE.Mesh(soleGlowGeo, neonMat);
    rightSoleGlow.position.set(0, -0.74, 0.05);
    this.rightLeg.add(rightSoleGlow);

    this.group.add(this.rightLeg);

    // Scale group to reasonable player height (~1.8m)
    this.group.scale.set(1.1, 1.1, 1.1);
  }

  /**
   * Update character walk/idle animations frame-by-frame
   */
  public update(delta: number, isMoving: boolean, speed: number = 1.0) {
    if (isMoving) {
      this.walkCycle += delta * 10 * speed;
      const angle = Math.sin(this.walkCycle) * 0.6;

      this.leftLeg.rotation.x = angle;
      this.rightLeg.rotation.x = -angle;
      this.leftArm.rotation.x = -angle * 0.8;
      this.rightArm.rotation.x = angle * 0.8;

      // Slight head bobbing
      this.headMesh.position.y = 1.75 + Math.abs(Math.sin(this.walkCycle * 2)) * 0.04;
    } else {
      // Gentle idle breathing
      this.walkCycle += delta * 2;
      const breath = Math.sin(this.walkCycle) * 0.03;

      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = breath;
      this.rightArm.rotation.x = -breath;
      this.headMesh.position.y = 1.75 + breath * 0.5;
    }

    // Pulse neon trims
    const neonIntensity = 1.2 + Math.sin(this.walkCycle * 3) * 0.4;
    this.neonTrims.forEach(mesh => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissiveIntensity = neonIntensity;
      }
    });
  }
}
