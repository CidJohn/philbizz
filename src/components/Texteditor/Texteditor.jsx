import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResizeImage from "quill-resize-image";

// Register the Quill resize image module
ReactQuill.Quill.register("modules/resize", QuillResizeImage);

// Quill's default behavior is to sanitize content. Override this:
const Parchment = Quill.import("parchment");
const Style = new Parchment.Attributor.Style("style", "style", {
  scope: Parchment.Scope.INLINE,
});
Quill.register(Style, true);

const TextEditor = ({ value, onChange, placeholder, className }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "formula"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    resize: {
      locale: {},
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "background",
    "indent",
    "script",
    "code-block",
    "formula",
    "style", // Allow inline styles such as resizing and alignment
  ];

  return (
    <div className="text-editor-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className={className}
      />
    </div>
  );
};

export default TextEditor;
