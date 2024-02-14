import * as React from 'react';

export default function Page0(props) {

  let widthOfAnime = '67%';

  if (props.height < props.width) {
    widthOfAnime = '30%';
  }

  document.body.style.backgroundColor = 'rgb(184,213,220)';

  return (<>
    <div style={{ width: widthOfAnime, marginRight: 'auto', marginLeft: 'auto' }}>
      <div style={{ maxHeight: '30%', margin: 'auto' }}>
        <img id='main' width="100%" src="./middle.gif"></img>
      </div>
      <div style={{
        fontSize: '1em',
        fontWeight: '600',
        fontFamily: '-apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji"'
      }} >
        <h3 style={{ textAlign: 'center', color: '#fff', position: 'relative', top: '-50px' }} id='question'>14 лютого "День Дарування Книг" в 2024 майже завершився.<br /> Чекаємо вас через рік 🤓</h3>
      </div>
    </div >
  </>);
}
