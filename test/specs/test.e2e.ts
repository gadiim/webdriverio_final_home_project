import { expect } from '@wdio/globals';

describe('GitHub Functional Tests', () => {
    xit(' | TC001 | Verify Sign Up Process ', async () => {
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
    it(' | TC002 | Verify Enterprise Trial ', async () => {
        // - Перейти на головну сторінку GitHub.
        await browser.url('https://github.com/');
        // - Прокрутити вниз до “Over 100 million developers call GitHub home”.
        await $('//*[text()="Over 100 million developers call GitHub home"]').scrollIntoView();
        await browser.pause(1000);
        // - Перевірити, чи видима кнопка “Start a free enterprise trial”.
        const trialButton = $('a[href="/organizations/enterprise_plan?ref_cta=Start+a+free+enterprise+trial&ref_loc=Home+campaign+footer&ref_page=%2F"]');
        expect (trialButton).toBeDisplayed();
        if (await trialButton.isDisplayed()) {
            console.log('Start a free enterprise trial button is visible');
        }
        else {
            console.log('Start a free enterprise trial button is not visible');
        };
        // - Перейти за посиланням “Start a free enterprise trial”.
        await trialButton.click();
        // - Перевірити, чи існує заголовний текст “Pick your trial plan”.
        const trialHeader = $('/html/body/div[1]/div[4]/main/div/div[1]/h1');
        expect(trialHeader).toHaveValue("Pick your trial plan");
        console.log('trial plan header / searched text is : ' + await trialHeader.getText());
        if (await trialHeader.isDisplayed()) {
            console.log('Pick your trial plan header is visible');
        }
        else {
            console.log('Pick your trial plan header is not visible');
        };
        // - Перейти за посиланням “Enterprise Cloud”.
        await $('a[href="/enterprise/trial/start?ref_cta=Enterprise+Cloud&ref_loc=choose_an_enterprise_plan&ref_page=%2Forganizations%2Fenterprise_plan%3Fref_cta%3DStart%2Ba%2Bfree%2Benterprise%2Btrial%26ref_loc%3DHome%2Bcampaign%2Bfooter%26ref_page%3D%252F"]').click();
        await browser.pause(2000);
        
        await browser.saveScreenshot('./screenshots/trial_page.png');
    });
});

