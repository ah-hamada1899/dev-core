"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, MotionPathPlugin);

const VW = 1440;
const VH = 900;

const FIBERS = [
  "M-80 168 C 280 40, 620 310, 980 150 S 1380 40, 1520 210",
  "M-60 430 C 240 520, 560 280, 880 470 S 1280 620, 1560 400",
  "M-40 720 C 360 640, 640 820, 980 690 S 1320 760, 1540 640",
  "M 220 -40 C 300 260, 180 520, 420 940",
  "M 1180 -30 C 1080 240, 1280 510, 1120 940",
];

const NODES: Array<[number, number]> = [
  [180, 150],
  [420, 260],
  [640, 140],
  [860, 320],
  [1100, 180],
  [260, 470],
  [540, 510],
  [780, 430],
  [1040, 560],
  [1280, 390],
  [360, 700],
  [720, 740],
  [980, 680],
  [1240, 720],
];

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroBackground(): React.ReactElement {
  const rawId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const fibers = stage.querySelectorAll<SVGPathElement>("[data-fiber]");
      const signals = stage.querySelectorAll<SVGPathElement>("[data-signal]");
      const packets = stage.querySelectorAll<SVGCircleElement>("[data-packet]");
      const nodes = stage.querySelectorAll<SVGCircleElement>("[data-node]");
      const grid = stage.querySelectorAll<SVGLineElement>("[data-grid]");
      const ring = stage.querySelector<SVGGElement>("[data-ring]");
      const floatLayer = stage.querySelector<SVGGElement>("[data-float]");
      const scan = stage.querySelector<SVGLineElement>("[data-scan]");
      const spot = document.getElementById(`${rawId}-spot`);

      gsap.set(fibers, { strokeDasharray: 1, strokeDashoffset: 1 });

      if (prefersReducedMotion()) {
        gsap.set(fibers, { strokeDashoffset: 0 });
        gsap.set(packets, { autoAlpha: 0 });
        gsap.set(signals, { autoAlpha: 0.35 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
      intro.from(grid, { autoAlpha: 0, duration: 1.1 }, 0);
      intro.to(
        fibers,
        { strokeDashoffset: 0, duration: 1.8, stagger: 0.12, ease: "power2.inOut" },
        0.15
      );
      intro.from(nodes, { autoAlpha: 0, duration: 0.5, stagger: 0.03 }, 0.5);
      intro.from(packets, { autoAlpha: 0, duration: 0.4 }, 1.05);

      signals.forEach((signal, index) => {
        gsap.to(signal, {
          strokeDashoffset: -420,
          duration: 7 + index * 1.4,
          repeat: -1,
          ease: "none",
        });
      });

      packets.forEach((packet, index) => {
        const path = fibers[index % fibers.length];
        gsap.to(packet, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 8 + index * 1.6,
          repeat: -1,
          ease: "none",
          delay: index * 0.7,
        });
      });

      gsap.to(nodes, {
        opacity: 0.18,
        duration: 2.4,
        stagger: { each: 0.18, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      if (ring) {
        gsap.to(ring, {
          rotate: 360,
          duration: 90,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      if (floatLayer) {
        gsap.to(floatLayer, {
          y: 12,
          duration: 11,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      if (scan) {
        gsap.fromTo(
          scan,
          { attr: { y1: 0, y2: 0 } },
          { attr: { y1: VH, y2: VH }, duration: 9, repeat: -1, ease: "none" }
        );
      }

      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(stage, "x", { duration: 0.9, ease: "power3.out" });
      const yTo = gsap.quickTo(stage, "y", { duration: 0.9, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        const rect = root.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        xTo((px - 0.5) * 28);
        yTo((py - 0.5) * 18);
        if (spot) {
          gsap.set(spot, { attr: { cx: px * VW, cy: py * VH } });
        }
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: rootRef }
  );

  const cols = Array.from({ length: 19 }, (_, i) => (VW / 18) * i);
  const rows = Array.from({ length: 11 }, (_, i) => (VH / 10) * i);

  return (
    <div
      ref={rootRef}
      className="hero-bg pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id={`${rawId}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--c-primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--c-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={`${rawId}-spot`}
            gradientUnits="userSpaceOnUse"
            cx={VW / 2}
            cy={VH / 2}
            r="420"
          >
            <stop offset="0%" stopColor="var(--c-primary)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--c-primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${rawId}-scan`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--c-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--c-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--c-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width={VW} height={VH} fill={`url(#${rawId}-spot)`} />

        <g ref={stageRef}>
          <g data-float="true">
            <g data-ring="true">
              <circle
                cx={1080}
                cy={420}
                r={240}
                stroke="color-mix(in srgb, var(--c-primary) 18%, transparent)"
                strokeWidth="1"
              />
              <circle
                cx={1080}
                cy={420}
                r={340}
                stroke="color-mix(in srgb, var(--c-outline-variant) 28%, transparent)"
                strokeWidth="1"
                strokeDasharray="6 14"
              />
            </g>

            {cols.map((x) => (
              <line
                key={`c-${x}`}
                data-grid="true"
                x1={x}
                y1={0}
                x2={x}
                y2={VH}
                stroke="color-mix(in srgb, var(--c-outline-variant) 32%, transparent)"
                strokeWidth="1"
              />
            ))}
            {rows.map((y) => (
              <line
                key={`r-${y}`}
                data-grid="true"
                x1={0}
                y1={y}
                x2={VW}
                y2={y}
                stroke="color-mix(in srgb, var(--c-outline-variant) 32%, transparent)"
                strokeWidth="1"
              />
            ))}

            <line
              data-scan="true"
              x1={0}
              y1={0}
              x2={VW}
              y2={0}
              stroke="color-mix(in srgb, var(--c-primary) 28%, transparent)"
              strokeWidth="1"
            />

            {FIBERS.map((d, index) => (
              <g key={d}>
                <path
                  d={d}
                  data-fiber="true"
                  pathLength={1}
                  stroke="color-mix(in srgb, var(--c-primary) 38%, transparent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d={d}
                  data-signal="true"
                  stroke={`url(#${rawId}-scan)`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="70 340"
                />
                <circle
                  data-packet="true"
                  r={index % 2 === 0 ? 3.5 : 2.6}
                  fill="var(--c-primary)"
                />
              </g>
            ))}

            {NODES.map(([x, y]) => (
              <circle
                key={`${x}-${y}`}
                data-node="true"
                cx={x}
                cy={y}
                r={2.2}
                fill="var(--c-primary)"
                opacity={0.7}
              />
            ))}

            <circle cx={1080} cy={420} r={180} fill={`url(#${rawId}-glow)`} />
          </g>
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
