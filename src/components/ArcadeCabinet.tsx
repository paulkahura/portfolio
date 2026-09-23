import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Play, RotateCcw } from "lucide-react";
import minesweeper from "minesweeper";
import { arcadeGames, gameLabels } from "../data/arcade";
import type { ArcadeGame } from "../data/arcade";
import { SnakeGame } from "./SnakeGame";
import { projects } from "../data/portfolio";
import {
  completeGrab,
  createClawState,
  moveClaw,
  selectClawProject,
  startGrab,
} from "../games/claw";

const clawDelayMs = 620;

function PortfolioClaw() {
  const navigate = useNavigate();
  const [claw, setClaw] = useState(createClawState);
  const grabTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selectedProject = projects[claw.selectedIndex];
  const capturedProject =
    claw.capturedIndex === null ? undefined : projects[claw.capturedIndex];
  const clawLeft = `${((claw.selectedIndex % 3) + 0.5) * (100 / 3)}%`;

  useEffect(
    () => () => {
      if (grabTimer.current) clearTimeout(grabTimer.current);
    },
    [],
  );

  function move(direction: -1 | 1) {
    setClaw((state) => moveClaw(state, direction, projects.length));
  }

  function choose(index: number) {
    setClaw((state) => selectClawProject(state, index, projects.length));
  }

  function grab() {
    if (claw.phase !== "ready") return;
    setClaw((state) => startGrab(state));
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setClaw((state) => completeGrab(state));
      return;
    }
    grabTimer.current = setTimeout(() => {
      setClaw((state) => completeGrab(state));
    }, clawDelayMs);
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      grab();
    }
  }

  const status =
    claw.phase === "grabbing"
      ? `Grabbing ${selectedProject.name}.`
      : capturedProject
        ? `${capturedProject.name} captured. Open its project page when ready.`
        : `${selectedProject.name} aligned in the claw lane.`;

  return (
    <div className="arcade claw-game">
      <div className="arcade-bar">
        <span>PORTFOLIO CLAW / 04</span>
        <span className="muted">{capturedProject ? "PRIZE READY" : "SELECT A PROJECT"}</span>
      </div>
      <div
        className={`claw-stage is-${claw.phase}`}
        tabIndex={0}
        onKeyDown={handleKeys}
        aria-label="Portfolio Claw game. Select a project, then grab it."
      >
        <span className="sr-only" aria-live="polite">
          {status}
        </span>
        <div className="claw-rail" aria-hidden="true">
          <div className="claw-carriage" style={{ left: clawLeft }}>
            <span className="claw-cable" />
            <span className="claw-head">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
        <div className="claw-prize-bay" role="listbox" aria-label="Featured project prizes">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              role="option"
              aria-selected={index === claw.selectedIndex}
              className={`project-capsule ${index === claw.selectedIndex ? "is-selected" : ""} ${index === claw.capturedIndex ? "is-captured" : ""}`}
              onClick={() => choose(index)}
              disabled={claw.phase === "grabbing"}
            >
              <span>{project.name}</span>
              <small>{project.category.split(" / ")[0]}</small>
            </button>
          ))}
        </div>
        <div className="claw-chute" aria-live="polite">
          <span>PROJECT EXIT</span>
          {capturedProject ? (
            <button
              className="captured-project"
              type="button"
              onClick={() =>
                navigate(`/?section=projects&project=${capturedProject.id}`)
              }
            >
              <span>{capturedProject.name}</span>
              <ExternalLink size={14} />
            </button>
          ) : (
            <span className="chute-empty">AWAITING GRAB</span>
          )}
        </div>
      </div>
      <div className="game-controls claw-controls">
        <div className="direction-pad" aria-label="Claw movement controls">
          <button className="icon-button" type="button" onClick={() => move(-1)} title="Move claw left" aria-label="Move claw left">
            <ArrowLeft size={18} />
          </button>
          <button className="icon-button" type="button" onClick={() => move(1)} title="Move claw right" aria-label="Move claw right">
            <ArrowRight size={18} />
          </button>
        </div>
        <button className="solid-link claw-grab" type="button" onClick={grab} disabled={claw.phase !== "ready"}>
          <Play size={16} /> <span>Grab</span> <span className="claw-grab-project">{selectedProject.name}</span>
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={() => setClaw(createClawState())}
          title="Reset claw"
          aria-label="Reset claw"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

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
      {game === "claw" && <PortfolioClaw />}
    </div>
  );
}
