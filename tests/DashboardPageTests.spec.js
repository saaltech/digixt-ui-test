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

test.describe('Dasboard Page Test Cases with Admin Role', () => {
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
        await expect.soft(home.componentCards.nth(0)).toHaveText('Nifi')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Spark");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Kafka");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Debezium");
        console.log("===========>>>>>>>>Total Component for Digixt Connect Layer ========>>>" + count);
    });
    test('Should visible the DigiXT Construct Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Construct);
        const count = await home.componentCards.count();
        await expect.soft(home.componentCards.nth(0)).toHaveText('Airflow');
        console.log("===========>>>>>>>>Total Component for Digixt Construct Layer ========>>>" + count);
    });
    test('Should visible the DigiXT Contain Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Contain);
        const count = await home.componentCards.count();
        await expect.soft(home.componentCards.nth(0)).toHaveText('MinIO');
        await expect.soft(home.componentCards.nth(1)).toHaveText("OpenSearch");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Pinot");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Arrow");
        console.log("===========>>>>>>>>Total Component for Digixt Contain Layer ========>>>" + count);
    });
    test('Should visible the DigiXT Consume Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_Consume);
        const count = await home.componentCards.count();
        await expect.soft(home.componentCards.nth(0)).toHaveText('Trino++')
        await expect.soft(home.componentCards.nth(1)).toHaveText("Superset");
        console.log("===========>>>>>>>>Total Component for Digixt Consume Layer ========>>>" + count);
    });
    test('Should visible the DigiXT ML Labs Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_ML_LABS);
        const count = await home.componentCards.count();
        await expect.soft(home.componentCards.nth(0)).toHaveText('Jupyterhub');
        await expect.soft(home.componentCards.nth(1)).toHaveText("Kubeflow");
        console.log("===========>>>>>>>>Total Component for Digixt ML Labs Layer ========>>>" + count);
    });
    test('Should visible the DigiXT Marketplace Layer Components for Admin', async () => {
        await home.clickOnComponentByComponetName(constants.Digixt_MarketPlace);
        await Promise.all([
            await page.waitForSelector(home.cardLocator, { state: "visible" })
        ]);
        console.log("Element locator is  " + home.componentCards);
        await expect.soft(home.componentCards.nth(0)).toHaveText('Arabic Dialect Detection');
        await expect.soft(home.componentCards.nth(1)).toHaveText("Arabic Document Search Engine");
        await expect.soft(home.componentCards.nth(2)).toHaveText("Arabic Named Entity Recognition");
        await expect.soft(home.componentCards.nth(3)).toHaveText("Cognitive Search");
        console.log("===========>>>>>>>>Total Component for Digixt Marketplace Layer found ========>>>" + await commonFun.getElemenstCount(home.cardLocator));
    });
})




