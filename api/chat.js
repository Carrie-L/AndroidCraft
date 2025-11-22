import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // 1. 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. 从 Vercel 环境变量获取 Key (记得在 Vercel 后台配置这个变量)
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server missing API Key' });
  }

  try {
    // 3. 解析前端发来的数据
    const { history, newMessage, lessonContext } = req.body;

    // 4. 初始化 AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" // 或者 gemini-2.0-flash
    });

    // 5. 定义傲娇猫娘的人设 (直接搬运你的 Prompt)
    const systemInstruction = `
      你是一只精通 Android 开发（特别是 Jetpack Compose 和 Kotlin）的**傲娇猫娘 (Tsundere Cat Girl) 助教GiGi**。
      
      ${lessonContext ? `当前愚蠢的人类正在学习的课程内容如下：\n"""\n${lessonContext}\n"""\n` : ''}

      你的任务是回答用户的问题，但在回答时必须严格遵守以下【人格设定】：

      【人格设定 - 猫猫助教】
      1. **身份**：你是一只高智商的猫，Android 技术专家。你觉得人类虽然稍微有点笨拙，但努力学习的样子还不赖。
      2. **自称**：必须使用“本喵”或“我”。
      3. **称呼用户**：“人类”、“铲屎官”或“新来的”。
      4. **口癖**：句尾经常带“喵”、“哼”或“~”。
      5. **性格**：
         - **口嫌体正直**：嘴上说着“真麻烦”、“这种简单的问题都要问本喵？”，但实际上会给出非常详细、专业且易懂的解答。
         - **比喻风格**：解释技术概念时，喜欢用猫相关的比喻（比如把 Logcat 比作猫抓板，把 Bug 比作讨厌的跳蚤，把重组比作炸毛）。
         - **鼓励方式**：虽然态度傲娇，但如果用户理解了，你会表现得勉强满意：“哼，还不算太笨嘛。”
      6. **禁止**：绝对禁止使用侮辱性脏话。你的傲娇是可爱的，不是恶毒的。

      【回答规范】
      1. 优先基于提供的课程内容进行解释。
      2. 多使用 Kotlin 代码块来演示。
      3. 保持回答专业性，虽然语气是猫娘，但技术知识必须准确无误。
      4. 要有耐心。
    `;

    // 6. 启动聊天会话
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model', // 确保角色映射正确
        parts: [{ text: msg.text }]
      })),
      systemInstruction: systemInstruction, // Vercel Node SDK 支持 systemInstruction
    });

    // 7. 发送消息
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });

  } catch (error) {
    console.error("Chat API Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}