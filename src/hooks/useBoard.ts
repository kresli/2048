import { useContext, useMemo } from "react";
import {
  Board,
  createRandomTile,
  mergeBoardMatrix,
  MoveAction,
  Tile,
} from "src/functions";
import { BoardContext } from "src/hooks";
import { v4 } from "uuid";

export type Card = {
  id: string;
  row: number;
  column: number;
  value: number;
  index: number;
};

function createCard({
  tile,
  row,
  column,
  index,
}: {
  tile: Tile;
  row: number;
  column: number;
  index: number;
}): Card | null {
  return tile ? { id: tile.id, value: tile.value, row, column, index } : null;
}

function generateBoardChange(board: Board, action: MoveAction) {
  let newBoard = mergeBoardMatrix(board, action);
  const changed = newBoard.rows.some((row, rowIndex) =>
    row.some((tile, columnIndex) => board.rows[rowIndex][columnIndex] !== tile)
  );
  if (changed) {
    newBoard = {
      ...newBoard,
      rows: createRandomTile(newBoard.rows, ({ row, column }) => ({
        id: v4(),
        row,
        column,
        value: 2,
      })),
    };
  }
  return changed ? newBoard : null;
}

export function useBoard() {
  const [board, setBoard] = useContext(BoardContext);
  function moveRight() {
    const newBoard = generateBoardChange(board, MoveAction.RGIHT);
    if (!newBoard) return;
    setBoard(newBoard);
  }
  function moveLeft() {
    const newBoard = generateBoardChange(board, MoveAction.LEFT);
    if (!newBoard) return;
    setBoard(newBoard);
  }
  function moveUp() {
    const newBoard = generateBoardChange(board, MoveAction.UP);
    if (!newBoard) return;
    setBoard(newBoard);
  }
  function moveDown() {
    const newBoard = generateBoardChange(board, MoveAction.DOWN);
    if (!newBoard) return;
    setBoard(newBoard);
  }

  const size = useMemo(() => board.size || 0, [board.size]);
  const tiles = useMemo(
    () =>
      board.rows
        .map((tiles, row) => tiles.map((_, column) => ({ row, column })))
        .flat(),
    [board.rows]
  );
  const cards = useMemo(
    () =>
      board.rows
        .reduce(
          (cards: (Card | null)[], tiles, row) => [
            ...cards,
            ...tiles.map((tile, column) =>
              createCard({ tile, row, column, index: row * size + column })
            ),
          ],
          []
        )
        .filter((card) => card) as Card[],
    [board.rows, size]
  );
  return { tiles, size, cards, moveRight, moveLeft, moveUp, moveDown };
}
