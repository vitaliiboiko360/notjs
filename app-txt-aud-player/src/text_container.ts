import { string } from "prop-types";

export default class TextContainer {
    static numDivideBy: number = 4;
    textBlocks: Array<string> = [];

    constructor(text) {
        this.textBlocks = ['','','',''];
        if (typeof text === 'undefined' || text.length == 0 ) {
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

        lines.reduce((total: number, line: string) => {
            let currentTotal = total + line.length;
            this.textBlocks[this.getIndex(currentTotal*100/totalLinesLength)] += line;
            return currentTotal;
        }, 0);
        console.assert(this.textBlocks.length == TextContainer.numDivideBy, `text divided into ${this.textBlocks.length} parts`);
    }

   getTextBlock(percentValue: number) {
    console.log(`getTextBlock passed ${percentValue}`);
    return this.textBlocks[this.getIndex(percentValue)];
   }

   private getIndex(value: number) {
        if (value >= 75) return 3;
        if (value >= 50) return 2;
        if (value >= 25) return 1;
        return 0;
    }
}