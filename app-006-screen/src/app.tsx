import * as React from 'react';
const useEffect = React.useEffect;
const useState = React.useState;
const useCallback = React.useCallback;

function App() {
  console.log('app render');

  const getWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const getHeight = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const [height, setHeight] = useState(getHeight);
  const [width, setWidth] = useState(getWidth);

  const onResize = (event: Event) => {
    setWidth(getWidth);
    setHeight(getHeight);
  }

  useEffect(()=>{
    window.addEventListener('resize', onResize, { passive: true });
    return ()=>{window.removeEventListener('resize', onResize)};
  });

  return (<p>h:{height} w:{width}</p>);
}

export default App;