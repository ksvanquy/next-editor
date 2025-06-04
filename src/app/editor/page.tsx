"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect, useRef } from "react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-2 flex-wrap mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        <b>B</b>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        <i>I</i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        <u>U</u>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        <s>S</s>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 border rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        type="button"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 border rounded"
        type="button"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 border rounded"
        type="button"
      >
        Redo
      </button>
    </div>
  );
};

// Khai báo MathJax cho TypeScript
declare global {
  interface Window {
    MathJax?: any;
  }
}

export default function EditorPage() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    editorProps: { attributes: {} },
    immediatelyRender: false,
  });

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

  // Render lại MathJax khi nội dung editor thay đổi
  useEffect(() => {
    if (window.MathJax && previewRef.current) {
      window.MathJax.typesetPromise([previewRef.current]);
    }
  }, [editor?.getHTML()]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <main className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">WYSIWYG Editor (Tiptap)</h1>
        <MenuBar editor={editor} />
        <div className="border rounded min-h-[300] p-2 mb-8">
          <EditorContent editor={editor} />
        </div>
        <h2 className="font-semibold mb-2">Preview (MathJax)</h2>
        <div
          ref={previewRef}
          className="border rounded bg-white p-4 min-h-[100px] prose max-w-none whitespace-pre-wrap"
        >
          {editor?.getText() || ""}
        </div>
      </main>
    </div>
  );
} 