const { expect } = require('@playwright/test');
class CommonFunc {
    constructor(page) {
        this.page = page;
    }
    async openNewPageWithBaseUrl() {
        await this.page.goto('/admin-ui/');
        // await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    async setWindowViewPort(page) {
        await page.setViewportSize({ width: 1920, height: 1080 });
    }

    async waitForNetworkCallsToFinish() {
        await this.page.waitForLoadState('networkidle');
    }

    async getElemenstCount(selector) {
        return this.page.locator(selector).count();
    }

    async isElementVisible(newPage, element) {
        return newPage.isVisible(element);
    }

    async getElementText(newPage, element) {
        const text = null;
        newPage.waitForSelector(element);
        text = await newPage.locator(element).textContent();
        console.log("The requested Text is ====>> " + text);
        return text;
    }

    async getnThElementText(newPage, element, index) {
        await Promise.all([
            newPage.waitForSelector(element)
        ]);
        const text = await newPage.locator(element).nth(index).textContent();
        console.log("The requested Text is ====>> " + text);
        return text;
    }
}
module.exports = { CommonFunc }