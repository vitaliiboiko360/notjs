
(function() {
    const testArray1 = [
        {
          "from":"03/01/2021",
          "to":"03/06/2021"
        },
        {
          "from":"03/10/2021",
          "to":"03/15/2021"
        },
        {
          "from":"03/20/2021",
          "to":"03/25/2021"
        }
    ];
    const testArray2 = [
        {
          "from":"03/01/2021",
          "to":"03/05/2021"
        },
        {
          "from":"03/08/2021",
          "to":"03/10/2021"
        },
        {
          "from":"03/07/2021",
          "to":"03/20/2021"
        }
    ];
    const testArray3 = [
        {
          "from":"03/01/2021",
          "to":"03/05/2021"
        },
        {
          "from":"03/04/2021",
          "to":"03/10/2021"
        },
        {
          "from":"03/07/2021",
          "to":"03/20/2021"
        },
        {
          "from":"03/20/2021",
          "to":"03/30/2021"
        }
    ];
    const testArray4 = [
        {
            "from":"03/01/2021",
            "to":"03/05/2021"
        },
        {
            "from":"03/06/2021",
            "to":"03/08/2021"
        },
        {
            "from":"03/15/2021",
            "to":"03/18/2021"
        },
        {
            "from":"03/16/2021",
            "to":"03/28/2021"
        }
    ];

    const testCases = [testArray1, testArray2];
    var testCaseCounter = 0;

    for (const testCase of testCases) {
        let headLine = document.createElement('h4');
        headLine.innerText = 'Test Case #' + testCaseCounter++;
        document.body.appendChild(headLine);

        for (const dateObj of testCase) {
            let inputData = document.createElement('p');
            inputData.innerText = JSON.stringify(dateObj);
            document.body.appendChild(inputData);
        }

        let inputData = document.createElement('p');
        inputData.innerText = 'Our function returns: ';
        document.body.appendChild(inputData);


        var ret = new Array();
        for (const dateObj of testCase) {
            var from = dateObj.from.split('/');
            console.log(from);


        }
    }
})();

function onForm1ButtonClick() {

    var userInput = document.getElementById('form_1').elements.namedItem('text').value;
    const userInputOutput = document.getElementById('output_users_input');

    userInputOutput.innerText = 'you entered: ' + userInput;
}