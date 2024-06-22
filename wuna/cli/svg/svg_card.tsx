import React, { useState, useContext, useEffect, forwardRef } from 'react';


const Card = forwardRef((props, svgCardStack_ref) => {
  const [whichCard, setWhichCard] = useState(0);

  if (svgCardStack_ref.current == null) {
    console.log(`svg element isn't ready yet`);
  }


  return (<></>);
});

export default Card;