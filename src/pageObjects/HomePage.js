class HomePage {
    constructor(page) {
        this.page=page;
        this.userName = this.page.locator('#username');
        this.miniOCapacityLbl=this.page.locator('div.minio-capacity-allocation-comparison > div');
        this.airflowTaskStatsLbl=this.page.locator('.airflow-pipeline-stats-header > div').nth(0);
        this.airflowPipelineErrorLbl=this.page.locator("div[class='heading']");
        this.componentCards=this.page.locator('div.cardName');
    }

    async clickOnComponentByComponetName(componentName){
        this.page.locator('.tab', { hasText: componentName }).click();
    }
}
module.exports = { HomePage }
