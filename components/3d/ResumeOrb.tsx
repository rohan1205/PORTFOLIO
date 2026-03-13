"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ResumeOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x += 0.01;
      orbRef.current.rotation.y += 0.02;
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5; // Hover
    }
  });

  const handleClick = () => {
    // Usually triggers a download link
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Rohan_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <group position={[15, 0, 0]} onClick={handleClick} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Sphere ref={orbRef} args={[2, 64, 64]} scale={hovered ? 1.1 : 1}>
        <MeshDistortMaterial
          color={hovered ? "#ff0055" : "#7b2cbf"}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.5}
          roughness={0.2}
          distort={0.4}
          speed={hovered ? 4 : 2}
        />
      </Sphere>
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.8}
        color={hovered ? "#ff0055" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000"
      >
        RESUME
      </Text>
    </group>
  );
}
