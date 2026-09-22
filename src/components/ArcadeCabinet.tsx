import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, RotateCcw } from "lucide-react";
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

const questions = [
  {
    prompt: "Which project turns supplier invoices into analytics?",
    answers: ["Socio", "Contrast / TIVTAV", "Zuka Safari"],
    correct: 1,
  },
  {
    prompt: "Which build helps people move through Nairobi?",
    answers: ["Repsafe", "Blue Box AI", "Zuka Safari"],
    correct: 2,
  },
  {
    prompt: "Which project makes camera events queryable?",
    answers: ["Blue Box AI", "FarmBetter IVR", "Payola"],
    correct: 0,
  },
];

function BuildQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const question = questions[index];
  const complete = index === questions.length;

  function choose(choice: number) {
    if (answer !== null) return;
    setAnswer(choice);
    if (choice === question.correct) setScore((value) => value + 1);
  }

  function next() {
    setIndex((value) => value + 1);
    setAnswer(null);
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setAnswer(null);
  }

  return (
    <div className="arcade mini-game quiz-game">
      <div className="arcade-bar">
        <span>BUILD QUIZ / 03</span>
        <span className="muted">{complete ? "COMPLETE" : `QUESTION ${index + 1} / ${questions.length}`}</span>
      </div>
      <div className="quiz-panel">
        {complete ? (
          <>
            <p className="quiz-prompt">RESULT: {score} / {questions.length}</p>
            <p className="muted">{score === questions.length ? "Archive access granted. You know the work." : "A quick tour of the projects might help."}</p>
          </>
        ) : (
          <>
            <p className="quiz-prompt">{question.prompt}</p>
            <div className="quiz-options">
              {question.answers.map((item, optionIndex) => (
                <button
                  key={item}
                  onClick={() => choose(optionIndex)}
                  className={
                    answer === null
                      ? ""
                      : optionIndex === question.correct
                        ? "correct"
                        : optionIndex === answer
                          ? "incorrect"
                          : ""
                  }
                  disabled={answer !== null}
                >
                  <span>[{String(optionIndex + 1).padStart(2, "0")}]</span> {item}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="game-controls compact-controls">
        {complete ? (
          <button className="solid-link" onClick={reset}>
            <RotateCcw size={16} /> Run again
          </button>
        ) : answer !== null ? (
          <button className="solid-link" onClick={next}>
            {index === questions.length - 1 ? "See result" : "Next question"}
          </button>
        ) : (
          <span>SELECT ONE ANSWER</span>
        )}
        <span>SCORE {String(score).padStart(2, "0")}</span>
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
      {game === "quiz" && <BuildQuiz />}
    </div>
  );
}
