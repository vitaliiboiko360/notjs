let angle1 = 0;
let control1 = document.getElementById('controlTransform0');
let text1 = document.getElementById('textDisplay0');
let text1_1 = document.getElementById('textDisplay_0_1');

let interval1 = setInterval(() => {
  angle1 = (angle1 + 0.1) % 2;
  text1.textContent = `${angle1}`;
  const transformString = `matrix(${Math.cos(Math.PI * angle1)},${Math.sin(Math.PI * angle1)},${-Math.sin(Math.PI * angle1)},${Math.cos(Math.PI * angle1)},0,0)`;
  control1.setAttribute('transform', transformString);
}, 1200);

setInterval(_ => clearInterval(interval1), 100000);

clearInterval(interval1);
angle1 = 0;
interval1 = setInterval(() => {
  angle1 = (angle1 + 0.1) % 2;
  text1.textContent = `${angle1 * 180 < 0.0001 ? 0 : angle1 * 180}`;
  const transformString = `matrix(${Math.cos(Math.PI * angle1)},${Math.sin(Math.PI * angle1)},${-Math.sin(Math.PI * angle1)},${Math.cos(Math.PI * angle1)},0,0)`;
  control1.setAttribute('transform', transformString);

  let { x, y, width, height } = control1.getBoundingClientRect();
  let cx = width / 2 + x;
  let cy = height / 2 + y;
  const stringToOutput = `x: ${cx}  y:${cy}`;
  text1_1.textContent = stringToOutput;
}, 1200);