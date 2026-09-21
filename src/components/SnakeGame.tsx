import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { ArcadeSnake, BOARD } from "../games/snake";

const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
type Direction = keyof typeof directions;
const aliases: Record<string, Direction> = {
  w: "ArrowUp",
  s: "ArrowDown",
  a: "ArrowLeft",
  d: "ArrowRight",
};

export function SnakeGame() {
  const [game] = useState(() => new ArcadeSnake());
  const frame = useSyncExternalStore(game.subscribe, game.getSnapshot);
  const canvas = useRef<HTMLCanvasElement>(null);
  const touchOrigin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const pause = () => game.stop();
    const visibility = () => {
      if (document.hidden) pause();
    };
    window.addEventListener("blur", pause);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      game.dispose();
      window.removeEventListener("blur", pause);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [game]);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    const cell = 30;
    context.fillStyle = "#07190f";
    context.fillRect(0, 0, 600, 420);
    context.strokeStyle = "#173324";
    context.lineWidth = 1;
    for (let x = 0; x <= BOARD.width; x++) {
      context.beginPath();
      context.moveTo(x * cell, 0);
      context.lineTo(x * cell, 420);
      context.stroke();
    }
    for (let y = 0; y <= BOARD.height; y++) {
      context.beginPath();
      context.moveTo(0, y * cell);
      context.lineTo(600, y * cell);
      context.stroke();
    }
    context.fillStyle = "#e7b775";
    context.fillRect(frame.food.x * cell + 7, frame.food.y * cell + 7, 16, 16);
    frame.body.forEach((part, index) => {
      context.fillStyle = index === 0 ? "#deffd4" : "#88c795";
      context.fillRect(part.x * cell + 2, part.y * cell + 2, 26, 26);
      if (index === 0) {
        context.fillStyle = "#183d22";
        context.fillRect(part.x * cell + 18, part.y * cell + 7, 4, 4);
        context.fillRect(part.x * cell + 18, part.y * cell + 19, 4, 4);
      }
    });
  }, [frame]);

  function start() {
    if (frame.status === "over" || frame.status === "won") game.reset();
    game.start();
    canvas.current?.focus();
  }

  function turn(direction: Direction) {
    game.setDirection(directions[direction]);
    canvas.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent) {
    const direction =
      event.key in directions
        ? (event.key as Direction)
        : aliases[event.key.toLowerCase()];
    if (direction) {
      event.preventDefault();
      turn(direction);
    }
    if (event.key === " " || event.key === "Escape") {
      event.preventDefault();
      if (frame.status === "running") game.stop();
      else if (event.key === " ") start();
    }
  }

  return (
    <div
      className="arcade"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) game.stop();
      }}
    >
      <div className="arcade-bar">
        <span>SNAKE / 01</span>
        <div className="scoreboard">
          <span>
            SCORE <strong>{String(frame.score).padStart(3, "0")}</strong>
          </span>
          <span>
            BEST <strong>{String(frame.best).padStart(3, "0")}</strong>
          </span>
        </div>
      </div>
      <div className="game-stage">
        <div className="snake-board" data-status={frame.status}>
          <canvas
            ref={canvas}
            width={600}
            height={420}
            tabIndex={0}
            role="img"
            aria-label={`Snake game board. Score ${frame.score}. Arrow keys or W A S D to steer; space to pause or resume.`}
            onKeyDown={onKeyDown}
            onPointerDown={(event) => {
              touchOrigin.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              const origin = touchOrigin.current;
              touchOrigin.current = null;
              if (!origin) return;
              const dx = event.clientX - origin.x,
                dy = event.clientY - origin.y;
              if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return;
              turn(
                Math.abs(dx) > Math.abs(dy)
                  ? dx > 0
                    ? "ArrowRight"
                    : "ArrowLeft"
                  : dy > 0
                    ? "ArrowDown"
                    : "ArrowUp",
              );
            }}
            onPointerCancel={() => {
              touchOrigin.current = null;
            }}
          />
          {frame.status !== "running" && (
            <div className="game-overlay">
              <p>
                {frame.status === "ready"
                  ? "SNAKE"
                  : frame.status === "paused"
                    ? "PAUSED"
                    : frame.status === "won"
                      ? "BOARD CLEARED"
                      : "GAME OVER"}
              </p>
              <button className="solid-link" onClick={start}>
                <Play size={16} />
                {frame.status === "paused"
                  ? "Resume"
                  : frame.status === "ready"
                    ? "Play"
                    : "Play again"}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="game-controls">
        <div className="play-controls">
          <button
            className="icon-button"
            title={
              frame.status === "running" ? "Pause game" : "Start or resume game"
            }
            aria-label={
              frame.status === "running" ? "Pause game" : "Start or resume game"
            }
            onClick={() => (frame.status === "running" ? game.stop() : start())}
          >
            {frame.status === "running" ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
          </button>
          <button
            className="icon-button"
            title="Restart game"
            aria-label="Restart game"
            onClick={() => {
              game.reset();
              game.start();
              canvas.current?.focus();
            }}
          >
            <RotateCcw size={18} />
          </button>
        </div>
        <div className="direction-pad" aria-label="Direction controls">
          {(
            [
              ["ArrowLeft", ArrowLeft],
              ["ArrowUp", ArrowUp],
              ["ArrowDown", ArrowDown],
              ["ArrowRight", ArrowRight],
            ] as const
          ).map(([direction, Icon]) => (
            <button
              key={direction}
              className="icon-button"
              aria-label={`Move ${direction.replace("Arrow", "").toLowerCase()}`}
              title={`Move ${direction.replace("Arrow", "").toLowerCase()}`}
              disabled={frame.status !== "running"}
              onClick={() => turn(direction)}
            >
              <Icon size={19} />
            </button>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        {frame.status === "over"
          ? `Game over. Score ${frame.score}.`
          : frame.status === "paused"
            ? "Game paused."
            : frame.status === "won"
              ? "Board cleared."
              : ""}
      </span>
    </div>
  );
}
