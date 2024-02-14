import * as React from 'react';

export default function Page(props) {
  const ref = React.useRef(null);
  //   const [height, setHeight] = React.useState(props.height/2);
  //   const [width, setWidth] = React.useState(props.width/2);
  //   React.useEffect(()=>{
  //       // const newHeight = props.height/2 - ref.current.height;
  //       const newWidth = width - ref.current.width/2;
  //       console.log(`${newWidth}`);
  //       // ref.current.bottom = newHeight;
  //       ref.current.right = newWidth;
  //       // setHeight(newHeight);
  //       setWidth(newWidth);
  //   });
  // //style={{position: "absolute", bottom:height+'px', right:width+'px'}}

  const [index, setIndex] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(1.2);
  const [yesWidth, setYesWidth] = React.useState(50);
  const [noWidth, setNoWidth] = React.useState(50);
  const [textAlign, setTextAlign] = React.useState('right');
  const [yesButtonDims, setYesButtonDims] = React.useState({ height: '', width: '' });

  let padding = React.useRef(5);

  let style = {
    appearance: 'none',
    backgroundColor: '#2ea44f',
    border: '1px solid rgba(27, 31, 35, .15)',
    borderRadius: '6px',
    boxShadow: 'rgba(27, 31, 35, .1) 0 1px 0',
    boxSizing: 'border-box',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: '-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    fontSize: '1em',
    fontWeight: '600',
    // lineHeight: '20px',
    padding: '6px 16px',
    // position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
  };

  let style2 = JSON.parse(JSON.stringify(style));
  style2.backgroundColor = '#FFE7E7';
  style2.border = '1px solid #FEE0E0';
  style2.color = '#D33A2C';
  style2.textWrap = 'wrap';
  style2.flexShrink = 0;
  style2.overflow = 'hidden';

  // style['float'] = 'left';
  style.fontSize = `${fontSize}em`;
  // style.padding = `${(1 * padding.current) + 1}% ${(3 * padding.current) + 1}%`;

  const rejections = ['Ні, у мене не вийде',
    'Буду занята', 'Щось не дуже хочеться', 'Дякую, але ні', 'Вже є плани', 'Ні, їду за місто', 'Ти класний, але ні', 'Не зможу, є справи', 'Давай іншим разом', 'Може потім', 'Зараз точно ні'];


  React.useEffect(() => {
    if (yesWidth > 80) {
      if (ref.current)
        ref.current.parentNode.remove();
      setYesWidth(100);
      setTextAlign('center');
    }
  });

  let widthOfAnime = '67%';

  if (props.height < props.width) {
    widthOfAnime = '30%';
  }

  function getPercentWidthHeight(elem) {
    var pa = elem.offsetParent || elem;
    return {
      height: (((elem.offsetHeight / pa.offsetHeight) * 100).toFixed(2)) + 10 + '%',
      width: (((elem.offsetWidth / pa.offsetWidth) * 100).toFixed(2)) + 10 + '%'
    };
  }

  // style.width = yesButtonDims.width != '' ? yesButtonDims.width : 'auto';
  // style.height = yesButtonDims.height != '' ? yesButtonDims.height : 'auto';

  // style.width = '100%';
  // style.height = '100%';

  React.useEffect(() => {
    // let yes = document.getElementById('yes');
    // yes.style.width = yesButtonDims.width != '' ? yesButtonDims.width : 'auto';
    // yes.style.height = yesButtonDims.height != '' ? yesButtonDims.height : 'auto';
  });
  //width: `${noWidth}%`,

  return (<>
    <div style={{ width: widthOfAnime, marginRight: 'auto', marginLeft: 'auto' }}>
      <div style={{ maxHeight: '30%', margin: 'auto' }}>
        <img id='yesImg' style={{ display: 'none' }} width="100%" src="./down.gif"></img>
        <img id='main' width="100%" src="./up.gif"></img>
      </div>
      <div style={{
        fontSize: '1em',
        fontWeight: '600',
        fontFamily: '-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji"'
      }} >
        <h3 style={{ textAlign: 'center' }} id='question'> Ідем гуляти на день св.Vалентина ?</h3>
      </div>
    </div >
    <div id='yesButt' >
      <div style={{ display: 'flex', overflow: 'hidden' }} >
        <div style={{
          width: `${yesWidth}vw`, minWidth: `${yesWidth}vw`, textAlign: textAlign, borderRight: '2px solid transparent'
        }}>
          <button id='yes' onClick={() => {
            let main = document.getElementById('main');
            let yesButt = document.getElementById('yesButt');
            let question = document.getElementById('question');
            let yes = document.getElementById('yesImg');
            yes.style.display = '';
            question.innerText = 'Ок, добре';
            yesButt.style.display = 'none';
            main.style.display = 'none';
          }} style={style} role="button">Так</button>
        </div>
        <div style={{ textAlign: 'left', borderLeft: '2px solid transparent', textWrap: 'wrap' }}>
          <button ref={ref} onClick={() => {
            let newFontSize = fontSize + 1;
            setFontSize(newFontSize);
            setYesWidth(width => width + 3);
            setNoWidth(width => width - 3);
            setIndex(index => index + 1);
            padding.current = padding.current + 3;
            let yes = document.getElementById('yes');
            let dims = getPercentWidthHeight(yes);
            setYesButtonDims(dims);
            // yes.style.width = dims.width;
            // yes.style.height = dims.height;
            console.log(dims);
          }} style={{ ...style2, textWrap: 'wrap', whiteSpace: 'normal' }} role="button">{rejections[index]}</button>
        </div>
      </div>
    </div >
  </>);
}