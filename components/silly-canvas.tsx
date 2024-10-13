'use client'
import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function MouseTrailAndDraw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<Point>({ x: 0, y: 0, age: 0 });
  const trailRef = useRef<Point[]>([]);
  const drawingSegmentsRef = useRef<Point[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Canvas properties
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const maxTrailLength = 50;
    const trailFadeRate = 0.95; // Adjust this value to change how quickly the trail fades

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw permanent lines
      ctx.strokeStyle = 'black';
      drawingSegmentsRef.current.forEach(segment => {
        ctx.beginPath();
        segment.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      });

      // Draw and update trail
      trailRef.current.forEach((point, index) => {
        const nextPoint = trailRef.current[index + 1];
        if (nextPoint) {
          ctx.strokeStyle = `rgba(0, 0, 0, ${point.age})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
        }
        point.age *= trailFadeRate;
      });

      // Remove faded trail points
      trailRef.current = trailRef.current.filter(point => point.age > 0.01);

      requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      const newPoint: Point = { x: clientX, y: clientY, age: 1 };

      // Always add a trail point
      trailRef.current.push(newPoint);

      // Limit the trail length
      if (trailRef.current.length > maxTrailLength) {
        trailRef.current = trailRef.current.slice(trailRef.current.length - maxTrailLength);
      }

      if (isDrawing) {
        const currentSegment = drawingSegmentsRef.current[drawingSegmentsRef.current.length - 1];
        currentSegment.push(newPoint);
      }

      lastPos.current = newPoint;
    }

    function handleMouseDown(e: MouseEvent) {
      setIsDrawing(true);
      const { clientX, clientY } = e;
      const newPoint: Point = { x: clientX, y: clientY, age: 1 };
      drawingSegmentsRef.current.push([newPoint]);
      lastPos.current = newPoint;
    }

    function handleMouseUp() {
      setIsDrawing(false);
    }

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault(); // Prevent the default context menu
      drawingSegmentsRef.current = []; // Clear all drawing segments
    }

    window.addEventListener('mousemove', handleMouseMove);
    // window.addEventListener('mousedown', handleMouseDown);
    // window.addEventListener('mouseup', handleMouseUp);
    // window.addEventListener('mouseout', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('mousedown', handleMouseDown);
      // window.removeEventListener('mouseup', handleMouseUp);
      // window.removeEventListener('mouseout', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isDrawing]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
}