import MIDI from './MIDI';
import MusicSheet from './MusicSheet';
import Message from './FlashMessage';

const TEXT_PRESS_THE_KEY = 'Press the key on your keyboard...';
const TEXT_CORRECT = 'Correct';
const TEXT_INCORRECT = 'Incorrect';

let NOTES_TO_LEARN = [
    'B', 'b', 'b\'',
];

let message = new Message(
    document.getElementById('message')
);

let sheet = new MusicSheet();
let currentNote = sheet.drawRandomNote(NOTES_TO_LEARN, () => {
    message.text(TEXT_PRESS_THE_KEY);
});

let midi = new MIDI(navigator);
midi.onKeyDown(keyCode => {
    let playedNote = MIDI.getNoteByKey(keyCode);

    if (playedNote === currentNote) {
        message.success(TEXT_CORRECT);

        setTimeout(() => {
            currentNote = sheet.drawRandomNote(NOTES_TO_LEARN, () => {
                message.text(TEXT_PRESS_THE_KEY);
            });
        }, 300);
    } else {
        message.flashError(TEXT_INCORRECT, TEXT_PRESS_THE_KEY, 500);
    }
});
