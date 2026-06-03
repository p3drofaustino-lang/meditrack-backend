# MediTrack Backend

Backend API for MediTrack, a full-stack medication management application.

## Description

MediTrack allows users to search medications through the RxNorm API and manage a personal medication list.

The backend provides:

* User registration and authentication
* JWT-based authorization
* Personal medication management
* Protected routes
* Request validation
* Centralized error handling

## Links

Backend API: https://api.meditrack.twilightparadox.com

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Celebrate / Joi
* Winston
* Express-Winston

## Features

### Authentication

* Register users
* Login users
* JWT authentication

### User Management

* Get current user information

### Medication Management

* Save medications
* View saved medications
* Delete saved medications
* Ownership protection

## API Endpoints

### Public Routes

#### Register

POST `/signup`

#### Login

POST `/signin`

### Protected Routes

#### Get Current User

GET `/users/me`

#### Get Saved Medications

GET `/medications`

#### Create Medication

POST `/medications`

#### Delete Medication

DELETE `/medications/:medicationId`

## Environment Variables

Production environment variables:

```env
NODE_ENV=production
JWT_SECRET=your_secret_key
MONGODB_URI=your_database_connection_string
```

Development mode works without a `.env` file by using fallback values.

## Installation

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

## Security Features

* Password hashing with bcryptjs
* JWT authentication
* Protected routes
* Ownership validation
* Request validation with Celebrate/Joi
* Centralized error handling

## Project Status

Backend deployment completed.

The API is deployed on Google Cloud VM with:
- MongoDB
- PM2
- Nginx
- HTTPS
- SSL certificates

Developed as part of Phase 2 of the TripleTen Web Development Final Project.

## Author

Pedro Faustino

GitHub: https://github.com/p3drofaustino-lang

