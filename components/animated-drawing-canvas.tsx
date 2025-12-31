"use client";

import { useEffect, useRef } from "react";
import React from "react";
import { useLanguage } from "@/contexts/language-context";


interface Point {
  x: number;
  y: number;
}

interface HandwritingPath {
  points: Point[];
  totalLength: number;
}

interface DrawingElement {
  paths: HandwritingPath[];
  x: number;
  y: number;
  text: string;
  progress: number;
  speed: number;
  baseSpeed: number; // Base speed for dynamic variation
  delay: number;
  startTime?: number;
  type: "text" | "shape";
  shapeType?: "arrow" | "bracket" | "box" | "circle" | "underline";
  width?: number;
  height?: number;
  lastSpeedChange?: number; // Track when speed last changed
  style: {
    size: number;
    slant: number;
    weight: number;
    spacing: number;
  };
}

const AnimatedDrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let elements: DrawingElement[] = [];
    let currentElementIndex = 0; // Track which element is currently being drawn
    const isArabic = language === "ar";

    // User drawing state
    let isDrawing = false;
    let userDrawingPaths: Point[] = [];
    const userStrokes: Point[][] = [];
    let inactivityTimeout: NodeJS.Timeout | null = null;
    let hasDrawnAnything = false;

    // Generate handwriting-style paths for text
    const generateHandwritingPaths = (
      text: string,
      x: number,
      y: number,
      style: { size: number; slant: number; weight: number; spacing: number }
    ): HandwritingPath[] => {
      const paths: HandwritingPath[] = [];
      let currentX = x;

      // Always use English letter rendering (even for Arabic language setting)
      text.split("").forEach((char) => {
        const charPaths = getCharacterPaths(char, currentX, y, style);
        paths.push(...charPaths);
        currentX += style.size * 0.6 * style.spacing;
      });

      return paths;
    };

    // Get stroke paths for each character - architectural lettering style
    const getCharacterPaths = (
      char: string,
      x: number,
      y: number,
      style: { size: number; slant: number; weight: number; spacing: number }
    ): HandwritingPath[] => {
      const { size, slant } = style;
      // Minimal variation - architects have steady, controlled hands
      const variation = (Math.random() - 0.5) * size * 0.02;
      const yVariation = (Math.random() - 0.5) * size * 0.015;

      const paths: HandwritingPath[] = [];
      const baseY = y + yVariation;
      const isUpperCase = char === char.toUpperCase() && char !== char.toLowerCase();

      // Handle uppercase letters with architectural style
      if (isUpperCase) {
        switch (char) {
          case "I":
            paths.push(createPath([
              { x: x + slant * size * 0.4, y: baseY - size * 0.6 },
              { x: x + slant * size * 0.2, y: baseY },
            ]));
            // Top and bottom serifs
            paths.push(createPath([
              { x: x - size * 0.1, y: baseY - size * 0.6 },
              { x: x + size * 0.3, y: baseY - size * 0.6 },
            ]));
            paths.push(createPath([
              { x: x - size * 0.1, y: baseY },
              { x: x + size * 0.3, y: baseY },
            ]));
            return paths;

          case "D":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x, y: baseY },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x: x + size * 0.3, y: baseY - size * 0.55 },
              { x: x + size * 0.45, y: baseY - size * 0.3 },
              { x: x + size * 0.3, y: baseY - size * 0.05 },
              { x, y: baseY },
            ]));
            return paths;

          case "T":
            paths.push(createPath([
              { x: x + slant * size * 0.4, y: baseY - size * 0.6 },
              { x: x + slant * size * 0.2, y: baseY },
            ]));
            paths.push(createPath([
              { x: x - size * 0.1, y: baseY - size * 0.6 },
              { x: x + size * 0.5, y: baseY - size * 0.6 },
            ]));
            return paths;

          case "E":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x, y: baseY },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x: x + size * 0.4, y: baseY - size * 0.6 },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.3 },
              { x: x + size * 0.35, y: baseY - size * 0.3 },
            ]));
            paths.push(createPath([
              { x, y: baseY },
              { x: x + size * 0.4, y: baseY },
            ]));
            return paths;

          case "C":
            paths.push(createPath([
              { x: x + size * 0.45, y: baseY - size * 0.55 },
              { x: x + size * 0.15, y: baseY - size * 0.6 },
              { x: x, y: baseY - size * 0.3 },
              { x: x + size * 0.15, y: baseY },
              { x: x + size * 0.45, y: baseY - size * 0.05 },
            ]));
            return paths;

          case "V":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x: x + size * 0.25, y: baseY },
              { x: x + size * 0.5, y: baseY - size * 0.6 },
            ]));
            return paths;

          case "S":
            paths.push(createPath([
              { x: x + size * 0.4, y: baseY - size * 0.55 },
              { x: x + size * 0.1, y: baseY - size * 0.6 },
              { x: x, y: baseY - size * 0.45 },
              { x: x + size * 0.25, y: baseY - size * 0.3 },
              { x: x + size * 0.4, y: baseY - size * 0.15 },
              { x: x + size * 0.3, y: baseY },
              { x: x, y: baseY - size * 0.05 },
            ]));
            return paths;

          case "B":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x, y: baseY },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x: x + size * 0.3, y: baseY - size * 0.58 },
              { x: x + size * 0.35, y: baseY - size * 0.45 },
              { x, y: baseY - size * 0.3 },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.3 },
              { x: x + size * 0.35, y: baseY - size * 0.28 },
              { x: x + size * 0.4, y: baseY - size * 0.15 },
              { x, y: baseY },
            ]));
            return paths;

          case "L":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x, y: baseY },
            ]));
            paths.push(createPath([
              { x, y: baseY },
              { x: x + size * 0.4, y: baseY },
            ]));
            return paths;

          case "F":
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x, y: baseY },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.6 },
              { x: x + size * 0.4, y: baseY - size * 0.6 },
            ]));
            paths.push(createPath([
              { x, y: baseY - size * 0.3 },
              { x: x + size * 0.35, y: baseY - size * 0.3 },
            ]));
            return paths;
        }
      }

      switch (char.toLowerCase()) {
        case "i":
          paths.push(createPath([
            { x: x + slant * size * 0.3, y: baseY - size * 0.3 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          paths.push(createPath([{ x: x + slant * size * 0.3 + variation, y: baseY - size * 0.6 }]));
          break;

        case "n":
          paths.push(createPath([
            { x, y: baseY },
            { x: x + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.3 + variation, y: baseY },
            { x: x + size * 0.3 + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.6, y: baseY },
          ]));
          break;

        case "o":
          paths.push(createCurve(x + size * 0.3, baseY - size * 0.15, size * 0.25));
          break;

        case "v":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + size * 0.25, y: baseY },
            { x: x + size * 0.5, y: baseY - size * 0.3 },
          ]));
          break;

        case "a":
          paths.push(createCurve(x + size * 0.25, baseY - size * 0.15, size * 0.2));
          paths.push(createPath([
            { x: x + size * 0.4, y: baseY - size * 0.3 },
            { x: x + size * 0.4, y: baseY },
          ]));
          break;

        case "t":
          paths.push(createPath([
            { x: x + slant * size * 0.4, y: baseY - size * 0.5 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          paths.push(createPath([
            { x: x - size * 0.1, y: baseY - size * 0.35 },
            { x: x + size * 0.5, y: baseY - size * 0.35 },
          ]));
          break;

        case "e":
          paths.push(createPath([
            { x: x + size * 0.35, y: baseY - size * 0.15 },
            { x: x + size * 0.15, y: baseY - size * 0.15 },
            { x: x + size * 0.1, y: baseY - size * 0.25 },
            { x: x + size * 0.2, y: baseY - size * 0.35 },
            { x: x + size * 0.35, y: baseY - size * 0.25 },
          ]));
          break;

        case "c":
          paths.push(createPath([
            { x: x + size * 0.4, y: baseY - size * 0.05 },
            { x: x + size * 0.15, y: baseY - size * 0.1 },
            { x: x + size * 0.1, y: baseY - size * 0.25 },
            { x: x + size * 0.2, y: baseY - size * 0.35 },
          ]));
          break;

        case "h":
          paths.push(createPath([
            { x, y: baseY - size * 0.5 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          paths.push(createPath([
            { x: x + size * 0.15, y: baseY - size * 0.2 },
            { x: x + size * 0.3, y: baseY - size * 0.3 },
            { x: x + size * 0.5, y: baseY },
          ]));
          break;

        case "l":
          paths.push(createPath([
            { x, y: baseY - size * 0.5 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          break;

        case "d":
          paths.push(createCurve(x + size * 0.25, baseY - size * 0.15, size * 0.2));
          paths.push(createPath([
            { x: x + size * 0.45, y: baseY - size * 0.5 },
            { x: x + size * 0.45, y: baseY },
          ]));
          break;

        case "g":
          paths.push(createCurve(x + size * 0.25, baseY - size * 0.15, size * 0.2));
          paths.push(createPath([
            { x: x + size * 0.45, y: baseY - size * 0.3 },
            { x: x + size * 0.45, y: baseY + size * 0.3 },
            { x: x + size * 0.25, y: baseY + size * 0.35 },
          ]));
          break;

        case "s":
          paths.push(createPath([
            { x: x + size * 0.35, y: baseY - size * 0.35 },
            { x: x + size * 0.15, y: baseY - size * 0.3 },
            { x: x + size * 0.25, y: baseY - size * 0.15 },
            { x: x + size * 0.15, y: baseY - size * 0.05 },
          ]));
          break;

        case "r":
          paths.push(createPath([
            { x, y: baseY },
            { x: x + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.3, y: baseY - size * 0.25 },
          ]));
          break;

        case "u":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + slant * size * 0.1, y: baseY - size * 0.05 },
            { x: x + size * 0.3, y: baseY },
            { x: x + size * 0.3 + slant * size * 0.2, y: baseY - size * 0.3 },
          ]));
          break;

        case "y":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + size * 0.25, y: baseY },
            { x: x + size * 0.3, y: baseY + size * 0.3 },
          ]));
          paths.push(createPath([
            { x: x + size * 0.5, y: baseY - size * 0.3 },
            { x: x + size * 0.25, y: baseY },
          ]));
          break;

        case "p":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + slant * size * 0.2, y: baseY + size * 0.3 },
          ]));
          paths.push(createCurve(x + size * 0.25, baseY - size * 0.15, size * 0.15));
          break;

        case "x":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + size * 0.4, y: baseY },
          ]));
          paths.push(createPath([
            { x: x + size * 0.4, y: baseY - size * 0.3 },
            { x, y: baseY },
          ]));
          break;

        case "w":
          paths.push(createPath([
            { x, y: baseY - size * 0.3 },
            { x: x + size * 0.15, y: baseY },
            { x: x + size * 0.3, y: baseY - size * 0.25 },
            { x: x + size * 0.45, y: baseY },
            { x: x + size * 0.6, y: baseY - size * 0.3 },
          ]));
          break;

        case "m":
          paths.push(createPath([
            { x, y: baseY },
            { x: x + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.2, y: baseY },
            { x: x + size * 0.2 + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.4, y: baseY },
            { x: x + size * 0.4 + slant * size * 0.2, y: baseY - size * 0.3 },
            { x: x + size * 0.6, y: baseY },
          ]));
          break;

        case "b":
          paths.push(createPath([
            { x, y: baseY - size * 0.5 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          paths.push(createCurve(x + size * 0.25, baseY - size * 0.15, size * 0.2));
          break;

        case "k":
          paths.push(createPath([
            { x, y: baseY - size * 0.5 },
            { x: x + slant * size * 0.2, y: baseY },
          ]));
          paths.push(createPath([
            { x: x + size * 0.4, y: baseY - size * 0.35 },
            { x: x + size * 0.15, y: baseY - size * 0.15 },
            { x: x + size * 0.4, y: baseY },
          ]));
          break;

        case "f":
          paths.push(createPath([
            { x: x + size * 0.35, y: baseY - size * 0.5 },
            { x: x + size * 0.25, y: baseY - size * 0.45 },
            { x: x + slant * size * 0.3, y: baseY },
          ]));
          paths.push(createPath([
            { x: x - size * 0.1, y: baseY - size * 0.3 },
            { x: x + size * 0.4, y: baseY - size * 0.3 },
          ]));
          break;

        case " ":
          // Space - no paths
          break;

        default:
          // For unknown characters, draw a simple line
          paths.push(createPath([
            { x, y: baseY },
            { x: x + size * 0.4, y: baseY },
          ]));
      }

      return paths;
    };

    const createPath = (points: Point[]): HandwritingPath => {
      if (points.length === 0) return { points: [], totalLength: 0 };
      if (points.length === 1) return { points, totalLength: 0 };

      // Architectural style - clean, confident strokes with minimal imperfection
      const smoothPoints: Point[] = [];

      for (let i = 0; i < points.length; i++) {
        // Very subtle jitter - controlled hand, not shaky
        const isEndpoint = i === 0 || i === points.length - 1;
        const jitterX = (Math.random() - 0.5) * 0.3;
        const jitterY = (Math.random() - 0.5) * 0.25;

        smoothPoints.push({
          x: points[i].x + jitterX,
          y: points[i].y + jitterY,
        });

        if (i < points.length - 1) {
          // Calculate segment length for adaptive subdivision
          const segmentLength = Math.hypot(
            points[i + 1].x - points[i].x,
            points[i + 1].y - points[i].y
          );

          // Fewer subdivisions for cleaner lines
          const subdivisions = Math.max(1, Math.floor(segmentLength / 12));

          for (let j = 1; j <= subdivisions; j++) {
            const t = j / (subdivisions + 1);
            // Very subtle perpendicular offset - slight natural flow without wobble
            const perpX = -(points[i + 1].y - points[i].y) / (segmentLength || 1);
            const perpY = (points[i + 1].x - points[i].x) / (segmentLength || 1);
            // Minimal wave - architectural precision
            const waveOffset = Math.sin(t * Math.PI) * (Math.random() - 0.5) * 0.4;

            const midX = points[i].x + (points[i + 1].x - points[i].x) * t + perpX * waveOffset + (Math.random() - 0.5) * 0.2;
            const midY = points[i].y + (points[i + 1].y - points[i].y) * t + perpY * waveOffset + (Math.random() - 0.5) * 0.2;
            smoothPoints.push({ x: midX, y: midY });
          }
        }
      }

      return {
        points: smoothPoints,
        totalLength: calculatePathLength(smoothPoints),
      };
    };

    const createCurve = (cx: number, cy: number, radius: number): HandwritingPath => {
      const points: Point[] = [];
      const segments = 32; // More segments for smoother ellipses

      // Architectural ellipse - slightly imperfect but controlled
      const squashX = 0.98 + Math.random() * 0.04; // 0.98 to 1.02 - very subtle
      const squashY = 0.98 + Math.random() * 0.04;
      const rotationOffset = (Math.random() - 0.5) * 0.08; // Very slight rotation

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + rotationOffset;

        // Subtle, smooth radius variation - like drawing with a steady hand and compass
        const wobble1 = Math.sin(angle * 2) * 0.3;
        const wobble2 = Math.cos(angle * 3) * 0.15;
        const radiusVariation = radius + wobble1 + wobble2 + (Math.random() - 0.5) * 0.2;

        points.push({
          x: cx + Math.cos(angle) * radiusVariation * squashX + (Math.random() - 0.5) * 0.15,
          y: cy + Math.sin(angle) * radiusVariation * squashY + (Math.random() - 0.5) * 0.15,
        });
      }
      return {
        points,
        totalLength: calculatePathLength(points),
      };
    };

    const calculatePathLength = (points: Point[]): number => {
      let length = 0;
      for (let i = 0; i < points.length - 1; i++) {
        length += Math.hypot(
          points[i + 1].x - points[i].x,
          points[i + 1].y - points[i].y
        );
      }
      return length;
    };

    // Create architectural shapes - clean, precise, professional
    const createArrowShape = (x: number, y: number, width: number): HandwritingPath[] => {
      const paths: HandwritingPath[] = [];
      const headSize = Math.min(12, width * 0.12);

      // Main arrow line - clean and straight
      paths.push(createPath([
        { x, y },
        { x: x + width, y },
      ]));

      // Arrow head - sharp, architectural angle
      paths.push(createPath([
        { x: x + width - headSize, y: y - headSize * 0.5 },
        { x: x + width, y },
      ]));
      paths.push(createPath([
        { x: x + width - headSize, y: y + headSize * 0.5 },
        { x: x + width, y },
      ]));

      return paths;
    };

    const createBracketShape = (x: number, y: number, width: number, height: number): HandwritingPath[] => {
      const paths: HandwritingPath[] = [];
      const depth = Math.min(10, width * 0.25);

      // Left bracket - clean corners
      paths.push(createPath([
        { x: x + depth, y },
        { x, y },
      ]));
      paths.push(createPath([
        { x, y },
        { x, y: y + height },
      ]));
      paths.push(createPath([
        { x, y: y + height },
        { x: x + depth, y: y + height },
      ]));

      return paths;
    };

    const createBoxShape = (x: number, y: number, width: number, height: number): HandwritingPath[] => {
      const paths: HandwritingPath[] = [];

      // Draw rectangle as separate strokes for architectural feel
      // Top
      paths.push(createPath([
        { x, y },
        { x: x + width, y },
      ]));
      // Right
      paths.push(createPath([
        { x: x + width, y },
        { x: x + width, y: y + height },
      ]));
      // Bottom
      paths.push(createPath([
        { x: x + width, y: y + height },
        { x, y: y + height },
      ]));
      // Left
      paths.push(createPath([
        { x, y: y + height },
        { x, y },
      ]));

      return paths;
    };

    const createCircleShape = (x: number, y: number, radius: number): HandwritingPath[] => {
      return [createCurve(x, y, radius)];
    };

    const createUnderlineShape = (x: number, y: number, width: number): HandwritingPath[] => {
      const paths: HandwritingPath[] = [];

      // Clean single underline with slight taper
      paths.push(createPath([
        { x, y },
        { x: x + width, y },
      ]));

      return paths;
    };

    // Get current pen tip position for an element based on progress
    const getCurrentPenPosition = (element: DrawingElement): Point | null => {
      if (element.progress >= 1 || element.progress <= 0) return null;

      const totalLength = element.paths.reduce((sum, path) => sum + path.totalLength, 0);
      const currentLength = totalLength * element.progress;

      let accumulatedLength = 0;

      for (const path of element.paths) {
        if (path.points.length < 2) {
          continue;
        }

        const pathEndLength = accumulatedLength + path.totalLength;

        if (currentLength <= pathEndLength && currentLength > accumulatedLength) {
          // Current position is within this path
          const pathProgress = (currentLength - accumulatedLength) / path.totalLength;
          let pathLength = 0;
          const targetLength = path.totalLength * pathProgress;

          for (let i = 1; i < path.points.length; i++) {
            const segmentLength = Math.hypot(
              path.points[i].x - path.points[i - 1].x,
              path.points[i].y - path.points[i - 1].y
            );

            if (pathLength + segmentLength >= targetLength) {
              // Current position is in this segment
              const ratio = (targetLength - pathLength) / segmentLength;
              return {
                x: path.points[i - 1].x + (path.points[i].x - path.points[i - 1].x) * ratio,
                y: path.points[i - 1].y + (path.points[i].y - path.points[i - 1].y) * ratio,
              };
            }
            pathLength += segmentLength;
          }
        }

        accumulatedLength = pathEndLength;
      }

      return null;
    };

    // Draw pen icon on canvas at given position
    const drawPen = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.save();

      const scale = 0.5; // Smaller, more delicate pen

      // Offset to align pen tip exactly with drawing point
      const tipOffsetX = 0;
      const tipOffsetY = -18 * scale;

      // Position pen with tip at drawing point, angled like writing
      ctx.translate(x + tipOffsetX, y + tipOffsetY);
      ctx.rotate(-Math.PI / 5); // Natural writing angle
      ctx.scale(scale, scale);

      // Subtle shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Pen body (elegant fountain pen barrel) - Dark blue/black lacquer
      const bodyGradient = ctx.createLinearGradient(-3, -50, 4, -50);
      bodyGradient.addColorStop(0, '#1a1a2e');
      bodyGradient.addColorStop(0.3, '#16213e');
      bodyGradient.addColorStop(0.6, '#1a1a2e');
      bodyGradient.addColorStop(1, '#0f0f1a');
      ctx.fillStyle = bodyGradient;

      ctx.beginPath();
      ctx.moveTo(-3, -50);
      ctx.lineTo(3, -50);
      ctx.lineTo(3.5, -12);
      ctx.lineTo(-3.5, -12);
      ctx.closePath();
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = 'transparent';

      // Subtle shine on barrel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(-2, -48);
      ctx.lineTo(-1, -48);
      ctx.lineTo(-0.5, -14);
      ctx.lineTo(-2.5, -14);
      ctx.closePath();
      ctx.fill();

      // Gold ring accent at top
      const ringGradient = ctx.createLinearGradient(-3.5, -50, 3.5, -50);
      ringGradient.addColorStop(0, '#b8860b');
      ringGradient.addColorStop(0.5, '#ffd700');
      ringGradient.addColorStop(1, '#b8860b');
      ctx.fillStyle = ringGradient;
      ctx.fillRect(-3.5, -52, 7, 3);

      // Gold ring at grip
      ctx.fillStyle = ringGradient;
      ctx.fillRect(-4, -14, 8, 2);

      // Section/grip (tapered part before nib)
      const sectionGradient = ctx.createLinearGradient(-3.5, -12, 3.5, -12);
      sectionGradient.addColorStop(0, '#2d2d44');
      sectionGradient.addColorStop(0.5, '#3d3d5c');
      sectionGradient.addColorStop(1, '#2d2d44');
      ctx.fillStyle = sectionGradient;

      ctx.beginPath();
      ctx.moveTo(-3.5, -12);
      ctx.lineTo(3.5, -12);
      ctx.lineTo(2, 0);
      ctx.lineTo(-2, 0);
      ctx.closePath();
      ctx.fill();

      // Nib (golden fountain pen nib)
      const nibGradient = ctx.createLinearGradient(-2, 0, 2, 0);
      nibGradient.addColorStop(0, '#b8860b');
      nibGradient.addColorStop(0.3, '#ffd700');
      nibGradient.addColorStop(0.7, '#ffd700');
      nibGradient.addColorStop(1, '#b8860b');
      ctx.fillStyle = nibGradient;

      ctx.beginPath();
      ctx.moveTo(-2, 0);
      ctx.quadraticCurveTo(-1.5, 10, 0, 18);
      ctx.quadraticCurveTo(1.5, 10, 2, 0);
      ctx.closePath();
      ctx.fill();

      // Nib slit (center line)
      ctx.strokeStyle = '#8b6914';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(0, 16);
      ctx.stroke();

      // Nib breather hole
      ctx.fillStyle = '#1a1a2e';
      ctx.beginPath();
      ctx.ellipse(0, 4, 0.8, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nib highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(-1, 1);
      ctx.quadraticCurveTo(-0.5, 6, 0, 10);
      ctx.lineTo(0, 1);
      ctx.closePath();
      ctx.fill();

      // Clip on cap (subtle detail)
      ctx.fillStyle = '#c0c0c0';
      ctx.beginPath();
      ctx.roundRect(3.5, -48, 1.5, 20, 0.5);
      ctx.fill();

      ctx.restore();
    };

    const initializeElements = () => {
      const w = canvas.width;
      const h = canvas.height;
      const gridSize = 100;

      const snapToGrid = (value: number) => {
        return Math.round(value / gridSize) * gridSize;
      };

      // Text elements with their annotations - order matters for sequential drawing
      const textElements = [
        { text: "Innovation", x: 0.08, y: 0.12, size: 32, hasShape: "circle" as const },
        { text: "Strategy", x: 0.82, y: 0.08, size: 27 },
        { text: "Digital", x: 0.75, y: 0.15, size: 28, hasShape: "underline" as const },
        { text: "Vision", x: 0.42, y: 0.22, size: 25, hasShape: "circle" as const },
        { text: "Ideas", x: 0.85, y: 0.25, size: 24 },
        { text: "Creative", x: 0.12, y: 0.35, size: 26, hasShape: "box" as const },
        { text: "Technology", x: 0.72, y: 0.42, size: 30, hasShape: "arrow" as const },
        { text: "Build", x: 0.05, y: 0.48, size: 25, hasShape: "arrow" as const },
        { text: "Design", x: 0.15, y: 0.58, size: 28, hasShape: "underline" as const },
        { text: "Development", x: 0.68, y: 0.65, size: 26, hasShape: "bracket" as const },
        { text: "Experience", x: 0.1, y: 0.78, size: 29, hasShape: "box" as const },
        { text: "Future", x: 0.75, y: 0.85, size: 27, hasShape: "circle" as const },
      ];

      const allElements: DrawingElement[] = [];

      // Create text elements with optional shapes - sequential order
      textElements.forEach((item) => {
        const style = {
          size: item.size + (Math.random() - 0.5) * 1, // Very consistent size
          slant: 0.12 + (Math.random() - 0.5) * 0.02, // Consistent architectural slant
          weight: 1.6 + (Math.random() - 0.5) * 0.15, // Consistent line weight
          spacing: 1.05 + (Math.random() - 0.5) * 0.03, // Even letter spacing
        };

        const textX = snapToGrid(w * item.x);
        const textY = snapToGrid(h * item.y);
        const textPaths = generateHandwritingPaths(item.text, textX, textY, style);

        // Consistent speed for smoother pen movement
        const baseSpeed = 0.003;

        // Add text element
        allElements.push({
          paths: textPaths,
          x: textX,
          y: textY,
          text: item.text,
          progress: 0,
          speed: baseSpeed,
          baseSpeed: baseSpeed,
          delay: 0, // No delay - sequential handled in animation
          type: "text",
          lastSpeedChange: 0,
          style,
        });

        // Add shape annotation right after its text
        if (item.hasShape) {
          const textWidth = item.text.length * style.size * 0.6;
          let shapePaths: HandwritingPath[] = [];
          let shapeWidth = 0;
          let shapeHeight = 0;

          switch (item.hasShape) {
            case "circle":
              const radius = Math.max(textWidth, style.size * 1.2) * 0.6;
              shapePaths = createCircleShape(textX + textWidth / 2, textY - style.size * 0.3, radius);
              shapeWidth = radius * 2;
              shapeHeight = radius * 2;
              break;

            case "underline":
              shapePaths = createUnderlineShape(textX, textY + style.size * 0.15, textWidth);
              shapeWidth = textWidth;
              shapeHeight = 0;
              break;

            case "box":
              const padding = style.size * 0.3;
              shapePaths = createBoxShape(
                textX - padding,
                textY - style.size * 0.8,
                textWidth + padding * 2,
                style.size * 1.1
              );
              shapeWidth = textWidth + padding * 2;
              shapeHeight = style.size * 1.1;
              break;

            case "arrow":
              const arrowY = textY - style.size * 0.9;
              shapePaths = createArrowShape(textX, arrowY, textWidth * 0.7);
              shapeWidth = textWidth * 0.7;
              shapeHeight = 0;
              break;

            case "bracket":
              shapePaths = createBracketShape(
                textX - style.size * 0.5,
                textY - style.size * 0.7,
                style.size * 0.4,
                style.size * 0.9
              );
              shapeWidth = style.size * 0.4;
              shapeHeight = style.size * 0.9;
              break;
          }

          const shapeBaseSpeed = 0.005; // Shapes draw a bit faster

          allElements.push({
            paths: shapePaths,
            x: textX,
            y: textY,
            text: "",
            progress: 0,
            speed: shapeBaseSpeed,
            baseSpeed: shapeBaseSpeed,
            delay: 0,
            type: "shape",
            shapeType: item.hasShape,
            width: shapeWidth,
            height: shapeHeight,
            lastSpeedChange: 0,
            style,
          });
        }
      });

      elements = allElements;
      currentElementIndex = 0;
    };

    // Draw element with progressive path rendering
    const drawElement = (
      ctx: CanvasRenderingContext2D,
      element: DrawingElement
    ) => {
      ctx.save();

      // Calculate total length of all paths for this element
      const totalLength = element.paths.reduce((sum, path) => sum + path.totalLength, 0);
      const currentLength = totalLength * element.progress;

      let accumulatedLength = 0;

      // Draw each path progressively
      for (const path of element.paths) {
        if (path.points.length < 2) {
          // For single-point paths (like dots on 'i'), draw with architectural precision
          if (accumulatedLength <= currentLength && path.points.length === 1) {
            ctx.fillStyle = "rgba(103, 232, 249, 0.5)";
            ctx.beginPath();
            ctx.arc(path.points[0].x, path.points[0].y, element.style.weight * 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        const pathStartLength = accumulatedLength;
        const pathEndLength = accumulatedLength + path.totalLength;

        if (currentLength > pathStartLength) {
          // This path should be at least partially drawn
          const pathProgress = Math.min(1, (currentLength - pathStartLength) / path.totalLength);

          // Draw the path up to the current progress - architectural style
          let pathLength = 0;
          const targetLength = path.totalLength * pathProgress;

          const totalSegments = path.points.length - 1;

          for (let i = 1; i < path.points.length; i++) {
            const segmentLength = Math.hypot(
              path.points[i].x - path.points[i - 1].x,
              path.points[i].y - path.points[i - 1].y
            );

            if (pathLength + segmentLength <= targetLength) {
              // Architectural pressure - consistent with subtle variation at endpoints
              const strokeProgress = (i - 1) / totalSegments;
              // Subtle pressure curve - architects maintain even pressure
              const pressureCurve = 0.85 + Math.sin(strokeProgress * Math.PI) * 0.15; // Range: 0.85 to 1.0

              // Very slight random variation - steady hand
              const randomVariation = (Math.random() - 0.5) * 0.05;
              const lineWeight = element.style.weight * (pressureCurve + randomVariation);

              // Consistent opacity - good ink flow
              const baseOpacity = 0.55 + Math.sin(strokeProgress * Math.PI) * 0.1; // Range: 0.55 to 0.65
              const opacityVariation = baseOpacity + (Math.random() - 0.5) * 0.03;

              ctx.strokeStyle = `rgba(103, 232, 249, ${opacityVariation})`;
              ctx.lineWidth = lineWeight;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";

              ctx.beginPath();
              ctx.moveTo(path.points[i - 1].x, path.points[i - 1].y);
              ctx.lineTo(path.points[i].x, path.points[i].y);
              ctx.stroke();

              pathLength += segmentLength;
            } else {
              // Draw partial segment
              const ratio = (targetLength - pathLength) / segmentLength;
              const px = path.points[i - 1].x + (path.points[i].x - path.points[i - 1].x) * ratio;
              const py = path.points[i - 1].y + (path.points[i].y - path.points[i - 1].y) * ratio;

              // Consistent pressure for partial segment
              const strokeProgress = (i - 1) / totalSegments;
              const pressureCurve = 0.85 + Math.sin(strokeProgress * Math.PI) * 0.15;
              const lineWeight = element.style.weight * (pressureCurve + (Math.random() - 0.5) * 0.05);
              const opacityVariation = 0.55 + Math.sin(strokeProgress * Math.PI) * 0.1 + (Math.random() - 0.5) * 0.03;

              ctx.strokeStyle = `rgba(103, 232, 249, ${opacityVariation})`;
              ctx.lineWidth = lineWeight;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";

              ctx.beginPath();
              ctx.moveTo(path.points[i - 1].x, path.points[i - 1].y);
              ctx.lineTo(px, py);
              ctx.stroke();
              break;
            }
          }
        }

        accumulatedLength = pathEndLength;

        if (currentLength < pathEndLength) {
          // We haven't reached the end of this path, so we're done
          break;
        }
      }

      ctx.restore();
    };

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeElements();
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // User drawing handlers
    const getMousePos = (e: MouseEvent | TouchEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      hasDrawnAnything = true;
      const pos = getMousePos(e);
      userDrawingPaths = [pos];

      // Clear any existing inactivity timeout when user starts drawing again
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = null;
      }
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const pos = getMousePos(e);
      userDrawingPaths.push(pos);
    };

    const stopDrawing = () => {
      if (isDrawing && userDrawingPaths.length > 1) {
        userStrokes.push([...userDrawingPaths]);
      }
      isDrawing = false;
      userDrawingPaths = [];

      // Clear any existing timeout
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }

      // Start a new inactivity timer - only trigger if user doesn't draw again for 3 seconds
      if (hasDrawnAnything) {
        inactivityTimeout = setTimeout(() => {
          // User hasn't drawn anything for 3 seconds - they're done
          const event = new CustomEvent('userDrawn', { detail: { drawn: true } });
          window.dispatchEvent(event);
          hasDrawnAnything = false; // Reset so it doesn't trigger again
          inactivityTimeout = null;
        }, 3000); // 3 seconds of inactivity
      }
    };

    // Add event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw completed user strokes
      userStrokes.forEach((stroke) => {
        ctx.strokeStyle = "rgba(103, 232, 249, 0.6)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      });

      // Draw current user stroke (while drawing)
      if (isDrawing && userDrawingPaths.length > 1) {
        ctx.strokeStyle = "rgba(103, 232, 249, 0.6)";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(userDrawingPaths[0].x, userDrawingPaths[0].y);
        for (let i = 1; i < userDrawingPaths.length; i++) {
          ctx.lineTo(userDrawingPaths[i].x, userDrawingPaths[i].y);
        }
        ctx.stroke();
      }

      // Track pen position for the current element being drawn
      let activePenPosition: Point | null = null;

      // Draw all completed elements
      for (let i = 0; i < currentElementIndex && i < elements.length; i++) {
        elements[i].progress = 1;
        drawElement(ctx, elements[i]);
      }

      // Draw and animate current element (sequential - one at a time)
      if (currentElementIndex < elements.length) {
        const currentElement = elements[currentElementIndex];

        // Start timing for current element if not started
        if (!currentElement.startTime) {
          currentElement.startTime = currentTime;
          currentElement.lastSpeedChange = currentTime;
        }

        // Animate progress
        if (currentElement.progress < 1) {
          // Slight speed variation for natural feel
          const timeSinceLastChange = currentTime - (currentElement.lastSpeedChange || currentElement.startTime);
          if (timeSinceLastChange > 300) {
            const speedMultiplier = 0.85 + Math.random() * 0.3;
            currentElement.speed = currentElement.baseSpeed * speedMultiplier;
            currentElement.lastSpeedChange = currentTime;
          }

          currentElement.progress = Math.min(1, currentElement.progress + currentElement.speed);

          // Get pen position for currently drawing element
          activePenPosition = getCurrentPenPosition(currentElement);
        }

        // Draw current element
        drawElement(ctx, currentElement);

        // Move to next element when current is complete
        if (currentElement.progress >= 1) {
          currentElementIndex++;
        }
      }

      // Draw pen at the active drawing position
      if (activePenPosition) {
        drawPen(ctx, activePenPosition.x, activePenPosition.y);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
      cancelAnimationFrame(animationFrameId);
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
    };
  }, [language]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        zIndex: 111,
        touchAction: 'none',
        cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Cpath d='M4 28L2 30L6 26L20 12L16 8L4 20V28Z' fill='%2367e8f9' stroke='%230e7490' stroke-width='1.5'/%3E%3Cpath d='M16 8L20 12L28 4L24 2L16 8Z' fill='%2314b8a6' stroke='%230e7490' stroke-width='1.5'/%3E%3Ccircle cx='3' cy='29' r='1.5' fill='%23fff' opacity='0.8'/%3E%3C/svg%3E") 3 29, auto`
      }}
    />
  );
};

export default AnimatedDrawingCanvas;
