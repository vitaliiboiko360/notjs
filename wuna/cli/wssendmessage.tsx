import React from 'react';

const WsSendMessage = React.forwardRef((props, webSocketRef) => {

  const onclick = () => {
    if (webSocketRef.current.readyState != 0)
      webSocketRef.current.send('message');
  };

  return (<>
    <button onClick={onclick}>Click to send message</button></>);
});

export default WsSendMessage;