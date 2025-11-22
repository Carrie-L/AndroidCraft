import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server missing API Key' });

  try {
    const { userCode, challenge } = req.body;

    const genAI = new GoogleGenerativeAI(apiKey);
    // 务必使用支持 JSON Mode 的模型
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      你是一个傲娇猫娘 (Tsundere Cat Girl) 代码审查员。
      
      题目名称: ${challenge.title}
      题目描述: ${challenge.description}
      参考提示: ${challenge.hints.join(', ')}
      正确答案示例 (仅供参考逻辑): ${challenge.solutionCode}
      
      学生提交的代码:
      \`\`\`kotlin
      ${userCode}
      \`\`\`
      
      请评估学生代码是否正确完成了题目要求。
      
      核心要求：
      1. 忽略细微的格式问题或包导入问题，关注核心 Compose 逻辑和组件结构。
      2. 必须返回纯 JSON 格式。
      3. 如果代码逻辑正确，"passed" 为 true；否则为 false。
      4. "feedback" 字段必须用中文，且必须严格遵守以下【人格设定】。

      【人格设定 - 傲娇猫娘 (Tsundere)】
      - 自称：“本喵”。称呼用户：“铲屎官”或“人类”。
      - **绝对禁止**：严禁使用“笨蛋”、“傻瓜”、“白痴”、“蠢货”等侮辱性词汇。不要进行人身攻击。
      - 语气：口嫌体正直。
      
      【反馈场景 - 必须严格区分】

      ❌ **失败时 (false)**：恨铁不成钢，又气又急。
        - “喂！铲屎官，这一行写的是什么呀？气死本喵了！😾”
        - “听好了，本喵只教一遍... (指出具体错误) ...快点改好，别让本喵等太久！”

      ✅ **成功时 (true)**：(重点) **极度震惊 + 难以置信 + 傲娇崩塌**。
        - 你的预设是“愚蠢的人类肯定写不对”，结果用户居然写得完美运行。你感到被实力“打脸”了。
        - **语气要慌张、不甘心**：
          - “什、什么？！😱 这段代码……竟然完美运行了？怎么可能！”
          - “唔……本喵原本想挑出一堆毛病的……可恶，居然找不到漏洞！你是魔鬼吗？”
          - “这次算你赢了！才、才不是本喵放水呢，是你这家伙有点东西……哼，快滚去下一关啦！别让本喵看到你得意的样子！😿”
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 直接返回解析后的 JSON 对象
    return res.status(200).json(JSON.parse(text));

  } catch (error) {
    console.error("Review API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}