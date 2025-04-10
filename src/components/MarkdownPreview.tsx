
import React, { useEffect, useState } from "react";
import { marked } from "marked";

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // Convert markdown to HTML
    setHtml(marked(markdown));
  }, [markdown]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-3 rounded-t-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-600">PREVIEW</h2>
      </div>
      <div
        id="html-output"
        className="flex-grow p-4 overflow-auto bg-white border border-gray-200 rounded-b-lg shadow-sm prose prose-purple max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownPreview;
