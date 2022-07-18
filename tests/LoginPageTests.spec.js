const { test, expect } = require('@playwright/test');
const constants = require('../src/config/Constants');
const { LoginPage } = require('../src/pageObjects/LoginPage');
const { CommonFunc } = require('../src/utils/CommonFunc');

test.describe('Login Page Test Cases', () => {

    let comFun = null;
    let loginPage = null;

    test.beforeEach(async ({ page }) => {
        comFun = new CommonFunc(page);
        loginPage = new LoginPage(page);
        console.log("===========>>>>>>>>Opening Fresh Browser window for New Test===========>>>>>>>>");
        comFun.openNewPageWithBaseUrl();
    });

    test('Should login Successfully', async ({page}) => {
        loginPage.digixtLogin("admin", "admin")
        await page.waitForLoadState('networkidle');
        await expect(loginPage.homePageSuccess).toContainText(constants.HOME_PAGE_MESSAGE)
        console.log("===========>>>>>>>>Login Done Succesfully ========>>>");
    });

    test('Should give the error message when not filling usernmae', async ({ page }) => {
        loginPage.digixtLogin("", "admin")
        await page.waitForLoadState('networkidle');
        console.log("===========>>>>>>>>Error message found is ========>>> " + await loginPage.getErrorMessageFromLogin());
        await expect(loginPage.errorMessage).toHaveText(constants.LOGIN_ERROR_MESSAGE);
    });

    test('Should give the error message when not filling password', async ({ page }) => {
        loginPage.digixtLogin("admin", "")
        await page.waitForLoadState('networkidle');
        console.log("===========>>>>>>>>Error message found is ========>>>   " + await loginPage.getErrorMessageFromLogin());
        await expect(loginPage.errorMessage).toHaveText(constants.LOGIN_ERROR_MESSAGE);
    });

    test('Should give the error message when filling incorrect login details', async ({ page }) => {
        loginPage.digixtLogin("admina", "admina")
        await page.waitForLoadState('networkidle');
        console.log("===========>>>>>>>>Error message found is ========>>>   " + await loginPage.getErrorMessageFromLogin());
        await expect(loginPage.errorMessage).toHaveText(constants.LOGIN_ERROR_MESSAGE);
    });

    test.afterEach(async() =>{
        comFun = null;
        loginPage = null;
    })

})