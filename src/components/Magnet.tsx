import React, { useState, useRef, useEffect } from 'react';
 
interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}
 
export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  // Detect if this is a fine-pointer (mouse) device — disable magnet on touch screens
  const [isMouseDevice, setIsMouseDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsMouseDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMouseDevice(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    // Only activate magnet on mouse devices
    if (!isMouseDevice) return;

    const handleMove = (clientX: number, clientY: number) => {
      if (!elementRef.current) return;
 
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
 
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
 
      // Check if coordinate is within the bounding box extended by padding
      const isWithinPadding =
        clientX >= rect.left - padding &&
        clientX <= rect.right + padding &&
        clientY >= rect.top - padding &&
        clientY <= rect.bottom + padding;
 
      if (isWithinPadding) {
        setIsHovered(true);
        // Calculate transform divided by strength factor
        const targetX = distanceX / strength;
        const targetY = distanceY / strength;
        setTransform({ x: targetX, y: targetY });
      } else {
        setIsHovered(false);
        setTransform({ x: 0, y: 0 });
      }
    };
 
    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
 
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, isMouseDevice]);
 
  const style: React.CSSProperties = isMouseDevice
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isHovered ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }
    : {};
 
  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
}
