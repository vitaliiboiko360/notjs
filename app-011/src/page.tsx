import * as React from 'react';

export default function Page(props) {
    const ref = React.useRef(null);
    const [height, setHeight] = React.useState(props.height/2);
    const [width, setWidth] = React.useState(props.width/2);
    React.useEffect(()=>{
        // const newHeight = props.height/2 - ref.current.height;
        const newWidth = width - ref.current.width/2;
        console.log(`${newWidth}`);
        // ref.current.bottom = newHeight;
        ref.current.right = newWidth;
        // setHeight(newHeight);
        setWidth(newWidth);
    });
    return (<>
    <p>height:{height} width:{width}</p>
    <div ref={ref} style={{position: "absolute", bottom:height+'px', right:width+'px'}}>
    <h3>Підем на день Св. Валентіна ?</h3>
    <button>Так</button><button>Ні</button>
    </div>
    </>); 
}