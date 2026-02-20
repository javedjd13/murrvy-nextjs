"use client";

import { SessionProvider } from "next-auth/react";

const AuthSessionProvider = ({ children }) => (
  <SessionProvider refetchOnWindowFocus={false} refetchInterval={0}>
    {children}
  </SessionProvider>
);

export default AuthSessionProvider;
