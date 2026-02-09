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
*    **SupaBase**: Supabase Managed PostgreSQL database and User Authentication

---

## ✨ Key Features 🌟

* 🎨 **Sketch-to-Code** : Upload an image of a sketch, and watch the AI architect a full React application.

* 🔐 **Production-Ready Auth** : Integrated Supabase Auth for Secure Sign-up, Login, and Logout functionality.

* ⚡ **Real-time CRUD** : Live data persistence with the Supabase tasks table for real-world utility.

* 📱 **Fully Responsive** : Optimized for both Desktop and Mobile, featuring a specialized "Show/Hide Sketch" toggle for smaller screens.

* 📦 **Export to ZIP** : Download the entire generated project structure as a .zip file for local development.

* 🤖 **Neural Reasoning Log** : View the AI's step-by-step thinking process as it builds your application logic.

---

## 🛠️ Technical Challenges & Solutions

* **Stateful Iteration**: Implemented a context-aware prompting strategy that feeds current code back to the LLM for additive changes.
* **Real-time Rendering**: Carefully orchestrated **Sandpack** integration to ensure code compiles without crashing the main thread.

---

## ⚙️ How to Configure 🔧

* 1. **Clone the Repository**

      git clone https://github.com/your-username/vibe-to-code-v4.git
      cd vibe-to-code-v4

* 2. **Set Up Environment Variables**
    Create a .env file in the root directory and add your credentials:

    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

* 3. **Install and Run**
     
     npm install
     npm run dev


## 📥 How to Use 📲

* 1. **Upload** : Click the "Update Sketch" button to upload your UI drawing.

* 2. **Generate** : Press "Generate App" to initiate the AI build sequence.

* 3. **Preview** : Use the "Preview" tab in the Sandpack editor to test the live functionality (Auth & CRUD).

* 4. **Refine** : Use the chat input to give further instructions for UI tweaks or logic updates.

* 5. **Download**: Hit "Export ZIP" to save the source code to your machine.

    


