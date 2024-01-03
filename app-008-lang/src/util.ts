
export function toFixed(number, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return number.toString().match(re)[0];
}