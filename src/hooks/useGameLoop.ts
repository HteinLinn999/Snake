import { useEffect } from "react";

interface UseGameLoopProps {
  callback: () => void;
  interval: number;
  enabled: boolean;
}

export default function useGameLoop({
  callback,
  interval,
  enabled,
}: UseGameLoopProps) {
  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(callback, interval);
    return () => clearInterval(timer);

  },[callback, interval ,enabled]);
}
