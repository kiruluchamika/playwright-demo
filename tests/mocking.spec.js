import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("Mock API example", async ({ page }) => {
  await page.route("**/api/products", async (route) => {
    const mockResponse = {
      products: [
        { name: "Laptop", price: 350000 },
        { name: "Phone", price: 150000 },
        { name: "Tablet", price: 200000 },
        { name: "Watch", price: 50000 },
      ],
    };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });

  const filePath = path.resolve(__dirname, "../pages/products.html");
  await page.goto(`file://${filePath}`);

  await expect(page.locator(".product")).toHaveCount(4);
  await expect(page.locator(".product .name").first()).toHaveText("Laptop");
  

  await page.pause();
});
