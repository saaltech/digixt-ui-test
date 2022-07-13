class HomePage {
    constructor(page) {
        this.page=page;
        this.userName = this.page.locator('#username');
        this.miniOCapacityLbl=this.page.locator('div.minio-capacity-allocation-comparison > div');
        this.airflowTaskStatsLbl=this.page.locator('.airflow-pipeline-stats-header > div').nth(0);
        this.airflowPipelineErrorLbl=this.page.locator("div[class='heading']");
    }

    async getErrorMessageLocator(){
        return await this.errorMessage;
    }
}
module.exports = { HomePage }
