import abcjs from "abcjs";

class MusicSheet {
    constructor() {
        this.clef = 'treble';
        this.chars = [];
    }

    getAbcNotation() {
        let abc = "L: 4/4\n" +
            `K:C clef=${this.clef}\n`;

        this.chars.forEach(char => {
            abc += char;
        });

        return abc;
    }

    clear() {
        this.chars = [];
    }

    push(char) {
        this.chars.push(char);
    }

    render() {
        abcjs.renderAbc('paper', this.getAbcNotation(), {
            scale: 3,
        });
    }

    drawRandomNote(notes, callback) {
        let index = Math.floor(Math.random() * notes.length);
        let currentNote = notes[index];

        this.clear();
        this.push(currentNote);
        this.render();

        if (callback) {
            callback();
        }

        return currentNote;
    }
}

export default MusicSheet;
