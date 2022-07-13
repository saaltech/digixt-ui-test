class CommonFunc {
    constructor(page) {
        this.page = page;
    }
    async openNewPageWithBaseUrl() {
        await this.page.goto('/admin-ui/');
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
    async waitForNetworkCallsToFinish() {
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { CommonFunc }