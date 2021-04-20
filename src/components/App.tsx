import { useState } from "react";
import { Board, createBoard } from "src/functions";
import { v4 } from "uuid";
import { BoardContext } from "src/hooks";
import { Grid } from "src/components";
export function App() {
  const [board, setBoard] = useState(
    createBoard(4, {
      rows: [
        [null, { id: v4(), value: 2 }, null, null],
        [null, null, null, null],
        [null, null, { id: v4(), value: 2 }, null],
        [null, null, null, null],
      ],
    })
  );
  function handleSetBoard(board: Board) {
    setBoard(board);
  }
  return (
    <BoardContext.Provider value={[board, handleSetBoard]}>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Grid size={500} />
      </div>
    </BoardContext.Provider>
  );
}
