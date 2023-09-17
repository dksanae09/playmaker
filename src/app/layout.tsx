import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ContextProvider from "@/context/contextProvider";
import ConvexClientProvider from "@/context/convexClientProvider";
import Topbar from "@/components/topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playmaker",
  description: "Playmaker is a decentralized Youtube Editing App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <ContextProvider>
            <Topbar />
            <div className="md:py-18 container h-fit grow py-2">{children}</div>
          </ContextProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
