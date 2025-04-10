
import { useState } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";

const Index = () => {
  const [markdown, setMarkdown] = useState<string>(
    "# Welcome to Markdown Magic\n\nThis is a **real-time** markdown editor.\n\n## Features\n\n- Real-time preview\n- Simple and clean interface\n- Markdown syntax support\n\n### Try it out!\n\n1. Edit this text\n2. See the changes in real-time\n3. Enjoy markdown formatting\n\n```javascript\nconst hello = () => {\n  console.log('Hello, Markdown!');\n};\n```\n\n> Markdown is a lightweight markup language with plain text formatting syntax.\n\n[Learn more about Markdown](https://www.markdownguide.org/)"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-purple-700">Markdown Magic</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
          <MarkdownEditor value={markdown} onChange={setMarkdown} />
          <MarkdownPreview markdown={markdown} />
        </div>
      </main>
    </div>
  );
};

export default Index;
