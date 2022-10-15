import React, { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image", "video", "formula"],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
];

const TextEditor = () => {
  const saveToLocalstorage = (editor) => {
    localStorage.setItem("text", editor.root.innerHTML);
  };

  const restoreText = (editor) => {
    if (localStorage.getItem("text")) {
      editor.innerHTML = localStorage.getItem("text");
    }
  };

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const textBox = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Start Writing here...",
    });
    restoreText(
      editor.querySelector("#editor > div.ql-container.ql-snow > div.ql-editor")
    );
    textBox.on("text-change", () => saveToLocalstorage(textBox));
  }, []);
  return (
    <>
      <div id="editor" ref={wrapperRef}></div>
      <div className="btnBox">
        <button id="print" onClick={() => window.print()}>
          PRINT
        </button>
      </div>
    </>
  );
};

export default TextEditor;
