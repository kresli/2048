import { createContext } from "react";
import { Board } from "src/functions";

export const BoardContext = createContext<[Board, (board: Board) => void]>([
  {
    size: 0,
    rows: [],
  },
  () => {},
]);
