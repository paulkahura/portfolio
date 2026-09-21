import { Grid, Snake } from "snake-game-engine";
import type { Vector2D } from "snake-game-engine";

export const BOARD = { width: 20, height: 14, tickMs: 140 };
export type GameStatus = "ready" | "running" | "paused" | "over" | "won";
export interface GameSnapshot {
  body: Vector2D[];
  food: Vector2D;
  score: number;
  best: number;
  status: GameStatus;
}

function readBest() {
  try {
    return Math.max(
      0,
      Number(localStorage.getItem("portfolio-snake-best")) || 0,
    );
  } catch {
    return 0;
  }
}

// Keep the library's movement, growth, collision, and food logic. This adapter
// supplies a stable starting position, cancellable clock, and React snapshots.
export class ArcadeSnake extends Snake<Vector2D> {
  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setInterval> | undefined;
  private status: GameStatus = "ready";
  private best = readBest();
  private snapshot!: GameSnapshot;

  constructor() {
    super(
      {
        ...BOARD,
        tickRate: 1000 / BOARD.tickMs,
        continuousSpace: false,
        scoreConfig: {
          foodMultiplier: 10,
          movementMultiplier: 0,
          useSnakeLength: false,
        },
      },
      {
        cellSize: 30,
        snakeRenderer: (position) => position,
        foodRenderer: (position) => position,
        clearRenderer: () => {},
      },
      () => this.finish("over"),
    );
    this.reset();
  }

  getSnapshot = () => this.snapshot;
  subscribe = (callback: () => void) => {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  };

  private publish() {
    const previousBest = this.best;
    this.best = Math.max(this.best, this.score);
    if (this.best > previousBest) {
      try {
        localStorage.setItem("portfolio-snake-best", String(this.best));
      } catch {
        /* A blocked store must not interrupt play. */
      }
    }
    this.snapshot = {
      body: this.snake.map((cell) => ({ ...cell })),
      food: { ...this.food },
      score: this.score,
      best: this.best,
      status: this.status,
    };
    for (const listener of this.listeners) listener();
  }

  reset() {
    this.dispose();
    this.status = "ready";
    this.score = 0;
    this.direction = { x: 1, y: 0 };
    this.directionQueue = [];
    this.letSnakeGrow = false;
    this.grid = new Grid(BOARD.width, BOARD.height);
    this.snake = [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
      { x: 5, y: 7 },
    ];
    for (const cell of this.snake) this.grid.set(cell, cell);
    this.lastFoodRendered = this.spawnFood();
    this.publish();
  }

  override start() {
    if (
      this.timer !== undefined ||
      this.status === "over" ||
      this.status === "won"
    )
      return;
    this.status = "running";
    this.timer = setInterval(() => this.step(), BOARD.tickMs);
    this.publish();
  }

  override stop() {
    if (this.status !== "running") return;
    this.dispose();
    this.status = "paused";
    this.publish();
  }

  override setDirection(direction: Vector2D) {
    if (this.status !== "running" || this.directionQueue.length >= 2) return;
    super.setDirection(direction);
  }

  step() {
    if (this.status !== "running") return;
    super.update();
    this.publish();
  }

  protected override spawnFood(): Vector2D {
    if (!this.grid.positionsEmpty.length) {
      this.food = { x: -1, y: -1 };
      this.finish("won");
      return this.food;
    }
    return super.spawnFood();
  }

  private finish(status: "over" | "won") {
    this.dispose();
    this.status = status;
    this.publish();
  }

  dispose() {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
  }
}
