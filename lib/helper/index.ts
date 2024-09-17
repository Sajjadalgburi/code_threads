import User from "../models/user.model";
import hljs from "highlight.js";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const detectLanguage = (codeSnippet: string): string => {
  const detectedLanguage = hljs.highlightAuto(codeSnippet).language;
  return detectedLanguage || "plaintext"; // Fallback to plaintext if no language detected
};
