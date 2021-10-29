
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
    
    //
    // function required by test assignment
    // called for each test case
    // DISCLAIMER: only works with date ranges within one month
    // work in progress to make it work with dates from different months, years...
    //
    function createDateRanges(testCase) {
      var result = new Array();
      const [month, day, year] = [0, 1, 2];
      const [f, t, m] = [0, 1, 2];

      testCase.forEach((dateRangeObj)=> {        
        const from = dateRangeObj.from.split('/');
        const to = dateRangeObj.to.split('/');

        if (result.length == 0) {
          result.push([from[day], to[day], from[month]]);
        }
        else {
          var overlappingDataRangeIndex = result.findIndex(dataRange => dataRange[t] <= from[day]);
          if (overlappingDataRangeIndex == -1) {
            result.push([from[day], to[day], from[month]]);
          }
          else {
            var shiftToDate = to[day];
            result[overlappingDataRangeIndex][t] = Math.max(to[day], result[overlappingDataRangeIndex][t]);
            var shiftToDate = result[overlappingDataRangeIndex][t];
            for (var i=overlappingDataRangeIndex+1; i<result.length; i++) {
              if (result[i][f] <= shiftToDate) {
                shiftToDate = Math.max(result[i][t], shiftToDate);
                result[overlappingDataRangeIndex][t] = shiftToDate;
                result.splice(i, 1);
                i--;
              }
            }
          }
        }
      });
    
      return result.map(arr => getMonthShortNameFromNumber(arr[m]) + ' ' + arr[f] + '-' + arr[t]).toString();       
    }

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

        let resultData = document.createElement('p');
        resultData.innerText = createDateRanges(testCase);
        document.body.appendChild(resultData);
    }
})();

function getMonthShortNameFromNumber(number) {
  if (number > 12 || number < 1) {
    return 'ArgNotInRangeError';
  }
  return Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(number.toString()));
}
