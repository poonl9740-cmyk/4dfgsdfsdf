"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Lite",
    price: "299",
    description: "Базовые улучшения для комфортной игры",
    features: ["Оптимизация FPS", "Улучшенные частицы", "Базовые шейдеры", "Поддержка 24/7"],
    icon: Zap,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Pro",
    price: "599",
    description: "Лучший выбор для активных игроков",
    features: ["Все из Lite", "Кастомные анимации", "Премиум шейдеры", "Приоритетная поддержка", "Доступ к бета-тестам"],
    icon: Star,
    popular: true,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Elite",
    price: "999",
    description: "Максимальные возможности и эксклюзив",
    features: ["Все из Pro", "Индивидуальный конфиг", "Эксклюзивные скины", "Личный менеджер", "Пожизненный доступ"],
    icon: Crown,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
];

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 pt-20 sakura-bg-animate min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Выберите свой план
        </motion.h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Подписка дает доступ к приватному лаунчеру и регулярным обновлениям всех наших продуктов.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative glass-card rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 hover:scale-[1.02]",
              plan.borderColor,
              plan.popular && "bg-white/[0.08]"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                Популярный
              </div>
            )}

            <div className={cn("mb-8 p-4 rounded-2xl w-fit bg-gradient-to-br", plan.color)}>
              <plan.icon size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-white">{plan.price}₽</span>
              <span className="text-white/40">/месяц</span>
            </div>
            <p className="text-white/60 text-sm mb-8">{plan.description}</p>

            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={cn(
              "w-full py-4 rounded-2xl font-bold transition-all glass-button",
              plan.popular ? "bg-white text-black hover:bg-white/90" : "text-white"
            )}>
              Купить сейчас
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
