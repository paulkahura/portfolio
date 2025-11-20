import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GlassCube = ({ position, scale = 1, speed = 1, color = 'white' }: { position: [number, number, number], scale?: number, speed?: number, color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * speed;
      meshRef.current.rotation.y += delta * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color={color}
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0.1}
          thickness={0.5}
          transmission={0.5} // Glass-like transmission
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  const { viewport } = useThree();
  
  // Calculate positions based on viewport to keep them in corners
  // Bottom Left
  const bottomLeft = [
    -viewport.width / 2 + 2, // Offset from edge
    -viewport.height / 2 + 2,
    0
  ] as [number, number, number];

  // Top Right
  const topRight = [
    viewport.width / 2 - 2, // Offset from edge
    viewport.height / 2 - 2,
    0
  ] as [number, number, number];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <GlassCube position={bottomLeft} scale={1.2} speed={0.8} color="#a855f7" /> {/* Purple tint */}
      <GlassCube position={topRight} scale={1.5} speed={0.5} color="#3b82f6" /> {/* Blue tint */}
    </>
  );
};

export const BackgroundCubes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
};

