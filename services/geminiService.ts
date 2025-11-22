// src/services/ai.ts

// 导入你的类型定义
import { ChatMessage, Challenge } from '../types';

/**
 * 发送消息给助教 (调用 /api/chat)
 */
export const sendChatMessage = async (
  history: ChatMessage[], 
  newMessage: string, 
  lessonContext?: string
): Promise<string> => {
  try {
    // 直接请求你自己的 Vercel 后端
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, newMessage, lessonContext }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch chat response');
    }

    return data.text;

  } catch (error) {
    console.error("Chat error:", error);
    return "喵？网络好像被老鼠咬断了... 稍后再试！😿 (请检查 Network 面板)";
  }
};

/**
 * 提交代码审查 (调用 /api/review)
 */
export const reviewChallengeCode = async (
  userCode: string,
  challenge: Challenge
): Promise<{ passed: boolean; feedback: string }> => {
  try {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userCode, challenge }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to review code');
    }

    // 后端已经返回了 { passed, feedback } 对象
    return data;

  } catch (error) {
    console.error("Code review error:", error);
    return { 
      passed: false, 
      feedback: "代码审查服务暂时不可用... 哼，才不是本喵偷懒呢，是服务器坏了！😿" 
    };
  }
};