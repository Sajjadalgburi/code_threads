/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "./ui/button";
import { IThread } from "@/interfaces";
import { useSession } from "next-auth/react";

const ThreadForm = ({ action }: { action: string }) => {
  // Use State's
  const [thread, setThread] = useState<string>("");
  const [code, setCode] = useState<string | null>("");
  const [language, setLanguage] = useState<string>("");

  // Detect the language of the code
  const detectLanguage = (codeSnippet: string) => {
    const detectedLanguage = hljs.highlightAuto(codeSnippet).language;
    setLanguage(detectedLanguage || "plaintext"); // Fallback to plaintext if no language detected
  };

  // Update the code and detect language on change
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    detectLanguage(newCode);
  };
  const session = useSession();
  const userId = session?.data?.user.id;

  // use Effect to make a post to api backend /api/thread/new
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return console.error("User not found...");

        const response = await fetch("/api/thread/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ text: code }),
        });

        if (response.ok) {
          const data: IThread = await response.json();
          console.log(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(`${action} failed: `, error);
      }
    };

    fetchData();
  }, [action, code, userId]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <input
          minLength={3}
          maxLength={100}
          className="bg-red w-full text-sm min-h-[10px] text-white focus:outline-none resize-none rounded-md p-2 overflow-hidden"
          placeholder="Start a thread..."
          value={thread}
          onChange={(e) => setThread(e.target.value)}
        />
        <textarea
          minLength={3}
          maxLength={512}
          className="bg-red w-full text-sm min-h-[150px] text-white focus:outline-none resize-none rounded-md p-2 overflow-hidden"
          placeholder="Paste your code snippet here..."
          value={code || ""}
          onChange={handleCodeChange}
        />
        {/* Render the code snippet with auto-detected language */}
        {code && (
          <SyntaxHighlighter language={language} style={vs2015} showLineNumbers>
            {code}
          </SyntaxHighlighter>
        )}
      </div>
      <div className="flex justify-end gap-3 mt-10">
        {" "}
        <Button variant="secondary">Reset</Button>
        <Button variant="destructive">Cancel</Button>
        <Button variant="default">
          {" "}
          {action === "create" ? "Create" : "Edit"}
        </Button>
      </div>
    </>
  );
};

export default ThreadForm;
