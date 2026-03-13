import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("Mock API example", async ({ page }) => {
  await page.route("**/api/services", async (route) => {
    const mockResponse = {
      services: [
        { name: "IT Support", price: 35000 },
        { name: "Cleaning Service", price: 15000 },
        { name: "Digital Marketing", price: 20000 },
        { name: "Tutoring", price: 5000 },
      ],
    };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });

  const filePath = path.resolve(__dirname, "../pages/services.html");
  await page.goto(`file://${filePath}`);

  await expect(page.locator(".service")).toHaveCount(4);
  await expect(page.locator(".service .name").first()).toHaveText("IT Support");
  

  await page.pause();
});
