const LEVEL_DEFAULT = 'default';
const LEVEL_SUCCESS = 'success';
const LEVEL_ERROR = 'error';

class FlashMessage {
    constructor(messageDiv) {
        this.messageDiv = messageDiv;
        this.flashTimer = null;
    }

    setLevel(level) {
        this.messageDiv.classList.remove(...[
            LEVEL_DEFAULT,
            LEVEL_SUCCESS,
            LEVEL_ERROR,
        ]);
        this.messageDiv.classList.add(level);
    }

    text(message) {
        this.messageDiv.innerText = message;
        this.setLevel(LEVEL_DEFAULT);
    }

    success(message) {
        this.messageDiv.innerText = message;
        this.setLevel(LEVEL_SUCCESS);
    }

    error(message) {
        this.messageDiv.innerText = message;
        this.setLevel(LEVEL_ERROR);
    }

    flashError(message, fallbackMessage, timeout = 300) {
        clearTimeout(this.flashTimer);
        this.error(message);
        this.flashTimer = setTimeout(() => {
            this.text(fallbackMessage);
        }, timeout);
    }
}

export default FlashMessage;
