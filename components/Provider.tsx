/**
 * Provides a session context for the children components.
 *
 * @param children - The child components to be wrapped by the session provider.
 * @returns The session provider component.
 */

import { SessionProvider } from "next-auth/react";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
