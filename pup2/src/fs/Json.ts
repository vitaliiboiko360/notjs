import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export function readJsonFromFileSync(filePath: string) {
  if (!existsSync(filePath)) {
    throw Error(`file ${filePath} NotExist`);
  }

  return JSON.parse(readFileSync(filePath).toString());
}

export function saveJsonToFileSync(filePath: string, jsonObject: object) {
  try {
    writeFileSync(filePath, JSON.stringify(jsonObject));
  } catch (err) {
    console.error(err);
  }
}
