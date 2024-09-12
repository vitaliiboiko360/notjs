---
layout: default
---

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
Access Element:  
`at(index)` returns element at the `index` or undefined  if `index >= array.length` OR `-index < -array.length`
`entries()` returns a new array iterator object that contains the key/value pair for each index and element of the array
_sparse array with empty slots treated as if the empty element has value `undefined`_   
Scan/Inspect:  
`every(callbackFn, `_`thisArg`_`)` returns `true` if `callbackFn` returned `true` for each element of the array. or `false` if it has `callbackFn` returned `false` for the element and returns immediately after that element.

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