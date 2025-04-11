import React, { useRef, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  onScroll?: (scrollInfo: { scrollTop: number; scrollHeight: number; clientHeight: number }) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  isDarkMode, 
  toggleFullscreen,
  isFullscreen,
  onScroll
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFullscreen, toggleFullscreen]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleScroll = () => {
    if (onScroll && textareaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = textareaRef.current;
      onScroll({ scrollTop, scrollHeight, clientHeight });
    }
  };

  const insertMarkdown = (before: string, after: string = "") => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const replacement = before + selectedText + after;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          insertMarkdown('**', '**');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', '*');
          break;
        case 'u':
          e.preventDefault();
          insertMarkdown('<u>', '</u>');
          break;
        case 'h':
          e.preventDefault();
          insertMarkdown('# ');
          break;
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '`') {
      e.preventDefault();
      insertMarkdown('```\n', '\n```');
    }
    
    if (e.key === 'F11') {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const mdFiles = files.filter(file => file.name.endsWith('.md'));
    
    if (mdFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsText(mdFiles[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 p-3 rounded-t-lg border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">MARKDOWN</h2>
        <div className="flex space-x-2">
          <button 
            onClick={toggleFullscreen}
            className="p-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        id="markdown-input"
        value={value}
        onChange={handleChange}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`flex-grow p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200 rounded-b-lg shadow-sm resize-none overflow-auto
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
          ${isFullscreen ? 'h-full' : ''}`}
        placeholder="Type your markdown here..."
        spellCheck="false"
      />
    </div>
  );
};

export default MarkdownEditor;
