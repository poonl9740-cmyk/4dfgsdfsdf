"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, User, ShoppingCart, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Магазин", href: "/store", icon: ShoppingCart },
  { name: "Вход", href: "/auth", icon: User },
  { name: "Поддержка", href: "/support", icon: HelpCircle },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card px-6 py-3 rounded-full flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              <Icon size={20} />
              <span className="hidden sm:block">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
