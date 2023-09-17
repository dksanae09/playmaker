import PlaygroundContextProvider from "@/context/playgroundContextProvider";

export default function PlayGroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PlaygroundContextProvider>{children}</PlaygroundContextProvider>;
}
