# 🔑 Gemini API 配置指南

## 📋 配置步骤

### 1️⃣ 获取 API Key
访问 [Google AI Studio](https://aistudio.google.com/app/apikey) 获取你的免费 API Key。

### 2️⃣ 本地开发配置

在项目根目录创建 `.env` 文件（已在 `.gitignore` 中，不会提交）：

```bash
VITE_GEMINI_API_KEY=你的API密钥
```

### 3️⃣ Vercel 部署配置

在 Vercel 项目设置中：

1. 进入 **Settings** → **Environment Variables**
2. 添加环境变量：
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: 你的 API 密钥
   - **Environments**: ✅ Production ✅ Preview ✅ Development

3. 重新部署项目

## ⚠️ 重要说明

### 浏览器直接调用 vs Serverless Function

**当前架构**：浏览器直接调用 Gemini API（简单但会暴露 API Key）

- ✅ **优点**：配置简单，无需后端
- ⚠️ **缺点**：API Key 会在浏览器中可见（虽然被编译，但仍可提取）

**推荐生产环境方案**（如果担心安全）：
- 使用 Vercel Serverless Functions (在 `/api` 目录)
- 在服务端调用 Gemini API
- 浏览器只调用你的 API 路由

### API 配额

Gemini Flash 免费版限制：
- 每分钟 15 次请求
- 每天 1500 次请求

如果超出，考虑：
1. 在前端添加请求频率限制
2. 使用付费版 API
3. 改用 Serverless Functions 做缓存

## 🚀 测试

运行本地开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000`，测试 AI 聊天功能。

## 🐛 常见问题

### 1. "An API Key must be set"

**原因**：环境变量未正确设置

**解决**：
- 本地：检查 `.env` 文件是否存在且格式正确
- Vercel：检查环境变量名是否为 `VITE_GEMINI_API_KEY`（注意大小写）

### 2. "Failed to fetch"

**原因**：网络问题或 API 配额用完

**解决**：
- 检查网络是否能访问 Google API
- 在 [AI Studio](https://aistudio.google.com/app/apikey) 查看 API 使用情况
- 检查浏览器控制台的详细错误信息

### 3. Vercel 部署后 API Key 不生效

**解决**：
1. 确认环境变量名正确（`VITE_GEMINI_API_KEY`，前缀必须是 `VITE_`）
2. 重新部署（环境变量修改后必须重新部署）
3. 在 Vercel 的 **Deployments** 页面点击最新部署 → **Redeploy**

---

**需要帮助？** 查看 [Gemini API 文档](https://ai.google.dev/gemini-api/docs)

