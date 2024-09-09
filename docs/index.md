---
layout: default
---

#### Javascript/ES/Web  
##### what is Promise  
*Promise* is object that represent eventual completion (or failure) of asynchronous operation.  
*Promise* is object to which are attached success and failure callbacks   
`.then` accepts callbacks for fullfilled or rejected case  
```javascript   
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value); // "Success!"
});
```  


##### difference Promise.allSettled, Promise.race and Promise.any  



#### Typescript  


#### Node.JS  
#####  child_process  
exec - spawn new shell, execute commands, 

##### event loop how does it work  

##### types of asynchronious operations in node.js  



#### React/Redux  



#### CSS  
##### 129 properites  
BoxModel  
Flex   
Animations  
Background  
Typography  
Grid  
Positioning  

#### HTML  
 

#### Other questions  
##### difference between node.js and browser  
in node there ain't `window` or `document`  
in browser no modules like file system access  
node updates ES standards fasters than browsers  
CommonJS `require()` or ES module system `import`  