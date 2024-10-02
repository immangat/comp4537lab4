const utils = require('./utils');

class Reader {
    constructor() {
        if (this.constructor === Reader) {
            throw new Error("Abstract classes can't be initiated")
        }
    }

    read() {
        throw new Error("Method 'getDefinition()' must be implemented.");
    }

}

class LocalReader extends Reader {
    constructor() {
        super();
    }


    read(filepath) {
        return utils.utils.readJsonFileToMap(filepath)
    }


}

class GoogleReader extends Reader {
    constructor() {
        super();
    }

    reader() {
        // TODO: Need to lear about google cloud functions
    }
}

class Writer {
    constructor() {
        if (this.constructor === Reader) {
            throw new Error("Abstract classes can't be initiated")
        }
    }

    write(dictionary, filepath) {
        throw new Error("Method 'getDefinition()' must be implemented.");
    }

}

class LocalWriter extends Writer {
    constructor(props) {
        super(props);
    }

    write(dictionary, filepath) {
        utils.utils.writeObjectToJsonFile(filepath, dictionary)
    }

}

class IO {
    constructor(writer, reader, filepath) {
        this.reader = reader;
        this.writer = writer;
        this.filepath = filepath;
        this.dictionary = this.reader.read(filepath)

    }

    getDefinition(word) {
        const definition = this.dictionary.get(word.toLowerCase())
        if (!definition) {
            throw new Error(`Unable to get definition: ${word}`);
        }
        return definition
    }

    addDefinition(word, definition) {
        const lowerCaseWord = word.toLowerCase()
        if (this.dictionary.has(lowerCaseWord)) throw new Error(`Unable to add definition: ${word}. Word already exists`);
        this.dictionary.set(lowerCaseWord, definition)
        this.writer.write(this.dictionary, this.filepath)
    }
}

module.exports = {
    LocalReader, GoogleReader, LocalWriter, IO
};
