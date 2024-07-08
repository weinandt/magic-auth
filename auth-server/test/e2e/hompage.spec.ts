import { test, expect } from '@playwright/test';

test('Home Page Should Show Hello', async ({ page }) => {
  const response = await page.goto('https://localhost')
  if (response == null) {
    test.fail()
    return
  }

  // Assert.
  expect(response.status()).toBe(200)
  await expect(page.locator('body')).toContainText('hello')
});
