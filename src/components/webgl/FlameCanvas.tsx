"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import FlameScene from "./FlameScene";

/** Only mounts when the section is actually on screen, caps DPR, and stops
 *  the render loop the moment it leaves. The section is fully legible with
 *  this canvas absent — it is an enhancement, never the content. */
export default function FlameCanvas({ intensity = 1 }: { intensity?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    // bail out where WebGL is unavailable or unwanted
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOk(false);
      return;
    }
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl2") && !c.getContext("webgl")) setOk(false);
    } catch {
      setOk(false);
    }
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0" aria-hidden>
      {ok && visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0.5, 5.2], fov: 42 }}
          frameloop={visible ? "always" : "never"}
          style={{ pointerEvents: "none" }}
        >
          <FlameScene intensity={intensity} />
        </Canvas>
      )}
    </div>
  );
}
