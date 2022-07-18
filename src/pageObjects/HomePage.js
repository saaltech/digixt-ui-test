class HomePage {
    constructor(page) {
        this.page = page;
        this.userName = this.page.locator('#username');
        this.miniOCapacityLbl = this.page.locator('div.minio-capacity-allocation-comparison > div');
        this.airflowTaskStatsLbl = this.page.locator('.airflow-pipeline-stats-header > div').nth(0);
        this.airflowPipelineErrorLbl = this.page.locator("div[class='heading']");
        this.componentCards = this.page.locator('.cardName');
        this.cardLocator = ".cardName";
        this.nifiLogo = '#nifi-logo';
        this.sparkLogDirectory = ".ul > li > strong";
        this.sparkInCompleteApps = "a[href*='showIncomplete']";
        this.kafkaHome = 'div h1';
        this.headerTitleForDBzium = ".header-title";

    }

    async getUncompleteSparkJobLocator(page){
        return page.locator(this.sparkInCompleteApps);
    }

    async clickOnComponentByComponetName(componentName) {
        this.page.locator('.tab', { hasText: componentName }).click();
    }

    async clickOnComponetName(componentName) {
        this.page.locator('.cardName', { hasText: componentName }).click();
    }

    async getTotalComponents() {
        const elements = this.componentCards;
        return elements;
    }
}
module.exports = { HomePage }
