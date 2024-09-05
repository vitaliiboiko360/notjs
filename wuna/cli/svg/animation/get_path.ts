
import { USER_INFO } from '../svg_userplaceholder'

const xCenter = 400;
const yCenter = 300;
const deltaFromCenter = 50;

export default function getPath(userPosition: number, svgElement): string {
  let path = '';

  const r = Math.floor(Math.random() * deltaFromCenter);
  const alpha = Math.random() * (2 * Math.PI);
  const x = xCenter + (Math.cos(alpha) / r);
  const y = yCenter + (Math.sin(alpha) / r);

  if (userPosition == 0) {
    console.log('getPath called with userPosition=', userPosition);
    return '';
  }

  if (userPosition == 1) {
    return `M400,430 C400,430 420,360 ${x},${y}`;
  }

  const userIndex = userPosition - 1;
  const userId = USER_INFO[userIndex].id;
  let userCardGroup = svgElement.querySelector('#' + userId);
  if (userCardGroup == null) {
    console.log('cannot get usercard userId==', userId);
    return `M400,300 L${x},${y}`;
  }


  let bBox = userCardGroup.getBBox();
  console.log('bBox of userCardGroupu pos', userPosition, ' ', JSON.stringify(bBox));
  let point = new DOMPoint(bBox.x, bBox.y);

  let matrix = userCardGroup.getScreenCTM();
  let localCoordinates = point.matrixTransform(matrix.inverse());
  let startX = localCoordinates.x;
  let startY = localCoordinates.y;

  switch (userPosition) {
    case 2:
      path = `M${startX + bBox.width},${startY + bBox.height} C${startX + bBox.width},${startY + bBox.height} 300,260 ${x},${y}`;
      break;
    case 3:
      path = `M${startX + bBox.width},${startY} C${startX + bBox.width},${startY} 380,230 ${x},${y}`;
      break;
    case 4:
      path = `M${startX},${startY + bBox.height} C${startX},${startY + bBox.height} 530,260 ${x},${y}`;
      break;
    default:
      return `M400,300 L${x},${y}`;
  }

  return path;
}