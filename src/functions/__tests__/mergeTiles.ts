import { mergeTiles } from "src/functions";

test("mergeTiles", () => {
  expect(
    mergeTiles([
      { id: "1", value: 2 },
      { id: "2", value: 2 },
      { id: "3", value: 2 },
    ])
  ).toEqual([{ id: "2", value: 4 }, { id: "3", value: 2 }, null]);
  expect(
    mergeTiles([
      { id: "1", value: 2 },
      { id: "2", value: 2 },
      { id: "3", value: 2 },
      { id: "4", value: 2 },
    ])
  ).toEqual([{ id: "2", value: 4 }, { id: "4", value: 4 }, null, null]);
});
