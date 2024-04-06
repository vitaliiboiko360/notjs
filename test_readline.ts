import * as readline from 'node:readline/promises';

import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function outputToConsole(message) {
  console.log(`answer is ${message}`);
}

async function main() {
  while (true) {
    const answer = await rl.question('What do you think of Node.js? ');
    if (answer == 'y') {
      outputToConsole(answer);
    }
  }
}

main();