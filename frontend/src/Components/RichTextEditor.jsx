import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    if (!editorRef.current) return;

    quillInstance.current = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: placeholder || "Write something...",
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
      },
    });

    quillInstance.current.on("text-change", () => {
      const html = editorRef.current.querySelector(".ql-editor").innerHTML;
      setContent(html);
      onChange && onChange(html);
    });

    return () => {
      quillInstance.current = null;
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: "400px", marginBottom: "20px" }} />
      <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default RichTextEditor;
