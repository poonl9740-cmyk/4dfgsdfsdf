"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Сохраняем логин для отображения в профиле (имитация сессии)
    localStorage.setItem("asux_user", JSON.stringify({
      username: formData.username || (isLogin ? formData.email.split('@')[0] : "User"),
      email: formData.email
    }));
    
    router.push("/profile");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 pt-20 flex justify-center sakura-bg-animate min-h-screen">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 rounded-[2.5rem] relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "С возвращением" : "Регистрация"}
          </h2>
          <p className="text-white/40 text-sm">
            {isLogin ? "Войдите в Asux Visuals" : "Создайте аккаунт, чтобы начать"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input 
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Логин"
                className="w-full glass-input rounded-2xl pl-12 pr-6 py-4 text-white"
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full glass-input rounded-2xl pl-12 pr-6 py-4 text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Пароль"
              className="w-full glass-input rounded-2xl pl-12 pr-6 py-4 text-white"
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-[#ffb7c5] to-[#ff8fa3] text-[#4a0e1c] font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all mt-6 shadow-lg shadow-pink-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? "Войти" : "Зарегистрироваться"} <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/40 text-sm hover:text-white transition-colors"
          >
            {isLogin ? "Нет аккаунта? Создать" : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
