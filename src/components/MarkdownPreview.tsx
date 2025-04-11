
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
      breaks: true,
      gfm: true,
    });

    // Create a custom renderer for syntax highlighting
    const renderer = new marked.Renderer();
    
    // Override the code renderer to use highlight.js
    renderer.code = (text, lang, escaped) => {
      const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlightedCode = hljs.highlight(validLanguage, {
        value: text,
        ignoreIllegals: true
      }).value;
      
      return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
    };

    marked.use({ renderer });

    // Convert markdown to HTML
    try {
      const parsedHtml = marked.parse(markdown);
      // Make sure we're handling both string and Promise<string> cases
      if (typeof parsedHtml === 'string') {
        setHtml(parsedHtml);
      } else {
        // Handle the case where marked.parse returns a Promise
        parsedHtml.then(result => setHtml(result))
          .catch(error => {
            console.error("Error parsing markdown:", error);
            setHtml("<p>Error rendering markdown</p>");
          });
      }
    } catch (error) {
      console.error("Error parsing markdown:", error);
      setHtml("<p>Error rendering markdown</p>");
    }
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
