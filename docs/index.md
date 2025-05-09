---
layout: default
---

[Backend/NestJS/Mongo](./backend.md)  
[Javascript/ES](#javascriptesweb)  
[Typescript](#typescript)  
[Node.js](#nodejs)  
[React](#reactredux)  
[HTML](#html)  
[CSS](#css)  
[Other questions](#other-questions)  
[Practical exercises](#practical)

### Javascript/ES/Web

#### Arrow functions  
Arrow functions don't have their own bindings to 
- this  
- arugements  
- super  
Arrow functions should not be used as methods  
Array functions cannot be used as constructor  
Calling new on arrow function returns TypeError    
Arrow function doesn't have access to new.target  
Arrow functions cannot use `yield`  
and cannot be created as generator functions  


#### Functions   
##### new.target  
`new.target` meta property to detect wheathe function or constructor was called using `new` keyword  
```js  
function Foo() {
  if (!new.target) {
    throw new TypeError("calling Foo constructor without new is invalid");
  }
}

try {
  Foo();
} catch (e) {
  console.log(e); // TypeError: calling Foo constructor without new is invalid
}
```  
  


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
- `values()` returns array iterator object that iterates the value of each element in the array.

**Scan/Search/Inspect:**

- `every(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` returns `true` if `compareFn` returned `true` for each element of the array.  
  Immediately returns `false` if it has at least one element for which `compareFn` returned `false`
- `some(compareFn: (element, index, array)=>Boolean, `_`thisArg`_`)` Returns `false` if `compareFn` returned `false` for each array element.  
  Immediately returns `true` if a `compareFn` returned `true` for an array element.
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
- `keys()` returns object iterator, which iterates over array's element indices. In sparce arrays, empty slots still iterated

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

**Access individual characters**

- `at(index)` return new string consiting UTF-16 code unit located at the specified `index` position.  
  returns `undefined` if `index` is not found
- `charAt(index)` returns new string consiting UTF-16 code unit located at the specified `index` position.  
  returns empty string if `index` is not found  
  returns
- `charCodeAt(index)` returns integer between `0` to `65535` (`0xFFFF`) that represent
  the UTF-16 code point value of the character at the position `index`  
  returns `NaN` if `index` is not found
- `codePointAt(index)` returns integer that represent UTF-16 code point value at the specified `index`  
  returns `undefined ` if `index` is not found

**Check / Examine / Search**

- `startsWith(searchString, `_`position=0`_`)`  
  Returns `true` if the `searchString` is found at the beggining of the string (or at the `position`).  
  Returns `false` if not found.  
  _Note: if `searchString` is omitted `udnefined` value coerced to "undefined" and searched instead; method is case-sensitive; if `searchString` is empty string method returns `true`_
- `includes(searchString, `_`position=0`_`)`  
  Returns `true` if the `searchString` is found anywhere in the string, search is starting from `position`. Returns `false` if not found. _Note: method is case-sensitive;_
- `endsWith(searchString, `_`endPosition=str.length`_`)`  
  Returns `true` if the given `searchString`'s last character + 1, found at the `endPosition`. Returns `false` if not found. _Note: case-sensitive_
- `indexOf(searchString, `_`position=0`_`)` returns index of the first occurence of `searchString` found. Search from `position` if `position` is negative it became `0`  
  returns `-1` if `searchString` is not found in the string
- `lastIndexOf(searchString, `_`position=+Infinity`_`)` return index of the last occurence of `searchString` found. Search from `position` if `position` is negative it became `0` and search would be only at `0` position.  
  returns `-1` if `searchString` is not found in the string
- `localeCompare(compareString, `_`locales`_`, `_`options`_`)`  
  returns negative if the called string occurs before `compareString`  
  returns positive if the called string occurs after `compareString`  
  returns `0` if the called string equivalent to `compareString`  
  _Note: ECMAScript specification only mandates negative and positive values_
- `match(regularExpression)` returns array of all results matching `regularExpression`:  
  if the `g` flag specified then capturing groups are not included in results.  
  if the `g` flag is not used, only first complete match and its related capturing groups are returned  
   `regularExpression` is regular expression `RegExp` object, (or any object with `.match` method). if it is not `RegExp` it will implicitly converted to `new RegExp(regularExpression)`
- `matchAll(regularExpression)` retruns iterator object of matches or empty iterator if no matches are found.  
  `regularExpression` is regular expression `RegExp` object, (or any object with `.match` method). if it is not `RegExp` it will implicitly converted to `new RegExp(regularExpression, 'g')`. if `regularExpression` is `RegExp` and doesn't have the `g` flag, `TypeError` is thrown.
- `search(regularExpression)` returns the index of the first match of `regularExpression`.  
  return `-1` if match not found  
  `regularExpression` should be `RegExp` or any object with `.search` method, or it will be implicitly converted to `new RegExp(regularExpression)`

**New String/Array**

- `concat(`_`str1`_`,`_`strN`_`)` returns a new string containing the combined text from string object it called upon and the arguments string provided
- `repeat(count)` returns a new string containing the specified `count` number of copies of the current string
- `replace(pattern, replacement)` returns a new string with first matche is replaced with specified replacement pattern.  
  `replacement` can be a string or a function
  > string: it will replace the substring matched by `pattern`
  > function: iw will be invoked on every match and function's return value would be used as replacement text  
  > _Note: string pattern would be replaced only once_
- `replaceAll(pattern, replacement)` returns a new string with all matches are replaced with replaxement pattern;  
  `pattern` is expected to be an object with `.replace` method (like `RegExp`), value w/o it will be coerced to a string  
  `replacement` could be string or function, semantics are the same as for `String.replace` method
- `slice(indexStart,`_`indexEnd=str.length`_`)` returns a new string with extracted section from the original string; `indexStart` first index included in the resulting string; `indexEnd` first index excluded from the resulting string;  
  if `indexStart` is ommited `undefined` converted to `0`;
- `split(separator,`_`limit`_`)` returns array of strings, split at each point where `separator`  
  if `separator` is ommited or `undefined` then it returns array with original string as a single element `[str]`; if explicit `limit` is set to `0` then `split` returns `[]`;

```js
// NOTE: when trying to use split with '' empty string argument, to get an array of chars, it will not work
const a = '𝟘𝟙𝟚𝟛'.split('');
console.log(a);
// Output: ["�","�","�","�","�","�","�","�"]
```

- `substring(indexStart,`_`indexEnd`_`)` returns a new string with extracted section from the original string; extract characters starting from `indexStart` and up to but not included `indexEnd`; if `indexEnd` is ommited then it extracts characters up to the `str.length`;
- NOTE: difference between `splice` and `substring`: `splice` can work with negative indices counting from the end, `substring` treats negative indices as `0`;
- `trim()` returns a new string with original string is stripped of whitespace from beggining and end; it string doesnt have whitespaces before and after, it still returns a new string, essentially a copy;
- `trimStart()` or `trimeLeft()` returns a new string with original string is stripped of whitespace at the beggining, left side of the string;
- `trimEnd()` or `trimRight()` returns a new string with original string is stripped of whitespace from its end, right side of the string;
- `valueOf()` and `toString()` returns string itself
- `toWellFormed()` retruns a new string with any lone surrogates replaced by Unicode replacement character U+FFFD "�"
- `toLowerCase()` `toLowerCase(`_`locale`_`)` `toUpperCase()` `toLowerCase(`_`locale`_`)`

**Change / Update**

- `normalize(`_`form`_`)` returns a string containing the Unicode Normalization Form `normalize` converts string into normalized form common for all sequences of code points that represents the same characters.
- `padEnd(targetLength, `_`padString=" "`_`)` returns a string of the specified length padded with `padString` applied at the end of the current string
- `padStart(targetLength, `_`padString=" "`_`)` returns a string of the specified length padded with `padString` applied from the start of the current string

#### Objects

`Object.freeze()` prevents modification of properties of the object and prevent adding new properties  
`Object.defineProperty()` adds a property to an object or change attributes of the existing property; attributes like `configurable`, `enumerable`, `writable`, `value`

#### truthy falsy

all values are truthy when placed in boolean context, except falsy values:

> `false` `0` `-0` `0n` `""` `null` `undefined` `NaN`

#### JS Build-Ins

- `isFinite(value)` returns `false` if `value` is `NaN`, `Infinity`, `-Infinity`; otherwize returns `true`
- `isNaN(value)` returns `true` if `value` is `NaN`, otherwize retruns `false`
- `js typeof operand` returns "undefined" "object" "boolean" "number" "string" "function"
- `js obj.val?.prop; obj.val?.[expr]; obj.func?.(args)` the `.?` optional chaining operator is same as `.` but if object is `null` or `undefined` it will return `undefined`
- `new`creates an instance of user-defined object; `new MyObject` is same as `new MyObject()`
- `delete` removes property of object; `delete object.property` `delete object[properyt]`, returns `true` if value is NOT own non-configurable property, returns `false` when it is in non-strict mode or throws `Type Error` in strict mode; throws `Reference Error` if object is `super`
- `??` nullish coalescing opeartor; `leftExpression ?? rightExpression` means it returns `rightExpression` if `leftExpression` operand is null or undefined, otherwize returns right operand
- `??=` nullish coalescing assignment; `x ??= y` is equiavalent to `x ?? (x = y)`
- `...` speard operator, expands iterable (string or array) to its elements where they are expected (function calls or array literals)
- `yeald` return statement in generator function
- `super` access base class in derived class; in constructor you could acess `this` only after you called `super()` base class constructor
- `this` references execution context of the caller.
- `function*` define generator function
- `in` return `true` if specified propery is present in the object; syntax `prop in object`
- `parseFloat(value)`
- `parseInt(value)`

**Functions**

- `arguments` object contains values of passed parameters
- `apply` `bind` `call` are usable only with Funciton objects

**Object**  
**Object properties descriptos**  
Data and accessor descriptors have:

- `configurable` if `true` property could change its descriptor or could be removed from the object. **Default is `false`**
- `enumerable` only if `true` show up as property during enumeration. **Default is `false`**  
  Data descriptors also might have optional keys:
- `value` any value that could be associated with the property (number, object, function). **Default is `undefined`**
- `writable` if only `true` the `value` could be changed. **Default is `false`**  
  Accessor descriptors also might have optional keys:
- `get` `set` function getter and setter of the property. **Default is `undefined`**  
  **Static methods**
- `Object.assign(target, source1...sourceN)` copy all enumeratable own properties from source object to a target. Return target modified object
- `Object.create(proto, `_`propertiesObject`_`)` create a new object. Return new object with `proto` properties and methods
- `Object.defineProperties(object, props)` modifies or add properties from `props` to `object`. `props` is object of property names and their key is object of property descriptors described above. Returns modified `object`
- `Object.defineProperty(object, prop, descriptor)` define or modify property `prop` on the `object` accordint to the following `descriptor`. Return `object` with defined or modified property
- `Object.

**Instance methods**

- `seal` `freeze`

**Destructuring object**  
if property `undefined` or has no value the default value would be used,  
`null` does not trigger default-value-assing-logic

```js
const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

default value could be any expression  
` const { b = console.log("hey") } = { b: 2 };`

ignore incoming values  
`[, ,] = f();`

control binding pattern  
`const [a, b, ...{ length }] = [1, 2, 3];`

destructuring to a new name, rename variable  
`const { length: lengthOfArray } = [1, 2, 3];`

### Typescript

**decorators**  
Decorator is declaration that can be attached class, class methods,

**Class Parameters Properties**

```js
class MyClass {
  constructor(public publicProperty1: number, private privateProperty1: number) {}
}
```

is equivalent

```js
class MyClass {
  constructor(publicProperty1: number, privateProperty1: number) {
    this.publicProperty1 = publicProperty1;
    this.privateProperty1 = privateProperty1;
  }
}
```

**Enum**

```js
enum NumberEnum {
  One = 1,
  Two,
}
```

```js
enum StringEnum {
  Word1 = "WORD1",
  Word2 = "WORD2",
}
```

```js
const enum ConstEnum {
  Const1 = "Const1",
  Const2 = "Const2",
}
```

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

### HTML/Web

**document**

- `document.images` read-only property returns a collection of images in the current html document
- `document.body` represents `body` or outermost `frameset` element or `null` if no such element
- `document.links` read-only property returns a collection of `<a>` or `<area>` elements where the value for `href` attribute is set
- `document.defaultView` return `window` object associated with a `document` or `null` if no `window` object avaialbe

**window**
``

**DOM**

- `Node.childNodes` returns a live collection of child `Node`s, it includes elements, text, and comments
- `Element.children` returns a collection of child nodes, it includes only elements
- `Node.nodeValue` get/set the value of node; if value is `null` setting won't work. For `Element`, `Document`, `DocumentFragment` (ShadowRoot), `DocumentType`, `NameNodeMap` the `nodeValue` is `null`
- `Element.append(element, ..., elementN)` and `Node.appendChild(node)`;  
  `apppend(element)` insert `element` after the last child of the `Element` return nothing, could insert all passed elements;  
  `appendChild(node)` insert only one `node` and return it;

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

#### Cross-Origin Resource Sharing (CORS)

Browser has same origin policy it blocks request resources from different origin. Origin is domain, schema or port.  
Browser send request with header `Origin`  
Server responses with header `Access-Control-Allow-Origin: *`  
If proper header recieved, browser can share response data to the client site

#### same origin policy

Origin defined as protocol (https|https), host (ip addr|dns name), and port

#### SQL

recursion and CTE
have to know about Third Normal Form,
indexes,  
referential integrity,  
cursors,  
key spaces,  
partitioning,  
backup and reorganisation,  
and what the EXPLAIN output means, if you are actually going to implement a database.  
CREATE TABLE or ALTER TABLE options - (such as redefining a primary key and modifying partitioning, which you want to do in the same statement on a big table, as both require a full table rebuild).  
clastered index scan, a table scan, seeks  
modelling data effectively cannot be done just by using an ORM. Indexing is vital

**simple commands**  
**SELECT**  
`SELECT * FROM table_name;`  
`SELECT field_name_1, field_name_2, field_name_N FROM table_name;`  
`SELECT usual_field_name, (variableOrFieldNameForExpression + variableOrFieldNamewForExpression)/2 AS field_output_name, another_field_name FROM table_name;`  
would return as result:  
`| usual_field_name | field_output_name | another_field_name |`  
`-------------------------------------------------------------`  
`| data_from_field__record_1 | result_of_expression_for_record_1 | data_from_another_field__record_1 |`  
`AS` relabels output column name  
`WHERE` `AND` `NOT` `OR`

`sql SELECT * FROM table_name WHERE field_name_1 = 'Equal to some data' AND field_name_2 > 0.0;`
`ORDER BY` sort  
`SELECT field, other_fields FROM table_name ORDER BY field, other_fields`  
`DISTINCT` remove duplicate rows  
`SELECT DISTINCT field FROM table;`

**INSERT**  
`INSERT` insert rows into table  
data should be in the order of fields  
`INSERT INTO table_name VALUES ('data for 1st field', 46, 50, 0.25, '2024-11-27');`  
or could specify fields  
`INSERT INTO table_name (field_1, field_2, field_3, field_4, field_5) VALUES ('data for 1st field', 43, 57, 0.0, '2024-11-27);`  
better to specify fields in order of input data explicitly  
`INSERT INTO table_name (field_3, field_1, field_5, field_0) VALUES ('data for 3th field', 42.0, '2024-11-27', 0.0)`  
**`COPY`** load large amounts of data from flat-text files  
`COPY table_name FROM '/path/to/flat-text/file.txt';`  
**`CREATE TABLE`**  
**`DROP TABLE`**

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

<details>  
  
<summary>solution</summary>   
  
```js  
function runOnce() {
  let isCalled = false;
  return function (arg) {
    if (isCalled)
      throw Error('already called');
    console.log(arg);
    isCalled = true;
  };
}
  
```  
  
</details>

#### write function `isPalindrom(input: string)`

```js
isPalindrome('abacaba'); // true
isPalindrome('qwerty'); // false
```

write function in one line  
explain adv/disadv of each implementation

<details>

<summary>Solution</summary>

### Palindrom TODO

```js
console.log('palindrom');
```

</details>

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
  
<summary>solution</summary>    
  
```js  
function flatten(array) {
  return array.flat(Infinity);
}
  
```  
  
</details>  
  
#### explain order of output

```js
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');
```
