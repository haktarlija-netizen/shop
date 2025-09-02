"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function NeonSphere() {
  return (
    <div className="w-full h-64">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} />
        <Sphere args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial color="#00ffff" attach="material" distort={0.3} speed={2} />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

