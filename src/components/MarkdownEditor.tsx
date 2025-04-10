
import React from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-3 rounded-t-lg border border-gray-200 shadow-sm">
        <h2 className="text-sm font-medium text-gray-600">MARKDOWN</h2>
      </div>
      <textarea
        id="markdown-input"
        value={value}
        onChange={handleChange}
        className="flex-grow p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-200 rounded-b-lg shadow-sm resize-none bg-white"
        placeholder="Type your markdown here..."
        spellCheck="false"
      />
    </div>
  );
};

export default MarkdownEditor;
