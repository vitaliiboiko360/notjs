---
layout: default
---

[Practical exercises](#practical)  
[Javascript/ES](#javascriptesweb)  
[Typescript](#typescript)  
[Node.js](#nodejs)  
[React](#reactredux)  
[HTML](#html)  
[CSS](#css)  
[Other questions](#other-questions)

### Practical

#### write function `runOnce()`

```js
function doSomeShit(param) {
  console.log(`${param} is shit.`);
}

const doSomeShitOnce = runOnce(doSomeShit);
doSomeShitOnce(5); // 5 is shit
doSomeShitOnce('blah'); // Error: This function can be run only once
```

#### write function `isPalindrom(input: string)`

```js
isPalindrome('abacaba'); // true
isPalindrome('qwerty'); // false
```

write function in one line  
explain adv/disadv of each implementation

#### write function `showAddition(n: number)`

```js
showAdditions(456); // "400+50+6"
showAdditions(8274); // "8000+200+70+4"
showAdditions(15040); // "10000+5000+40"
```

#### write function `flatten(args...)`

```js
flatten([3, 5, [7], [1, [[22]], [[6], 3]]]); // Array [ 3, 5, 7, 1, 22, 6, 3 ]
```

<details>  
  
<summary>  
  
solution  
  
</summary>   
  
```js  
function flatten() {

}

````

</details>

#### explain order of output
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
````

### Javascript/ES/Web

#### what is Promise

**Promise** is object that represent eventual completion (or failure) of asynchronous operation.  
**Promise** is object to which are attached success and failure callbacks  
`.then` accepts callbacks for fulfillled and rejected (optional parameter) case

```js
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value); // "Success!"
});
```

`.catch` is shortcut for `.then(undefined, onRejected)` accepts function to be called on rejected case

#### difference Promise.allSettled, Promise.race and Promise.any

static methods  
`Promise.allSettled` accepts iterable of promises; returns promise, whose fulfillment value is array of object,  
each describing

> `status` with string "fullfiled" or "rejected"  
> `value` if status is "fulfilled"  
> `reason` if status is "rejected"

`Promise.race` accepts iterable of promises; returns promise, whose fulfillment value the first settled promise from the input  
useful when you need first async task promise settled from the iterable input

```js
const data = Promise.race([
  fetch('/api'),
  new Promise((resolve, reject) => {
    // Reject after 5 seconds
    setTimeout(() => reject(new Error('Request timed out')), 5000);
  }),
])
  .then((res) => res.json())
  .catch((err) => displayError(err));
```

`Promise.any` accepts iterable of promises; return promise, whose fulfillment value is the first fulfilled promise. it rejects when all input's promises reject, with `AggregatedError` containg array of rejection reasons.

#### Array

**Access Element:**

- `at(index)` returns element at the `index` or undefined if `index >= array.length` OR `-index < -array.length`
- `entries()` returns a new array iterator object that contains the key/value pair for each index and element of the array
  _sparse array with empty slots treated as if the empty element has value `undefined`_

**Scan/Search/Inspect:**

- `every(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns `true` if `compareFn` returned `true` for each element of the array.  
  Immediately returns `false` if it has at least one element for which `compareFn` returned `false`.
- `find(compareFn, `_`thisArg`_`)` return first element for which `compareFn` returned `true`. or `undefined` otherwise if it didn't found any such element
- `findIndex(compareFn, `_`thisArg`_`)` returns index of the elmement for which `compareFn` returned truthy value. or `-1` if `compareFn` returned falsy value for each array's element
- `findLast(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns element, staring/iterating from the end of array, element for which `compareFn` returned `true`, or otherwise returns `undefined` if such element not found
- `findLastIndex(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns  
  index of the element, starting/iterating from the end of array, for which `compareFn` returned truthy value.  
  or `-1` if `compareFn` returned falsy value for each array's element.
- `forEach(callbackFn: (element, index, array)=>Boolean, `_`thisArg`_`)` executed provided `callbackFn` once for each array element in index-ascending order. `foreEach` returns `undefined`.
- `includes(searchElement, `_`fromIndex`_`)` returns `true` if `searchElement` is found in the array (or whithin a range starting from `fromIndex`).
  returns `false` if `searchElement` not found.
  negative `fromIndex` will count offset starting from end. But the search still going from front to back of the array.
- `indexOf(searchElement, `_`fromIndex`_`)` returns the first index of `searchElement` in the array. or returns `-1` if `searchElement` hasn't been found.
- `lastIndexOf(searchElement, `_`fromIndex`_`)` returns last index of `searchElement` in the array. or `-1` if `searchElement` no found.
- `keys()` returns object iterator, which iterates over array's element indices. In sparce arrays, empty slots still iterated.
- `some(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` Returns `false` if `compareFn` returned `false` for each array element.  
  Immediately returns `true` if a `compareFn` returned `true` for an array element.
- `values()` returns array iterator object that iterates the value of each element in the array.

**Change/Mutatate/Update:**

- `fill(value, `_`start`_`, `_`end`_`)` change array's element withing range  
  from `start` or `0` if ommitted, to `end` or array's length if omitted.  
  returns changed array
- `pop()` returns the last element of the arrya. returns `undefined` if array is empty. removes returned last element in the array.
- `push(element1, `_`element2`_`, `_`elementN`_`,)` append element to the back of array. returns new `length` value of the object upon which the method `push` was being called.
- `reverse()` reverses order of an array. Returns reference to the reversed modified array (to itself). Preserves empty slots in sparce array.
- `shift()` removes first element of an array. Returns removed first element. Returns `undefined` if array is empty.
- `sort(`_`compareFn: (a, b)=>-1 | 0 | 1`_`)` reorder array elements in sorted order _in-place_. If `compareFn` not provided it sorts array in alphabetical order. Array of numbers will be treated as array of strings, (example: "80" will come before "9").
- `splice(start, `_`deleteCount=0, element1, elementN`_`)` removes or inserts elements in an array starting from `start`. if `element1...elementN` provided, `splice` inserts the elements into array. Returns array of deleted elements, empty array if no elements were deleted.
- `unshift(`_`element1`_`, `_`elementN`_`)` insert the given value/values to the beginning of the array. Returns new length of the array

**Create New Copy Array/ or New Value:**

- `filter(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns shallow copy of array where element for which `compareFn` returned truthy value.
- `flat(`_`depth=1`_`)` returns a new array with sub-array elements flatenned up to the `depth` level. On sparce-arrays empty slots are removed.
- `flatMap(mapFn: (element, index, array)=>any, `_`thisArg`_`)` returns a new array with `mapFn` being run on each array's element and then the resulting array is flattened by 1.
- `join(`_`separator`_`)` returns string with all array elements joined. if array `length` is 0 returns empty string. if array has one element, passed `separator` wouldn't be used.
- `map(mapFn: (element, index, array)=>any, `_`thisArg`_`)` returns a new array with each element is the result of `mapFn`.
  `mapFn` is not invoked on empty slots in sparce arrays.
- `reduce(reducerFn: (accumulator`_`=initialValue`_`, currentValue, currentIndex, array)=>any, `_`initialValue`_`)` executes `reducerFn` on each array element. Returns resulting value of executing function.  
  for the first iteration, `accumulator` is set ,if provided to `initialValue`, or to the first element of the array and then executing `reducerFn` starting from next (second) element of the array.
- `reduceRight(reducerFn: (accumulator`_`=initialValue`_`, currentValue, currentIndex, array)=>any, `_`initialValue`_`)` executes `reducerFn` on each array element starting from back to front (right to left) order. Returns resulting value of executing function.
- `slice(`_`start`_`, `_`end`_`)` returns new array containing the extracted values.
- `with(index, value)` return new array copy with the element at `index` replaced with `value`

#### String

**String coercion**  
`undefined` to "undefined"  
`null` to "null"  
`true` to "true" `false` to "false"  
numbers and BigInt converted to string using `toString(10)`

**String instance methods**

**Check / Examine / Search**

- `startsWith(searchString, `_`position=0`_`)`  
  Returns `true` if the `searchString` is found at the beggining of the string (or at the `position`).  
  Returns `false` if not found.  
  _Note: if `searchString` is omitted `udnefined` value coerced to "undefined" and searched instead; method is case-sensitive; if `searchStrin` is empty string method returns `true`_
- `includes(searchString, `_`position=0`_`)`  
  Returns `true` if the `searchString` is found anywhere in the string, search is starting from `position`. Returns `false` if not found. _Note: method is case-sensitive;_
- `endsWith(searchString, `_`endPosition=str.length`_`)`  
  Returns `true` if the given `searchString`'s last character + 1, found at the `endPosition`. Returns `false` if not.

#### truthy falsy

all values are truthy when placed in boolean context, except falsy values:

> `false` `0` `-0` `0n` `""` `null` `undefined` `NaN`

### Typescript

#### decorators

### Node.JS

####

#### child_process

exec - spawn new shell, execute commands, run callback

#### event loop how does it work

#### types of asynchronious operations in node.js

### React/Redux

### CSS

#### 129 properites

BoxModel  
Flex  
Animations  
Background  
Typography  
Grid  
Positioning

### HTML

### Other questions

#### difference between node.js and browser

in node there ain't `window` or `document`  
in browser no modules like file system access  
node updates ES standards fasters than browsers  
CommonJS `require()` or ES module system `import`

#### SOLID

S - signle responsibility principle, class/object has one reason to change, has one job  
O - open closed principle, objects should be open of extension, but close for modification  
L - Liskov substitution principle, derived class should be substitutable for their base class, subclass should substitute base class w/o breaking base class  
I - Interface segregation principle, clients shouldn't be force to depend upon interfaces they don't use. better to create two specific interfaces rather than one big  
D - dependency inversion principle, objects must depend on abstractions not concretions. hole in the middle pattern,

### Web

#### Cross-Origin Resource Sharing (CORS)

Browser has same origin policy it blocks request resources from different origin. Origin is domain, schema or port.  
Browser send request with header `Origin`  
Server responses with header `Access-Control-Allow-Origin: *`  
If proper header recieved, browser can share response data to the client site

#### same origin policy

Origin defined as protocol (https|https), host (ip addr|dns name), and port
