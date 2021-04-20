import { createRandomTile } from "src/functions";

test("on empty spot", () => {
  jest.spyOn(Math, "random").mockReturnValue(0.6);
  let value: { column: number; row: number };
  const matrix = createRandomTile(
    [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    ({ row, column }) => {
      value = { row, column };
      return value;
    }
  );
  expect(value!.row).toEqual(1);
  expect(value!.column).toEqual(2);
  expect(matrix).toEqual([
    [null, null, null],
    [null, null, { row: 1, column: 2 }],
    [null, null, null],
  ]);
});

test("on next spot if occupied", () => {
  jest.spyOn(Math, "random").mockReturnValue(0.7);
  let value: { column: number; row: number };
  const matrix = createRandomTile(
    [
      [null, null, null],
      [null, null, { row: 1, column: 2 }],
      [null, null, null],
    ],
    ({ row, column }) => {
      value = { row, column };
      return value;
    }
  );
  expect(value!.row).toEqual(2);
  expect(value!.column).toEqual(0);
  expect(matrix).toEqual([
    [null, null, null],
    [null, null, { row: 1, column: 2 }],
    [{ row: 2, column: 0 }, null, null],
  ]);
});
