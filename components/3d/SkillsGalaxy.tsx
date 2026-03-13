"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Trail } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "AI / ML", color: "#ff0055", speed: 0.5, radius: 8, size: 0.8 },
  { name: "Cybersecurity", color: "#00f0ff", speed: 0.8, radius: 12, size: 1 },
  { name: "Full Stack", color: "#7b2cbf", speed: 0.4, radius: 16, size: 1.2 },
  { name: "Cloud & DevOps", color: "#facc15", speed: 0.6, radius: 20, size: 0.9 },
  { name: "Data Engineering", color: "#10b981", speed: 0.3, radius: 24, size: 0.7 },
];

function Planet({ name, color, speed, radius, size }: typeof SKILLS[0]) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  
  // Random starting angle
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * speed + offset.current;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
    }
    if (planetRef.current) {
        planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Trail width={2} color={color} length={10} attenuation={(t) => t * t}>
        <Sphere ref={planetRef} args={[size, 32, 32]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
        </Sphere>
      </Trail>
      <Text
        position={[0, size + 1, 0]}
        fontSize={1}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        {name}
      </Text>
    </group>
  );
}

export default function SkillsGalaxy() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={[0, -10, -10]} rotation={[0.2, 0, 0]}>
      {/* Central "Sun" or Core */}
      <Sphere ref={sunRef} args={[3, 32, 32]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} wireframe={true} />
      </Sphere>
      <pointLight intensity={5} color="#ffffff" />
      
      {/* Orbiting Skills */}
      {SKILLS.map((skill, i) => (
        <Planet key={i} {...skill} />
      ))}
    </group>
  );
}
