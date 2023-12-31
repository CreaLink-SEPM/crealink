"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function CustomProvider({
  children,
}: {
  children?: React.ReactNode, session: any
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
