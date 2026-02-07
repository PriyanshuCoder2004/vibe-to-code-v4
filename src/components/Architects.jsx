import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Box, Code2, Play, Image as ImageIcon, AlertCircle, Send, BrainCircuit, Terminal } from "lucide-react";

const Architect = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [thoughts, setThoughts] = useState([]); // Level 4: Thought Logs

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  // Helper to simulate "Thinking Steps"
  const addThought = (msg) => {
    setThoughts(prev => [...prev, { id: Date.now(), message: msg }]);
  };

  const fileToGenerativePart = async (file) => {
    const base64Promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return { inlineData: { data: await base64Promise, mimeType: file.type } };
  };

  const generateCode = async () => {
    if (!image) return alert("Please upload a sketch!");
    setLoading(true);
    setError(null);
    setThoughts([]); // Clear old thoughts
    
    addThought("Analyzing UI spatial hierarchy from sketch...");
    addThought("Identifying components: Inputs, Buttons, and Labels...");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      
      const prompt = `You are a High-Reasoning AI Architect. 
      TASK: Build a React app from this sketch.
      STRICT LOGIC: Login Username "Priyanshu", Password "12345". Use React Router for /dashboard.
      THINKING STEPS: Before generating code, perform deep reasoning on the grid layout and Tailwind color palette.
      Return ONLY the code string.
      IMPORTANT: The root container of the generated component must be 'min-h-screen w-full' with no max-width limits. Center the login card perfectly in the middle of this full-screen container using Flexbox.`;
      
      const imagePart = await fileToGenerativePart(image);
      const result = await model.generateContent([prompt, imagePart]);
      
      addThought("Mapping Tailwind CSS utility classes to elements...");
      addThought("Injecting Auth Logic (Priyanshu/12345)...");
      
      const response = await result.response;
      setGeneratedCode(response.text().replace(/```jsx|```javascript|```html|```/g, "").trim());
      addThought("Code synthesis complete. Rendering Preview.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refineCode = async () => {
    if (!chatInput || !generatedCode) return;
    setLoading(true);
    addThought(`Processing user request: "${chatInput}"`);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = `Current Code: \n ${generatedCode} \n Instruction: "${chatInput}". 
      Maintain login credentials (Priyanshu/12345). Apply changes using High-Reasoning. Return ONLY code.
      IMPORTANT: The root container of the generated component must be 'min-h-screen w-full' with no max-width limits. Center the login card perfectly in the middle of this full-screen container using Flexbox.`;

      const result = await model.generateContent(prompt);
      addThought("Re-calculating component tree for updates...");
      
      const response = await result.response;
      setGeneratedCode(response.text().replace(/```jsx|```javascript|```html|```/g, "").trim());
      setChatInput("");
      addThought("UI Refined successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white p-4 font-sans overflow-hidden">
      {/* Level 4 Header */}
      <div className="flex justify-between items-center mb-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-indigo-400 animate-pulse" size={28} />
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">Vibe-to-Code <span className="text-indigo-500">v4</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">High Thinking Engine Active</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input type="file" id="upload" hidden onChange={(e) => setImage(e.target.files[0])} />
          <label htmlFor="upload" className="bg-zinc-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-zinc-700 transition-all border border-zinc-700 text-sm font-bold">
            Update Sketch
          </label>
          <button onClick={generateCode} disabled={loading} className="bg-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-500 disabled:opacity-50 text-sm">
            {loading ? "Reasoning..." : "Generate App"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
        {/* Left Col: Sketch & Thoughts */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-4 flex items-center justify-center overflow-hidden">
            {image ? <img src={URL.createObjectURL(image)} className="max-h-full rounded-xl shadow-2xl" /> : <Box className="opacity-20" size={48} />}
          </div>
          
          {/* Level 4: Thought Log Panel */}
          <div className="h-1/2 bg-black/50 rounded-3xl border border-zinc-800 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-zinc-400 font-bold text-xs uppercase tracking-widest">
              <Terminal size={14} /> AI Thought Stream
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {thoughts.map(t => (
                <div key={t.id} className="text-[11px] font-mono text-indigo-300 border-l border-indigo-500/30 pl-2 py-1 animate-in slide-in-from-left">
                  {">"} {t.message}
                </div>
              ))}
              {loading && <div className="text-[11px] font-mono text-zinc-500 animate-pulse">{">"} Processing neural weights...</div>}
            </div>
          </div>
        </div>

        {/* Right Col: Preview & Chat */}
        <div className="col-span-9 flex flex-col h-full overflow-hidden">
          <div className="flex-1 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative mb-4">
            {generatedCode ? (
              <Sandpack 
                template="react"
                files={{ "/App.js": generatedCode }}
                theme="dark"
                options={{ 
                   externalResources: ["https://cdn.tailwindcss.com"],
                   showNavigator: false,  
                   editorHeight: "100%",   
                   editorWidthPercentage: 40,
                   resizablePanels: true, 
                   classes: {
                     "sp-wrapper": "custom-sandpack-height",
                     "sp-layout": "custom-sandpack-layout"
        }
            }}
                customSetup={{ dependencies: { "lucide-react": "latest", "react-router-dom": "latest" } }}
                style={{ height: '100%', minHeight: '100%'  }}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-700 italic">Neural engine ready for sketch input...</div>
            )}
          </div>

          <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800 shadow-2xl shrink-0">
            <input 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Refine UI with natural language..." 
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium"
            />
            <button onClick={refineCode} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-500 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architect;