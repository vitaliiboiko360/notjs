function getTestText() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique odio quis mi fringilla, et sollicitudin ipsum tempor. Donec sit amet placerat lorem. Nullam lacus mauris, efficitur ut lobortis et, venenatis ut nisl. Sed interdum est congue mi feugiat congue. Aliquam id tortor at quam hendrerit cursus. Sed pharetra leo id efficitur auctor. Fusce tempor bibendum ornare. Duis eget vestibulum massa. Aenean eget congue quam.
  Nulla quis diam porttitor, finibus lectus in, cursus nisl.Cras tristique ipsum ac neque malesuada interdum.Pellentesque scelerisque vel risus a semper.Duis egestas rhoncus erat sed lobortis.Quisque semper, est at mattis consequat, magna metus ultrices ligula, in consectetur mi ex non massa.Nam id metus sit amet magna porttitor eleifend.In tellus augue, finibus ut finibus et, eleifend non nisl.Suspendisse vel risus ipsum.Vestibulum suscipit, mauris at porta porttitor, tellus enim vulputate est, a interdum lectus dui ultricies dolor.Mauris non ipsum rhoncus mauris mattis ornare at in orci.Donec et dolor pharetra, consectetur dolor ornare, sodales mauris.Nullam molestie ultricies interdum.Vivamus id feugiat massa, quis venenatis mauris.
  Etiam pulvinar ligula lacus, sed gravida nibh faucibus sit amet.Ut a enim quis dui lobortis suscipit.Proin volutpat mi sed mi consequat dictum.Vivamus purus arcu, malesuada eu feugiat sed, tristique et enim.Donec a malesuada urna.Nulla accumsan est id sapien semper, sit amet efficitur magna dignissim.Fusce rhoncus accumsan nisl quis porttitor.Maecenas nulla orci, venenatis et est nec, sodales vulputate nulla.
  Suspendisse malesuada dapibus commodo.Pellentesque sed odio tellus.Ut pellentesque orci quis ex hendrerit, finibus gravida mauris hendrerit.Maecenas in metus lorem.Suspendisse nec leo lorem.Aenean mollis egestas sollicitudin.Praesent dictum venenatis vehicula.Nunc et mattis est, vitae imperdiet velit.Ut vel posuere eros.Nunc a eros porttitor, venenatis nisl nec, varius sem.Fusce sollicitudin velit at quam auctor tempor.Proin vulputate orci at felis ornare, sed dictum nisl euismod.Cras posuere lacus blandit semper dapibus.Vestibulum eget velit purus.Sed ut orci volutpat, molestie libero et, aliquam dui.
  Duis rhoncus dui eu lectus aliquam, vel vestibulum dolor lacinia.Fusce arcu libero, viverra id mauris sit amet, ultricies molestie mauris.Praesent congue maximus arcu sodales tempus.Donec maximus consectetur quam, eu aliquet elit fringilla vitae.Aliquam erat volutpat.Sed nisi tellus, finibus at mauris vitae, commodo vestibulum leo.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vivamus sodales eros ut lectus viverra aliquam non eu nulla.Aliquam pulvinar, dui vel rhoncus maximus, metus odio finibus turpis, et rutrum tellus enim nec augue.Curabitur ultrices a justo eget tempor.Pellentesque convallis luctus turpis, id auctor velit malesuada quis.Duis eget tortor tristique, congue sapien ut, give me dolars.`;
}

(
  function main() {
    let button1 = document.getElementById('button-1');
    let textArea1 = document.getElementById('text-field-1');
    textArea1.value = getTestText();

    let divOutput1 = document.getElementById('div-3');
    console.log(textArea1.getBoundingClientRect());
    const { width } = textArea1.getBoundingClientRect();
    divOutput1.style.width = width + 'px';
    divOutput1.style.position = 'relative';

    let output2 = document.getElementById('output-2');
    let output3 = document.getElementById('output-3');

    const appendParagraphTagWithCharSpansFromString = string => {
      let pElement = document.createElement('p');
      pElement.style.position = 'relative';
      pElement.style.display = 'inline-block';
      for (const character of string) {
        let spanElement = document.createElement('span');
        spanElement.style.display = 'inline-block';
        spanElement.textContent = character;
        pElement.appendChild(spanElement);
      }
      divOutput1.appendChild(pElement);
    };

    button1.addEventListener('click', (event) => {
      divOutput1.innerHTML = '';
      textArea1
        .value
        .split('\n')
        .forEach(appendParagraphTagWithCharSpansFromString);
    });

    let output4 = document.getElementById('output-4');
    let isKeyCtrlDown = false;
    document.body.addEventListener('keydown', event => {
      isKeyCtrlDown = event.ctrlKey;
      if (isKeyCtrlDown)
        output4.textContent = 'ctrl is pressed';
    });
    document.body.addEventListener('keyup', event => {
      isKeyCtrlDown = event.ctrlKey;
      if (!isKeyCtrlDown)
        output4.textContent = '';
    });


    let isMoveInProgress = false;
    let isMouseDown = false;
    let startX = 0;
    let startY = 0;
    let selectedCharacterSet = new Set();

    const addSelectedIfCharacter = (x, y) => {
      let element = document.elementFromPoint(x, y);
      if (element.tagName === 'SPAN') {
        element.style.color = 'red';
        selectedCharacterSet.add(element);
      }
    };

    divOutput1.addEventListener('mousedown', event => {
      const { clientX, clientY } = event;

      let element = document.elementFromPoint(clientX, clientY);

      if (element.tagName === 'SPAN' && selectedCharacterSet.has(element)) {
        isMoveInProgress = true;
        for (const spanElement of selectedCharacterSet) {
          spanElement.style.position = 'absolute';
          spanElement.style.width = spanElement.clientWidth;
          spanElement.style.height = spanElement.clientHeight;
          // spanElement.style.zIndex = 1000
        }
        return;
      }

      isMouseDown = true;

      startX = clientX;
      startY = clientY;

      if (!isKeyCtrlDown) {
        // revert and clear current selection
        for (const spanElement of selectedCharacterSet)
          spanElement.style.color = 'black';
        selectedCharacterSet.clear();
      }
      addSelectedIfCharacter(startX, startY);
    });
    divOutput1.addEventListener('mouseup', event => {
      // const { clientX, clientY } = event;
      isMouseDown = false;
      isMoveInProgress = false;
    });

    const updateSelectionPosition = (deltaX, deltaY) => {
      for (const spanElement of selectedCharacterSet) {
        spanElement.style.left += deltaX;
        spanElement.style.top += deltaY;
      }
    }

    const STEP = 2; // tradeoff between perfomance and accuracy :-|
    divOutput1.addEventListener('mousemove', event => {
      const { clientX, clientY } = event;
      const deltaX = startX - clientX;
      const deltaY = startY - clientY;

      if (isMoveInProgress) {
        updateSelectionPosition(deltaX, deltaY);
        return;
      }

      if (!isMouseDown) return;

      const goByX = Math.abs(deltaX);
      const goByY = Math.abs(deltaY);
      const nextX = deltaX < 0 ? x => x += STEP : x => x -= STEP;
      const nextY = deltaY < 0 ? y => y += STEP : y => y -= STEP;

      for (let j = 0, clientJ = startY;
        j < goByY;
        j += STEP, clientJ = nextY(clientJ)) {
        for (let i = 0, clientI = startX;
          i < goByX;
          i += STEP, clientI = nextX(clientI)) {
          addSelectedIfCharacter(clientI, clientJ);
        }
      }
    });
  }
)();