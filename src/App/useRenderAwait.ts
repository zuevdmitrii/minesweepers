import { useEffect, useState } from "react";

export const useRenderAwait = () => {
  const [foreverAlive] = useState<{ resolver?: () => void }>({
    resolver: undefined,
  });
  const [render, setRender] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (foreverAlive.resolver) {
        foreverAlive.resolver();
      }  
    }, 0)
  }, [render]);

  const callback = () => {
    const awaiter = new Promise<void>((resolve) => {
      foreverAlive.resolver = resolve;
    });

    setRender(render => render + 1);
    return awaiter;
  };

  return { callback };
};
