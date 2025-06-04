"use client";

import { useState, useEffect, useRef } from "react";

// Khai báo MathJax cho TypeScript
declare global {
  interface Window {
    MathJax?: any;
  }
}

export default function Home() {
  const [content, setContent] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  // Thêm MathJax script vào head nếu chưa có
  useEffect(() => {
    if (!document.getElementById("mathjax-script")) {
      const script = document.createElement("script");
      script.id = "mathjax-script";
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      document.head.appendChild(script);
    }
  }, []);

  // Render lại MathJax khi content thay đổi
  useEffect(() => {
    if (window.MathJax && previewRef.current) {
      window.MathJax.typesetPromise([previewRef.current]);
    }
  }, [content]);

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Text Editor</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cột nhập liệu */}
          <div className="flex-1">
            <h2 className="font-semibold mb-2">Nhập công thức</h2>
            <div className="border rounded-lg shadow-sm h-full">
              <textarea
                className="w-full h-[300px] md:h-[500px] p-4 focus:outline-none resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập công thức LaTeX hoặc văn bản..."
              />
            </div>
          </div>
          {/* Cột preview */}
          <div className="flex-1">
            <h2 className="font-semibold mb-2">Preview</h2>
            <div
              ref={previewRef}
              className="border rounded-lg bg-white p-4 min-h-[100px] md:min-h-[500px] prose max-w-none h-full"
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
