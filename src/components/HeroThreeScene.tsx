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
  Box
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
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [hoveredInfo, setHoveredInfo] = useState<{
    name: string;
    discipline: string;
    size: string;
    lod: string;
  } | null>(null);

  // References to hold Three.js instances for dynamic updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupsRef = useRef<{
    structure?: THREE.Group;
    mechanical?: THREE.Group;
    electrical?: THREE.Group;
    plumbing?: THREE.Group;
    fire?: THREE.Group;
  }>({});
  const animationFrameId = useRef<number | null>(null);
  const isExplodedRef = useRef<boolean>(false);
  const wireframeRef = useRef<boolean>(false);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
    if (sceneRef.current) {
      sceneRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => {
              m.wireframe = wireframeMode;
            });
          } else {
            obj.material.wireframe = wireframeMode;
          }
        }
      });
    }
  }, [wireframeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 340;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0e18);

    // 2. Camera (Isometric Orthographic or Axonometric Perspective)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 18, 22);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight1.position.set(15, 25, 15);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.6);
    dirLight2.position.set(-15, 10, -15);
    scene.add(dirLight2);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 1.2, 50);
    cyanPointLight.position.set(0, 5, 0);
    scene.add(cyanPointLight);

    // 5. Grid Blueprint Floor
    const gridHelper = new THREE.GridHelper(26, 26, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // 6. Disciplines Groups
    const groupStructure = new THREE.Group();
    const groupMechanical = new THREE.Group();
    const groupElectrical = new THREE.Group();
    const groupPlumbing = new THREE.Group();
    const groupFire = new THREE.Group();

    groupsRef.current = {
      structure: groupStructure,
      mechanical: groupMechanical,
      electrical: groupElectrical,
      plumbing: groupPlumbing,
      fire: groupFire,
    };

    // --- A. STRUCTURE (Columns, Beams & Slabs) ---
    const slabGeo = new THREE.BoxGeometry(18, 0.5, 18);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: wireframeRef.current,
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -2.7;
    groupStructure.add(slabMesh);

    // Columns
    const colGeo = new THREE.BoxGeometry(1.2, 7, 1.2);
    const colMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.7,
      metalness: 0.3,
    });

    const colPositions = [
      [-7.5, 0.8, -7.5],
      [7.5, 0.8, -7.5],
      [-7.5, 0.8, 7.5],
      [7.5, 0.8, 7.5],
      [0, 0.8, -7.5],
      [0, 0.8, 7.5],
    ];

    colPositions.forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(cx, cy, cz);
      groupStructure.add(col);
    });

    // Concrete Ceiling Beam
    const beamGeo = new THREE.BoxGeometry(18, 1.2, 1.2);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const beam1 = new THREE.Mesh(beamGeo, beamMat);
    beam1.position.set(0, 3.8, 0);
    groupStructure.add(beam1);

    const beamCross = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 18), beamMat);
    beamCross.position.set(0, 3.8, 0);
    groupStructure.add(beamCross);

    // --- B. MECHANICAL / HVAC DUCTING (Cyan) ---
    const ductMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x083344,
      emissiveIntensity: 0.3,
    });

    // Main Supply Air Duct (Rectangular)
    const mainDuctGeo = new THREE.BoxGeometry(16, 1.4, 2.2);
    const mainDuct = new THREE.Mesh(mainDuctGeo, ductMat);
    mainDuct.position.set(0, 1.6, 2.8);
    mainDuct.userData = {
      name: 'Primary Supply Air Duct',
      discipline: 'Mechanical HVAC (LOD 400)',
      size: '800 x 500 mm (Galvanized Steel)',
      lod: 'LOD 400 Coordinated',
    };
    groupMechanical.add(mainDuct);

    // Branch Duct with 90 deg bend
    const branchDuctGeo = new THREE.BoxGeometry(2, 1.1, 7.5);
    const branchDuct = new THREE.Mesh(branchDuctGeo, ductMat);
    branchDuct.position.set(-4.5, 1.6, -1.8);
    branchDuct.userData = {
      name: 'VAV-03 Branch Air Duct',
      discipline: 'Mechanical HVAC',
      size: '500 x 350 mm',
      lod: 'LOD 400',
    };
    groupMechanical.add(branchDuct);

    // Round Spiral Exhaust Duct
    const spiralDuctGeo = new THREE.CylinderGeometry(0.7, 0.7, 15, 24);
    const spiralDuctMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const spiralDuct = new THREE.Mesh(spiralDuctGeo, spiralDuctMat);
    spiralDuct.rotation.z = Math.PI / 2;
    spiralDuct.position.set(0, 2.1, -4.5);
    spiralDuct.userData = {
      name: 'Spiral Exhaust Air Duct',
      discipline: 'Mechanical Ventilation',
      size: 'DN450 Spiral Steel',
      lod: 'LOD 400',
    };
    groupMechanical.add(spiralDuct);

    // Diffusers / Grilles
    const diffuserGeo = new THREE.BoxGeometry(1.2, 0.3, 1.2);
    const diffuserMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, metalness: 0.5 });
    [-5, 0, 5].forEach((dx) => {
      const diff = new THREE.Mesh(diffuserGeo, diffuserMat);
      diff.position.set(dx, 0.6, 2.8);
      groupMechanical.add(diff);

      const dropGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
      const drop = new THREE.Mesh(dropGeo, ductMat);
      drop.position.set(dx, 1.0, 2.8);
      groupMechanical.add(drop);
    });

    // --- C. ELECTRICAL CABLE CONTAINMENT (Amber / Orange) ---
    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.35,
      emissive: 0x451a03,
      emissiveIntensity: 0.4,
    });

    const cableTrayGeo = new THREE.BoxGeometry(17, 0.35, 1.6);
    const cableTray = new THREE.Mesh(cableTrayGeo, trayMat);
    cableTray.position.set(0, 0.3, -1.2);
    cableTray.userData = {
      name: 'LV Power Cable Tray',
      discipline: 'Electrical (LOD 400)',
      size: '400 x 100 mm Perforated Heavy Duty',
      lod: 'LOD 400',
    };
    groupElectrical.add(cableTray);

    // Cross ELV Tray (Data/BMS)
    const elvTrayGeo = new THREE.BoxGeometry(1.2, 0.3, 15);
    const elvMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.7,
      roughness: 0.3,
    });
    const elvTray = new THREE.Mesh(elvTrayGeo, elvMat);
    elvTray.position.set(4.5, 0.3, 0);
    elvTray.userData = {
      name: 'ELV / BMS / Telecom Containment',
      discipline: 'Electrical & Automation',
      size: '300 x 75 mm Tray',
      lod: 'LOD 400',
    };
    groupElectrical.add(elvTray);

    // Conduit Runs
    for (let i = -6; i <= 6; i += 3) {
      const conduitGeo = new THREE.CylinderGeometry(0.08, 0.08, 8, 12);
      const conduitMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, metalness: 0.9 });
      const conduit = new THREE.Mesh(conduitGeo, conduitMat);
      conduit.rotation.x = Math.PI / 2;
      conduit.position.set(i, 0.7, -1.2);
      groupElectrical.add(conduit);
    }

    // --- D. PLUMBING / CHW PIPING (Teal / Blue) ---
    const chwFlowMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x0c4a6e,
      emissiveIntensity: 0.3,
    });
    const chwReturnMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x134e4a,
      emissiveIntensity: 0.3,
    });

    // CHW Supply Pipe
    const chwSupplyGeo = new THREE.CylinderGeometry(0.35, 0.35, 16, 20);
    const chwSupply = new THREE.Mesh(chwSupplyGeo, chwFlowMat);
    chwSupply.rotation.z = Math.PI / 2;
    chwSupply.position.set(0, -0.6, -3.2);
    chwSupply.userData = {
      name: 'Chilled Water Supply (CHW-S)',
      discipline: 'Hydronic & Chilled Water',
      size: 'DN150 Insulated Carbon Steel',
      lod: 'LOD 400 Coordinated',
    };
    groupPlumbing.add(chwSupply);

    // CHW Return Pipe
    const chwReturn = new THREE.Mesh(chwSupplyGeo, chwReturnMat);
    chwReturn.rotation.z = Math.PI / 2;
    chwReturn.position.set(0, -0.6, -4.2);
    chwReturn.userData = {
      name: 'Chilled Water Return (CHW-R)',
      discipline: 'Hydronic & Chilled Water',
      size: 'DN150 Insulated Carbon Steel',
      lod: 'LOD 400 Coordinated',
    };
    groupPlumbing.add(chwReturn);

    // Valves on CHW
    const valveGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 16);
    const valveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 });
    const valve1 = new THREE.Mesh(valveGeo, valveMat);
    valve1.position.set(2, -0.6, -3.2);
    groupPlumbing.add(valve1);

    // Drainage Stack
    const drainGeo = new THREE.CylinderGeometry(0.4, 0.4, 6, 16);
    const drainMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.5 });
    const drain = new THREE.Mesh(drainGeo, drainMat);
    drain.position.set(-6.5, 0, 5.5);
    drain.userData = {
      name: 'Soil & Waste Drainage Stack',
      discipline: 'Plumbing Drainage',
      size: 'DN110 uPVC Class B',
      lod: 'LOD 400',
    };
    groupPlumbing.add(drain);

    // --- E. FIRE SUPPRESSION SPRINKLERS (Crimson / Red) ---
    const fireMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x881337,
      emissiveIntensity: 0.4,
    });

    // Fire Main
    const fireMainGeo = new THREE.CylinderGeometry(0.25, 0.25, 17, 16);
    const fireMain = new THREE.Mesh(fireMainGeo, fireMat);
    fireMain.rotation.z = Math.PI / 2;
    fireMain.position.set(0, 3.1, 0);
    fireMain.userData = {
      name: 'Fire Protection Sprinkler Main',
      discipline: 'Fire Protection (NFPA 13 / Civil Defense)',
      size: 'DN65 Sch 40 Seamless Black Steel',
      lod: 'LOD 400',
    };
    groupFire.add(fireMain);

    // Fire Branch Lines & Pendant Sprinkler Heads
    [-5, -2, 1, 4, 6.5].forEach((fx) => {
      const branchGeo = new THREE.CylinderGeometry(0.12, 0.12, 7, 12);
      const branch = new THREE.Mesh(branchGeo, fireMat);
      branch.rotation.x = Math.PI / 2;
      branch.position.set(fx, 3.1, 0);
      groupFire.add(branch);

      // Sprinkler Head Drops
      [-2.5, 0, 2.5].forEach((fz) => {
        const dropNipple = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
          fireMat
        );
        dropNipple.position.set(fx, 2.7, fz);
        groupFire.add(dropNipple);

        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xffe4e6, metalness: 0.9 })
        );
        head.position.set(fx, 2.4, fz);
        groupFire.add(head);
      });
    });

    // Add all groups to main scene
    scene.add(groupStructure);
    scene.add(groupMechanical);
    scene.add(groupElectrical);
    scene.add(groupPlumbing);
    scene.add(groupFire);

    // 7. Interactive Mouse Drag Orbit Controls (Vanilla custom orbit)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

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
        if (hit.object.userData && hit.object.userData.name) {
          setHoveredInfo(hit.object.userData as any);
          found = true;
          break;
        }
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

      // Auto-rotation when not dragging
      if (isAutoRotating && !isDragging) {
        targetRotationY += 0.004;
      }

      // Damping / Smooth rotation
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      const radius = 28;
      camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX + 0.6);
      camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX + 0.6);
      camera.position.y = radius * Math.sin(currentRotationX + 0.6) + 4;
      camera.lookAt(0, isExplodedRef.current ? 3 : 0, 0);

      // Smoothly interpolate vertical exploded layer separation
      const explodeFactor = isExplodedRef.current ? 1 : 0;

      // Vertical offsets for exploded axonometric view:
      // Structure at base (y = -2.7)
      // Plumbing CHW (y = 0 + explode * 2.5)
      // Electrical (y = 0 + explode * 5.0)
      // Mechanical HVAC (y = 0 + explode * 8.0)
      // Fire Sprinkler (y = 0 + explode * 11.0)

      if (groupsRef.current.structure) {
        groupsRef.current.structure.position.y += (-2.7 - groupsRef.current.structure.position.y) * 0.08;
      }
      if (groupsRef.current.plumbing) {
        const targetY = explodeFactor * 1.5;
        groupsRef.current.plumbing.position.y += (targetY - groupsRef.current.plumbing.position.y) * 0.08;
      }
      if (groupsRef.current.electrical) {
        const targetY = explodeFactor * 3.8;
        groupsRef.current.electrical.position.y += (targetY - groupsRef.current.electrical.position.y) * 0.08;
      }
      if (groupsRef.current.mechanical) {
        const targetY = explodeFactor * 6.5;
        groupsRef.current.mechanical.position.y += (targetY - groupsRef.current.mechanical.position.y) * 0.08;
      }
      if (groupsRef.current.fire) {
        const targetY = explodeFactor * 9.2;
        groupsRef.current.fire.position.y += (targetY - groupsRef.current.fire.position.y) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 340;
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

  // Handle Layer Visibility changes
  useEffect(() => {
    const g = groupsRef.current;
    if (!g.mechanical || !g.electrical || !g.plumbing || !g.fire) return;

    if (activeLayer === 'all') {
      g.mechanical.visible = true;
      g.electrical.visible = true;
      g.plumbing.visible = true;
      g.fire.visible = true;
    } else {
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
        className="w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative"
      />

      {/* Real-time Hover BIM Property Tag Overlay */}
      {hoveredInfo && (
        <div className="absolute top-3 left-3 z-20 p-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-xl backdrop-blur-md text-xs font-mono max-w-[280px] pointer-events-none animate-fadeIn">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Box className="w-3 h-3" />
            {hoveredInfo.discipline}
          </div>
          <div className="text-white font-bold mt-0.5 text-xs">{hoveredInfo.name}</div>
          <div className="text-slate-300 text-[11px] mt-1">{hoveredInfo.size}</div>
          <div className="text-emerald-400 text-[10px] mt-0.5">{hoveredInfo.lod}</div>
        </div>
      )}

      {/* Floating 3D Control Bar Overlay */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/80 backdrop-blur-md shadow-lg">
        {/* Explode Axonometric Toggle */}
        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
            isExploded
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Exploded Axonometric Layers"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isExploded ? 'Collapsed' : 'Explode 3D'}</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title={isAutoRotating ? 'Pause Auto-Rotate' : 'Enable Auto-Rotate'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>

        {/* Wireframe Mode Toggle */}
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            wireframeMode
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Wireframe / Shaded"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono text-slate-400 pointer-events-none hidden sm:flex items-center gap-1.5 bg-slate-950/70 px-2 py-1 rounded-md border border-slate-800">
        <Compass className="w-3 h-3 text-cyan-400" />
        <span>3D Drag to Rotate • Hover to Inspect BIM Element</span>
      </div>
    </div>
  );
};
