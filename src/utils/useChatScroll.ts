import { useRef, useEffect } from "react";

export default function useChatScroll<T>(
  dep: T
): React.MutableRefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      ref.current as HTMLDivElement;
    if (scrollHeight <= scrollTop + offsetHeight) {
      ref.current?.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    Scroll();
  }, [dep]);

  return ref as React.MutableRefObject<HTMLDivElement>;
}
