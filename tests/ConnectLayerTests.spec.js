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

test.describe('Dasboard Page Test Cases with Admin Role for Digixt Connect Layers', () => {
    test('Admin should be able to open Nifi Component', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Connect);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            home.clickOnComponetName("Nifi"),
        ])
        await comFun.setWindowViewPort(newPage);
        const Visible = await comFun.isElementVisible(newPage, home.nifiLogo);
        await expect(Visible).toBeTruthy();
        await newPage.close();
    });
    test('Admin should be able to open Spark Component', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Connect);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            home.clickOnComponetName("Spark"),
        ])
        await comFun.setWindowViewPort(newPage);
        await expect(newPage.locator(home.sparkInCompleteApps)).toContainText('Show incomplete applications');
        await newPage.close();

    });
    test('Admin should be able to open Kafak Component', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Connect);
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            home.clickOnComponetName("Kafka"),
        ])
        await comFun.setWindowViewPort(newPage);
        await expect(newPage.locator(home.kafkaHome)).toContainText('Dashboard');
        await newPage.close();
    });
    test('Admin should be able to open Debezium Component', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Connect);
        home.clickOnComponetName("Debezium");
        await expect(page.locator(home.headerTitleForDBzium).nth(0)).toContainText('Connectors');
    });
})