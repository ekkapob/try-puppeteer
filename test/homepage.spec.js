const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  // browser = await puppeteer.launch({
  //   headless: false,
  //   // slowMo: 80,
  // });
  page = await browser.newPage();
  jest.setTimeout(30000);
});

afterAll(() => {
  browser.close();
});

describe('checkout a product without log in', () => {
  test('login form needs to display', async () => {
    await page.goto('https://www.wemall.com/', { waitUntil: 'load' });
    await page.waitForSelector('.box-group-search input');
    await page.type('.box-group-search input', 'iphone');
    await page.keyboard.press(String.fromCharCode(13));

    await page.waitForSelector('.items-list-box');
    await page.click('.items-list-box li:first-child');

    await page.waitFor(3000);
    await page.waitForSelector('form#login_user', {
      hidden: true,
    });
    await page.waitForSelector('button#btn-add-cart');
    await page.click('button#btn-add-cart');
    await page.waitForSelector('form#login_user', {
      visible: true,
    });
  });
});
