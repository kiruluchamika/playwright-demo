import { test, expect } from "../fixtures/sampleData.fixture.js";

test("fixture provides marks and average", async ({ marks, averageMark }) => {
  expect(marks).toHaveLength(3);
  expect(averageMark).toBe(80);
});

test("fixture data can be reused", async ({ marks }) => {
  const passedCount = marks.filter((mark) => mark >= 75).length;
  expect(passedCount).toBe(3);
});
