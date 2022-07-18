const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../src/pageObjects/LoginPage');
const { HomePage } = require('../src/pageObjects/HomePage');
const { CommonFunc } = require('../src/utils/ComFunc');
const creds = require('../src/config/DevCredentials.json');
const constants = require('../src/config/Constants')

let comFun = null;
let loginPage = null;
let home = null;
let context = null;
let page = null;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    comFun = new CommonFunc(page);
    loginPage = new LoginPage(page);
    home = new HomePage(page);
    console.log("===========>>>>>>>>Opening Fresh Browser window for New Test===========>>>>>>>>");
    comFun.openNewPageWithBaseUrl();
    loginPage.digixtLogin(creds.adminUsername, creds.adminPassword);
    await page.waitForLoadState('networkidle');
    await expect(loginPage.homePageSuccess).toContainText(constants.HOME_PAGE_MESSAGE);
    console.log("===========>>>>>>>>Login Done Succesfully ========>>>");
})

test.describe('Verify Naviagation Menu Access', () => {
    test('Admin should be able to Access Below Components', async () => {
      
    })
})
