const { test, expect } = require('@playwright/test');

test('Should give the error message when not filling usernmae', async ({ page }) => {
    await page.goto('/admin-ui/');
    console.log('Title on Digixt page is ' + await page.title());
    await expect(page).toHaveTitle("DIGIXT");
    await page.locator('#username').type("");
    await page.locator('#password').type("admin");
    await page.locator("input[name='login']").click();
    console.log(await page.locator('#input-error').textContent());
    await expect(page.locator('#input-error')).toContainText('Invalid username or password');
});

test('Should give the error message when not filling password', async ({ page }) => {
    await page.goto('/admin-ui/');
    console.log('Title on Digixt page is ' + await page.title());
    await expect(page).toHaveTitle("DIGIXT");
    await page.locator('#username').type("admin");
    await page.locator('#password').type("");
    await page.locator("input[name='login']").click();
    console.log(await page.locator('#input-error').textContent());
    await expect(page.locator('#input-error')).toContainText('Invalid username or password');
});

test('Should give the error message when filling incorrect login details', async ({ page }) => {
    await page.goto('/admin-ui/');
    console.log('Title on Digixt page is ' + await page.title());
    await expect(page).toHaveTitle("DIGIXT");
    await page.locator('#username').type("admina");
    await page.locator('#password').type("admina");
    await page.locator("input[name='login']").click();
    console.log(await page.locator('#input-error').textContent());
    await expect(page.locator('#input-error')).toContainText('Invalid username or password');
});


test('Should login Successfully', async ({ page }) => {
    await page.goto('/admin-ui/');
    console.log('Title on Digixt page is ' + await page.title());
    await expect(page).toHaveTitle("DIGIXT");
    await page.locator('#username').type("admin")
    console.log(await page.locator('#username').textContent)
    await page.locator('#password').type("admin")
    await page.locator("input[name='login']").click()
    await expect(page.locator("div.title")).toContainText('Welcome')
});