class LoginPage {
    constructor(page) {
        this.page=page;
        this.userName = this.page.locator('#username');
        this.passWord = this.page.locator('#password');
        this.signInButton = this.page.locator("input[name='login']");
        this.errorMessage = this.page.locator('#input-error');
        this.homePageSuccess = this.page.locator("div.title");
    }

    async digixtLogin(username, password) {
        await this.userName.type(username)
        await this.passWord.type(password)
        await this.signInButton.click()
    }

    async getErrorMessageFromLogin(){
        let error = await this.errorMessage.textContent();
        return error;
    }

    async getErrorMessageLocator(){
        return await this.errorMessage;
    }
}
module.exports = { LoginPage }
