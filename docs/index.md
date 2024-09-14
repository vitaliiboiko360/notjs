---
layout: default
---

### Practical  
#### write function `runOnce()`  
```js  
function doSomeShit(param) {
  console.log(`${param} is shit.`);
}

const doSomeShitOnce = runOnce(doSomeShit);
doSomeShitOnce(5);      // 5 is shit
doSomeShitOnce('blah'); // Error: This function can be run only once
```  

#### write function `isPalindrom(input: string)`  
```js  
isPalindrome('abacaba'); // true
isPalindrome('qwerty');  // false
```  
write function in one line  
explain adv/disadv of each implementation   

#### write function `showAddition(n: number)`  
```js  
showAdditions(456);   // "400+50+6"
showAdditions(8274);  // "8000+200+70+4"
showAdditions(15040); // "10000+5000+40"
```  

#### write function `flatten(args...)`  
```js  
flatten([3, 5, [7], [1, [[22]], [[6], 3]]]); // Array [ 3, 5, 7, 1, 22, 6, 3 ]
```  
<!--details  
```js  
function flatten() {
  
}
```  
-->  

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
`.catch` is shortcut for `.then(undefined, onRejected)`  accepts function to be called on rejected case  



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
  fetch("/api"),
  new Promise((resolve, reject) => {
    // Reject after 5 seconds
    setTimeout(() => reject(new Error("Request timed out")), 5000);
  }),
])
  .then((res) => res.json())
  .catch((err) => displayError(err))
```  
`Promise.any` accepts iterable of promises; return promise, whose fulfillment value is the first fulfilled  promise. it rejects when all input's promises reject, with `AggregatedError` containg array of rejection reasons.  

#### Array  
**Access Element:**  
`at(index)` returns element at the `index` or undefined  if `index >= array.length` OR `-index < -array.length`
`entries()` returns a new array iterator object that contains the key/value pair for each index and element of the array
_sparse array with empty slots treated as if the empty element has value `undefined`_   
**Scan/Search/Inspect:**  
`every(compareFn, `_`thisArg`_`)` returns `true` if `compareFn` returned `true` for each element of the array. or `false` if it has `compareFn` returned `false` for the element and returns immediately after that element.  
`find(compareFn, `_`thisArg`_`)`  return first element for which `compareFn` returned `true`. or `undefined` otherwise if it didn't found any such element  
`findIndex(compareFn, `_`thisArg`_`)` returns index of the elmement for which `compareFn` returned truthy value. or `-1` if `compareFn` returned falsy value for each array's element  


**Change/Mutatate/Update:**  
`fill(value, `_`start`_`, `_`end`_`)` change array's element withing range  
from `start` or `0` if ommitted, to `end` or array's length if omitted.  
returns changed array  
**Create New Array Copy:**  
`filter(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns shallow copy of array where element for which `compareFn` returned truthy value.  



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
L - Liskov substitution principle,  derived class should be substitutable for their base class, subclass should substitute base class w/o breaking base class     
I - Interface segregation principle, clients shouldn't be force to depend upon interfaces they don't use. better to create two specific interfaces rather than one big    
D - dependency inversion  principle, objects must depend on abstractions not concretions. hole in the middle pattern,      


### Web  
#### Cross-Origin Resource Sharing (CORS)  
Browser has same origin policy  it blocks request resources from different origin. Origin is domain, schema or port.  
Browser send request with header `Origin`  
Server responses with header `Access-Control-Allow-Origin: *`  
If proper header recieved, browser can share response data to the client site   


#### same origin policy  
Origin defined as protocol (https|https), host (ip addr|dns name), and port