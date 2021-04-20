import { Row, Tile } from "src/functions";

function arrMove(arr: any[], from: number, to: number) {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
}

function arrReplace(arr: any[], index: number, value: any) {
  arr.splice(index, 1, value);
}

function findNextTile(
  tiles: Row,
  currentIndex: number
): { tile: Tile; index: number } | null {
  const tile = tiles.slice(currentIndex + 1, tiles.length).find((tile) => tile);
  if (!tile) return null;
  return { tile, index: tiles.indexOf(tile)! };
}
export function mergeTiles(tiles: Row): Row {
  return tiles.reduce((data, tile, i) => {
    if (!tile) {
      const next = findNextTile(data, i);
      if (!next) return data;
      arrMove(data, next.index, i);
      tile = next.tile;
    }
    const next = findNextTile(data, i);
    if (!next?.tile) return data;
    if (tile?.value === next.tile.value) {
      arrReplace(data, next.index, null);
      data[i] = next.tile;
      next.tile.value = next.tile.value * 2;
    }
    return data;
  }, tiles);
}
