import WebSocket from 'ws';

function getRandomNumber(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

enum COLOR_OFFSET {
  YELLOW = 80,
  BLUE = 60,
  GREEN = 40,
  RED = 20,
  BLACK = 10,
}

enum COLOR_NUMBERS {
  BLACK = 2,
  RED = 15,
  GREEN = 28,
  BLUE = 41,
  YELLOW = 54
}

const NUBMER_OF_CARDS = 54;

let index = -1;
function getConsequtiveCardId() {
  index++;
  if (index < COLOR_NUMBERS.BLACK)
    return index + COLOR_OFFSET.BLACK;
  else if (index < COLOR_NUMBERS.RED)
    return (index - COLOR_NUMBERS.BLACK) + COLOR_OFFSET.RED;
  else if (index < COLOR_NUMBERS.GREEN)
    return (index - COLOR_NUMBERS.RED) + COLOR_OFFSET.GREEN;
  else if (index < COLOR_NUMBERS.BLUE)
    return (index - COLOR_NUMBERS.GREEN) + COLOR_OFFSET.BLUE;
  else if (index < COLOR_NUMBERS.YELLOW)
    return (index - COLOR_NUMBERS.BLUE) + COLOR_OFFSET.YELLOW;
  else {
    index = index % NUBMER_OF_CARDS;
    return getConsequtiveCardId();
  }
}


export function getRandomCardId() {
  let index = Math.floor(Math.random() * 54);
  if (index < COLOR_NUMBERS.BLACK)
    return index + COLOR_OFFSET.BLACK;
  else if (index < COLOR_NUMBERS.RED)
    return (index - COLOR_NUMBERS.BLACK) + COLOR_OFFSET.RED;
  else if (index < COLOR_NUMBERS.GREEN)
    return (index - COLOR_NUMBERS.RED) + COLOR_OFFSET.GREEN;
  else if (index < COLOR_NUMBERS.BLUE)
    return (index - COLOR_NUMBERS.GREEN) + COLOR_OFFSET.BLUE;
  else if (index < COLOR_NUMBERS.YELLOW)
    return (index - COLOR_NUMBERS.BLUE) + COLOR_OFFSET.YELLOW;
  else {
    return getRandomCardId();
  }
}

export default function registerPlayerConnection(ws: WebSocket) {
  console.log('on connection');

  ws.on('error', (error) => {
    console.log(`our error= ${error}`);
  });

  ws.on('message', function message(data, isBinary) {
    if (isBinary) {
      let array = new Uint8Array(data as Uint8Array);
      console.log(`we recive binary = `);
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
      }
    }
    else {
      console.log(`non binary = ${JSON.stringify(data)}`);
    }
    // wss.clients.forEach(
    //   function each(client) {
    //     if (client !== ws && client.readyState === WebSocket.OPEN) {
    //       client.send(data, { binary: isBinary });
    //     }
    //   });
  });

  setInterval(() => {
    let arrayToSend = new Uint8Array(10);
    arrayToSend[0] = getRandomCardId();
    arrayToSend[1] = getRandomCardId();
    if (ws.readyState === WebSocket.OPEN) {
      console.log(`we are sending `, arrayToSend);
      ws.send(arrayToSend, { binary: true });
    }
  }, 5000);
}