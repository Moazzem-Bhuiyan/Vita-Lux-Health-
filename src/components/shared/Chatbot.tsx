"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { generateId } from "@/lib/utils";

const QUICK_REPLIES = [
  "What services do you offer?",
  "How do I book an appointment?",
  "What are your hours?",
  "Tell me about memberships",
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "Thank you for reaching out to Vita Lux. I'm here to help you with booking, services, pricing, and any other questions. How may I assist you today?",
  services:
    "We offer a curated collection of luxury treatments including Swedish Massage, Hot Stone Therapy, Luminous Glow Facial, Anti-Aging Facial, Aromatherapy Healing, and our signature 24K Gold Body Ritual. Would you like to explore any of these?",
  book:
    "Booking is simple! You can use our online booking system by clicking 'Book Now', or call us at +1 (212) 555-0192. We recommend booking 48 hours in advance to ensure your preferred therapist and time slot.",
  hours:
    "Our locations are open Monday–Friday 9am–9pm, Saturday 8am–8pm, and Sunday 10am–7pm. The Hamptons location may have seasonal hours.",
  membership:
    "Our membership tiers—Silver, Gold, and Platinum—offer significant savings and exclusive perks including priority booking, complimentary add-ons, and member-only events. Would you like more details on a specific tier?",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("service") || lower.includes("treatment") || lower.includes("massage") || lower.includes("facial"))
    return BOT_RESPONSES.services;
  if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule"))
    return BOT_RESPONSES.book;
  if (lower.includes("hour") || lower.includes("open") || lower.includes("time"))
    return BOT_RESPONSES.hours;
  if (lower.includes("member") || lower.includes("subscription") || lower.includes("silver") || lower.includes("gold") || lower.includes("platinum"))
    return BOT_RESPONSES.membership;
  return BOT_RESPONSES.default;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Welcome to Vita Lux. ✨ How may I assist your wellness journey today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "w-80 md:w-96 bg-cream-50 border border-stone-100 shadow-luxury-lg",
            "transition-all duration-300 origin-bottom-right",
            isMinimized ? "h-14 overflow-hidden" : "h-[520px] flex flex-col"
          )}
        >
          {/* Header */}
          <div className="bg-stone-900 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse-slow" />
              <div>
                <p className="font-serif text-cream-50 text-sm">Vita Lux Concierge</p>
                <p className="font-sans text-[10px] text-stone-400 tracking-wide">Here to assist you</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized((v) => !v)}
                className="p-1.5 text-stone-400 hover:text-cream-50 transition-colors"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-cream-50 transition-colors"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 bg-stone-900 flex items-center justify-center text-gold-500 mr-2 flex-shrink-0 mt-1">
                        <span className="font-serif text-xs">V</span>
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[78%] px-4 py-3 text-sm font-sans font-light leading-relaxed",
                        msg.role === "user"
                          ? "bg-stone-900 text-cream-50"
                          : "bg-white border border-stone-100 text-stone-700"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="whitespace-nowrap text-[10px] font-sans font-medium tracking-wide border border-gold-500/40 text-gold-700 px-3 py-1.5 hover:bg-gold-500/10 transition-colors flex-shrink-0"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-stone-100 p-3 flex items-center gap-2 flex-shrink-0">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent font-sans text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none py-1"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-stone-900 text-cream-50 hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen((v) => !v);
          setIsMinimized(false);
        }}
        className={cn(
          "w-14 h-14 bg-stone-900 text-cream-50 shadow-luxury-lg",
          "flex items-center justify-center",
          "hover:bg-stone-800 transition-all duration-300",
          "relative group"
        )}
        aria-label="Open chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
