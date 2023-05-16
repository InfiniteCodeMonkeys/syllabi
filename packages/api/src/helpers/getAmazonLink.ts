import puppeteer from "puppeteer";

export default async function getAmazonLink({
  title,
  author,
  isbn,
}: {
  title: string;
  author: string;
  isbn: string;
}) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.amazon.com", { waitUntil: "load" });

  const search = await page.$("#twotabsearchtextbox");

  await search?.click({ clickCount: 1 });

  await search?.type(`${title} ${author} ${isbn}`);

  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "load" });

  const firstSearchResult = await page.waitForSelector(
    "h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2 > a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style a-text-normal",
  );

  console.log("firstSearchResult", firstSearchResult);

  const href = await firstSearchResult?.getProperty("href");

  console.log("completed", href);

  await browser.close();

  return href;
}
