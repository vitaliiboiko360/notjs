import puppeteer from 'puppeteer';

export async function getWordsJson(page: puppeteer.Page, strInput: string): Promise<Object> {
  const inputTextFieldBox = '#rm1UF UnxENd';
  await page.waitForSelector(inputTextFieldBox, {
    visible: true
  });
  await page.type(inputTextFieldBox, "¿Te gusta leer?");
  return {};
}