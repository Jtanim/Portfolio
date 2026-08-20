import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Layers, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RotateCcw,
  Compass,
  Box,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClashDetectorThreeSceneProps {
  selectedCaseIndex: number;
  isResolved: boolean;
  onToggleResolved: (resolved: boolean) => void;
}

export const ClashDetectorThreeScene: React.FC<ClashDetectorThreeSceneProps> = ({
  selectedCaseIndex,
  isResolved,
  onToggleResolved,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Smooth interpolation progress for resolving (0 = full clash, 1 = fully resolved offset)
  const resolveProgressRef = useRef<number>(isResolved ? 1 : 0);
  const isResolvedRef = useRef<boolean>(isResolved);

  useEffect(() => {
    isResolvedRef.current = isResolved;
  }, [isResolved]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 280;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(16, 12, 16);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight1.position.set(10, 20, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.8);
    dirLight2.position.set(-10, -5, -10);
    scene.add(dirLight2);

    // CAD Grid Floor
    const grid = new THREE.GridHelper(20, 20, 0x06b6d4, 0x1e293b);
    grid.position.y = -3;
    scene.add(grid);

    // Group for Clash Meshes
    const clashGroup = new THREE.Group();
    objectsGroupRef.current = clashGroup;
    scene.add(clashGroup);

    // Build the 3D meshes based on selectedCaseIndex
    buildClashScene(selectedCaseIndex, clashGroup);

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.4;
    let targetRotationX = 0.2;
    let currentRotationY = 0.4;
    let currentRotationX = 0.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
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
        targetRotationY += deltaX * 0.009;
        targetRotationX += deltaY * 0.009;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (isAutoRotating && !isDragging) {
        targetRotationY += 0.005;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      const radius = 20;
      camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
      camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
      camera.position.y = radius * Math.sin(currentRotationX) + 4;
      camera.lookAt(0, 0, 0);

      // Target progress
      const targetProgress = isResolvedRef.current ? 1 : 0;
      resolveProgressRef.current += (targetProgress - resolveProgressRef.current) * 0.1;
      const prog = resolveProgressRef.current;

      // Update clash meshes dynamically based on resolution progress
      updateClashSceneDynamics(selectedCaseIndex, clashGroup, prog, elapsedTime);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 280;
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
  }, [selectedCaseIndex, isAutoRotating]);

  const handleResolveClick = () => {
    onToggleResolved(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#3b82f6'],
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[260px] sm:h-[290px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing relative"
      />

      {/* Top Floating Status Indicator */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
            isResolved
              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
              : 'bg-rose-950/90 text-rose-300 border border-rose-500/50 animate-pulse'
          }`}
        >
          {isResolved ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>SPATIAL CLEARANCE CLEARED (0mm HARD CLASH)</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>HARD PENETRATION DETECTED</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/80 backdrop-blur-md shadow-xl">
        {!isResolved ? (
          <button
            onClick={handleResolveClick}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer font-mono"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate 3D Reroute</span>
          </button>
        ) : (
          <button
            onClick={() => onToggleResolved(false)}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 cursor-pointer font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Show Collision</span>
          </button>
        )}

        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle 3D Auto-Rotate"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>
      </div>

      {/* Bottom Left Coordinate Tooltip */}
      <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono text-slate-400 hidden sm:flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
        <Compass className="w-3 h-3 text-cyan-400" />
        <span>3D Orbit Active • Navisworks Coordinate Matrix</span>
      </div>
    </div>
  );
};

// Helper to construct 3D geometric clash models in Three.js
function buildClashScene(caseIndex: number, group: THREE.Group) {
  // Clear previous children
  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }

  if (caseIndex === 0) {
    // Case 1: Primary HVAC Duct vs Reinforced Concrete Beam
    // Concrete Beam (Fixed)
    const beamGeo = new THREE.BoxGeometry(3.5, 7, 3.5);
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.2,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 0, 0);
    beam.name = 'structural_beam';
    group.add(beam);

    // Primary HVAC Duct (Left Section)
    const ductMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x083344,
      emissiveIntensity: 0.3,
    });
    const ductLeftGeo = new THREE.BoxGeometry(6, 1.8, 2.5);
    const ductLeft = new THREE.Mesh(ductLeftGeo, ductMat);
    ductLeft.position.set(-5, 0, 0);
    ductLeft.name = 'duct_left';
    group.add(ductLeft);

    // Duct Right Section
    const ductRight = new THREE.Mesh(ductLeftGeo, ductMat);
    ductRight.position.set(5, 0, 0);
    ductRight.name = 'duct_right';
    group.add(ductRight);

    // Middle Penetration Duct (Visible during clash)
    const midGeo = new THREE.BoxGeometry(4.5, 1.8, 2.5);
    const midDuct = new THREE.Mesh(midGeo, ductMat);
    midDuct.position.set(0, 0, 0);
    midDuct.name = 'duct_middle_clash';
    group.add(midDuct);

    // Split Duct A (Top offset transition)
    const splitAGeo = new THREE.BoxGeometry(6, 1.0, 2.2);
    const splitA = new THREE.Mesh(
      splitAGeo,
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.3 })
    );
    splitA.position.set(0, 2.2, 0);
    splitA.name = 'split_duct_top';
    group.add(splitA);

    // Split Duct B (Bottom offset transition)
    const splitB = new THREE.Mesh(
      splitAGeo,
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.3 })
    );
    splitB.position.set(0, -2.2, 0);
    splitB.name = 'split_duct_bottom';
    group.add(splitB);

    // Glowing Red Clash Sphere / Holographic Box
    const clashBoxGeo = new THREE.BoxGeometry(3.6, 2.0, 2.6);
    const clashBoxMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.7,
      wireframe: true,
    });
    const clashBox = new THREE.Mesh(clashBoxGeo, clashBoxMat);
    clashBox.position.set(0, 0, 0);
    clashBox.name = 'clash_indicator';
    group.add(clashBox);

  } else if (caseIndex === 1) {
    // Case 2: Plumbing Drainage Stack vs High-Voltage Cable Tray
    // Cable Tray (Fixed Amber)
    const trayGeo = new THREE.BoxGeometry(14, 0.4, 3.0);
    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x451a03,
      emissiveIntensity: 0.4,
    });
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.position.set(0, 0, 0);
    tray.name = 'cable_tray';
    group.add(tray);

    // Straight Plumbing Pipe (Clash state)
    const pipeGeo = new THREE.CylinderGeometry(0.5, 0.5, 10, 20);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.8,
      roughness: 0.3,
    });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.position.set(0, 0, 0);
    pipe.name = 'plumbing_pipe_straight';
    group.add(pipe);

    // Offset Plumbing Pipe (Resolved state)
    const offsetGroup = new THREE.Group();
    offsetGroup.name = 'plumbing_offset_group';

    const topVertical = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3.5, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    topVertical.position.set(0, 3.2, 0);
    offsetGroup.add(topVertical);

    const horizontalOffset = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3.2, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    horizontalOffset.rotation.x = Math.PI / 2;
    horizontalOffset.position.set(0, 1.5, 1.6);
    offsetGroup.add(horizontalOffset);

    const bypassVertical = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3.0, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    bypassVertical.position.set(0, 0, 3.2);
    offsetGroup.add(bypassVertical);

    const bottomHorizontal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3.2, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    bottomHorizontal.rotation.x = Math.PI / 2;
    bottomHorizontal.position.set(0, -1.5, 1.6);
    offsetGroup.add(bottomHorizontal);

    const bottomVertical = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 3.5, 20),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    bottomVertical.position.set(0, -3.2, 0);
    offsetGroup.add(bottomVertical);

    group.add(offsetGroup);

    // Clash Marker
    const clashMarker = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xe11d48,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.7,
        wireframe: true,
      })
    );
    clashMarker.position.set(0, 0, 0);
    clashMarker.name = 'clash_indicator';
    group.add(clashMarker);

  } else {
    // Case 3: Fire Sprinkler Pipe vs Recessed Lighting Troffer
    // Recessed Troffer
    const trofferGeo = new THREE.BoxGeometry(6, 1.2, 4);
    const trofferMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.5,
    });
    const troffer = new THREE.Mesh(trofferGeo, trofferMat);
    troffer.position.set(0, 0, 0);
    troffer.name = 'troffer_fixture';
    group.add(troffer);

    // Straight Fire Pipe
    const fireMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      metalness: 0.85,
      roughness: 0.3,
    });
    const straightFire = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 14, 16),
      fireMat
    );
    straightFire.rotation.z = Math.PI / 2;
    straightFire.position.set(0, 0, 0);
    straightFire.name = 'fire_pipe_straight';
    group.add(straightFire);

    // 45 deg Rerouted Pipe
    const reroutedGroup = new THREE.Group();
    reroutedGroup.name = 'fire_rerouted_group';

    const pLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 4, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    pLeft.rotation.z = Math.PI / 2;
    pLeft.position.set(-5, 0, 0);
    reroutedGroup.add(pLeft);

    const pRight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 4, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    pRight.rotation.z = Math.PI / 2;
    pRight.position.set(5, 0, 0);
    reroutedGroup.add(pRight);

    const pDrop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 })
    );
    pDrop.rotation.z = Math.PI / 2;
    pDrop.position.set(0, -1.8, 0);
    reroutedGroup.add(pDrop);

    group.add(reroutedGroup);

    // Clash Marker
    const clashMarker = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xe11d48,
        emissiveIntensity: 0.9,
        transparent: true,
        opacity: 0.7,
        wireframe: true,
      })
    );
    clashMarker.position.set(0, 0, 0);
    clashMarker.name = 'clash_indicator';
    group.add(clashMarker);
  }
}

// Helper to update mesh visibility, positions and material shaders during the resolve transition
function updateClashSceneDynamics(
  caseIndex: number,
  group: THREE.Group,
  progress: number,
  time: number
) {
  const clashIndicator = group.getObjectByName('clash_indicator');
  if (clashIndicator instanceof THREE.Mesh) {
    clashIndicator.visible = progress < 0.95;
    if (clashIndicator.material instanceof THREE.MeshStandardMaterial) {
      clashIndicator.material.opacity = (1 - progress) * (0.5 + 0.3 * Math.sin(time * 6));
    }
  }

  if (caseIndex === 0) {
    const midDuct = group.getObjectByName('duct_middle_clash');
    const splitA = group.getObjectByName('split_duct_top');
    const splitB = group.getObjectByName('split_duct_bottom');

    if (midDuct) midDuct.visible = progress < 0.3;
    if (splitA) {
      splitA.visible = progress > 0.05;
      splitA.position.y = 2.2 * progress;
      splitA.scale.set(1, Math.max(0.01, progress), 1);
    }
    if (splitB) {
      splitB.visible = progress > 0.05;
      splitB.position.y = -2.2 * progress;
      splitB.scale.set(1, Math.max(0.01, progress), 1);
    }
  } else if (caseIndex === 1) {
    const straight = group.getObjectByName('plumbing_pipe_straight');
    const offsetG = group.getObjectByName('plumbing_offset_group');

    if (straight) straight.visible = progress < 0.5;
    if (offsetG) offsetG.visible = progress >= 0.5;
  } else if (caseIndex === 2) {
    const straight = group.getObjectByName('fire_pipe_straight');
    const rerouted = group.getObjectByName('fire_rerouted_group');

    if (straight) straight.visible = progress < 0.5;
    if (rerouted) rerouted.visible = progress >= 0.5;
  }
}
