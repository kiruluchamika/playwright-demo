import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPage = path.resolve(__dirname, "../pages/products.html");

test.describe("Feature: Product List Display", () => {
  test("Scenario: User views the product list successfully", async ({
    page,
  }) => {
    await test.step("Given the API returns a list of products", async () => {
      await page.route("**/api/products", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            products: [
              { name: "Laptop", price: 350000 },
              { name: "Phone", price: 150000 },
              { name: "Tablet", price: 200000 },
            ],
          }),
        });
      });
    });

    await test.step("When the user opens the products page", async () => {
      await page.goto(`file://${productsPage}`);
    });

    await test.step("Then 3 products should be displayed", async () => {
      await expect(page.locator(".product")).toHaveCount(3);
    });

    await test.step("And the first product should be Laptop", async () => {
      await expect(page.locator(".product .name").first()).toHaveText("Laptop");
    });

    await test.step("And each product should show a price", async () => {
      const prices = page.locator(".product .price");
      await expect(prices).toHaveCount(3);
      for (let i = 0; i < 3; i++) {
        await expect(prices.nth(i)).toBeVisible();
      }
    });
  });

  test("Scenario: API fails and user sees an error message", async ({
    page,
  }) => {
    await test.step("Given the API returns a server error", async () => {
      await page.route("**/api/products", async (route) => {
        await route.fulfill({ status: 500 });
      });
    });

    await test.step("When the user opens the products page", async () => {
      await page.goto(`file://${productsPage}`);
    });

    await test.step("Then an error message should be displayed", async () => {
      await expect(page.locator("#products")).toHaveText(
        "Failed to load products.",
      );
    });
  });

  test("Scenario: Products are displayed in correct order", async ({
    page,
  }) => {
    await test.step("Given the API returns products in a specific order", async () => {
      await page.route("**/api/products", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            products: [
              { name: "Monitor", price: 120000 },
              { name: "Keyboard", price: 15000 },
            ],
          }),
        });
      });
    });

    await test.step("When the user opens the products page", async () => {
      await page.goto(`file://${productsPage}`);
    });

    await test.step("Then the products should appear in the given order", async () => {
      const names = page.locator(".product .name");
      await expect(names.nth(0)).toHaveText("Monitor");
      await expect(names.nth(1)).toHaveText("Keyboard");
    });

    await test.step("And prices should be formatted with LKR currency", async () => {
      await expect(page.locator(".product .price").first()).toContainText(
        "LKR",
      );
    });
  });
});
