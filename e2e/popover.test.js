import puppeteer from "puppeteer";

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  });

  test("popover page is open", async () => {
    await page.goto("http://localhost:9000");
    const isBodyVisible = await page.evaluate(() => {
      const body = document.querySelector("body");
      return body ? body.checkVisibility() : false;
    });
    expect(isBodyVisible).toBe(true);
  });

  test("popover hidden as default", async () => {
    const isHidden = await page.evaluate((selector) => {
      const popover = document.querySelector(selector);
      if (!popover) return true;
      const computedStyle = window.getComputedStyle(popover);
      return (
        computedStyle.visibility === "hidden" || computedStyle.opacity === "0"
      );
    }, "#myPopover");
    expect(isHidden).toBe(true);
  });

  test("popover appear when click button", async () => {
    await page.goto("http://localhost:9000");
    await page.click("#button");
    const popover = await page.$("#myPopover");
    const isShowed = await popover.evaluate((el) =>
      el.classList.contains("show"),
    );
    expect(isShowed).toBe(true);
  });

  test("check content popover", async () => {
    await page.goto("http://localhost:9000");
    await page.click("#button");
    await page.$("#myPopover");
    const popoverText = await page.$eval(
      ".popover-body",
      (el) => el.textContent,
    );
    const expectedText =
      "And here's some amazing content. It's very engaging. Right?";
    expect(popoverText).toContain(expectedText);
  });

  afterEach(async () => {
    await browser.close();
  });
});
