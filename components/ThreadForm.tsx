/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import "highlight.js/styles/github.css";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormSubmit from "./buttons/FormSubmit";
import hljs from "highlight.js";
import { useModal } from "./ui/animated-modal";

const ThreadForm = ({ action }: { action: string }) => {
  const [thread, setThread] = useState<string>("");
  const [code, setCode] = useState<string | null>("");
  const [language, setLanguage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // Check if the session is still loading
  if (status === "loading") return <div>Loading...</div>;

  const detectLanguage = (codeSnippet: string): string => {
    const detectedLanguage = hljs.highlightAuto(codeSnippet).language;
    return detectedLanguage || "plaintext"; // Fallback to plaintext if no language detected
  };

  // Update the code and detect language on change
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    setLanguage(detectLanguage(newCode));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/thread/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ text: thread, code }),
      });

      if (!response.ok) throw new Error("Failed to create a new thread");

      setThread("");
      setCode("");
      router.replace("/profile"); // todo! : this implementation isnt very optimized per say...
    } catch (error) {
      console.error(`${action} failed: `, error);
      alert("Error creating thread");
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  const handleEdit = async () => {
    console.log("Editing thread...");
  };

  // Reset form values
  const handleReset = () => {
    setThread("");
    setCode("");
  };

  const handleCancel = () => {
    const hasConfirmed = confirm("Are you sure you want to discard changes?");
    if (hasConfirmed) {
      router.push("/profile");
    }
  };

  const { setOpen } = useModal();

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
        <Button
          variant="secondary"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button onClick={handleCancel} variant="destructive">
          Cancel
        </Button>
        <FormSubmit
          action={action}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          isSubmitting={isSubmitting}
          thread={thread}
        />
      </div>
    </>
  );
};

export default ThreadForm;
