---
layout: default
---

[NestJS](#nestjs)  
[MongoDB](#mongodb)

### NestJS

[DTO](#dto)  
[Validation](#validation)

#### DTO

#### Validation

### MongoDB

[mongosh](#mongosh)  
[mongoose](#mongoose)

#### mongosh

list collections  
`db.runCommand({listCollections:1,nameOnly:true})`  

get fields audio for all documents  
`db.runCommand({find:'lessons',projection:{'audio':1}})`  

get collection  
`var collectionName = db.getCollection(`collectionName`);`  
add `newField` with `newValue`  
`collectionName.updateOne({name:{$eq:'name'}},{$set:{'newField','newValue'}})`  
example:  
`var lessons = db.getCollection('lessons')`  
`lessons.updateOne({audio:{$eq:'mike_tiene_un_perro.mp3'}},{name:{$set:'mike_tiene_un_perro'}})`  


#### mongoose

##### Query

`Model.findOne()`  
`.findOne({name: 'name'}, projections, options).exec()`

`Query.prototype.select()`  
projections:  
Specifies which document fields to include or exclude (also known as the query "projection")
