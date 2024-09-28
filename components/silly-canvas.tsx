'use client'
import { useEffect, useRef } from 'react';

const SillyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize the canvas to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      const { x: prevX, y: prevY } = prevPos.current;

      // Draw the trail
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      prevPos.current = { x, y };
    };

    const fadeEffect = () => {
      // Use a translucent black layer to create a smooth fade-out effect
      ctx.fillStyle = 'rgba(209, 213, 219, 0.2)'; // Light opacity to gradually fade the trail
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Apply the fade layer
    };

    // Add event listener for mouse move
    window.addEventListener('mousemove', handleMouseMove);

    // Apply the fade effect at regular intervals
    const interval = setInterval(fadeEffect, 50);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 pointer-events-none" style={{ zIndex:0}} />;
};

export default SillyCanvas;