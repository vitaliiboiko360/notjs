
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

    const testCases = [testArray1, testArray2, testArray3, testArray4];
    var testCaseCounter = 0;

    for (const testCase of testCases) {
        let headLine = document.createElement('h4');
        headLine.innerText = 'Test Case #' + testCaseCounter++;
        document.body.appendChild(headLine);

        for (const dateRangeObj of testCase) {
            let inputData = document.createElement('p');
            inputData.innerText = JSON.stringify(dateRangeObj);
            document.body.appendChild(inputData);
        }

        let inputData = document.createElement('p');
        inputData.innerText = 'Our function returns: ';
        document.body.appendChild(inputData);


        var result = new Array();
        const [month, day, year] = [0, 1, 2];
        const [f, t] = [0, 1];



        testCase.forEach((dateRangeObj)=> {
          const from = dateRangeObj.from.split('/');
          const to = dateRangeObj.to.split('/');

          if (result.length == 0) {
            result.push([from[day], to[day]]);
          }
          else {
            var overlappingDataRangeIndex = result.findIndex(dataRange => dateRangeObj[f] >= to[day]);
            if (overlappingDataRangeIndex == -1) {
              result.push([from[day], to[day]]);
            }
            else {
              var shiftToDate = to[day];
              result[overlappingDataRangeIndex][t] = shiftToDate;
              for (var i=overlappingDataRangeIndex+1; i<result.length; i++) {
                if (result[i][f] <= shiftToDate) {
                  shiftToDate = result[i][f];
                  result[overlappingDataRangeIndex][t] = shiftToDate;
                  result.splice(i, 1);
                  i--;
                }
              }
            }
          }       
        });
        console.log(result);
        let resultData = document.createElement('p');
        resultData.innerText = result.map(arr => arr[f] + '-' + arr[t]).toString();
        document.body.appendChild(resultData);
    }
})();

function onForm1ButtonClick() {

    var userInput = document.getElementById('form_1').elements.namedItem('text').value;
    const userInputOutput = document.getElementById('output_users_input');

    userInputOutput.innerText = 'you entered: ' + userInput;
}