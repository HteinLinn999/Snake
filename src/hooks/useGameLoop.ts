import { useEffect } from "react";

interface UseGameLoopProps {
  callback: () => {};
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
    
  });
}
