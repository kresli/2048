import { createBoard } from "src/functions";

test("size", () => {
  expect(createBoard(4)).toEqual({
    size: 4,
    rows: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  });
});
test("with snapshot", () => {
  expect(
    createBoard(3, {
      rows: [
        [null, { id: "1", value: 3 }, null],
        [null, null, null],
        [null, null, { id: "2", value: 4 }],
      ],
    })
  ).toEqual({
    size: 3,
    rows: [
      [null, { id: "1", value: 3 }, null],
      [null, null, null],
      [null, null, { id: "2", value: 4 }],
    ],
  });
});
