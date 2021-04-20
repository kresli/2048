import {
  Board,
  createBoard,
  MoveAction,
  mergeBoardMatrix,
} from "src/functions";

test("right merge", () => {
  const snapshot: Board = {
    rows: [
      [
        { id: "1", value: 2 },
        { id: "2", value: 2 },
        { id: "3", value: 2 },
        null,
      ],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  };
  let board = createBoard(4, snapshot);
  board = mergeBoardMatrix(board, MoveAction.RGIHT);
  expect(board.rows).toEqual([
    [null, null, { id: "1", value: 2 }, { id: "2", value: 4 }],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ]);
});

test("left merge", () => {
  const snapshot: Board = {
    rows: [
      [null, { id: "1", value: 2 }, { id: "2", value: 2 }],
      [null, null, null],
      [null, null, null],
    ],
  };
  let board = createBoard(3, snapshot);
  board = mergeBoardMatrix(board, MoveAction.LEFT);
  expect(board.rows).toEqual([
    [{ id: "2", value: 4 }, null, null],
    [null, null, null],
    [null, null, null],
  ]);
});
test("up merge", () => {
  const snapshot: Board = {
    rows: [
      [null, { id: "1", value: 2 }, null],
      [null, { id: "2", value: 2 }, null],
      [null, null, null],
    ],
  };
  let board = createBoard(3, snapshot);
  board = mergeBoardMatrix(board, MoveAction.UP);
  expect(board.rows).toEqual([
    [null, { id: "2", value: 4 }, null],
    [null, null, null],
    [null, null, null],
  ]);
});
test("down merge", () => {
  const snapshot: Board = {
    rows: [
      [null, { id: "1", value: 2 }, null],
      [null, { id: "2", value: 2 }, null],
      [null, null, null],
    ],
  };
  let board = createBoard(3, snapshot);
  board = mergeBoardMatrix(board, MoveAction.DOWN);
  expect(board.rows).toEqual([
    [null, null, null],
    [null, null, null],
    [null, { id: "1", value: 4 }, null],
  ]);
});
