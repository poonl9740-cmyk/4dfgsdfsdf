"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, Send, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Failed to submit ticket:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-20 max-w-4xl sakura-bg-animate min-h-screen">
      <div className="text-center mb-16 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Техническая поддержка
        </motion.h1>
        <p className="text-white/60">
          Мы здесь, чтобы помочь вам с любыми вопросами по установке или использованию наших визуалов.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-6 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
            <MessageSquare size={24} />
          </div>
          <h3 className="font-bold text-white">Discord</h3>
          <p className="text-sm text-white/50">Присоединяйтесь к нашему сообществу</p>
          <a href="#" className="flex items-center justify-center gap-1 text-blue-400 text-sm font-medium hover:underline">
            Открыть Discord <ExternalLink size={14} />
          </a>
        </div>
        
        <div className="glass-card p-6 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto text-purple-400">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-white">Email</h3>
          <p className="text-sm text-white/50">Для коммерческих запросов</p>
          <a href="mailto:support@visuals.com" className="text-purple-400 text-sm font-medium hover:underline">
            support@visuals.com
          </a>
        </div>

        <div className="glass-card p-6 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto text-green-400">
            <Send size={24} />
          </div>
          <h3 className="font-bold text-white">Telegram</h3>
          <p className="text-sm text-white/50">Быстрые ответы на вопросы</p>
          <a href="#" className="text-green-400 text-sm font-medium hover:underline">
            @visuals_support
          </a>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 md:p-12 rounded-[2.5rem]"
      >
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Отправить тикет</h2>
        
        {submitted ? (
          <div className="bg-green-500/20 border border-green-500/30 p-6 rounded-2xl text-center text-green-400">
            Ваше сообщение успешно отправлено! Мы ответим вам в ближайшее время.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Ваше имя</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 ml-1">Email для ответа</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Тема</label>
              <select name="subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all appearance-none">
                <option value="payment" className="bg-neutral-900">Проблема с оплатой</option>
                <option value="launch" className="bg-neutral-900">Ошибка при запуске</option>
                <option value="suggestion" className="bg-neutral-900">Предложение по улучшению</option>
                <option value="other" className="bg-neutral-900">Другое</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Сообщение</label>
              <textarea 
                required
                name="message"
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                placeholder="Опишите вашу проблему максимально подробно..."
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-2xl font-bold bg-white text-black hover:bg-white/90 transition-all"
            >
              Отправить сообщение
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
