"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ChevronRight, Zap, Shield, MousePointer2, Layers, Rocket } from "lucide-react";
import Link from "next/link";
import { SakuraPetals } from "@/components/SakuraPetals";
import { useState, useEffect } from "react";

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card p-8 rounded-[2.5rem] group hover:sakura-border transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`mb-6 p-4 rounded-2xl bg-white/5 w-fit ${feature.color} shadow-lg shadow-black/20`}>
          <feature.icon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-white/60 leading-relaxed text-lg">{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
      <SakuraPetals />
      
      {/* Interactive Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 183, 197, 0.08), transparent 40%)`
        }}
      />

      <div className="container mx-auto px-4 pt-20 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-12 mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card text-sm font-semibold text-white/90 border-pink-500/30"
          >
            <Sparkles size={18} className="text-pink-400 animate-pulse" />
            <span className="uppercase tracking-widest text-xs">Premium Visuals Experience</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
            >
              Asux <span className="sakura-glow italic">Visuals</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Совершенство в каждом пикселе. Самые технологичные визуалы для комфортной и красивой игры.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link 
              href="/store" 
              className="px-10 py-5 rounded-[2rem] font-black text-xl flex items-center gap-3 bg-gradient-to-r from-[#ffb7c5] to-[#ff8fa3] text-[#4a0e1c] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(255,183,197,0.5)]"
            >
              В МАГАЗИН <Rocket size={24} />
            </Link>
            <Link 
              href="/auth" 
              className="px-10 py-5 rounded-[2rem] font-black text-xl flex items-center gap-3 glass-button text-white hover:scale-105 active:scale-95 transition-all"
            >
              ЛИЧНЫЙ КАБИНЕТ <MousePointer2 size={24} />
            </Link>
          </motion.div>
        </section>

        {/* Dynamic Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            {
              title: "Next-Gen FPS",
              description: "Алгоритмы оптимизации нового поколения для максимальной производительности.",
              icon: Zap,
              color: "text-amber-400",
            },
            {
              title: "Anti-Cheat Safe",
              description: "Полная невидимость для всех известных систем защиты серверов.",
              icon: Shield,
              color: "text-emerald-400",
            },
            {
              title: "Cloud Engine",
              description: "Облачная синхронизация настроек и моментальные обновления без перезапуска.",
              icon: Layers,
              color: "text-sky-400",
            },
          ].map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </section>

        {/* Interactive Showcase */}
        <section className="space-y-20 pb-20">
          <div className="text-center space-y-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              Увидьте <span className="text-pink-400 underline decoration-pink-500/30 underline-offset-8">разницу</span>
            </motion.h2>
            <p className="text-white/40 text-lg">Демонстрация работы модулей в реальном времени</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="glass-card aspect-video rounded-[3rem] overflow-hidden relative sakura-border p-2 shadow-2xl shadow-pink-500/5 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
            
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-12">
               <div className="flex justify-between items-end">
                  <div className="space-y-2">
                     <span className="text-pink-400 text-sm font-black uppercase tracking-[0.3em] bg-pink-500/10 px-3 py-1 rounded-lg">Preview v2.4</span>
                     <h4 className="text-4xl font-black text-white tracking-tight">Asux Interface Shell</h4>
                  </div>
                  <div className="flex gap-4">
                    <div className="px-6 py-3 glass-card rounded-2xl text-sm font-bold text-white/90 backdrop-blur-3xl">
                      CPU: 12%
                    </div>
                    <div className="px-6 py-3 glass-card rounded-2xl text-sm font-bold text-pink-400 backdrop-blur-3xl border-pink-500/20">
                      FPS: 280+
                    </div>
                  </div>
               </div>
            </div>

            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-110"
              style={{ backgroundImage: 'url("/images/asux-visuals.jpg")' }}
            />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
