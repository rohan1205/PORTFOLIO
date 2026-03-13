"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NetworkGraph({ nodeCount = 150 }: { nodeCount?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
  
  const { positions, velocities, linesBuffer } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04
        )
      );
    }
    const linesBuffer = new Float32Array(maxConnections * 6);
    return { positions, velocities, linesBuffer };
  }, [nodeCount, maxConnections]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update node positions
    for (let i = 0; i < nodeCount; i++) {
        pos[i*3] += velocities[i].x;
        pos[i*3+1] += velocities[i].y;
        pos[i*3+2] += velocities[i].z;
        
        // Bounce off invisible bounds
        if (Math.abs(pos[i*3]) > 20) velocities[i].x *= -1;
        if (Math.abs(pos[i*3+1]) > 20) velocities[i].y *= -1;
        if (Math.abs(pos[i*3+2]) > 20) velocities[i].z *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    let vertexpos = 0;
    let numConnected = 0;

    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            const dx = pos[i*3] - pos[j*3];
            const dy = pos[i*3+1] - pos[j*3+1];
            const dz = pos[i*3+2] - pos[j*3+2];
            const distSq = dx*dx + dy*dy + dz*dz;

            if (distSq < 30) { // connection threshold
                linesBuffer[vertexpos++] = pos[i*3];
                linesBuffer[vertexpos++] = pos[i*3+1];
                linesBuffer[vertexpos++] = pos[i*3+2];
                linesBuffer[vertexpos++] = pos[j*3];
                linesBuffer[vertexpos++] = pos[j*3+1];
                linesBuffer[vertexpos++] = pos[j*3+2];
                numConnected++;
            }
        }
    }
    
    // Update line geometry draw range and pos
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linesBuffer.subarray(0, vertexpos), 3));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#00ff41" size={0.15} transparent opacity={0.6} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#1a4f5c" transparent opacity={0.3} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
