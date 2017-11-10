module.exports = {
    'Test Home': function(browser) {
        browser
            .url('http://localhost:3090/')
            .waitForElementVisible('body', 1000)
            .assert.title('Title CMS')
            .end();
    },
    'Test Contact': function(browser) {
        browser.url('http://localhost:3090/contact');
        browser.expect.element("h1").text.to.equal("Contact us");
        browser.setValue("#name", "Test value")
            .setValue("#email", "test@gmail.com")
            .setValue("#message", "test message");
        browser.click('button');
        browser.pause(1000);
        browser.end();
    }
};