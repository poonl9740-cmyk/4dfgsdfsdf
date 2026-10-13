"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SakuraPetals() {
  const [petals, setPetals] = useState<{ id: number; x: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      size: 5 + Math.random() * 15,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -20, x: petal.x, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: `calc(${petal.x} + ${Math.sin(petal.id) * 100}px)`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
          style={{
            width: petal.size,
            height: petal.size,
          }}
          className="absolute"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C10 0 14 4 18 8C22 12 18 20 10 20C2 20 -2 12 2 8C6 4 10 0 10 0Z"
              fill="#FFB7C5"
              fillOpacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
