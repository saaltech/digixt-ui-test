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

test.describe('Dasboard Page Test Cases with Admin Role', () => {
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

    test('Should visible the DigiXT Connect Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Connect);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt Connect Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Nifi')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Spark");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Kafka");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Debezium");
    });
    test('Should visible the DigiXT Construct Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Construct);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt Construct Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Airflow')
    });
    test('Should visible the DigiXT Contain Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Contain);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt Contain Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('MinIO')
        await expect.soft(home.componentCards.nth(1)).toHaveText("OpenSearch");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Pinot");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Arrow");
    });
    test('Should visible the DigiXT Consume Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Consume);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt Consume Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Trino++')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Superset");
    });
    test('Should visible the DigiXT ML Labs Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_ML_LABS);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt ML Labs Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Jupyterhub')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Kubeflow");
    });
    test('Should visible the DigiXT Marketplace Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_MarketPlace);
        const count = await home.componentCards.count();
        console.log("===========>>>>>>>>Total Component for Digixt Marketplace Layer ========>>>" + count);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Arabic Dialect Detection')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Arabic Document Search Engine");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Arabic Named Entity Recognition");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Cognitive Search");
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




