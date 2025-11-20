import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { LivingRoom } from './LivingRoom';

const RotatingScene = ({ currentSection }: { currentSection: string }) => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <LivingRoom currentSection={currentSection} />
    </group>
  );
};

type SceneProps = {
  className?: string;
};

export const Scene = ({ className }: SceneProps) => {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section we're in based on scroll position
      const sections = ['hero', 'about', 'projects', 'blog'];
      const sectionIndex = Math.floor((scrollY / windowHeight) * sections.length);
      const section = sections[Math.min(sectionIndex, sections.length - 1)];
      
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={className ?? 'w-full h-full'}>
      <Canvas shadows style={{ background: 'transparent' }}>
        <PerspectiveCamera makeDefault position={[5, 4, 7]} fov={40} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[8, 5, 2]}
          color="#88aaff"
          intensity={0.8}
          castShadow
        />
        <pointLight position={[0, 5, 5]} intensity={0.3} color="#ffffff" />

        <Suspense fallback={null}>
          <RotatingScene currentSection={currentSection} />
        </Suspense>
      </Canvas>
    </div>
  );
};
