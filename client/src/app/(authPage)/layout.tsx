import "../globals.css";
import type { Metadata } from "next";
import CustomProvider from "../provider";

export const metadata: Metadata = {
  title: "CreaLink | Auth Page",
  description: "The Threads app Auth pages.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomProvider>{children}</CustomProvider>;
}