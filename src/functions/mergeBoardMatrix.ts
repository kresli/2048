import produce from "immer";
import { Board, MoveAction, Row, flipMatrix, mergeTiles } from "src/functions";

function mergeMatrix(matrix: Row[], reverse = false): Row[] {
  return matrix.map((row) =>
    reverse ? mergeTiles(row.reverse()).reverse() : mergeTiles(row)
  );
}
export function mergeBoardMatrix(board: Board, action: MoveAction) {
  switch (action) {
    case MoveAction.LEFT: {
      return produce(board, (draft) => {
        draft.rows = mergeMatrix(draft.rows);
      });
    }
    case MoveAction.RGIHT: {
      return produce(board, (draft) => {
        draft.rows = mergeMatrix(draft.rows, true);
      });
    }
    case MoveAction.UP: {
      return produce(board, (draft) => {
        draft.rows = flipMatrix(mergeMatrix(flipMatrix(draft.rows)));
      });
    }
    case MoveAction.DOWN: {
      return produce(board, (draft) => {
        draft.rows = flipMatrix(mergeMatrix(flipMatrix(draft.rows), true));
      });
    }
  }
  throw new Error(`"${action}" action not implemented`);
}
