import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface FiltrationSceneProps {
  animationStep: number; // 0: initial, 1: running, 2: completed
  progress: number; // 0 to 1
}

export const FiltrationScene: React.FC<FiltrationSceneProps> = ({ animationStep, progress }) => {
  const beakerRef = useRef<THREE.Group>(null);
  const suspensionWaterRef = useRef<THREE.Mesh>(null);
  const pouredLiquidRef = useRef<THREE.Mesh>(null);
  const filteredLiquidRef = useRef<THREE.Mesh>(null);
  const sandResidueRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Kontrol rotasi penuangan gelas beker
    if (beakerRef.current) {
      if (animationStep === 0) {
        beakerRef.current.position.set(-2.2, 2.0, 0);
        beakerRef.current.rotation.z = 0;
      } else if (animationStep === 1) {
        // Bergerak mendekati corong lalu miring menuang
        const pourAngle = Math.min(progress * 1.5, 0.95);
        beakerRef.current.rotation.z = -pourAngle;
        beakerRef.current.position.x = -1.2 + (1 - progress) * -0.6;
        beakerRef.current.position.y = 2.4;
      } else if (animationStep === 2) {
        beakerRef.current.position.set(-2.2, 2.0, 0);
        beakerRef.current.rotation.z = 0;
      }
    }

    // Penurunan cairan dalam beker saat dituang
    if (suspensionWaterRef.current) {
      if (animationStep === 0) {
        suspensionWaterRef.current.scale.y = 1;
      } else if (animationStep === 1) {
        suspensionWaterRef.current.scale.y = Math.max(1 - progress, 0.05);
      } else if (animationStep === 2) {
        suspensionWaterRef.current.scale.y = 0.05;
      }
    }

    // Garis aliran cairan yang mengalir ke corong
    if (pouredLiquidRef.current) {
      pouredLiquidRef.current.visible = animationStep === 1 && progress > 0.1 && progress < 0.95;
    }

    // Akumulasi filtrat jernih di Erlenmeyer dasar
    if (filteredLiquidRef.current) {
      if (animationStep === 0) {
        filteredLiquidRef.current.scale.y = 0.01;
      } else if (animationStep === 1) {
        filteredLiquidRef.current.scale.y = Math.max(0.01, progress);
      } else if (animationStep === 2) {
        filteredLiquidRef.current.scale.y = 1;
      }
    }

    // Akumulasi pasir residu pada kertas saring
    if (sandResidueRef.current) {
      if (animationStep === 0) {
        sandResidueRef.current.visible = false;
      } else if (animationStep === 1) {
        sandResidueRef.current.visible = progress > 0.2;
        sandResidueRef.current.scale.setScalar(Math.min(1, progress * 1.2));
      } else if (animationStep === 2) {
        sandResidueRef.current.visible = true;
        sandResidueRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* 1. MEJA LABORATORIUM */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.2, 0.3, 40]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* 2. STATIF & KLEM LOGAM */}
      <group position={[0.8, 0, 0]}>
        {/* Dasar Statif */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Batang Statif */}
        <mesh position={[-0.3, 1.8, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 3.5, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Cincin Penyangga Corong */}
        <mesh position={[-0.8, 1.85, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.45, 0.03, 16, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Batang Klem ke Cincin */}
        <mesh position={[-0.55, 1.85, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
      </group>

      {/* 3. LABU ERLENMEYER (PENAMPUNG FILTRAT) */}
      <group position={[0, 0, 0]}>
        <Html position={[0, 0.2, 0.8]} center distanceFactor={7}>
          <div className="bg-slate-900/90 text-teal-300 text-[11px] font-bold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap border border-teal-500/40">
            Gelas Penampung (Filtrat)
          </div>
        </Html>
        {/* Bodi kaca Erlenmeyer */}
        <mesh position={[0, 0.65, 0]}>
          <coneGeometry args={[0.75, 1.3, 24, 1, true]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.85}
            thickness={0.2}
            color="#e0f2fe"
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Leher Erlenmeyer */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.4, 24, 1, true]} />
          <meshPhysicalMaterial transparent opacity={0.35} transmission={0.85} color="#e0f2fe" side={THREE.DoubleSide} />
        </mesh>
        {/* Filtrat Cairan Jernih di dalam labu */}
        <mesh ref={filteredLiquidRef} position={[0, 0.25, 0]}>
          <coneGeometry args={[0.65, 0.5, 24]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 4. CORONG KACA & KERTAS SARING */}
      <group position={[0, 1.85, 0]}>
        <Html position={[0.7, 0.4, 0]} center distanceFactor={7}>
          <div className="bg-slate-900/90 text-teal-300 text-[11px] font-bold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap border border-teal-500/40">
            Corong & Kertas Saring
          </div>
        </Html>
        {/* Kerucut Corong */}
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.6, 0.7, 24, 1, true]} />
          <meshPhysicalMaterial transparent opacity={0.4} transmission={0.9} color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Pipa Batang Corong ke Bawah */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.8, 16, 1, true]} />
          <meshPhysicalMaterial transparent opacity={0.4} transmission={0.9} color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
        {/* Kertas Saring Putih di dalam Corong */}
        <mesh position={[0, 0.22, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.55, 0.65, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
        {/* Residu Pasir Tertahan di Kertas Saring */}
        <mesh ref={sandResidueRef} position={[0, 0.15, 0]}>
          <coneGeometry args={[0.35, 0.3, 16]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
      </group>

      {/* 5. ALIRAN CAIRAN SAAT MENUANG */}
      <mesh ref={pouredLiquidRef} position={[-0.45, 2.1, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.03, 0.04, 0.9, 12]} />
        <meshStandardMaterial color="#92400e" transparent opacity={0.7} />
      </mesh>

      {/* 6. GELAS BEKER PENUANG (BERISI CAMPURAN AIR + PASIR) */}
      <group ref={beakerRef} position={[-2.2, 2.0, 0]}>
        <Html position={[0, 1.0, 0]} center distanceFactor={7}>
          <div className="bg-slate-900/90 text-teal-300 text-[11px] font-bold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap border border-teal-500/40">
            Beker Campuran (Pasir + Air)
          </div>
        </Html>
        {/* Bodi Silinder Beker */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 24, 1, true]} />
          <meshPhysicalMaterial transparent opacity={0.45} transmission={0.85} color="#e0f2fe" side={THREE.DoubleSide} />
        </mesh>
        {/* Dasar Beker */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.39, 0.39, 0.04, 24]} />
          <meshPhysicalMaterial transparent opacity={0.5} transmission={0.85} color="#e0f2fe" />
        </mesh>
        {/* Campuran Keruh (Air + Partikel Pasir) di dalam beker */}
        <mesh ref={suspensionWaterRef} position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.6, 20]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} transparent opacity={0.75} />
        </mesh>
      </group>
    </group>
  );
};
