import * as React from 'react';

export default function Page0(props) {

  let widthOfAnime = '67%';

  if (props.height < props.width) {
    widthOfAnime = '30%';
  }

  return (<>
    <div style={{ width: widthOfAnime, marginRight: 'auto', marginLeft: 'auto' }}>
      <div style={{ maxHeight: '30%', margin: 'auto' }}>
        <img id='yesImg' style={{ display: 'none' }} width="100%" src="./down.gif"></img>
        <img id='main' width="100%" src="./middle.gif"></img>
      </div>
      <div style={{
        fontSize: '1em',
        fontWeight: '600',
        fontFamily: '-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji"'
      }} >
        <h3 style={{ textAlign: 'center' }} id='question'>14 лютого "День Дарування Книг" в 2024 майже завершився. Чекаємо вас через рік 🤓</h3>
      </div>
    </div >
  </>);
}
