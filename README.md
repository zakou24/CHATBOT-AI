# 🤖 CHATBOT AI

![Chatbot AI Interface Preview](https://github.com/zakou24/CHATBOT-AI/blob/main/assets/app-screen-example.png)

A **modern, responsive AI chat interface** that seamlessly integrates **real-time web search** capabilities to enhance conversational depth and accuracy.

---

## 🚀 Features

- ⚡ **Real-time AI Responses** — Stream messages instantly as they’re generated.
- 🌐 **Integrated Web Search** — Retrieve and summarize up-to-date web content.
- 🧠 **Conversation Memory** — Maintain context throughout each session.
- 🔍 **Search Transparency** — Visual indicators show search, reading, and writing phases.
- 📱 **Responsive Design** — Sleek, modern UI optimized for all screen sizes.

---

## 🏗️ Architecture

**CHATBOT AI** is built on a **client-server architecture** designed for scalability and performance.

## 🔀 Graph Workflow

![Chatbot AI Graph WorkFlow Preview](https://github.com/zakou24/CHATBOT-AI/blob/main/assets/workflow-graph.png)

### 🖥️ Client — Next.js + React

- Built with **Next.js** for server-side rendering and optimized performance.
- Real-time message streaming via **Server-Sent Events (SSE)**.
- Modular components for message rendering, search state, and user input.
- Designed with a focus on responsiveness and smooth user experience.

### ⚙️ Server — FastAPI + LangGraph

- **FastAPI** backend providing lightweight and fast API endpoints.
- **LangGraph** manages the conversation flow between the **LLM** and external tools.
- Integration with **Tavily Search API** for real-time web search and knowledge retrieval.
- **Server-Sent Events (SSE)** for continuous AI response streaming.

---

## 🧩 Tech Stack

| Layer                | Technology                   |
| -------------------- | ---------------------------- |
| **Frontend**         | Next.js, React, Tailwind CSS |
| **Backend**          | FastAPI, Python              |
| **AI Orchestration** | LangGraph                    |
| **Web Search**       | Tavily Search API            |
| **Streaming**        | Server-Sent Events (SSE)     |

---

## Installation

**1. Clone the repository**

```bash
  git clone https://github.com/
  cd chatbotAI
```

**2. Set up the server**

```bash
  cd server
  python -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
```

**3. Configure environment variables**  
 Create a `.env` file in the server directory:

```bash
GROQ_API_KEY=your_groq_api_key// Or GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
```

**4. Set up the client**

```bash
  cd ../client
  npm install
```

## Getting Started

**1. Start the server**

```bash
cd server
uvicorn app:app --reload
```

**2. Start the client**

```bash
cd client
npm run dev
```

**3. Open your browser and navigate to:**
👉http://localhost:3000
