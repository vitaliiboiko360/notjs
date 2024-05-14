import puppeteer from 'puppeteer';
import { getWordsJson } from './WordsBrowser';


export default function getTranslations(page: puppeteer.Page) {

  let index = 0;
  const localInput = ["¿Te gusta leer?", "Yo leo un libro todas las semanas.", "Y a veces, leo dos libros."];

  async function getResultAndOutput(page: puppeteer.Page, inputString: string) {
    let result = await getWordsJson(page, inputString);
    console.log(`\n${JSON.stringify(result, null, 2)}\n`);
  }


}