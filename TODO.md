# Dictionary REST API Project

## Overview
This project implements a minimal dictionary REST API using Node.js that allows users to store and search for definitions of English words. The frontend is hosted separately from the backend, allowing for API communication between the two.

## To-Do List

### Setup and Preparation
1. **Choose Hosting Providers**:
    - Find two different hosting services for frontend (server1) and backend (server2) with HTTPS.

2. **Create Project Structure**:
    - Set up the directory structure:
      ```
      /COMP4537/labs/4/
          ├── store.html
          ├── search.html
          └── api/
              └── app.js
      ```

### Frontend (Server 1)
3. **Create `store.html`**:
    - Implement a form with:
        - A text box for the word input.
        - A text area for the definition.
        - A submit button.
    - Write JavaScript for:
        - Capturing form submission.
        - Validating input (non-empty, no numbers).
        - Sending a POST request to server2.
        - Displaying success or failure messages.

4. **Create `search.html`**:
    - Implement a search form with:
        - A text box for the word input.
        - A display area for the response.
    - Write JavaScript for:
        - Capturing search submission.
        - Validating input.
        - Sending a GET request to server2.
        - Displaying the definition or a not found message.

### Backend (Server 2)
5. **Create `app.js`**:
    - Set up a basic HTTP server in Node.js.
    - Implement an in-memory dictionary as an array of objects.
    - Track the number of requests served.

6. **Handle GET Request**:
    - Implement a route for GET requests to `/api/definitions/?word=book`.
    - Search for the word and return the definition or a not found message.

7. **Handle POST Request**:
    - Implement a route for POST requests to `/api/definitions`.
    - Validate input (non-empty).
    - Check for existing words and handle them accordingly.
    - Return success messages with updated entry count.

### Testing
8. **Test API Functionality**:
    - Use Postman or cURL to test GET and POST requests.

9. **Test Frontend Functionality**:
    - Open `store.html` and `search.html` in the browser to test forms.

### Deployment
10. **Deploy Frontend**:
    - Host `store.html` and `search.html` on a static file hosting service (server1).

11. **Deploy Backend**:
    - Host the Node.js application (`app.js`) on a hosting service (server2).

### Documentation
12. **Write Attribution**:
    - Include attribution for ChatGPT in code comments and learning hub submission.

13. **Prepare Submission**:
    - Zip the project folder as `YourTeam#Lab4.zip`.
    - Post URLs for the frontend and backend in the learning hub comment section.

### Additional Considerations
14. **Maintain Code Standards**:
    - Use `const` and `let` for variable declarations.
    - Store user-facing strings in a separate file if required.

15. **Familiarize Yourself with Code**:
    - Understand all lines of code to prepare for in-person marking.
