const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../src/pageObjects/LoginPage');
const { HomePage } = require('../src/pageObjects/HomePage');
const { CommonFunc } = require('../src/utils/CommonFunc');
const creds = require('../src/config/DevCredentials.json');
const constants = require('../src/config/Constants')

let commonFun = null;
let loginPage = null;
let home = null;
let context = null;
let page = null;

test.describe('Dasboard Page Test Cases for Admin Role', () => {
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        commonFun = new CommonFunc(page);
        loginPage = new LoginPage(page);
        home = new HomePage(page);
        console.log("===========>>>>>>>>Opening Fresh Browser window for New Test===========>>>>>>>>");
        commonFun.openNewPageWithBaseUrl();
        loginPage.digixtLogin(creds.adminUsername, creds.adminPassword);
        await page.waitForLoadState('networkidle');
        await expect(loginPage.homePageSuccess).toContainText(constants.HOME_PAGE_MESSAGE);
        console.log("===========>>>>>>>>Login Done Succesfully ========>>>");
    })
    test('Should visible the minio capacity card', async () => {
        await expect(home.miniOCapacityLbl).toContainText(constants.MINIO_CAPACITY);
        console.log("===========>>>>>>>>Minio Capacity Card is Displaying Succesfully ========>>>");
    });

    test('Should visible the Airflow Task stats card', async () => {
        await expect(home.airflowTaskStatsLbl).toContainText(constants.AIRFLOW_TASK_STATUS);
        console.log("===========>>>>>>>>Airflow Task Stats Card is Displaying Succesfully ========>>>");
    });

    test('Should visible the Airflow pipeline errors card', async () => {
        await expect(home.airflowPipelineErrorLbl).toContainText(constants.AIRFLOW_PIPELINE_ERROR);
        console.log("===========>>>>>>>>Airflow Pipeline Erros Card is Displaying Succesfully ========>>>");
    });
})


    // test('Switch to Tab Test Case', async ({ browser }) => {
    //     const context = await browser.newContext();
    //     const page = await context.newPage();

    //     const commonFun = new CommonFunc(page);
    //     const loginPage = new LoginPage(page);
    //     console.log("===========>>>>>>>>Opening Fresh Browser window for New Test===========>>>>>>>>");
    //     commonFun.openNewPageWithBaseUrl();
    //     loginPage.digixtLogin(creds.adminUsername, creds.adminPassword)
    //     await page.waitForLoadState('networkidle');
    //     await expect(loginPage.homePageSuccess).toContainText(constatns.HOME_PAGE_MESSAGE)
    //     console.log("===========>>>>>>>>Login Done Succesfully ========>>>");

    //     const nifi = page.locator("//div[text()='Nifi']");
    //     const [newPage] = await Promise.all([
    //         context.waitForEvent('page'),
    //         nifi.click()
    //     ])
    // })




