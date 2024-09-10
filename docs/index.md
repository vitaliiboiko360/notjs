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

### Typescript  


### Node.JS  
####  child_process  
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

### Web  
#### Cross-Origin Resource Sharing (CORS)  
Browser has same origin policy  it blocks request resources from different origin. Origin is domain, schema or port.  
If we need to allow request, the response from server should include header:  
`Access-Control-Allow-Origin: *`  
