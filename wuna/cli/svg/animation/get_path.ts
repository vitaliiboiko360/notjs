
export default function getPath(userPosition: number, svgElement): string {
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

  return path;
}