"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

// Dynamic import TinyMCE Editor (chỉ chạy ở client)
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function TinyMCEPage() {
  const editorRef = useRef<any>(null);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
            "mathjax",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | mathjax",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          external_plugins: {
            mathjax: "/tinymce/plugins/mathjax/plugin.min.js",
          },
          mathjax: {
            lib: "/tinymce/plugins/mathjax/tex-mml-chtml.js",
          },
          forced_root_block: "div",
          valid_elements: "*[*]",
        }}
      />
    </div>
  );
}
