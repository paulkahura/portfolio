import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, RotateCcw } from "lucide-react";
import minesweeper from "minesweeper";
import { arcadeGames, gameLabels } from "../data/arcade";
import type { ArcadeGame } from "../data/arcade";
import { SnakeGame } from "./SnakeGame";

function SignalTap() {
  const [state, setState] = useState<"ready" | "waiting" | "go" | "early">(
    "ready",
  );
  const [startedAt, setStartedAt] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function start() {
    if (timer.current) clearTimeout(timer.current);
    setScore(null);
    setState("waiting");
    timer.current = setTimeout(() => {
      setStartedAt(performance.now());
      setState("go");
    }, 1100 + Math.random() * 1800);
  }

  function tap() {
    if (state === "waiting") {
      if (timer.current) clearTimeout(timer.current);
      setState("early");
      return;
    }
    if (state === "go") {
      setScore(Math.round(performance.now() - startedAt));
      setState("ready");
      return;
    }
    start();
  }

  const message =
    state === "waiting"
      ? "Hold. Do not jump the signal."
      : state === "go"
        ? "NOW"
        : state === "early"
          ? "TOO EARLY. THE TERMINAL SAW THAT."
          : score !== null
            ? `${score} MS. ${score < 250 ? "Fast hands." : score < 400 ? "Respectable." : "Coffee first?"}`
            : "Wait for the green signal, then tap.";

  return (
    <div className="arcade mini-game">
      <div className="arcade-bar">
        <span>SIGNAL TAP / 02</span>
        <span className="muted">REFLEX TEST</span>
      </div>
      <button
        className={`signal-pad ${state}`}
        onClick={tap}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            tap();
          }
        }}
      >
        <span>{state === "go" ? "TAP" : "SIGNAL"}</span>
        <small>{message}</small>
      </button>
      <div className="game-controls compact-controls">
        <button className="solid-link" onClick={start}>
          <Play size={16} /> {state === "waiting" || state === "go" ? "Restart" : "Start test"}
        </button>
        <span>CLICK / ENTER / SPACE</span>
      </div>
    </div>
  );
}

const mineConfig = { rows: 9, cols: 9, mines: 10 };

function createMineBoard() {
  return new minesweeper.Board(minesweeper.generateMineArray(mineConfig));
}

function Minesweep() {
  const [board, setBoard] = useState(createMineBoard);
  const [revision, setRevision] = useState(0);
  const grid = board.grid();
  const flags = grid.flat().filter((cell) => cell.flag === minesweeper.CellFlagEnum.EXCLAMATION).length;
  const boardState = board.state();
  const lost = boardState === minesweeper.BoardStateEnum.LOST;
  const won = boardState === minesweeper.BoardStateEnum.WON;

  function update(action: () => void) {
    action();
    setRevision((value) => value + 1);
  }

  return (
    <div className="arcade mini-game minesweep-game">
      <div className="arcade-bar">
        <span>MINESWEEP / 03</span>
        <span className="muted">{won ? "BOARD CLEARED" : lost ? "MINE HIT" : "CLEAR THE FIELD"}</span>
      </div>
      <div className="mine-stage">
        <div className="mine-grid" role="grid" aria-label="Minesweeper board" data-revision={revision}>
          {grid.flat().map((cell) => {
            const open = cell.state === minesweeper.CellStateEnum.OPEN;
            const flagged = cell.flag === minesweeper.CellFlagEnum.EXCLAMATION;
            const questioned = cell.flag === minesweeper.CellFlagEnum.QUESTION;
            const content = open
              ? cell.isMine
                ? "*"
                : cell.numAdjacentMines || ""
              : flagged
                ? "!"
                : questioned
                  ? "?"
                  : "";
            const label = open
              ? cell.isMine
                ? `Mine at row ${cell.y + 1}, column ${cell.x + 1}`
                : `Open cell at row ${cell.y + 1}, column ${cell.x + 1}; ${cell.numAdjacentMines} adjacent mines`
              : `${flagged ? "Flagged" : "Closed"} cell at row ${cell.y + 1}, column ${cell.x + 1}. Click to open; right-click or Shift+Enter to flag.`;
            return (
              <button
                key={`${cell.x}-${cell.y}`}
                className={`mine-cell ${open ? "open" : "closed"} ${cell.isMine && open ? "mine" : ""}`}
                role="gridcell"
                aria-label={label}
                disabled={open || won || lost}
                onClick={() => update(() => board.openCell(cell.x, cell.y))}
                onContextMenu={(event) => {
                  event.preventDefault();
                  update(() => board.cycleCellFlag(cell.x, cell.y));
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && event.shiftKey) {
                    event.preventDefault();
                    update(() => board.cycleCellFlag(cell.x, cell.y));
                  }
                }}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
      <div className="game-controls compact-controls">
        <button
          className="solid-link"
          onClick={() => {
            setBoard(createMineBoard());
            setRevision(0);
          }}
        >
          <RotateCcw size={16} /> New field
        </button>
        <span>MINES {String(mineConfig.mines - flags).padStart(2, "0")} / RIGHT-CLICK TO FLAG</span>
      </div>
    </div>
  );
}

export function ArcadeCabinet({ game = "snake" }: { game?: ArcadeGame }) {
  return (
    <div className="arcade-cabinet">
      <nav className="arcade-launcher" aria-label="Arcade games">
        <span>ARCADE /</span>
        {arcadeGames.map((item, index) => (
          <Link
            key={item}
            to={`/?section=games&game=${item}`}
            aria-current={item === game ? "page" : undefined}
          >
            [{String(index + 1).padStart(2, "0")}] {gameLabels[item]}
          </Link>
        ))}
      </nav>
      {game === "snake" && <SnakeGame />}
      {game === "signal" && <SignalTap />}
      {game === "mines" && <Minesweep />}
    </div>
  );
}
