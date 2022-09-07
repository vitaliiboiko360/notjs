import { string } from "prop-types";

export default class TextContainer {
    static numDivideBy: number = 4;
    textBlocks: Array<string> = [];

    constructor(text) {
        if (typeof text === 'undefined' || text.length == 0 ) {
            this.textBlocks = ['','','',''];
            return;
        }
        console.log(`text.length=${text.length}`);
        const lines = text.split('\n');

        const totalLinesLength = lines.reduce((total: number, line: string)=>{
            // console.log(`line is ${line}`);
            // console.log(`total is ${total}`);
            return total+line.length;
        },0);

        console.log(`totalLinesLength=${totalLinesLength}`);

        lines.reduce((lineAccumulator, line) => {
            let counter = lineAccumulator.runningLinesTotal + line.length;
            // console.log(`line is ${line}`);
            // console.log(`counter is ${counter}`);
            if (counter > (totalLinesLength / TextContainer.numDivideBy)) {
                this.textBlocks.push(lineAccumulator.text);
                console.log(`text block #${this.textBlocks.length} written`);
                return {text:line, runningLinesTotal: line.length};
            }
            return {text: lineAccumulator.text + '\n' + line, runningLinesTotal: counter};
        }, {text:'',runningLinesTotal:0});
        console.assert(this.textBlocks.length == TextContainer.numDivideBy, `text divided into ${this.textBlocks.length} parts`);
    }

   getTextBlock(percentValue: number) {
    console.log(`getTextBlock passed ${percentValue}`);
    return this.textBlocks[this.getIndex(percentValue)];
   }

   private getIndex(value: number) {
        if (value >= 25) return 1;
        if (value >= 50) return 2;
        if (value >= 75) return 3;
        return 0;
    }
}