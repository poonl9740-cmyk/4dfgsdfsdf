"use client";

import { 
  User, Shield, CreditCard, Clock, Settings, 
  LogOut, ChevronRight, Hash, Info, RefreshCcw, 
  Camera, Ticket, XCircle, AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [promoCode, setPromoCode] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [user, setUser] = useState({
    name: "Загрузка...",
    email: "loading@example.com",
    avatar: "/images/default-avatar.svg",
    subscription: {
      plan: "Pro",
      status: "Active",
      expires: "12 Октября, 2024",
      price: 300,
      daysUsed: 3,
    },
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("asux_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(prev => ({
        ...prev,
        name: parsed.username,
        email: parsed.email,
        avatar: "/images/default-avatar.svg" // Using local for better reliability
      }));
    }
  }, []);

  const calculateRefund = () => {
    const dailyRate = user.subscription.price / 30; // simple 30 day calc
    const refund = Math.max(0, user.subscription.price - (user.subscription.daysUsed * dailyRate));
    return Math.floor(refund);
  };

  return (
    <div className="container mx-auto px-4 pt-20 max-w-6xl pb-24 sakura-bg-animate">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-[2.5rem] text-center sakura-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
            <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer">
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                id="avatar-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setUser(prev => ({ ...prev, avatar: e.target?.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label htmlFor="avatar-upload" className="cursor-pointer block w-full h-full">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-3xl bg-white/5 border border-white/10 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 border-4 border-black rounded-full" />
              </label>
            </div>
            
            <h2 className="text-2xl font-bold sakura-glow mb-1">{user.name}</h2>
            <p className="text-white/40 text-sm mb-6">{user.email}</p>
            
            <nav className="space-y-2 text-left">
              {[
                { id: "subscription", name: "Подписка", icon: Shield },
                { id: "info", name: "Информация", icon: Info },
                { id: "settings", name: "Настройки", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    activeTab === item.id ? "bg-white/10 text-white" : "text-white/40 hover:bg-white/5 hover:text-white/60"
                  )}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 rounded-3xl"
          >
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-red-400">
              <span className="flex items-center gap-3 font-medium">
                <LogOut size={18} /> Выйти
              </span>
              <ChevronRight size={16} />
            </button>
          </motion.div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "subscription" && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 sakura-border rounded-[2.5rem] p-[1px] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-transparent pointer-events-none" />
                <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Shield size={120} className="text-pink-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="text-pink-400" size={24} /> Текущий статус
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <p className="text-white/40 text-sm mb-1 uppercase tracking-wider">План</p>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-white">{user.subscription.plan}</span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold rounded-full uppercase">
                          {user.subscription.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1 uppercase tracking-wider">Действует до</p>
                      <div className="flex items-center gap-2 text-white/90">
                        <Clock size={18} className="text-white/40" />
                        <span className="text-lg font-medium">{user.subscription.expires}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="px-8 py-3 bg-gradient-to-r from-[#ffb7c5] to-[#ff8fa3] text-[#4a0e1c] font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-pink-500/10">
                      Продлить
                    </button>
                    <button 
                      onClick={() => setShowCancelModal(true)}
                      className="px-8 py-3 glass-button rounded-2xl font-medium text-red-400/80 hover:text-red-400 border-red-500/20"
                    >
                      Отменить подписку
                    </button>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Ticket className="text-amber-400" size={24} /> Активация кода
                  </h3>
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300/40" size={18} />
                      <input 
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Введите промокод или ключ"
                        className="w-full glass-input rounded-2xl pl-12 pr-6 py-4 text-white"
                      />
                    </div>
                    <button className="px-8 py-4 glass-button text-white font-bold rounded-2xl transition-all">
                      Применить
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                    <RefreshCcw className="text-blue-400" size={24} /> Управление данными
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-sm">Логин</p>
                        <p className="text-lg font-bold text-white">{user.name}</p>
                      </div>
                      <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 transition-all">
                        Сбросить
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-sm">Email</p>
                        <p className="text-lg font-bold text-white">{user.email}</p>
                      </div>
                      <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 transition-all">
                        Сбросить
                      </button>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between col-span-1 md:col-span-2">
                      <div>
                        <p className="text-white/40 text-sm">Пароль</p>
                        <p className="text-lg font-bold text-white">••••••••••••</p>
                      </div>
                      <button 
                        onClick={() => setShowPasswordModal(true)}
                        className="px-6 py-3 glass-button rounded-xl text-white/60 hover:text-white transition-all font-medium"
                      >
                        Изменить пароль
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-8 rounded-[2.5rem]"
              >
                <h3 className="text-xl font-bold text-white mb-6">Настройки аккаунта</h3>
                <p className="text-white/40">Здесь появятся дополнительные настройки ваших визуалов Asux.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card max-w-md w-full p-8 rounded-[2.5rem] border-red-500/20"
            >
              <XCircle className="text-red-500 mb-6 mx-auto" size={48} />
              <h4 className="text-2xl font-bold text-white text-center mb-4">Отмена подписки</h4>
              
              <div className="bg-white/5 rounded-2xl p-6 mb-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="text-blue-400 shrink-0 mt-1" size={18} />
                  <p className="text-sm text-white/60 leading-relaxed">
                    При отмене подписки деньги возвращаются на ваш баланс пропорционально оставшемуся времени.
                  </p>
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-white/60">К возврату:</span>
                  <span className="text-xl font-bold text-green-400">{calculateRefund()}₽</span>
                </div>
                <div className="text-[10px] text-white/30 text-center italic">
                  * Расчет: 300₽ (цена) - (3 дня × 10₽/день) = 270₽
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all"
                >
                  Подтвердить отмену
                </button>
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="w-full py-4 glass-button text-white font-bold rounded-2xl transition-all"
                >
                  Я передумал
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card max-w-md w-full p-8 rounded-[2.5rem] sakura-border"
            >
              <h4 className="text-2xl font-bold text-white text-center mb-6">Смена пароля</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/40 ml-1">Текущий пароль</label>
                  <input 
                    type="password"
                    className="w-full glass-input rounded-2xl px-6 py-4 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/40 ml-1">Новый пароль</label>
                  <input 
                    type="password"
                    className="w-full glass-input rounded-2xl px-6 py-4 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/40 ml-1">Повторите пароль</label>
                  <input 
                    type="password"
                    className="w-full glass-input rounded-2xl px-6 py-4 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="w-full py-4 bg-gradient-to-r from-[#ffb7c5] to-[#ff8fa3] text-[#4a0e1c] font-bold rounded-2xl transition-all"
                >
                  Сохранить изменения
                </button>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="w-full py-4 glass-button text-white font-bold rounded-2xl transition-all"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
