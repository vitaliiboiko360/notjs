import * as fs from 'node:fs';


const outFile = fs.readFileSync('./input.xml', {encoding: 'utf8'});

const lines = outFile.split('\n');
console.log(`lines.length=`,lines.length);

let pattern = '/d=\"[^\"]+/';
let re = new RegExp('d=\"([^\"]+)');

let paths = [];

for (let i=0; i<lines.length; ++i) {
    let match = lines[i].match(re);
    if(match) {
        console.log(match[1]);
        paths.push(match[1]);
    }
}

let tokens = paths.map(p => {
    return p.split(' ');
});

// console.log(tokens);
// process.exit(0);

let re2 = new RegExp('([0-9]+),([0-9]+)');

let muiltiplied = tokens.map(tokens => {
    return tokens.map(t => {
        let match = t.match(re2);
        if (!match)
            return t;
    
        let xCoord = parseFloat(match[1]) * 2;
        let yCoord = parseFloat(match[2]) * 2;
        // console.log(`${xCoord},${yCoord}`);
        return `${xCoord},${yCoord}`;
    })
});

console.log('\n\n');

for(let i=0; i<muiltiplied.length; i++) {
    console.log(muiltiplied[i].join(' '));
}

