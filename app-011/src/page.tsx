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

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(1.2);
  const [widhtOfButtons, setWidthOfButtons] = React.useState(40);

  React.useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, []);

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
    fontSize: '1.2em',
    fontWeight: '600',
    // lineHeight: '20px',
    padding: '6px 16px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
  };

  let style2 = JSON.parse(JSON.stringify(style));
  style2.backgroundColor = '#FFE7E7';
  style2.border = '1px solid #FEE0E0';
  style2.color = '#D33A2C';

  style['float'] = 'left';
  style['margin-right'] = '5%';
  style['font-size'] = `${fontSize}em`;

  return (<>
    <div ref={ref} style={{ width: '40%', marginRight: 'auto', marginLeft: 'auto' }}>
      <div style={{ maxHeight: '30%', margin: 'auto' }}><img width="100%" src="./up.gif"></img></div>
      <div>
        <h3>ХХХХХ ххххх ххххх ххххх св. Валентіна ?</h3>
      </div>
    </div>
    <div style={{
      width: `${widhtOfButtons}%`, marginRight: 'auto', marginLeft: 'auto'
    }}>
      <div >
        <button onClick={() => {
          let newFontSize = fontSize + 0.6;
          setFontSize(newFontSize);
          setWidthOfButtons(width => width + 5);
        }} style={style} role="button">Так</button>
      </div>
      <div >
        <button style={style2} role="button">Ні</button>
      </div>
    </div>
  </>);
}