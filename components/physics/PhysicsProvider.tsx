"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Matter from "matter-js";

type PhysicsContextType = {
  engine: Matter.Engine | null;
  world: Matter.World | null;
};

const PhysicsContext = createContext<PhysicsContextType>({ engine: null, world: null });

export const usePhysics = () => useContext(PhysicsContext);

export default function PhysicsProvider({ children }: { children: React.ReactNode }) {
  const [engine, setEngine] = useState<Matter.Engine | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const _engine = Matter.Engine.create({
      gravity: { x: 0, y: -0.1, scale: 0.001 } // Antigravity floating up
    });
    
    // Add boundaries (walls, ceiling, floor)
    const updateBoundaries = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const wallOptions = { isStatic: true, friction: 0, restitution: 0.8 };
      
      const ground = Matter.Bodies.rectangle(width/2, height + 50, width * 2, 100, wallOptions);
      // Soft ceiling so they bounce back down
      const ceiling = Matter.Bodies.rectangle(width/2, -50, width * 2, 100, { ...wallOptions, restitution: 0.5 });
      const leftWall = Matter.Bodies.rectangle(-50, height/2, 100, height * 2, wallOptions);
      const rightWall = Matter.Bodies.rectangle(width + 50, height/2, 100, height * 2, wallOptions);
      
      // Clear old boundaries, add new ones
      const oldBoundaries = _engine.world.bodies.filter(b => b.isStatic);
      Matter.World.remove(_engine.world, oldBoundaries);
      Matter.World.add(_engine.world, [ground, ceiling, leftWall, rightWall]);
    };

    updateBoundaries();
    window.addEventListener("resize", updateBoundaries);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, _engine);

    setEngine(_engine);

    return () => {
      window.removeEventListener("resize", updateBoundaries);
      Matter.Engine.clear(_engine);
      Matter.Runner.stop(runner);
    };
  }, []);

  // Sync a mouse event listener to add 'wind' or 'disturbance' to all bodies
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!engine) return;
      const mousePos = { x: e.clientX, y: e.clientY };
      
      engine.world.bodies.forEach((body) => {
        if (body.isStatic) return;
        const dist = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mousePos));
        if (dist < 150) {
          // Push body away from mouse
          const force = Matter.Vector.normalise(Matter.Vector.sub(body.position, mousePos));
          const strength = (150 - dist) * 0.00005;
          Matter.Body.applyForce(body, body.position, Matter.Vector.mult(force, strength));
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [engine]);

  return (
    <PhysicsContext.Provider value={{ engine, world: engine?.world || null }}>
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </PhysicsContext.Provider>
  );
}
