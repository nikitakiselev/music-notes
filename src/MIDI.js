const MIDI_CODE_TO_NOTE_MAP = {
    36: 'C,,',
    38: 'D,,',
    40: 'E,,',
    41: 'F,,',
    43: 'G,,',
    45: 'A,,',
    47: 'B,,',

    48: 'C,',
    50: 'D,',
    52: 'E,',
    53: 'F,',
    55: 'G,',
    57: 'A,',
    59: 'B,',

    60: 'C',
    62: 'D',
    64: 'E',
    65: 'F',
    67: 'G',
    69: 'A',
    71: 'B',

    72: 'c',
    74: 'd',
    76: 'e',
    77: 'f',
    79: 'g',
    81: 'a',
    83: 'b',

    84: 'c\'',
    86: 'd\'',
    88: 'e\'',
    89: 'f\'',
    91: 'g\'',
    93: 'a\'',
    95: 'b\'',

    96: 'c\'\'',
};

const MIDI_NOTE_ON_CODE = 144;
const MIDI_NOTE_OFF_CODE = 128;

class MIDI {
    constructor(navigator) {
        if (! navigator.requestMIDIAccess) {
            throw new Error('WebMIDI is not supported in this browser.');
        }

        this.onKeyDownCallback = () => {};

        navigator.requestMIDIAccess()
            .then(
                midiAccess => {
                    for (let input of midiAccess.inputs.values()) {
                        input.onmidimessage = (midiMessage) => {
                            this.getMIDIMessage(midiMessage);
                        };
                    }
                },
                () => {
                    throw new Error('Could not access your MIDI devices.');
                }
            );
    }

    static getNoteByKey(code) {
        if (! MIDI_CODE_TO_NOTE_MAP[code]) {
            throw new Error(`Unknown MIDI key code: ${code}`);
        }

        return MIDI_CODE_TO_NOTE_MAP[code];
    }

    static getClefByKeyCode(keyCode) {
        if (keyCode <= 59) {
            return 'bass';
        }

        return 'treble';
    }

    getMIDIMessage(midiMessage) {
        let commandType = midiMessage.data[0];
        let midiCode = midiMessage.data[1];

        if (commandType !== MIDI_NOTE_ON_CODE) {
            return;
        }

        this.onKeyDownCallback.call(this, midiCode);
    }

    onKeyDown(callable) {
        this.onKeyDownCallback = callable;
    }
}

export default MIDI;
