interface Tile {
  row: number;
  column: number;
}
export function createRandomTile<T extends any>(
  matrix: T[][],
  insert: (tile: Tile) => T
): T[][] {
  const tiles = matrix
    .map((row, rowIndex) =>
      row.map((tile, columnIndex) =>
        tile
          ? null
          : {
              row: rowIndex,
              column: columnIndex,
            }
      )
    )
    .flat()
    .filter((v) => v) as Tile[];
  const size = tiles.length;
  if (!size) return matrix;
  const tile = tiles[Math.floor(Math.random() * size)];

  const value = insert(tile);
  const ret = [...matrix.map((r) => [...r])];
  ret[tile.row][tile.column] = value;
  return ret;
}
