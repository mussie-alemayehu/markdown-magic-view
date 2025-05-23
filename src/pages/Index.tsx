import { useState, useEffect, useRef } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";
import { Sun, Moon, Save, FileUp, X } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [markdown, setMarkdown] = useState<string>(
    "# Welcome to Markdown Magic\n\nThis is a **real-time** markdown editor.\n\n## Features\n\n- Real-time preview\n- Syntax highlighting\n- Theme switching\n- Keyboard shortcuts\n- File drag & drop\n\n### Try it out!\n\n1. Edit this text\n2. See the changes in real-time\n3. Enjoy markdown formatting\n\n```javascript\nconst hello = () => {\n  console.log('Hello, Markdown!');\n};\n```\n\n> Markdown is a lightweight markup language with plain text formatting syntax.\n\n[Learn more about Markdown](https://www.markdownguide.org/)"
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [syncedScroll, setSyncedScroll] = useState<boolean>(true);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isFullscreen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleSyncScroll = () => {
    setSyncedScroll(!syncedScroll);
    toast({
      title: syncedScroll ? "Scroll Sync Disabled" : "Scroll Sync Enabled",
      description: syncedScroll ? "Editor and preview will scroll independently." : "Editor and preview will scroll together.",
    });
  };

  const handleEditorScroll = ({ scrollTop, scrollHeight, clientHeight }: { 
    scrollTop: number; 
    scrollHeight: number; 
    clientHeight: number 
  }) => {
    if (syncedScroll && isFullscreen) {
      const maxScroll = scrollHeight - clientHeight;
      const percentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollPercentage(percentage);
    }
  };

  const handleMarkdownChange = (value: string) => {
    try {
      setMarkdown(value);
    } catch (error) {
      toast({
        title: "Markdown Parsing Error",
        description: "There was an issue with your markdown. Please check your syntax.",
        variant: "destructive",
      });
      console.error("Markdown parsing error:", error);
    }
  };

  const handleSaveMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, "markdown-document.md");
    toast({
      title: "File Saved",
      description: "Your markdown file has been saved.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
        toast({
          title: "File Uploaded",
          description: `${file.name} has been loaded.`,
        });
      };
      reader.readAsText(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getShortcutKey = () => {
    return navigator.platform.includes('Mac') ? '⌘' : 'Ctrl';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
          <div className="bg-white dark:bg-gray-800 p-4 shadow-sm flex justify-between items-center">
            <h1 className="text-xl font-bold text-purple-700 dark:text-purple-400">Markdown Magic</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSyncScroll}
                className={`px-3 py-1 text-sm rounded-md ${
                  syncedScroll 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {syncedScroll ? 'Sync On' : 'Sync Off'}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                aria-label="Exit fullscreen"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-auto">
            <div className="h-full overflow-auto">
              <MarkdownEditor
                value={markdown}
                onChange={handleMarkdownChange}
                isDarkMode={isDarkMode}
                toggleFullscreen={toggleFullscreen}
                isFullscreen={isFullscreen}
                onScroll={handleEditorScroll}
              />
            </div>
            <div className="h-full overflow-auto hidden md:block">
              <MarkdownPreview 
                markdown={markdown} 
                scrollPercentage={scrollPercentage}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="bg-white dark:bg-gray-800 shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">Markdown Magic</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  
                  <button 
                    onClick={handleSaveMarkdown}
                    className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-600"
                    aria-label="Save markdown file"
                  >
                    <Save size={20} />
                  </button>
                  
                  <button 
                    onClick={handleUploadClick}
                    className="p-2 rounded-md text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-600"
                    aria-label="Upload markdown file"
                  >
                    <FileUp size={20} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept=".md" 
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-6">
            <div className="flex mb-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="space-x-2">
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {getShortcutKey()}+B <span className="text-xs">Bold</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {getShortcutKey()}+I <span className="text-xs">Italic</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {getShortcutKey()}+U <span className="text-xs">Underline</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {getShortcutKey()}+Shift+` <span className="text-xs">Code</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  {getShortcutKey()}+H <span className="text-xs">Heading</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  F11 <span className="text-xs">Fullscreen</span>
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                  ESC <span className="text-xs">Exit Fullscreen</span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
              <div ref={editorRef}>
                <MarkdownEditor 
                  value={markdown} 
                  onChange={handleMarkdownChange} 
                  isDarkMode={isDarkMode}
                  toggleFullscreen={toggleFullscreen}
                  isFullscreen={isFullscreen}
                />
              </div>
              <div ref={previewRef}>
                <MarkdownPreview markdown={markdown} />
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
