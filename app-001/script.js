(function() {
    const rootElement = document.getElementById('root');
    
})();

function onForm1ButtonClick() {

    var userInput = document.getElementById('form_1').elements.namedItem('text').value;
    const userInputOutput = document.getElementById('userInputOutput');

    userInputOutput.innerText = 'you entered: ' + userInput;

}