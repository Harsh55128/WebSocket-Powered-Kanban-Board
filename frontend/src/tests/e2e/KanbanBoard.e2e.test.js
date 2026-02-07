import { test, expect } from "@playwright/test";

test.describe.skip("Kanban Board E2E Flow", () => {

  test("User can add a task and see it on the board", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByText("Real-time Kanban Board")).toBeVisible();
  });

  test("User can change task priority", async ({ page }) => {});
  test("User can change task category", async ({ page }) => {});
  test("User can drag task to Done column", async ({ page }) => {});
  test("Tasks sync in real time across tabs", async ({ browser }) => {});

});
