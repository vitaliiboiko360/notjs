const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

const dataPath = path.join(__dirname, '../data');

//app.use(express.static(__dirname));
app.use('/data', express.static(dataPath));

app.listen(port);

console.log(`data path is: ${dataPath}`);

const files = fs.readdirSync(dataPath, {withFileTypes:false});

files.forEach(element => {
    console.log(`http://localhost:${port}/data/${element}`);
});

