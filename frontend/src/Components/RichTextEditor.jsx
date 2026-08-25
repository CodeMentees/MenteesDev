import React, { useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const options = useMemo(() => {
    return {
      placeholder: placeholder || "Write your markdown content here...",
      spellChecker: false,
      maxHeight: "400px",
      autofocus: false,
      status: ["autosave", "lines", "words", "cursor"],
      toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "image", "|", "preview", "guide"],
    };
  }, [placeholder]);

  return (
    <div className="markdown-editor-container" style={{ backgroundColor: "rgb(var(--surface))", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(var(--dash-border))" }}>
      <style>{`
        .editor-toolbar {
          background-color: rgb(var(--surface-2));
          border: none;
          border-bottom: 1px solid rgba(var(--dash-border));
          padding: 8px 12px;
          opacity: 1;
        }
        .editor-toolbar > button {
          color: rgb(var(--text-secondary));
          border-radius: 6px;
          transition: all 0.2s;
        }
        .editor-toolbar > button.active, .editor-toolbar > button:hover {
          background-color: rgba(var(--dash-border));
          color: rgb(var(--text-primary));
          border-color: transparent;
        }
        .CodeMirror {
          background-color: rgb(var(--surface));
          border: none;
          color: rgb(var(--text-primary));
          padding: 16px;
          font-family: inherit;
          font-size: 15px;
          line-height: 1.6;
        }
        .editor-statusbar {
          color: rgb(var(--text-secondary));
          padding: 8px 16px;
        }
        .editor-toolbar i.separator {
          border-right: 1px solid rgba(var(--dash-border));
          border-left: none;
          margin: 0 4px;
        }
        /* CRITICAL: Fix cursor blinking in dark mode */
        .CodeMirror-cursor {
          border-left: 2px solid white !important;
          visibility: visible !important;
        }
        .CodeMirror-focused .CodeMirror-cursor {
          visibility: visible !important;
        }
        /* Preview styling */
        .editor-preview, .editor-preview-side {
          background-color: rgb(var(--surface)) !important;
          color: rgb(var(--text-primary)) !important;
          padding: 24px !important;
          z-index: 50 !important;
        }
        .editor-preview h1, .editor-preview h2, .editor-preview h3, .editor-preview-side h1, .editor-preview-side h2, .editor-preview-side h3 {
          color: white !important;
          border-bottom: 1px solid rgba(var(--dash-border));
          padding-bottom: 8px;
        }
        .editor-preview pre {
          background-color: rgb(var(--surface-2));
          padding: 16px;
          border-radius: 8px;
        }
      `}</style>
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default RichTextEditor;
