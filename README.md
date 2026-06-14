# MediTrack Backend

Backend API for MediTrack, a full-stack medication search and management application.

The API provides user authentication, protected routes, and personal saved medication management for the MediTrack frontend.

## Description

MediTrack allows users to search medication data through the RxNorm API on the frontend and save selected medications to a personal account.

This backend handles:

* User registration
* User login
* JWT-based authentication
* Protected user routes
* Saved medication creation
* Saved medication retrieval
* Saved medication editing
* Saved medication deletion
* Duplicate medication prevention per user
* Request validation
* Centralized error handling
* Request and error logging

This project was developed as part of the TripleTen Web Development Final Project.

## Links

Backend API:

```txt
https://api.meditrack.twilightparadox.com
```

Frontend repository:

```txt
To be added
```

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token
* bcryptjs
* Celebrate / Joi
* Winston
* Express-Winston
* PM2
* Nginx

## Features

### Authentication

* Register new users
* Login existing users
* Hash passwords with bcryptjs
* Issue JWT tokens after successful login
* Protect private routes with authentication middleware

### User Management

* Get current authenticated user information

### Medication Management

* Save medications to a personal list
* Retrieve saved medications for the authenticated user
* Edit medication notes and frequency instructions
* Delete saved medications
* Prevent duplicate medications per user using `owner + rxcui`
* Verify medication ownership before editing or deleting

### Validation and Error Handling

* Validate request bodies and route parameters with Celebrate/Joi
* Return consistent error responses
* Handle invalid IDs, validation errors, unauthorized access, forbidden actions, not found errors, and duplicate conflicts
* Log requests and errors with Winston and Express-Winston

## API Endpoints

### Public Routes

#### Register User

```http
POST /signup
```

Request body:

```json
{
  "name": "Pedro",
  "email": "pedro@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /signin
```

Request body:

```json
{
  "email": "pedro@example.com",
  "password": "password123"
}
```

Successful response:

```json
{
  "token": "jwt_token"
}
```

### Protected Routes

Protected routes require an Authorization header:

```http
Authorization: Bearer <token>
```

#### Get Current User

```http
GET /users/me
```

#### Get Saved Medications

```http
GET /medications
```

#### Save Medication

```http
POST /medications
```

Request body:

```json
{
  "keyword": "ibuprofen",
  "name": "Ibuprofen 200 MG Oral Tablet",
  "synonym": "Ibuprofen Oral Tablet",
  "tty": "SCD",
  "rxcui": "5640",
  "notes": "",
  "frequency": ""
}
```

#### Update Saved Medication

```http
PATCH /medications/:medicationId
```

Request body:

```json
{
  "notes": "Take after food.",
  "frequency": "Once daily"
}
```

#### Delete Saved Medication

```http
DELETE /medications/:medicationId
```

## Duplicate Medication Protection

MediTrack prevents the same user from saving the same medication more than once.

A medication is considered duplicate when the same authenticated user already has a saved medication with the same `rxcui`.

Protection is handled at two levels:

* Controller logic checks for an existing medication before creating a new one.
* MongoDB uses a unique compound index with `owner + rxcui`.

Duplicate response:

```http
409 Conflict
```

```json
{
  "message": "Medication already saved"
}
```

## Environment Variables

Production environment variables:

```env
NODE_ENV=production
JWT_SECRET=your_secret_key
MONGODB_URI=your_database_connection_string
```

Development mode can run without a `.env` file by using fallback values.

Default development values:

```txt
PORT=3000
MONGODB_URI=mongodb://localhost:27017/meditrackdb
```

## Installation

Clone the repository:

```bash
git clone git@github.com:p3drofaustino-lang/meditrack-backend.git
```

Navigate to the project folder:

```bash
cd meditrack-backend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the production server:

```bash
npm start
```

## Development Setup

The backend runs locally at:

```txt
http://localhost:3000
```

The frontend development server is expected to run at:

```txt
http://localhost:3001
```

MongoDB should be running locally before starting the backend.

## Project Structure

```txt
controllers/
  medications.js
  users.js

middlewares/
  auth.js
  errorHandler.js
  validation.js

models/
  SavedMedication.js
  User.js

routes/
  index.js
  medications.js
  users.js

utils/
  AppError.js
  errors.js

app.js
```

## Security Features

* Password hashing with bcryptjs
* JWT authentication
* Protected routes
* Ownership validation for saved medications
* Duplicate medication prevention per user
* Request validation with Celebrate/Joi
* Centralized error handling
* Production environment variables
* Request and error logging

## Deployment

The API is deployed on a Google Cloud VM using:

* MongoDB
* PM2
* Nginx
* HTTPS
* SSL certificates

Production API:

```txt
https://api.meditrack.twilightparadox.com
```

## Project Status

Core backend functionality is complete:

* User registration
* User login
* JWT authorization
* Protected routes
* Saved medication CRUD
* Medication ownership protection
* Duplicate prevention
* Request validation
* Error handling
* Logging
* Production deployment

Next steps:

* Add frontend repository link
* Add live frontend link
* Improve API documentation if needed
* Add automated tests in the future

## Author

Pedro Faustino

GitHub:

```txt
https://github.com/p3drofaustino-lang
```
