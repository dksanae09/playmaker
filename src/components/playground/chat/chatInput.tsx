import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { PlaygroundContext } from "@/context/playgroundContextProvider";
import { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SendIcon } from "lucide-react";

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  textareaRef,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  sendMessage: () => void;
}) {
  const { userId, playground } = useContext(PlaygroundContext);

  return (
    <Card className="sticky mb-2 border-t px-4 pt-4 sm:mb-0">
      <CardContent className="relative flex-1 overflow-hidden rounded-lg pt-2 shadow-sm ring-1 ring-inset ring-accent focus-within:ring-2 focus-within:ring-primary">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${
            playground?.editor !== userId ? "Editor" : "Owner"
          }`}
          className="block w-full resize-none border-0 bg-transparent text-primary placeholder:text-primary placeholder:opacity-60 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />

        <CardContent
          onClick={() => textareaRef.current?.focus()}
          className=""
          aria-hidden="true"
        ></CardContent>

        <CardContent className="absolute right-4 top-1 flex justify-between p-0">
          <Button variant="ghost" onClick={sendMessage} type="submit">
            <SendIcon size={20} />
          </Button>
        </CardContent>
      </CardContent>
    </Card>
  );
}
