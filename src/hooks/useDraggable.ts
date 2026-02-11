import { useRef, useEffect } from "react";

export const useDraggable = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only drag from [data-panel-header] elements
      const target = e.target as HTMLElement;
      const header = target.closest("[data-panel-header]");
      if (!header) return;

      // Don't drag from buttons
      if (target.closest("button")) return;

      isDragging = true;
      startX = e.clientX - posRef.current.x;
      startY = e.clientY - posRef.current.y;
      panel.style.transition = "none";
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const x = e.clientX - startX;
      const y = e.clientY - startY;
      posRef.current = { x, y };
      panel.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = "";
    };

    panel.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      panel.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return { panelRef };
};
