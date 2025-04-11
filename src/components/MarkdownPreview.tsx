
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Configure marked with highlight.js
    marked.setOptions({
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (err) {
            console.error(err);
          }
        }
        return hljs.highlightAuto(code).value;
      },
      gfm: true,
      breaks: true,
    });

    // Convert markdown to HTML
    const parsed = marked.parse(markdown);
    // Since marked.parse now returns a string (not a Promise), this works correctly
    setHtml(parsed);
  }, [markdown]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-3 rounded-t-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">PREVIEW</h2>
      </div>
      <div
        id="html-output"
        className="flex-grow p-4 overflow-auto bg-white border border-gray-200 rounded-b-lg shadow-sm prose prose-purple max-w-none dark:bg-gray-800 dark:border-gray-700 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownPreview;
