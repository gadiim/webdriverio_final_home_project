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

        await browser.saveScreenshot('./screenshots/tc001_signup_page.png');
    });
    xit(' | TC002 | Verify Enterprise Trial ', async () => {
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
        
        await browser.saveScreenshot('./screenshots/tc002_trial_page.png');
    });
    xit(' | TC003 | Verify Newsletter Subscription ', async () => {
        const subscribeBtn = $('a[href="https://resources.github.com/newsletter/"]')
        // - Перейти на головну сторінку GitHub.
        await browser.url('https://github.com/');
        // - Прокрутити вниз до “Subscribe”.
        await (subscribeBtn).scrollIntoView();
        // - Перевірити, чи кнопка “Subscribe” є клікабельною.
        console.log('Is subscribe clickable: ' + await subscribeBtn.isClickable());
        expect(subscribeBtn).toBeClickable();
        // - Натиснути кнопку “Subscribe”.
        await subscribeBtn.click();
        // - Перевірити, чи користувач знаходиться на іншому домені (https://resources.github.com/newsletter/).
        await browser.switchWindow('https://resources.github.com/newsletter/');
        // - Перевірити, чи існує заголовний текст “Subscribe to our developer newsletter”.
        const newsletterTitleHeader = $('#hero-section-brand-heading');
        expect(newsletterTitleHeader).toHaveValue("Subscribe to our developer newsletter");
        console.log('Title header / searched text is : ' + await newsletterTitleHeader.getText());
        if (await newsletterTitleHeader.isDisplayed()) {
            console.log('Title header is visible');
        }
        else {
            console.log('Title header is not visible');
        };
        // - Ввести email (example@mail.com) у поле “Work Email *”.
        const newsletterEmailInput = $('input[type="email"]');
        await newsletterEmailInput.setValue('new_example@mail.com');
        // - Вибрати країну у полі “Country *”.
        const newsletterCountrySelect = $('select[id="country"]');
        // await newsletterCountrySelect.selectByVisibleText('Ukraine');
        await newsletterCountrySelect.selectByAttribute('value', 'UA');
        // - Відмітити чекбокс.
        const newsletterCheckbox = $('input[type="checkbox"]');
        await newsletterCheckbox.click();
        // - Натиснути кнопку “Subscribe”.
        await $('#form > form > div > button > span.Primer_Brand__Button-module__Button__text___Z3ocU > span').click();
        // - Перевірити, чи існує заголовний текст “Thanks for subscribing!”.
        const thankYouHeader  = $('#hero-section-brand-heading#hero-section-brand-heading');
        expect(thankYouHeader ).toHaveValue("Thanks for subscribing!");
        console.log('Title header / searched text is : ' + await thankYouHeader .getText());
        if (await thankYouHeader.isDisplayed()) {
            console.log('ThankYou header is visible');
        }
        else {
            console.log('ThankYou header is not visible');
        };

        await browser.saveScreenshot('./screenshots/tc003_confirmation_page.png');
    });
    xit(' | TC004 | Verify Search Functionality ', async () => {
        // - Перейти на головну сторінку GitHub.
        await browser.url('https://github.com/');
        // - Обрати 'Search'.
        const searchInput = $('body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.js-header-menu.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.top-0 > div > div > qbsearch-input > div.search-input-container.search-with-dialog.position-relative.d-flex.flex-row.flex-items-center.mr-4.rounded > button');
        await searchInput.click();
        // - Ввести “act” у поле пошуку.
        await $('#query-builder-test').setValue('act');
        await browser.pause(500);
        await browser.keys('Enter');
        await browser.pause(2000);
        // - Перевірити, чи є “act” у результатах пошуку.
        const searchResults = $('//*[contains(text(), "act")]');
        if (await searchResults) {
            console.log('Search results is visible');
        }
        else {
            console.log('Search results is not visible');
        };

        await browser.saveScreenshot('./screenshots/tc004_search_page.png');
    });
    it(' | TC005 | Verify Pricing Page ', async () => {
        // - Перейти на головну сторінку GitHub.
        await browser.url('https://github.com/');
        // - Перейти за посиланням “Pricing”.
        await $('a[href="/pricing"]').click();
        await browser.pause(2000);
        // - Перевірити, чи існує заголовний текст “Get the complete developer platform.”
        const pricingHeader = $('.h2-mktg');
        expect(pricingHeader).toHaveText("Get the complete developer platform.");
        console.log('pricing header / searched text is : ' + await pricingHeader.getText());
        if (await pricingHeader.isDisplayed()) {
            console.log('Pricing pricing header is visible');
        }
        else {
            console.log('Pricing header is not visible');
        };
        // - Прокрутити до “Compare all features”.
        await $('a[href="#compare-features"]').scrollIntoView();
        // - Перевірити, чи існує заголовний текст “Compare features”.
        const compareHeader = $('.h1');
        expect(compareHeader).toHaveText("Compare features");
        console.log('pricing header / searched text is : ' + await compareHeader.getText());
        if (await compareHeader.isDisplayed()) {
            console.log('Compare features header is visible');
        }
        else {
            console.log('Compare features header is not visible');
        };

        await browser.saveScreenshot('./screenshots/tc005_pricing_page.png');
    });
});

