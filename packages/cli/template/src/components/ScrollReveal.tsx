"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  threshold?: number;
  className?: string;
  float?: boolean;
  floatDistance?: number;
  floatDuration?: number;
  onReveal?: () => void;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 60,
  rotation = 0,
  duration = 0.7,
  delay = 0,
  stagger = 0,
  threshold = 0.15,
  className = "",
  float = false,
  floatDistance = 4,
  floatDuration = 3,
  onReveal,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const offset =
      direction === "down" || direction === "right" ? distance : -distance;

    const isStagger = stagger > 0 && el.children.length > 0;
    const targets = isStagger ? el.children : el;

    gsap.set(targets, {
      [axis]: offset,
      rotation,
      opacity: 0,
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onReveal) onReveal();
        if (float) {
          gsap.to(targets, {
            y: floatDistance,
            duration: floatDuration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      },
    });

    tl.to(targets, {
      [axis]: 0,
      rotation: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger,
    });

    const startPct = (1 - threshold) * 100;

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
      if (float) gsap.killTweensOf(targets);
    };
  }, [
    direction,
    distance,
    rotation,
    duration,
    delay,
    stagger,
    threshold,
    float,
    floatDistance,
    floatDuration,
    onReveal,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
