class Store {
    constructor() {

        this.wordInput = document.getElementById("wordInput");
        this.textArea = document.getElementById("definitionArea");
        this.submitButton = document.getElementById("submitButton");
        this.messageContainer = document.getElementById("message-text");
        this.initStore()
    }

    initStore() {
        this.submitButton.addEventListener("click", (e) => {
            this.submitForm()
        })
    }

    validateInputs() {
        const [word, definition] = this.getTexts()
        if (!word) {
            alert("Please enter a word");
            return false
        }
        if (!definition) {
            alert("Please enter a definition")
            return false;
        }
        return true
    }

    submitForm() {
        if (this.validateInputs()) {
            const [word, definition] = this.getTexts()
            this.storeWord(word, definition)
        }
    }

    getTexts() {
        const word = this.wordInput.value;
        const definition = this.textArea.value;
        return [word, definition]
    }

    clearInputs() {
        this.wordInput.value = "";
        this.textArea.value = "";
    }

    storeWord(word, definition) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${serverURL}/api/definitions`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = (e) => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                this.messageContainer.innerHTML = data.message;
                this.clearInputs()
            } else {
                const data = JSON.parse(xhr.responseText);
                this.messageContainer.innerHTML = data.message;
            }
        }
        let data = {
            word: word, definition: definition
        }
        xhr.send(JSON.stringify(data))
    }
}

window.onload = () => {
    new Store()
}
