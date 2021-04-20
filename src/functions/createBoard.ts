import { TupleOf } from "src/helpers";

export type Tile = { id: string; value: number } | null;
export type Row = Tile[];

export interface Board<N extends number = any> {
  size?: number;
  rows: Matrix<N, N>;
}

export type Matrix<
  Rows extends number = number,
  Columns extends number = number
> = TupleOf<TupleOf<Tile, Columns>, Rows>;

export enum MoveAction {
  LEFT = "LEFT",
  RGIHT = "RGIHT",
  UP = "UP",
  DOWN = "DOWN",
}

export const createBoard = <N extends number>(
  length: N,
  snapshot?: Board<N>
): Board<N> => ({
  size: length,
  rows: Array.from({ length }).map((_, row) =>
    Array.from({ length }).map(
      (_, column) => snapshot?.rows[row][column] ?? null
    )
  ) as Matrix<N, N>,
});
