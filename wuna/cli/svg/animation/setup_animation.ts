export default function setupAnimation(element: SVGGElement, userPosition: number) {
  let animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
  animateMotion.setAttribute('dur', '2s');
  console.log('setupAnimation userSeat=', userPosition);
  let path = '';
  switch (userPosition) {
    case 2:
      path = "M120,300 C120,300 300,260 400,300";
      break;
    case 3:
      path = "M400,170 C400,170 380,230 400,300";
      break;
    case 4:
      path = "M680,300 C680,300 530,260 400,300";
      break;
    case 1:
      path = "M400,430 C400,430 420,360 400,300";
      break;
    default:
  }
  animateMotion.setAttribute('path', path);
  element.appendChild(animateMotion);

  // let animateTransform = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  // animateTransform.setAttribute('', '');
}