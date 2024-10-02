const fs = require('fs');

class Utils {
    static getParam(req, paramName) {
        try {
            const url = new URL(req.url, `https://${req.headers.host}`);
            const params = url.searchParams;
            return params.get(paramName);

        } catch (error) {
            console.error(error, `Error while reading ${paramName} `);
        }

    }

    static readJsonFileToMap(filePath) {
        try {
            // Read the file synchronously
            const data = fs.readFileSync(filePath, 'utf8');

            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Convert to a Map
            return new Map(jsonData);
        } catch (err) {
            console.error('Error reading or parsing the JSON file:', err);
            return null;
        }
    }

    static writeObjectToJsonFile(filePath, data) {
        const jsonString = JSON.stringify(Array.from(data.entries()));

        try {
            fs.writeFileSync(filePath, jsonString, 'utf8'); // Write JSON string to file
            console.log(`Data written to ${filePath} successfully.`);
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    }
}


exports.utils = Utils;
