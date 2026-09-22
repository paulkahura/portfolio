declare module "minesweeper" {
  export interface Cell {
    x: number;
    y: number;
    isMine: boolean;
    numAdjacentMines: number;
    state: number;
    flag: number;
  }

  export interface Board {
    grid(): Cell[][];
    openCell(x: number, y: number): void;
    cycleCellFlag(x: number, y: number): void;
    state(): number;
    numMines(): number;
  }

  interface Minesweeper {
    Board: new (mineArray: boolean[][]) => Board;
    generateMineArray(options: {
      rows: number;
      cols: number;
      mines: number;
    }): boolean[][];
    CellStateEnum: { CLOSED: number; OPEN: number };
    CellFlagEnum: { NONE: number; EXCLAMATION: number; QUESTION: number };
    BoardStateEnum: {
      PRISTINE: number;
      IN_PROGRESS: number;
      LOST: number;
      WON: number;
    };
  }

  const minesweeper: Minesweeper;
  export default minesweeper;
}
