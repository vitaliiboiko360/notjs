import { string } from "prop-types";

export default class TextContainer {
    lines: Array<string> = [];

    constructor(text: string) {
        if (typeof text === 'undefined' || text.length == 0 ) {
            return;
        }
        
        this.lines = text.split('\n');
        console.log(`Txt length = ${text.length}\tNumber lines = ${this.lines.length}`);
    }
}