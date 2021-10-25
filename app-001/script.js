(function() {
    const rootElement = document.getElementById('root');
    
})();

function onForm1ButtonClick() {
    const rootElement = document.getElementById('root');
    let element = document.createElement('p');
    element.innerText = 'you entered: ';
    rootElement.appendChild(element);
}