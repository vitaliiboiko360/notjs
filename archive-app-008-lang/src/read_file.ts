import fs from 'fs';

export default function getText() {
    return fs.readFileSync('../data/threepigs.txt');
}