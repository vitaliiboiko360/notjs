export default class TextContainer {
    static numDivideBy: number = 4;
    textBlocks: Array<number> = [];

    constructor(text) {
        const lines = text.split('\n');

        const totalLinesLenght = lines.reduce((total, line)=>{
            return total+line.Lenght();
        },0);

        lines.reduce((prevCounter, line, index) => {
            let counter = prevCounter+line.Length();
            if (counter > (totalLinesLenght / TextContainer.numDivideBy)) {
                this.textBlocks.push(index-1<0 ? 0 : index-1);
                counter = 0;
            }
            return counter+line.Length();
        }, 0);
        console.assert(this.textBlocks.length == TextContainer.numDivideBy, `text divided into ${this.textBlocks.length} parts`);
    }

   getTextBlock(percentValue: number) {
    return this.textBlocks[this.getIndex(percentValue)];
   }

   private getIndex(value: number) {
        if (value >= 25) return 1;
        if (value >= 50) return 2;
        if (value >= 75) return 3;
        return 0;
    }
}