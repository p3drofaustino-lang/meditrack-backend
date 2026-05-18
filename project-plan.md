# MediTrack — Final Project Plan

## Description

MediTrack is a full-stack web application for personal medication organization. The application allows users to search medications using a third-party API and view basic information about each medication.

In future phases, authenticated users will be able to save medications to a personal list, add dosage frequency, notes, and mark medications as active or inactive.

## Project Type

Custom full-stack application.

## Main Goal

Create a React application connected to an external medications API and later implement a custom backend for authentication and personal medication management.

## Third-Party API

The project will use the RxNorm API to search medications by name.

Example endpoint:

```txt
https://rxnav.nlm.nih.gov/REST/drugs.json?name=aspirin
```

Alternative API:
- openFDA Drug Label API

## MVP Features

### Public User

- Search medications
- View search results
- Open login modal
- Open register modal

### Authenticated User

- Save medications
- View personal medication list
- Remove medications
- Add dosage frequency
- Add notes
- Mark medications as active/inactive

## Future Features

- Filters by status
- Search inside personal list
- User profile
- Basic dashboard

## Frontend Stack

- React
- Vite
- JavaScript
- CSS

## Backend Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Agile Workflow

The project will be managed using Trello with the following columns:

- Backlog
- To Do
- In Progress
- Review
- Done

Development will be divided into short 3–4 day sprints.

## Safe Scope Definition

MediTrack is a personal medication organization application.

The application will not provide:
- medical diagnosis
- therapeutic recommendations
- interaction analysis
- clinical advice

## Success Criteria

- The application loads without errors
- Users can search medications
- Search results appear correctly
- Login and register modals work correctly
- Responsive layout works properly
- Components are organized correctly
- The code follows good practices and ESLint rules