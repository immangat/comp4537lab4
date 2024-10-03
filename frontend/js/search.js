class Search {

    constructor() {

        this.wordInput = document.getElementById("wordInput");
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
        const word = this.getTexts()
        if (!word) {
            alert("Please enter a word");
            return false
        }

        return true
    }

    submitForm() {
        if (this.validateInputs()) {
            const word = this.getTexts()
            this.searchWord(word)
        }
    }

    getTexts() {
        return this.wordInput.value
    }

    clearInputs() {
        this.wordInput.value = "";
    }

    searchWord(word) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${serverURL}/api/definitions?word=${word}`, true);
        xhr.onload = (e) => {
            if (xhr.status === 200) {

                console.log(xhr.responseText)
                const data = JSON.parse(xhr.responseText);

                this.messageContainer.innerHTML = data.definition;
                this.clearInputs()
            } else {
                console.log(xhr.responseText)
                const data = JSON.parse(xhr.responseText);
                this.messageContainer.innerHTML = data.message;
            }
        }
        xhr.send()
    }
}

window.onload = () => {
    new Search()
}

