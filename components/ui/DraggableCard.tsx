"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { usePhysics } from "../physics/PhysicsProvider";

type DraggableCardProps = {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  className?: string;
};

export default function DraggableCard({ children, initialX = 100, initialY = 100, width = 300, height = 200, className = "" }: DraggableCardProps) {
  const { engine, world } = usePhysics();
  const elementRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<Matter.Body | null>(null);
  const constraintRef = useRef<Matter.Constraint | null>(null);

  // Use a ref for continuous loop sync without causing react re-renders
  const requestRef = useRef<number>(0);

  useEffect(() => {
    if (!engine || !world) return;

    // Create the physics body
    const body = Matter.Bodies.rectangle(initialX, initialY, width, height, {
      restitution: 0.8,
      frictionAir: 0.05,
      friction: 0.1,
      density: 0.005,
    });
    
    bodyRef.current = body;
    Matter.World.add(world, body);

    // Sync body position/rotation to the DOM
    const syncDOM = () => {
      if (elementRef.current && bodyRef.current) {
        const { position, angle } = bodyRef.current;
        elementRef.current.style.transform = `translate(${position.x - width / 2}px, ${position.y - height / 2}px) rotate(${angle}rad)`;
      }
      requestRef.current = requestAnimationFrame(syncDOM);
    };
    
    requestRef.current = requestAnimationFrame(syncDOM);

    return () => {
      cancelAnimationFrame(requestRef.current);
      if (bodyRef.current) Matter.World.remove(world, bodyRef.current);
    };
  }, [engine, world, initialX, initialY, width, height]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!world || !bodyRef.current) return;
    
    // Capture pointer to track dragging seamlessly across the screen
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    // Create a temporary constraint pulling the body toward the mouse
    const constraint = Matter.Constraint.create({
      pointA: { x: e.clientX, y: e.clientY },
      bodyB: bodyRef.current,
      pointB: { x: 0, y: 0 },
      stiffness: 0.1,
      damping: 0.5,
      length: 0
    });
    
    constraintRef.current = constraint;
    Matter.World.add(world, constraint);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!constraintRef.current) return;
    // Update the anchor point of the spring to current mouse
    constraintRef.current.pointA = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!world || !constraintRef.current) return;
    
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    Matter.World.remove(world, constraintRef.current);
    constraintRef.current = null;
  };

  return (
    <div
      ref={elementRef}
      className={`absolute top-0 left-0 pointer-events-auto draggable will-change-transform ${className}`}
      style={{ width, height }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
}
