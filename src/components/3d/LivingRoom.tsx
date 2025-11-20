import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const EnergyMaterial = shaderMaterial(
  { time: 0, colorStart: new THREE.Color('#ff6b35'), colorEnd: new THREE.Color('#ff9e00') }, // Updated to Sunset colors
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  `
    uniform float time;
    uniform vec3 colorStart;
    uniform vec3 colorEnd;
    varying vec2 vUv;

    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float noiseVal = snoise(uv * 10.0 + time * 2.0);
      float bolt = 1.0 / abs(uv.y - 0.5 + noiseVal * 0.2) * 0.05;
      float glow = 1.0 - distance(uv, vec2(0.5));
      vec3 finalColor = mix(colorStart, colorEnd, bolt * glow);
      gl_FragColor = vec4(finalColor, bolt + glow * 0.5);
    }
  `
);

extend({ EnergyMaterial });

interface TVScreenProps {
  currentSection: string;
}

const TVScreen = ({ currentSection }: TVScreenProps) => {
  const materialRef = useRef<any>(null);

  const sectionContent: { [key: string]: { title: string; subtitle: string; emoji: string } } = {
    hero: { title: "PAUL KAHURA", subtitle: "Full Stack Engineer", emoji: "👨‍💻" },
    about: { title: "ABOUT ME", subtitle: "Building Digital Experiences", emoji: "🚀" },
    projects: { title: "PROJECTS", subtitle: "7 Featured Projects", emoji: "💼" },
    blog: { title: "INSIGHTS", subtitle: "Technical Articles", emoji: "📝" },
  };

  const content = sectionContent[currentSection] || sectionContent.hero;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Screen Plane */}
      <mesh>
        <planeGeometry args={[3.3, 1.8]} />
        <energyMaterial ref={materialRef} transparent />
      </mesh>

      {/* Content Overlay */}
      <group position={[0, 0, 0.05]}>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {content.emoji}
        </Text>

        <Text
          position={[0, -0.1, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          maxWidth={2.8}
          textAlign="center"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {content.title}
        </Text>

        <Text
          position={[0, -0.35, 0]}
          fontSize={0.08}
          color="#ffe4cc"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
          textAlign="center"
        >
          {content.subtitle}
        </Text>
      </group>
    </group>
  );
};

interface LivingRoomProps {
  currentSection: string;
}

export const LivingRoom = ({ currentSection }: LivingRoomProps) => {
  const viewerRef = useRef<THREE.Group>(null);
  const sectionAngles: Record<string, number> = {
    hero: Math.PI,
    about: Math.PI - 0.05,
    projects: Math.PI + 0.05,
    blog: Math.PI,
  };

  useFrame((_state, delta) => {
    if (viewerRef.current) {
      const target = sectionAngles[currentSection] ?? Math.PI;
      viewerRef.current.rotation.y = THREE.MathUtils.lerp(viewerRef.current.rotation.y, target, delta * 4);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Decorative Wall Panel - Blended */}
      <mesh position={[0, 0, -2]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#fff5f0" />
      </mesh>

      {/* Floating TV Unit - Minimal Widget Style */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 0.5, 1]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
        </mesh>

        <group position={[-1.5, -1.6, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
          <meshStandardMaterial color="#333" />
        </group>
        <group position={[1.5, -1.6, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4]} />
          <meshStandardMaterial color="#333" />
        </group>

        <mesh position={[0, 0.2, -0.1]}>
          <boxGeometry args={[3.5, 2, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.2} />
        </mesh>

        <group position={[0, 0.2, 0]}>
          <TVScreen currentSection={currentSection} />
        </group>

        <pointLight position={[0, 0.2, -1]} color="#ff6b35" intensity={2} distance={5} />
      </group>

      {/* Viewer */}
      <group position={[1.6, -0.6, 0.3]} ref={viewerRef}>
        {/* Seat */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[1.6, 0.3, 0.8]} />
          <meshStandardMaterial color="#9cb3a8" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.05, -0.25]} castShadow>
          <boxGeometry args={[1.6, 0.5, 0.3]} />
          <meshStandardMaterial color="#9cb3a8" roughness={0.8} />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.8, 16]} />
          <meshStandardMaterial color="#2ab7ca" roughness={0.9} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Legs */}
        <mesh position={[0.12, -0.1, 0.25]} rotation={[Math.PI / 1.8, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.7]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[-0.12, -0.1, 0.25]} rotation={[Math.PI / 1.8, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.7]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>
    </group>
  );
};
