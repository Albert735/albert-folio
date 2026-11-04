"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/lib/data";
import { ScreenFor } from "./Screens";

/** Phone or browser frame that tilts toward the pointer. */
export default function Device({ project }: { project: Project }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotY = useTransform(sx, [0, 1], [-14, 14]);
  const rotX = useTransform(sy, [0, 1], [10, -10]);

  const isPhone = project.device === "phone";

  return (
    <div
      className="flex items-center justify-center [perspective:1200px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className={
          isPhone
            ? "relative aspect-[9/19] w-[min(62vw,270px)] rounded-[2.6rem] border border-bone/15 bg-[#0a0a0a] p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]"
            : "relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-bone/15 bg-[#0a0a0a] shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]"
        }
      >
        {isPhone ? (
          <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">
            <ScreenFor project={project} />
            <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b border-bone/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-kente-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              <span className="h-2.5 w-2.5 rounded-full bg-kente-green" />
              <span className="ml-3 truncate rounded-md bg-bone/5 px-3 py-1 text-xs text-mist">
                {(project.live ?? project.repo ?? "").replace(/^https?:\/\//, "")}
              </span>
            </div>
            <div className="aspect-[16/10]">
              <ScreenFor project={project} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
