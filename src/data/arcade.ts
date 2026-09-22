export const arcadeGames = ["snake", "signal", "quiz"] as const;
export type ArcadeGame = (typeof arcadeGames)[number];

export const gameLabels: Record<ArcadeGame, string> = {
  snake: "Snake",
  signal: "Signal Tap",
  quiz: "Build Quiz",
};
