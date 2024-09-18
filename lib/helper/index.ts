import hljs from "highlight.js";
import { User } from "@/lib/models/user.model";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const detectLanguage = (codeSnippet: string): string => {
  const detectedLanguage = hljs.highlightAuto(codeSnippet).language;
  return detectedLanguage || "plaintext"; // Fallback to plaintext if no language detected
};
