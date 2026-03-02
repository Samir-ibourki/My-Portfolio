import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export const useCustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const isHoveringRef = useRef(false);

  const onMouseMove = useCallback((e) => {
    if (!cursorDotRef.current || !cursorRingRef.current) return;

    // Fast, responsive cursor dot
    gsap.to(cursorDotRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.05,
      ease: 'power2.out',
    });

    // Slightly delayed, smooth cursor ring
    gsap.to(cursorRingRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power3.out',
    });
  }, []);

  const onMouseEnterInteractive = useCallback(() => {
    if (!cursorRingRef.current || isHoveringRef.current) return;
    isHoveringRef.current = true;
    
    gsap.to(cursorRingRef.current, {
      scale: 1.5,
      borderColor: '#ff00ff',
      duration: 0.2,
      ease: 'power2.out',
    });
  }, []);

  const onMouseLeaveInteractive = useCallback(() => {
    if (!cursorRingRef.current || !isHoveringRef.current) return;
    isHoveringRef.current = false;
    
    gsap.to(cursorRingRef.current, {
      scale: 1,
      borderColor: '#00d4ff',
      duration: 0.2,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Create cursor elements
    const dot = document.createElement('div');
    dot.className = 'custom-cursor cursor-dot';
    document.body.appendChild(dot);
    cursorDotRef.current = dot;

    const ring = document.createElement('div');
    ring.className = 'custom-cursor cursor-ring';
    document.body.appendChild(ring);
    cursorRingRef.current = ring;

    // Add mouse move listener
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      dot.remove();
      ring.remove();
      document.body.style.cursor = 'auto';
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, [onMouseMove, onMouseEnterInteractive, onMouseLeaveInteractive]);

  return {
    cursorDotRef,
    cursorRingRef,
  };
};