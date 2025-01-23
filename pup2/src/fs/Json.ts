import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export function readJsonFromFileSync(filePath: string) {
  if (!existsSync(filePath)) return { error: `file ${filePath} NotExist` };
  return readFileSync(filePath);
}

export function saveJsonFileSync(filePath: string, content: any) {
  try {
    writeFileSync(filePath, content);
  } catch (err) {
    console.error(err);
  }
}
