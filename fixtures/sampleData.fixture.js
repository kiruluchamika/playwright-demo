import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  marks: async ({}, use) => {
    await use([78, 85, 91, 66]);
  },

  averageMark: async ({ marks }, use) => {
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    await use(total / marks.length);
  },
});

export { expect };
