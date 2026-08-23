import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Layers, 
  Eye, 
  Maximize2, 
  Wind, 
  Zap, 
  Droplets, 
  Flame, 
  SlidersHorizontal,
  Info,
  Compass,
  CheckCircle2,
  Box,
  Building,
  EyeOff
} from 'lucide-react';

interface HeroThreeSceneProps {
  activeLayer: 'all' | 'mechanical' | 'electrical' | 'plumbing' | 'fire';
  onLayerChange: (layer: 'all' | 'mechanical' | 'electrical' | 'plumbing' | 'fire') => void;
}

export const HeroThreeScene: React.FC<HeroThreeSceneProps> = ({
  activeLayer,
  onLayerChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [wallDisplayMode, setWallDisplayMode] = useState<'solid' | 'transparent' | 'wireframe'>('solid');
  const [hoveredInfo, setHoveredInfo] = useState<{
    name: string;
    discipline: string;
    size: string;
    lod: string;
  } | null>(null);

  // References to hold Three.js instances for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupsRef = useRef<{
    architecture?: THREE.Group;
    mechanical?: THREE.Group;
    electrical?: THREE.Group;
    plumbing?: THREE.Group;
    fire?: THREE.Group;
  }>({});
  const wallMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isExplodedRef = useRef<boolean>(false);
  const wallModeRef = useRef<'solid' | 'transparent' | 'wireframe'>('solid');

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    wallModeRef.current = wallDisplayMode;
    wallMaterialsRef.current.forEach((mat) => {
      if (wallDisplayMode === 'solid') {
        mat.opacity = 1.0;
        mat.transparent = false;
        mat.wireframe = false;
      } else if (wallDisplayMode === 'transparent') {
        mat.opacity = 0.22;
        mat.transparent = true;
        mat.wireframe = false;
      } else if (wallDisplayMode === 'wireframe') {
        mat.opacity = 0.45;
        mat.transparent = true;
        mat.wireframe = true;
      }
    });
  }, [wallDisplayMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0e18);

    // 2. Camera (Axonometric perspective matched to Revit 3D Viewport)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(24, 20, 24);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Crisp architectural studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(20, 35, 20);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.65);
    dirLight2.position.set(-20, 15, -20);
    scene.add(dirLight2);

    const fillLight = new THREE.DirectionalLight(0x10b981, 0.35);
    fillLight.position.set(-15, 20, 15);
    scene.add(fillLight);

    // 5. Blueprint Floor Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // 6. Disciplines Groups
    const groupArch = new THREE.Group();
    const groupMechanical = new THREE.Group();
    const groupElectrical = new THREE.Group();
    const groupPlumbing = new THREE.Group();
    const groupFire = new THREE.Group();

    groupsRef.current = {
      architecture: groupArch,
      mechanical: groupMechanical,
      electrical: groupElectrical,
      plumbing: groupPlumbing,
      fire: groupFire,
    };

    // --- MATERIALS DEFINITION ---
    // Architecture Wall & Slab Materials (Revit Shaded Gray)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Slate-600 architectural concrete
      roughness: 0.65,
      metalness: 0.15,
    });
    const interiorWallMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Slate-700
      roughness: 0.7,
      metalness: 0.1,
    });
    const floorSlabMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2,
    });
    wallMaterialsRef.current = [wallMat, interiorWallMat];

    // Plumbing Material (Bright Vibrant Revit Green)
    const greenPipeMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a, // Emerald green (Revit Domestic Water)
      metalness: 0.4,
      roughness: 0.25,
      emissive: 0x052e16,
      emissiveIntensity: 0.25,
    });
    const darkGreenPipeMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      metalness: 0.5,
      roughness: 0.3,
    });
    const brassValveMat = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      metalness: 0.8,
      roughness: 0.3,
    });

    // HVAC Ducting Material (Galvanized Metallic Light Gray / Silver)
    const ductMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1, // Galvanized steel sheet
      metalness: 0.75,
      roughness: 0.3,
      emissive: 0x0f172a,
      emissiveIntensity: 0.15,
    });
    const ductFittingMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.2,
    });
    const vavBoxMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.6,
      roughness: 0.4,
    });
    const actuatorMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7, // Purple control actuator
      metalness: 0.3,
      roughness: 0.5,
    });

    // Fire Sprinkler Material (Bright Revit Red)
    const fireRedMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Bright Red
      metalness: 0.5,
      roughness: 0.25,
      emissive: 0x450a0a,
      emissiveIntensity: 0.3,
    });
    const sprinklerHeadMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a, // Brass sprinkler deflector
      metalness: 0.9,
      roughness: 0.2,
    });

    // Electrical Containment Material (Black / Dark Slate & Amber)
    const conduitBlackMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.3,
    });
    const panelBoxMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.5,
      roughness: 0.4,
    });
    const cableTrayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.6,
      roughness: 0.35,
    });

    // ==========================================
    // 1. ARCHITECTURAL BUILDING ENVELOPE (Revit Model Layout)
    // ==========================================
    const buildingWidth = 22;
    const buildingLength = 16;
    const wallHeight = 4.2;
    const wallThickness = 0.5;

    // Base Floor Slab
    const floorSlab = new THREE.Mesh(
      new THREE.BoxGeometry(buildingWidth + 1, 0.4, buildingLength + 1),
      floorSlabMat
    );
    floorSlab.position.set(0, 0, 0);
    floorSlab.userData = {
      name: 'Reinforced Concrete Ground Slab',
      discipline: 'Structural / Architectural',
      size: '22m x 16m x 400mm Grade 40',
      lod: 'LOD 350',
    };
    groupArch.add(floorSlab);

    // Exterior Perimeter Walls (with cutouts for doors/windows)
    // Front Wall with window openings (positive Z)
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(4.5, wallHeight, wallThickness), wallMat);
    frontWallLeft.position.set(-8.5, wallHeight / 2, buildingLength / 2);
    groupArch.add(frontWallLeft);

    const frontWallMid1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, wallHeight, wallThickness), wallMat);
    frontWallMid1.position.set(-2.5, wallHeight / 2, buildingLength / 2);
    groupArch.add(frontWallMid1);

    const frontWallMid2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, wallHeight, wallThickness), wallMat);
    frontWallMid2.position.set(3.5, wallHeight / 2, buildingLength / 2);
    groupArch.add(frontWallMid2);

    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(4.5, wallHeight, wallThickness), wallMat);
    frontWallRight.position.set(8.5, wallHeight / 2, buildingLength / 2);
    groupArch.add(frontWallRight);

    // Front window sills & lintels (4 clean Revit windows)
    [-5.7, 0.5, 6.2].forEach((wx) => {
      const sill = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, wallThickness), wallMat);
      sill.position.set(wx, 0.55, buildingLength / 2);
      groupArch.add(sill);

      const lintel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, wallThickness), wallMat);
      lintel.position.set(wx, wallHeight - 0.55, buildingLength / 2);
      groupArch.add(lintel);
    });

    // Back Wall (negative Z) with Arched Alcove
    const backWallLeft = new THREE.Mesh(new THREE.BoxGeometry(8, wallHeight, wallThickness), wallMat);
    backWallLeft.position.set(-7, wallHeight / 2, -buildingLength / 2);
    groupArch.add(backWallLeft);

    const backWallRight = new THREE.Mesh(new THREE.BoxGeometry(8, wallHeight, wallThickness), wallMat);
    backWallRight.position.set(7, wallHeight / 2, -buildingLength / 2);
    groupArch.add(backWallRight);

    // Arched Feature Wall Cutout in Middle
    const backWallArc = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, wallThickness, 32, 1, false, 0, Math.PI), wallMat);
    backWallArc.rotation.x = Math.PI / 2;
    backWallArc.position.set(0, wallHeight - 0.5, -buildingLength / 2);
    groupArch.add(backWallArc);

    // Left Wall (negative X)
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, buildingLength), wallMat);
    leftWall.position.set(-buildingWidth / 2, wallHeight / 2, 0);
    groupArch.add(leftWall);

    // Right Wall (positive X) with Service Doorway
    const rightWall1 = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 6), wallMat);
    rightWall1.position.set(buildingWidth / 2, wallHeight / 2, -4);
    groupArch.add(rightWall1);

    const rightWall2 = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 6), wallMat);
    rightWall2.position.set(buildingWidth / 2, wallHeight / 2, 4);
    groupArch.add(rightWall2);

    // Interior Partition Walls (Dividing Plant Room, Hallway, Office Rooms)
    // Water Tank Plant Room Enclosure (Top-Left corner: x=-11 to -4, z=-8 to -2)
    const plantWallZ = new THREE.Mesh(new THREE.BoxGeometry(7, wallHeight * 0.9, wallThickness * 0.8), interiorWallMat);
    plantWallZ.position.set(-7.5, (wallHeight * 0.9) / 2, -2);
    groupArch.add(plantWallZ);

    const plantWallX = new THREE.Mesh(new THREE.BoxGeometry(wallThickness * 0.8, wallHeight * 0.9, 6), interiorWallMat);
    plantWallX.position.set(-4, (wallHeight * 0.9) / 2, -5);
    groupArch.add(plantWallX);

    // Central Corridor Partition (x=-4 to 6, z=1)
    const corridorWall = new THREE.Mesh(new THREE.BoxGeometry(10, wallHeight * 0.8, wallThickness * 0.8), interiorWallMat);
    corridorWall.position.set(1, (wallHeight * 0.8) / 2, 1);
    groupArch.add(corridorWall);

    // Right Office Divider Wall
    const officeDivider = new THREE.Mesh(new THREE.BoxGeometry(wallThickness * 0.8, wallHeight * 0.8, 6), interiorWallMat);
    officeDivider.position.set(6, (wallHeight * 0.8) / 2, 4);
    groupArch.add(officeDivider);

    // ==========================================
    // 2. WATER STORAGE TANK & PLUMBING (Green Piping - Exact Revit Layout)
    // ==========================================
    // Cylindrical Water Storage Tank on Structural Legs
    const tankGroup = new THREE.Group();
    tankGroup.position.set(-8, 0, -5.5);

    // 4 Steel Support Legs
    const legGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.2, 12);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
    [
      [-1.1, -1.1],
      [1.1, -1.1],
      [-1.1, 1.1],
      [1.1, 1.1],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, 1.1, lz);
      tankGroup.add(leg);
    });

    // Steel Ring Platform
    const platformMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.15, 24),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 })
    );
    platformMesh.position.y = 2.2;
    tankGroup.add(platformMesh);

    // Cylindrical Water Tank Body (Light Slate Gray with Ribbed Rings)
    const tankBodyMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.35,
      metalness: 0.4,
    });
    const tankBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.45, 1.45, 3.2, 32),
      tankBodyMat
    );
    tankBody.position.y = 3.8;
    tankGroup.add(tankBody);

    // Ribbed Tank Reinforcement Rings
    for (let r = 2.6; r <= 5.0; r += 0.6) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.47, 0.05, 12, 32),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = r;
      tankGroup.add(ring);
    }

    // Domed Top Cap
    const domeCap = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      tankBodyMat
    );
    domeCap.position.y = 5.4;
    tankGroup.add(domeCap);

    // Inspection Manhole on Top
    const manhole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.25, 16),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 })
    );
    manhole.position.set(0, 5.9, 0.5);
    tankGroup.add(manhole);

    tankGroup.userData = {
      name: 'GRP Domestic Water Storage Tank',
      discipline: 'Plumbing & Public Health',
      size: '5,000 Liters (Elevated on Structural Steel Skid)',
      lod: 'LOD 400 Coordinated',
    };
    groupPlumbing.add(tankGroup);

    // Booster Pump Skid (Horizontal Motor + Pressure Vessel in Plant Room)
    const pumpSkidGroup = new THREE.Group();
    pumpSkidGroup.position.set(-5.5, 0, -6.5);

    const pumpBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.2, 0.8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
    pumpBase.position.y = 0.1;
    pumpSkidGroup.add(pumpBase);

    // Pump Motor (Blue/Dark Slate)
    const pumpMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 16), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.7 }));
    pumpMotor.rotation.z = Math.PI / 2;
    pumpMotor.position.set(-0.25, 0.45, 0);
    pumpSkidGroup.add(pumpMotor);

    // Hydro-Pneumatic Pressure Vessel (White/Gray Tank)
    const vessel = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 }));
    vessel.position.set(0.35, 0.65, 0);
    pumpSkidGroup.add(vessel);

    pumpSkidGroup.userData = {
      name: 'Triplex Domestic Booster Pump Skid',
      discipline: 'Plumbing & Public Health',
      size: 'Duty + Assist + Standby (VFD Driven)',
      lod: 'LOD 400',
    };
    groupPlumbing.add(pumpSkidGroup);

    // Utility Handwash / Sinks (Dual Basins near Plant Room as seen in video)
    const sinkGroup = new THREE.Group();
    sinkGroup.position.set(-5.2, 0, -3.2);

    [-0.7, 0.7].forEach((sx) => {
      const basin = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.6, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.2, metalness: 0.1 })
      );
      basin.position.set(sx, 1.4, 0);
      sinkGroup.add(basin);

      // Faucet
      const tap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.3, 12),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 })
      );
      tap.position.set(sx, 1.8, -0.25);
      sinkGroup.add(tap);

      // P-Trap Drain Pipe
      const trap = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.035, 8, 16, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 })
      );
      trap.rotation.z = Math.PI;
      trap.position.set(sx, 0.9, 0);
      sinkGroup.add(trap);
    });

    groupPlumbing.add(sinkGroup);

    // --- RECREATION OF GREEN DOMESTIC WATER PIPING RUNS ---
    // 1. Tank Outlet & Header Piping
    const createGreenPipe = (p1: THREE.Vector3, p2: THREE.Vector3, radius = 0.08, name = 'Domestic Cold Water Pipe') => {
      const dist = p1.distanceTo(p2);
      const geom = new THREE.CylinderGeometry(radius, radius, dist, 12);
      const mesh = new THREE.Mesh(geom, greenPipeMat);
      
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(p2, p1).normalize());
      mesh.userData = {
        name: name,
        discipline: 'Plumbing (Potable Water Supply)',
        size: radius > 0.07 ? 'DN65 PPR / Copper' : 'DN32 PPR Hot & Cold',
        lod: 'LOD 400 Coordinated',
      };
      return mesh;
    };

    // Green Pipe Route from Tank to Booster Pump Skid
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-8, 2.2, -5.5), new THREE.Vector3(-8, 1.0, -5.5)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-8, 1.0, -5.5), new THREE.Vector3(-5.5, 1.0, -5.5)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.5, 1.0, -5.5), new THREE.Vector3(-5.5, 0.6, -6.5)));

    // Green Pipe Header along Wall & Across Rooms
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.5, 0.8, -6.5), new THREE.Vector3(-5.5, 3.8, -6.5)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.5, 3.8, -6.5), new THREE.Vector3(-10, 3.8, -6.5)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-10, 3.8, -6.5), new THREE.Vector3(-10, 3.8, 4)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-10, 3.8, 4), new THREE.Vector3(-1, 3.8, 4)));

    // Green Pipe branches dropping into fixtures & across corridor
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.2, 3.8, -3.2), new THREE.Vector3(-5.2, 1.8, -3.2)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.2, 1.8, -3.2), new THREE.Vector3(-5.9, 1.8, -3.2)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.2, 1.8, -3.2), new THREE.Vector3(-4.5, 1.8, -3.2)));

    // Main Distribution Header Crossing to right side
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(-5.5, 3.8, -6.5), new THREE.Vector3(8, 3.8, -6.5)));
    groupPlumbing.add(createGreenPipe(new THREE.Vector3(8, 3.8, -6.5), new THREE.Vector3(8, 3.8, 5)));

    // Inline Valves on Green Piping
    [
      new THREE.Vector3(-7, 1.0, -5.5),
      new THREE.Vector3(-5.5, 2.5, -6.5),
      new THREE.Vector3(0, 3.8, -6.5),
      new THREE.Vector3(-10, 3.8, -1),
    ].forEach((pos) => {
      const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.25, 12), brassValveMat);
      valve.position.copy(pos);
      groupPlumbing.add(valve);
    });

    // ==========================================
    // 3. MECHANICAL HVAC DUCTWORK (Exact Revit Layout)
    // ==========================================
    // Main Primary Supply Air Duct (Galvanized Rectangular Trunk crossing center corridor)
    const mainSupplyDuct = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.9, 1.6),
      ductMat
    );
    mainSupplyDuct.position.set(0, 3.4, -0.5);
    mainSupplyDuct.userData = {
      name: 'Primary Supply Air Duct (SAD-01)',
      discipline: 'Mechanical HVAC (LOD 400)',
      size: '1000 x 500 mm (Galvanized Steel Sheet)',
      lod: 'LOD 400 Shop Drawing Approved',
    };
    groupMechanical.add(mainSupplyDuct);

    // Duct Transitions / Reducers
    const reducer1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.5, 1.2, 4),
      ductFittingMat
    );
    reducer1.rotation.z = Math.PI / 2;
    reducer1.position.set(8.5, 3.4, -0.5);
    groupMechanical.add(reducer1);

    // Secondary Supply Duct Extension
    const subDuct = new THREE.Mesh(new THREE.BoxGeometry(4, 0.7, 1.1), ductMat);
    subDuct.position.set(10.5, 3.4, -0.5);
    groupMechanical.add(subDuct);

    // Branch Ducts splitting into Rooms (Z-axis branches)
    const branchOffsets = [-6, -2, 2, 6];
    branchOffsets.forEach((bx) => {
      // Branch Duct to Front Rooms
      const branchFront = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 4.5), ductMat);
      branchFront.position.set(bx, 3.3, 2.0);
      branchFront.userData = {
        name: `VAV Zone Branch Air Duct #${bx > 0 ? 'B' : 'A'}`,
        discipline: 'Mechanical HVAC',
        size: '400 x 300 mm Duct with Acoustic Lining',
        lod: 'LOD 400',
      };
      groupMechanical.add(branchFront);

      // Branch Duct to Rear Rooms
      const branchRear = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 3.5), ductMat);
      branchRear.position.set(bx, 3.3, -2.5);
      groupMechanical.add(branchRear);

      // Diffusers / Air Terminals with ceiling drops
      [
        new THREE.Vector3(bx, 2.3, 4.0),
        new THREE.Vector3(bx, 2.3, -4.0),
      ].forEach((dPos) => {
        // Ceiling Diffuser Grille Plate
        const diffuser = new THREE.Mesh(
          new THREE.BoxGeometry(1.1, 0.12, 1.1),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.6, roughness: 0.2 })
        );
        diffuser.position.copy(dPos);
        groupMechanical.add(diffuser);

        // Round Spigot / Flexible Drop
        const dropDuct = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.28, 0.9, 16),
          ductFittingMat
        );
        dropDuct.position.set(dPos.x, dPos.y + 0.5, dPos.z);
        groupMechanical.add(dropDuct);
      });

      // VAV Terminal Unit Box mounted above branch
      const vavBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.9), vavBoxMat);
      vavBox.position.set(bx, 4.0, 0.8);
      vavBox.userData = {
        name: 'VAV Variable Air Volume Terminal Unit',
        discipline: 'Mechanical HVAC Controls',
        size: 'Model VAV-250 with Electric Reheat & DDC Controller',
        lod: 'LOD 400',
      };
      groupMechanical.add(vavBox);

      // Actuator on VAV box (Purple detail as in Revit)
      const actuator = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.35), actuatorMat);
      actuator.position.set(bx + 0.5, 4.0, 0.8);
      groupMechanical.add(actuator);
    });

    // Exhaust Return Air Louver / Duct Hood in Plant Room
    const exhaustHood = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.8, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 })
    );
    exhaustHood.position.set(-8, 3.8, -3.5);
    groupMechanical.add(exhaustHood);

    // ==========================================
    // 4. FIRE PROTECTION / SPRINKLER NETWORK (Red Piping - Exact Revit Layout)
    // ==========================================
    const createFirePipe = (p1: THREE.Vector3, p2: THREE.Vector3, radius = 0.075, name = 'Fire Protection Sprinkler Line') => {
      const dist = p1.distanceTo(p2);
      const geom = new THREE.CylinderGeometry(radius, radius, dist, 12);
      const mesh = new THREE.Mesh(geom, fireRedMat);
      
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mesh.position.copy(mid);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(p2, p1).normalize());
      mesh.userData = {
        name: name,
        discipline: 'Fire Protection (Civil Defense & NFPA 13)',
        size: radius > 0.08 ? 'DN100 Sch 40 Grooved' : 'DN32 / DN25 Black Steel',
        lod: 'LOD 400 Coordinated',
      };
      return mesh;
    };

    // Main Fire Riser coming up from Floor at Back Corner
    groupFire.add(createFirePipe(new THREE.Vector3(9.5, 0, -6.5), new THREE.Vector3(9.5, 4.0, -6.5), 0.12, 'Fire Sprinkler Supply Riser (DN100)'));

    // Zone Control Valve Station (Assembly on Riser as highlighted in video)
    const zcvGroup = new THREE.Group();
    zcvGroup.position.set(9.5, 2.2, -6.5);

    // Flanged OS&Y Gate Valve
    const osyValve = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.8 }));
    zcvGroup.add(osyValve);

    // Valve Handwheel
    const handwheel = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 }));
    handwheel.rotation.x = Math.PI / 2;
    handwheel.position.y = 0.25;
    zcvGroup.add(handwheel);

    // Waterflow Switch / Pressure Gauge Loop
    const flowSwitch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    flowSwitch.position.set(0.2, 0, 0);
    zcvGroup.add(flowSwitch);

    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    gauge.position.set(0.2, 0.2, 0);
    zcvGroup.add(gauge);

    zcvGroup.userData = {
      name: 'Zone Control Valve (ZCV) Station',
      discipline: 'Fire Protection',
      size: 'DN100 with OS&Y Valve, Flow Switch & Test/Drain Assembly',
      lod: 'LOD 400 Certified',
    };
    groupFire.add(zcvGroup);

    // Red Main Fire Distribution Loop overhead
    groupFire.add(createFirePipe(new THREE.Vector3(9.5, 4.0, -6.5), new THREE.Vector3(9.5, 4.0, 5.5), 0.1, 'Fire Sprinkler Loop Header'));
    groupFire.add(createFirePipe(new THREE.Vector3(9.5, 4.0, 5.5), new THREE.Vector3(-9.5, 4.0, 5.5), 0.1, 'Fire Sprinkler Loop Header'));
    groupFire.add(createFirePipe(new THREE.Vector3(-9.5, 4.0, 5.5), new THREE.Vector3(-9.5, 4.0, -6.5), 0.1, 'Fire Sprinkler Loop Header'));
    groupFire.add(createFirePipe(new THREE.Vector3(-9.5, 4.0, -6.5), new THREE.Vector3(9.5, 4.0, -6.5), 0.1, 'Fire Sprinkler Loop Header'));

    // Cross Fire Main across middle
    groupFire.add(createFirePipe(new THREE.Vector3(0, 4.0, -6.5), new THREE.Vector3(0, 4.0, 5.5), 0.08, 'Fire Sprinkler Cross Main'));

    // Fire Sprinkler Branch Lines & Dropping Heads into every room
    [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5].forEach((fx) => {
      // Horizontal branch across plenum
      groupFire.add(createFirePipe(new THREE.Vector3(fx, 3.9, -6.0), new THREE.Vector3(fx, 3.9, 5.0), 0.05));

      // Pendant Sprinkler Drops
      [-4.0, -1.0, 2.0, 4.5].forEach((fz) => {
        const dropNipple = createFirePipe(
          new THREE.Vector3(fx, 3.9, fz),
          new THREE.Vector3(fx, 3.2, fz),
          0.035,
          'Pendant Sprinkler Drop'
        );
        groupFire.add(dropNipple);

        // Brass Sprinkler Deflector Head & Bulb
        const head = new THREE.Mesh(
          new THREE.ConeGeometry(0.09, 0.12, 12),
          sprinklerHeadMat
        );
        head.rotation.x = Math.PI;
        head.position.set(fx, 3.15, fz);
        head.userData = {
          name: 'Quick Response Pendant Sprinkler Head',
          discipline: 'Fire Protection (NFPA 13)',
          size: 'K=5.6 / 68°C Red Bulb (1/2" NPT)',
          lod: 'LOD 400',
        };
        groupFire.add(head);
      });
    });

    // Floor Mounted Fire Extinguisher (Large Red Cylinder as seen in video)
    const extinguisher = new THREE.Group();
    extinguisher.position.set(8.5, 0, 4.5);

    const extBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 1.4, 16),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, metalness: 0.6 })
    );
    extBody.position.y = 0.7;
    extinguisher.add(extBody);

    const extDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, metalness: 0.6 })
    );
    extDome.position.y = 1.4;
    extinguisher.add(extDome);

    const extValve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.25, 12),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })
    );
    extValve.position.y = 1.6;
    extinguisher.add(extValve);

    extinguisher.userData = {
      name: 'Mobile CO2 / Clean Agent Fire Extinguisher',
      discipline: 'Fire Life Safety',
      size: '25kg Wheeled Unit (UL Listed)',
      lod: 'LOD 400',
    };
    groupFire.add(extinguisher);

    // ==========================================
    // 5. ELECTRICAL CONTAINMENT & CONDUIT (Black / Amber - Exact Revit Layout)
    // ==========================================
    // Multi-Conduit Underground / Floor Sweep Bundle (Black pipes entering in corner)
    const conduitGroup = new THREE.Group();
    [-0.2, 0, 0.2].forEach((offset, idx) => {
      // Vertical riser in wall
      const conduitV = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 2.5, 12),
        conduitBlackMat
      );
      conduitV.position.set(-10.2 + offset, 1.25, 7.2);
      conduitGroup.add(conduitV);

      // 90° Sweep along floor slab
      const conduitH = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 4.0, 12),
        conduitBlackMat
      );
      conduitH.rotation.x = Math.PI / 2;
      conduitH.position.set(-10.2 + offset, 0.1, 5.0);
      conduitGroup.add(conduitH);
    });

    conduitGroup.userData = {
      name: 'Primary Underground Power Ingress Feeders',
      discipline: 'Electrical & Power Infrastructure',
      size: '3x 4C 185mm² XLPE/SWA in 110mm Heavy Duty PVC',
      lod: 'LOD 400 Coordinated',
    };
    groupElectrical.add(conduitGroup);

    // Wall-Mounted Main Electrical Distribution Board (MDB Panel)
    const mdbPanel = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 2.2, 0.5),
      panelBoxMat
    );
    mdbPanel.position.set(-10.2, 2.0, 4.0);
    mdbPanel.userData = {
      name: 'Main Distribution Board (MDB-01)',
      discipline: 'Electrical Low Voltage (LV)',
      size: '1200A 415V 50Hz 3-Phase Form 4b Type-Tested (SEC Compliant)',
      lod: 'LOD 400',
    };
    groupElectrical.add(mdbPanel);

    // Overhead Cable Trays (Amber Perforated Trays)
    const trayMain = new THREE.Mesh(new THREE.BoxGeometry(14, 0.25, 1.2), cableTrayMat);
    trayMain.position.set(0, 3.7, 1.5);
    trayMain.userData = {
      name: 'LV Power & Control Cable Ladder Tray',
      discipline: 'Electrical Containment',
      size: '600 x 100 mm Hot-Dip Galvanized Perforated',
      lod: 'LOD 400',
    };
    groupElectrical.add(trayMain);

    // Add all groups to main scene
    scene.add(groupArch);
    scene.add(groupMechanical);
    scene.add(groupElectrical);
    scene.add(groupPlumbing);
    scene.add(groupFire);

    // 7. Interactive Mouse Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.45; // Start angled nicely to show the plant room & ducts
    let targetRotationX = 0.15;
    let currentRotationY = 0.45;
    let currentRotationX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // Raycasting for BIM element inspection
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      let found = false;
      for (const hit of intersects) {
        let curr: THREE.Object3D | null = hit.object;
        while (curr && curr !== scene) {
          if (curr.userData && curr.userData.name) {
            setHoveredInfo(curr.userData as any);
            found = true;
            break;
          }
          curr = curr.parent;
        }
        if (found) break;
      }
      if (!found) {
        setHoveredInfo(null);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile devices
    let touchStart = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. Animation Loop with Exploded Axonometric Interpolation
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Gentle auto-rotation when user is not actively interacting
      if (isAutoRotating && !isDragging) {
        targetRotationY += 0.0035;
      }

      // Smooth camera orbit
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      const radius = 32;
      camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX + 0.55);
      camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX + 0.55);
      camera.position.y = radius * Math.sin(currentRotationX + 0.55) + 6;
      camera.lookAt(0, isExplodedRef.current ? 3.5 : 2.0, 0);

      // Smooth vertical exploded layer separation
      const explodeFactor = isExplodedRef.current ? 1 : 0;

      if (groupsRef.current.architecture) {
        groupsRef.current.architecture.position.y += (0 - groupsRef.current.architecture.position.y) * 0.08;
      }
      if (groupsRef.current.electrical) {
        const targetY = explodeFactor * 2.2;
        groupsRef.current.electrical.position.y += (targetY - groupsRef.current.electrical.position.y) * 0.08;
      }
      if (groupsRef.current.plumbing) {
        const targetY = explodeFactor * 4.5;
        groupsRef.current.plumbing.position.y += (targetY - groupsRef.current.plumbing.position.y) * 0.08;
      }
      if (groupsRef.current.mechanical) {
        const targetY = explodeFactor * 7.5;
        groupsRef.current.mechanical.position.y += (targetY - groupsRef.current.mechanical.position.y) * 0.08;
      }
      if (groupsRef.current.fire) {
        const targetY = explodeFactor * 10.5;
        groupsRef.current.fire.position.y += (targetY - groupsRef.current.fire.position.y) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Handle Discipline Visibility
  useEffect(() => {
    const g = groupsRef.current;
    if (!g.mechanical || !g.electrical || !g.plumbing || !g.fire || !g.architecture) return;

    if (activeLayer === 'all') {
      g.architecture.visible = true;
      g.mechanical.visible = true;
      g.electrical.visible = true;
      g.plumbing.visible = true;
      g.fire.visible = true;
    } else {
      g.architecture.visible = true;
      g.mechanical.visible = activeLayer === 'mechanical';
      g.electrical.visible = activeLayer === 'electrical';
      g.plumbing.visible = activeLayer === 'plumbing';
      g.fire.visible = activeLayer === 'fire';
    }
  }, [activeLayer]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-[340px] sm:h-[380px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative"
      />

      {/* Real-time BIM Hover Inspection Badge */}
      {hoveredInfo && (
        <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-xs z-30 p-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-xl backdrop-blur-md animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            <span>BIM Element Selected</span>
          </div>
          <div className="text-xs font-bold text-white mt-0.5">{hoveredInfo.name}</div>
          <div className="text-[11px] text-slate-300 mt-0.5">{hoveredInfo.discipline}</div>
          <div className="text-[10px] font-mono text-cyan-300 mt-1 pt-1 border-t border-slate-800 flex justify-between">
            <span>{hoveredInfo.size}</span>
            <span className="text-emerald-400 font-semibold">{hoveredInfo.lod}</span>
          </div>
        </div>
      )}

      {/* Floating HUD Viewport Toolbars */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
        
        {/* Left Info Tag */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Drag to Orbit • Hover to Inspect</span>
        </div>

        {/* Right Interactive Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto ml-auto">
          {/* Wall Transparency Toggle (Solid / Ghost / Wireframe) */}
          <button
            onClick={() => {
              if (wallDisplayMode === 'solid') setWallDisplayMode('transparent');
              else if (wallDisplayMode === 'transparent') setWallDisplayMode('wireframe');
              else setWallDisplayMode('solid');
            }}
            title="Toggle Building Walls (Solid / Ghost / Wireframe)"
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              wallDisplayMode === 'solid'
                ? 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-500'
                : wallDisplayMode === 'transparent'
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Walls:</span>
            <span className="font-bold uppercase text-[10px]">{wallDisplayMode}</span>
          </button>

          {/* Exploded 3D Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            title="Explode 3D MEP Disciplines by Elevation"
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md ${
              isExploded 
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/30' 
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Explode 3D</span>
          </button>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer backdrop-blur-md ${
              isAutoRotating 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                : 'bg-slate-900/90 text-slate-400 border-slate-700'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
