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
    };
  }, [placeholder]);

  return (
    <div className="markdown-editor-container" style={{ backgroundColor: "rgb(var(--dash-bg))", borderRadius: "8px" }}>
      <style>{`
        .editor-toolbar {
          background-color: rgb(var(--dash-panel));
          border-color: rgba(var(--dash-border));
          color: white;
        }
        .editor-toolbar > button {
          color: rgb(var(--text-primary));
        }
        .editor-toolbar > button.active, .editor-toolbar > button:hover {
          background-color: rgba(var(--dash-border));
        }
        .CodeMirror {
          background-color: rgb(var(--surface-2));
          border-color: rgba(var(--dash-border));
          color: white;
        }
        .editor-statusbar {
          color: rgb(var(--text-secondary));
        }
        .editor-toolbar i.separator {
          border-right: 1px solid rgba(var(--dash-border));
          border-left: 1px solid rgba(var(--dash-border));
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
