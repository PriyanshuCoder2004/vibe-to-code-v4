import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Box, Code2, Play, Image as ImageIcon, AlertCircle, Send, BrainCircuit, Terminal, Download } from "lucide-react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Architect = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [thoughts, setThoughts] = useState([]);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const addThought = (msg) => {
    // Unique ID fix to avoid console errors
    setThoughts(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, message: msg }]);
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
    setThoughts([]);
    
    addThought("Analyzing UI spatial hierarchy...");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = `You are a High-Reasoning AI Full-Stack Architect. 
TASK: Build a functional React app with Real-Time Database Sync.

LEVEL 5.4 PRODUCTION STANDARDS:
1. AUTH: Implement full Supabase Auth (Signup/Login/Signout).
2. CRUD: Complete logic for 'tasks' table (Fetch, Insert, Update status, Delete).
3. ERROR HANDLING: Show error messages if the database connection fails.
4. CLEANUP: Ensure all useEffect listeners are cleaned up to prevent memory leaks.
5. UI: Use Tailwind for a responsive sidebar and a professional cards-based list.

Return ONLY the raw React code.`;
      const imagePart = await fileToGenerativePart(image);
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      setGeneratedCode(response.text().replace(/```jsx|```javascript|```html|```/g, "").trim());
      addThought("Real-world Auth logic injected. Rendering Preview.");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const refineCode = async () => {
    if (!chatInput || !generatedCode) return;
    setLoading(true);
    addThought(`Refining with CRUD & database logic: "${chatInput}"`);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const prompt = `Current Code: \n ${generatedCode} \n Instruction: "${chatInput}". STRICT RULES FOR LEVEL 5.3 REFINEMENT:
    1. DATABASE INTEGRITY: DO NOT remove the 'supabase' CRUD logic (fetch, insert, update, delete).
    2. TABLE PERSISTENCE: Maintain all interactions with the 'tasks' table.
    3. AUTHENTICATION: Keep the Supabase auth state checks and redirects to '/dashboard'.
    4. UI UPDATES: Apply changes to Tailwind classes or components without breaking the data flow.
    5. DATA SYNC: Ensure that any new UI element that displays data is correctly mapped to the database state.
    
    Return ONLY the updated React code.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setGeneratedCode(response.text().replace(/```jsx|```javascript|```html|```/g, "").trim());
      setChatInput("");
      addThought("UI and CRUD logic Refined successfully.");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  // --- LEVEL 5.1: DOWNLOAD PROJECT SECTION ---
  const downloadProject = async () => {
    if (!generatedCode) return alert("No code to download!");
    addThought("Preparing project for export...");
    
    const zip = new JSZip();
    zip.file("src/App.js", generatedCode);

    zip.file("src/index.js", `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
  `);

  zip.file("src/supabaseClient.js", `
      import { createClient } from '@supabase/supabase-js'
      export const supabase = createClient(
        '${import.meta.env.VITE_SUPABASE_URL}', 
        '${import.meta.env.VITE_SUPABASE_ANON_KEY}'
      )`);
    
    const pkgJson = {
      name: "vibe-to-code-app",
      version: "1.0.0",
      dependencies: {
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "lucide-react": "latest",
        "react-router-dom": "latest",
        "@supabase/supabase-js": "latest" 
      },
      scripts: { "start": "react-scripts start" }
    };
    zip.file("package.json", JSON.stringify(pkgJson, null, 2));

    zip.file("public/index.html", `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body><div id="root"></div></body></html>`);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Vibe-to-Code-Project.zip`);
    addThought("Success: Real-world Auth Project downloaded!");
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white p-4 font-sans overflow-hidden">
      <div className="flex justify-between items-center mb-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-indigo-400 animate-pulse" size={28} />
          <div>
            <h1 className="text-xl font-black uppercase">Vibe-to-Code <span className="text-indigo-500">v4</span></h1>
          </div>
        </div>
        <div className="flex gap-3">
          <input type="file" id="upload" hidden onChange={(e) => setImage(e.target.files[0])} />
          <label htmlFor="upload" className="bg-zinc-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-zinc-700 text-sm font-bold">Update Sketch</label>
          
          {/* LEVEL 5.1: Export Button */}
          <button onClick={downloadProject} disabled={!generatedCode} className="bg-emerald-600 px-4 py-2 rounded-xl font-bold hover:bg-emerald-500 disabled:opacity-30 text-sm flex items-center gap-2">
            <Download size={18} /> Export ZIP
          </button>

          <button onClick={generateCode} disabled={loading} className="bg-indigo-600 px-6 py-2 rounded-xl font-bold hover:bg-indigo-500 disabled:opacity-50 text-sm">
            {loading ? "Reasoning..." : "Generate App"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-zinc-900 rounded-3xl border border-zinc-800 p-4 flex items-center justify-center">
            {image ? <img src={URL.createObjectURL(image)} className="max-h-full rounded-xl" /> : <Box className="opacity-20" size={48} />}
          </div>
          <div className="h-1/2 bg-black/50 rounded-3xl border border-zinc-800 p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
              {thoughts.map(t => <div key={t.id} className="text-[11px] font-mono text-indigo-300 border-l border-indigo-500/30 pl-2">{">"} {t.message}</div>)}
            </div>
          </div>
        </div>

        <div className="col-span-9 flex flex-col h-full overflow-hidden">
          <div className="flex-1 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 relative mb-4">
            {generatedCode ? (
              <Sandpack template="react" files={{ "/App.js": generatedCode, "/supabaseClient.js": `
      import { createClient } from '@supabase/supabase-js';
      export const supabase = createClient(
        '${import.meta.env.VITE_SUPABASE_URL}', 
        '${import.meta.env.VITE_SUPABASE_ANON_KEY}'
      );
    ` }} theme="dark"
                options={{ externalResources: ["https://cdn.tailwindcss.com"], editorHeight: "100%", editorWidthPercentage: 40, resizablePanels: true }}
                customSetup={{ dependencies: { "lucide-react": "latest", "react-router-dom": "latest", "@supabase/supabase-js": "latest" } }}
                style={{ height: '100%' }}
              />
            ) : <div className="h-full flex items-center justify-center text-zinc-700 italic">Neural engine ready...</div>}
          </div>

          <div className="flex gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Refine UI..." className="flex-1 bg-transparent outline-none px-4 text-sm" />
            <button onClick={refineCode} className="bg-indigo-600 p-3 rounded-xl hover:bg-indigo-500"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architect;