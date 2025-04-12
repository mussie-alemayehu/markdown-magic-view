
import React, { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarkdownPreviewProps {
  markdown: string;
  scrollPercentage?: number;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown, scrollPercentage }) => {
  const [html, setHtml] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configure marked with highlight.js
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    // Create a custom renderer for syntax highlighting
    const renderer = new marked.Renderer();
    
    // Override the code renderer to use highlight.js
    // Using the correct function signature for marked version
    renderer.code = (code, language) => {
      const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';
      try {
        // Use the correct hljs.highlight syntax based on the installed version
        const highlightedCode = hljs.highlight(code, { 
          language: validLanguage,
          ignoreIllegals: true 
        }).value;
        
        return `<pre><code class="hljs language-${validLanguage}">${highlightedCode}</code></pre>`;
      } catch (error) {
        console.error("Highlighting error:", error);
        return `<pre><code class="plaintext">${code}</code></pre>`;
      }
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

  // Apply scroll position when scrollPercentage changes
  useEffect(() => {
    if (scrollPercentage !== undefined && previewRef.current) {
      const { scrollHeight, clientHeight } = previewRef.current;
      const maxScroll = scrollHeight - clientHeight;
      previewRef.current.scrollTop = maxScroll * scrollPercentage;
    }
  }, [scrollPercentage]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-3 rounded-t-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">PREVIEW</h2>
      </div>
      <div
        ref={previewRef}
        id="html-output"
        className="flex-grow p-4 overflow-auto bg-white border border-gray-200 rounded-b-lg shadow-sm prose prose-purple max-w-none dark:bg-gray-800 dark:border-gray-700 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownPreview;
