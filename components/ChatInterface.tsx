import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Send, User, Loader2, Cat } from 'lucide-react';
import ComplexMarkdown from './MarkdownRenderer';

interface ChatInterfaceProps {
  context?: string; // The text of the current lesson to help the AI understand context
  lessonTitle?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ context, lessonTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset chat when lesson changes
  useEffect(() => {
    setMessages([
        {
          id: 'init',
          role: 'model',
          text: lessonTitle 
            ? `喵？人类，你正在学 **${lessonTitle}** 吗？\n\n看起来有点难度的样子... 如果看不懂就问本喵吧，本喵心情好的话会教你的！😼`
            : '喵~ 我是你的专属猫猫助教。关于 Android 开发有什么不懂的吗？快问，本喵赶着去吃鱼干呢！🐟',
          timestamp: Date.now()
        }
      ]);
  }, [lessonTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to allow shrinking
      textareaRef.current.style.height = 'auto';
      // Set height to scrollHeight to fit content, capped at 160px
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Pass the lesson context to the service
    const responseText = await sendChatMessage(messages, input, context);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-slate-800 p-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 transition-colors">
        <div className="flex items-center">
          <div className="p-1.5 bg-android/20 rounded-lg mr-2">
            <Cat size={16} className="text-android" />
          </div>
          <div>
            <h2 className="text-slate-800 dark:text-white text-sm font-semibold">🐱 猫猫助教</h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Context: {lessonTitle || 'General'}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 border ${
                msg.role === 'user' ? 'bg-gray-200 dark:bg-slate-700 ml-2 border-gray-300 dark:border-slate-600' : 'bg-android/20 mr-2 border-android/30'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-600 dark:text-slate-300" /> : <Cat size={18} className="text-android" />}
              </div>

              <div className={`px-3 py-2 rounded-lg text-sm overflow-hidden w-full break-words shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-gray-200 dark:border-slate-700'
              }`}>
                {msg.role === 'model' ? (
                  <ComplexMarkdown content={msg.text} />
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
             <div className="flex flex-row items-center ml-10 space-x-2">
                <Loader2 size={14} className="text-android animate-spin" />
                <span className="text-slate-500 dark:text-slate-400 text-xs">本喵正在思考... 🐾</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-gray-50/80 dark:bg-slate-800/30 border-t border-gray-200 dark:border-slate-700 flex-shrink-0 transition-colors">
        <div className="relative flex items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="向猫猫助教提问..."
            className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-android resize-none scrollbar-hide placeholder-slate-400 dark:placeholder-slate-500 min-h-[40px] max-h-[160px] transition-colors"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 bottom-2 p-1 bg-android text-slate-900 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;