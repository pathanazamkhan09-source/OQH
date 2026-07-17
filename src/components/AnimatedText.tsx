import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Track the scroll progress of the paragraph element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, i) => {
        // Calculate the relative scroll progress window for this specific character
        // Start from 0 to 0.75, so the last character finishes its transition well before scroll ends
        const start = (i / total) * 0.75;
        const end = Math.min(start + 0.25, 1.0);

        // Map scroll percentage to character opacity
        const opacity = useTransform(scrollYProgress, [start, end], [0.45, 1]);

        if (char === ' ') {
          return <span key={i}>&nbsp;</span>;
        }

        return (
          <span key={i} className="relative inline-block select-none">
            {/* Invisible placeholder to reserve layout space */}
            <span className="opacity-0 pointer-events-none">{char}</span>
            {/* Absolutely positioned animated span that fades in */}
            <motion.span
              style={{ opacity }}
              className="absolute inset-0 inline-block"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
