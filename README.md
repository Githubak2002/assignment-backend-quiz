# Online Quiz API

A RESTful API for a basic online quiz application built using Node.js and Express.js. This API supports user authentication, quiz management, and scoring.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Quiz Management](#quiz-management)
- [Data Models](#data-models)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- User registration and authentication
- Create, retrieve, update, and delete quizzes
- Take quizzes and receive scores
- Multiple Choice Questions (MCQs) with a single correct answer
- User score tracking and history

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Token (JWT) for authentication
- Bcrypt.js for password hashing
- dotenv for environment variable management

## Requirements

- Node.js (v14 or later)
- MongoDB (local or cloud)
- npm (usually comes with Node.js)

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/quiz-api.git
   cd quiz-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication

#### Register a New User
- **POST** `/api/auth/register`
- **Body:** 
  ```json
  {
    "userName": "string",
    "email": "string", 
    "password": "string"
  }
  ```
- **Response:** User object with JWT token

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** JWT token

### Quiz Management

#### Create a New Quiz
- **POST** `/api/quizzes`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "questions": [
      {
        "question": "string",
        "options": ["string", "string", "string", "string"],
        "correctAnswer": "string"
      }
    ]
  }
  ```
- **Response:** Created quiz object

#### Get All Quizzes
- **GET** `/api/quizzes`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of quiz objects

#### Get Quiz by ID
- **GET** `/api/quizzes/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Quiz object

#### Update a Quiz
- **PUT** `/api/quizzes/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create quiz
- **Response:** Updated quiz object

#### Delete a Quiz
- **DELETE** `/api/quizzes/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Success message

#### Take a Quiz
- **POST** `/api/quizzes/:id/take`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "answers": ["string", "string", ...]
  }
  ```
- **Response:** Score and correct answers

#### Get User's Quiz History
- **GET** `/api/users/quizHistory`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of quiz attempts with scores

## Data Models

### User Model
```javascript
const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});
```

### Quiz Model
```javascript
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  answer: {
    type: String,
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});
```

These models define the structure of the data stored in MongoDB:

- The User model includes a unique username, a unique email, and a password.
- The Quiz model consists of a title and an array of questions.
- Each question has the question text, an array of options, and the correct answer.

## Testing

For API testing, use the provided Postman collection: [Quiz API Postman Collection](https://api.postman.com/collections/30812346-8556b7bc-61ce-420a-9ac1-1ae1bd67bf2b?access_key=PMAT-01J9XM64D6VXK0S7NDJKY8EK9A)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

