import { expect } from '@wdio/globals'


describe('GitHub Functional Tests', () => {
    it(' | TC001 | Verify Sign Up Process ', async () => {
        //- Перейти на головну сторінку GitHub.
        await browser.url('https://github.com/');
        // - Натиснути кнопку “Sign up”.
        const signUpBtn = $('/html/body/div[1]/div[1]/header/div/div[2]/div/div/a');
        await signUpBtn.click();
        // - Дочекатись першого поля вводу.
        const emailInput = $('#email');
        await emailInput.waitForDisplayed();
        // - Перевірити, чи існує заголовний текст на полі вводу.
        const searhedLoginText = $('//*[text()="Welcome to GitHub!"]')
        expect(searhedLoginText).toHaveText("Welcome to GitHub!");
        console.log('searched text is : ' + await searhedLoginText.getText());
        // - Ввести email (new_example@mail.com).
        await emailInput.setValue('new_example@mail.com');
        // - Натиснути кнопку “Continue”. // не натискається
        await browser.pause(500);
        await browser.keys('Enter');
        await browser.pause(2000);
        // - Ввести пароль (superPas5word).
        const passwordInput = $('#password');
        await passwordInput.setValue('superPas5word');
        // - Натиснути кнопку “Continue”.
        await browser.pause(500);
        await browser.keys('Enter');
        await browser.pause(2000);
        // - Ввести ім’я користувача (superusername-droid).
        const usernameInput = $('#login');
        await usernameInput.setValue('superusername-droid');
        // - Натиснути кнопку “Continue”.
        await browser.pause(500);
        await browser.keys('Enter');
        await browser.pause(2000);
        // - Ввести підтвердження (y). - checkbox 
        const checkbox = $('#opt_in');
        await checkbox.click();
        await expect(checkbox).toBeSelected();
        // - Натиснути кнопку “Continue”.
        await browser.pause(500);
        await browser.keys('Enter');
        await browser.pause(2000);

        await browser.saveScreenshot('./screenshots/signup_page.png');
    });
});

