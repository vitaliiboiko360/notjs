
import { USER_INFO } from '../svg_userplaceholder'

const xCenter = 400;
const yCenter = 300;
const deltaFromCenter = 15;

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
    return 'M400,300';
  }

  let point = svgElement.createSVGPoint();
  let bBox = userCardGroup.getBBox();
  point.x = bBox.x;
  point.y = bBox.y;
  let matrix = userCardGroup.getCTM();
  let localCoordinates = point.matrixTransform(matrix);
  let startX = localCoordinates.x + localCoordinates.width;
  let startY = localCoordinates.y + localCoordinates.height;

  switch (userPosition) {
    case 2:
      path = `M${startX},${startY} C${startX},${startY} 300,260 400,300`;
      break;
    case 3:
      path = `M${startX},${startY} C${startX},${startY} 380,230 400,300`;
      break;
    case 4:
      path = `M${startX},${startY} C${startX},${startY} 530,260 400,300`;
      break;
    default:
      return 'M400,300';
  }

  return path;
}