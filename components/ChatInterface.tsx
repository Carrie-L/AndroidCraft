import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { Send, User, Loader2, Cat } from 'lucide-react';
import ComplexMarkdown from './MarkdownRenderer';

interface ChatInterfaceProps {
  context?: string; // The text of the current lesson to help the AI understand context
  lessonTitle?: string;
  theme?: 'default' | 'cyberpunk' | 'light-cyberpunk' | 'light-blue-cyberpunk';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ context, lessonTitle, theme = 'default' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isCyberpunk = theme === 'cyberpunk';
  const isLightPinkCyberpunk = theme === 'light-cyberpunk';
  const isLightBlueCyberpunk = theme === 'light-blue-cyberpunk';
  const isLightCyberpunk = isLightPinkCyberpunk || isLightBlueCyberpunk;
  const isAnyCyberpunk = isCyberpunk || isLightCyberpunk;

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

  // ... scroll and resize effects remain same ...

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

  // Styles based on theme
  let containerClass = "flex flex-col h-full bg-white/50 dark:bg-slate-900/50 rounded-xl border border-gray-200  overflow-hidden transition-colors duration-300";
  if (isCyberpunk) {
    containerClass = "flex flex-col h-full bg-[#05050A]/80 overflow-hidden"; // 暗色模式暂时不用
  } else if (isLightCyberpunk) {
    // Light Cyberpunk：上、左极细边框 + 轻微阴影
    const borderColor = isLightPinkCyberpunk ? 'border-pink-300' : 'border-sky-300';
    containerClass = `flex flex-col h-full bg-white overflow-hidden border-t border-l ${borderColor} shadow-sm`;
  }

  let headerClass = "bg-gray-100 dark:bg-slate-800 p-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between flex-shrink-0 transition-colors";
  if (isCyberpunk) {
    headerClass = "bg-[#00F0FF]/90 p-3 border-b border-[#2A2A35] flex items-center justify-between flex-shrink-0";
  } else if (isLightCyberpunk) {
    headerClass = isLightPinkCyberpunk
      ? "bg-white p-3 border-b border-pink-100 flex items-center justify-between flex-shrink-0"
      : "bg-white p-3 border-b border-sky-100 flex items-center justify-between flex-shrink-0";
  }

  let userBubbleClass = "bg-blue-600 text-white rounded-tr-none";
  if (isCyberpunk) {
    userBubbleClass = "bg-[#7000FF] text-white rounded-tr-none shadow-[0_0_10px_rgba(112,0,255,0.4)] border border-[#8B5CF6]/30";
  } else if (isLightCyberpunk) {
    userBubbleClass = isLightPinkCyberpunk
      ? "bg-pink-400 text-white rounded-tr-none shadow-[2px_2px_0px_rgba(255,182,193,1)] border border-pink-300 font-bold"
      : "bg-sky-500 text-white rounded-tr-none shadow-[2px_2px_0px_rgba(125,211,252,1)] border border-sky-300 font-bold";
  }

  let modelBubbleClass = "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-gray-200 dark:border-slate-700";
  if (isCyberpunk) {
    modelBubbleClass = "bg-[#00F0FF] text-[#00F0FF] rounded-tl-none border border-[#00F0FF]/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]";
  } else if (isLightCyberpunk) {
    modelBubbleClass = isLightPinkCyberpunk
      ? "bg-white text-slate-700 rounded-tl-none border-2 border-pink-100 shadow-[2px_2px_0px_rgba(240,240,250,1)]"
      : "bg-white text-slate-700 rounded-tl-none border-2 border-sky-100 shadow-[2px_2px_0px_rgba(219,234,254,1)]";
  }

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className={headerClass}>
        <div className="flex items-center">
          <div className={`p-1.5 rounded-lg mr-2 ${
            isCyberpunk
              ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
              : isLightPinkCyberpunk
                ? 'bg-pink-200 text-pink-600'
                : isLightBlueCyberpunk
                  ? 'bg-sky-200 text-sky-600'
                  : 'bg-android/20 text-android'
          }`}>
            <Cat size={16} />
          </div>
          <div>
            <h2 className={`text-sm font-bold ${
              isCyberpunk
                ? 'text-[#00F0FF] tracking-widest uppercase'
                : isLightPinkCyberpunk
                  ? 'text-pink-500 tracking-wide font-mono'
                  : isLightBlueCyberpunk
                    ? 'text-sky-600 tracking-wide font-mono'
                    : 'text-slate-800 dark:text-white'
            }`}>
              {isAnyCyberpunk
                ? (isLightPinkCyberpunk ? '猫猫助教' : isLightBlueCyberpunk ? '猫猫助教' : '猫猫助教')
                : '🐱 猫猫助教'}
            </h2>
            <p className={`text-[10px] ${
              isCyberpunk
                ? 'text-[#7000FF] font-mono'
                : isLightPinkCyberpunk
                  ? 'text-pink-300 font-mono'
                  : isLightBlueCyberpunk
                    ? 'text-sky-400 font-mono'
                    : 'text-slate-500 dark:text-slate-400'
            }`}>
              CTX: {lessonTitle || 'Global'}
            </p>
          </div>
        </div>
        {isLightPinkCyberpunk && (
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
            <div className="w-2 h-2 rounded-full bg-pink-300"></div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-[#2A2A35] scrollbar-track-transparent">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 border ${
                isCyberpunk 
                  ? (msg.role === 'user' ? 'bg-[#7000FF]/20 ml-2 border-[#7000FF]/50 text-[#7000FF]' : 'bg-[#00F0FF]/10 mr-2 border-[#00F0FF]/30 text-[#00F0FF]')
                  : isLightPinkCyberpunk
                    ? (msg.role === 'user' ? 'bg-pink-100 ml-2 border-pink-200 text-pink-500' : 'bg-white mr-2 border-pink-100 text-pink-400 shadow-sm')
                    : isLightBlueCyberpunk
                      ? (msg.role === 'user' ? 'bg-sky-100 ml-2 border-sky-200 text-sky-600' : 'bg-white mr-2 border-sky-100 text-sky-500 shadow-sm')
                      : (msg.role === 'user' ? 'bg-gray-200 dark:bg-slate-700 ml-2 border-gray-300 dark:border-slate-600' : 'bg-android/20 mr-2 border-android/30 text-android')
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Cat size={18} />}
              </div>

              <div className={`px-3 py-2 rounded-lg text-sm overflow-hidden w-full break-words shadow-sm ${
                msg.role === 'user' ? userBubbleClass : modelBubbleClass
              }`}>
                {msg.role === 'model' ? (
                  <div className={
                    isCyberpunk
                      ? "prose-invert prose-p:text-[#00F0FF] prose-strong:text-[#00F0FF] prose-code:text-[#FF003C]"
                      : isLightPinkCyberpunk
                        ? "prose-p:text-slate-700 prose-strong:text-pink-600 prose-code:bg-pink-50 prose-code:text-pink-600"
                        : isLightBlueCyberpunk
                          ? "prose-p:text-slate-700 prose-strong:text-sky-600 prose-code:bg-sky-50 prose-code:text-sky-600"
                          : ""
                  }>
                     <ComplexMarkdown content={msg.text} />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* // isAnyCyberpunk ? '猫猫助教o(=•ェ•=)m 正在赶来 🐾' : */}
        
        {loading && (
          <div className="flex justify-start">
             <div className="flex flex-row items-center ml-10 space-x-2">
                <Loader2 size={14} className={`animate-spin ${isCyberpunk ? 'text-[#FF003C]' : isLightCyberpunk ? 'text-pink-400' : 'text-android'}`} />
                <span className={`text-xs ${isCyberpunk ? 'text-[#FF003C] font-mono blink' : isLightCyberpunk ? 'text-pink-400 font-mono' : 'text-slate-500 dark:text-slate-400'}`}>
                  { '本喵正在思考...你有小鱼干吗 o(=•ェ•=)m 🐾'}  
                </span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-3 border-t flex-shrink-0 transition-colors ${
        isCyberpunk ? 'bg-[#00F0FF] border-[#2A2A35]' : isLightPinkCyberpunk ? 'bg-white border-pink-100' : isLightBlueCyberpunk ? 'bg-white border-sky-100' : 'bg-gray-50/80 dark:bg-slate-800/30 border-gray-200 dark:border-slate-700'
      }`}>
        <div className="relative flex items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isAnyCyberpunk ? "INITIATE_QUERY..." : "向猫猫助教提问..."}
            className={`w-full rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none resize-none scrollbar-hide min-h-[40px] max-h-[160px] transition-colors ${
              isCyberpunk 
                ? 'bg-[#05050A] border border-[#2A2A35] text-[#00F0FF] placeholder-[#00F0FF]/30 focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.1)] font-mono'
                : isLightPinkCyberpunk
                  ? 'bg-pink-50/30 border-2 border-pink-100 text-slate-700 focus:border-pink-300 focus:bg-white focus:shadow-[0_0_10px_rgba(255,192,203,0.2)] font-medium placeholder-pink-300'
                : isLightBlueCyberpunk
                  ? 'bg-sky-50/40 border-2 border-sky-100 text-slate-700 focus:border-sky-300 focus:bg-white focus:shadow-[0_0_10px_rgba(125,211,252,0.3)] font-medium placeholder-sky-300'
                  : 'bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-android placeholder-slate-400 dark:placeholder-slate-500'
            }`}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`absolute right-2 bottom-2 p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              isCyberpunk 
                ? 'bg-[#00F0FF] text-[#05050A] hover:bg-[#7000FF] hover:text-white'
                : isLightPinkCyberpunk
                  ? 'bg-pink-400 text-white hover:bg-pink-500 shadow-sm'
                : isLightBlueCyberpunk
                  ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm'
                  : 'bg-android text-slate-900 hover:bg-white'
            }`}
          >
            <Send size={14} />
          </button>
        </div>
        {isAnyCyberpunk && (
             <div className="flex justify-between mt-1 px-1">
                 <span className={`text-[8px] font-mono ${
                   isLightPinkCyberpunk ? 'text-pink-300' : isLightBlueCyberpunk ? 'text-sky-300' : 'text-[#2A2A35]'
                 }`}>SYS_READY</span>
                 <span className={`text-[8px] font-mono ${
                   isLightPinkCyberpunk ? 'text-pink-300' : isLightBlueCyberpunk ? 'text-sky-300' : 'text-[#2A2A35]'
                 }`}>V2.0.4</span>
             </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;