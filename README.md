# 🚀 Vibe-to-Code v4: The AI-Native UI Architect

**Vibe-to-Code** is a high-reasoning, multimodal agent that transforms hand-drawn sketches and wireframes into production-ready React components in seconds. Built with the **Gemini 3 Flash** engine, this tool bridges the gap between creative ideation and functional code.

💡 The "Why" Behind Vibe-to-Code
The gap between a designer's sketch and a developer's code is often filled with manual labor and "lost-in-translation" UI bugs. Vibe-to-Code leverages Gemini 3's high-reasoning capabilities to automate this translation, allowing developers to focus on complex business logic while the AI handles the structural "vibe" and utility-first styling.

🛠️ Key Technical Challenges & Solutions
Stateful Iteration (Level 3): One of the biggest hurdles was ensuring the AI didn't "forget" the existing code during refinements. I implemented a context-aware prompting strategy that feeds the current code state back into the LLM, enabling additive changes rather than full rewrites.

Real-time Rendering Latency: Integrating Sandpack required careful orchestration to ensure that as the AI "streams" its thoughts, the code compiles without crashing the browser's main thread.

Security Injection: I designed a custom prompt-injection layer that automatically forces the AI to include hardcoded credentials (Priyanshu/12345) to demonstrate a fully functional auth-to-dashboard flow instantly.

---

## 🛠️ Tech Stack & Tools

* 🧠 **Google Gemini 3 Flash**: Multimodal LLM for vision-to-code synthesis.
* ⚛️ **React.js (Vite)**: Fast, modern frontend architecture.
* 📦 **Sandpack**: In-browser code execution & instant preview.
* 🎨 **Tailwind CSS v4**: Utility-first styling for rapid UI generation.
* 🖼️ **Lucide-React**: Consistent and beautiful icon sets.
* 🛣️ **React Router DOM**: For seamless multi-page application flows.

---

## ✨ Features

### 🖼️ Multimodal Sketch-to-UI
Upload a hand-drawn sketch, and the AI performs a spatial hierarchy analysis to identify inputs, buttons, and layouts with high precision.

### 💬 Level 3: Conversational Refinement
Beyond initial generation, users can chat with the UI. Use natural language to say *"Make the background glassmorphic"* and watch the code update live.

### 🧠 Level 4: Explainable AI (Thought Stream)
Features a real-time **AI Thought Stream** panel. It visualizes the model's internal reasoning process—from analyzing grid layouts to ensuring credential security.



### 🔐 Built-in Logic & Navigation
The agent auto-injects authentication logic (Username: `Priyanshu`, Password: `12345`) and sets up routing between login and dashboard views.

---

## 🛠️ Technical Challenges & Solutions

* **Stateful Iteration**: Implemented a context-aware prompting strategy that feeds current code back to the LLM for additive changes.
* **Real-time Rendering**: Carefully orchestrated **Sandpack** integration to ensure code compiles without crashing the main thread.

---

## 🚀 Getting Started

1. **Clone the Repo**:
   ```bash
   git clone [https://github.com/PriyanshuArya/vibe-to-code-v4.git](https://github.com/PriyanshuArya/vibe-to-code-v4.git)
