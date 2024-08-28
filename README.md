# Labyrinth Escape

![CI](https://github.com/mcaleb808/labyrinth-escape/actions/workflows/ci.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/ca926c3c6610e26b7aec/maintainability)](https://codeclimate.com/github/mcaleb808/labyrinth-escape/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ca926c3c6610e26b7aec/test_coverage)](https://codeclimate.com/github/mcaleb808/labyrinth-escape/test_coverage)

## Overview

Labyrinth Escape is a web application that allows users to interact with a labyrinth grid. Users can set start (`S`) and end (`E`) positions and attempt to find the shortest path between them. The application is built using Next.js, TypeScript, and Tailwind CSS, following a Test-Driven Development (TDD) approach.

You can access the live application here: [Labyrinth Escape](https://labyrinth-escape.vercel.app/).

## Table of Contents

- [Labyrinth Escape](#labyrinth-escape)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Development Process](#development-process)
    - [1. TDD Approach](#1-tdd-approach)
    - [2. Modularization](#2-modularization)
    - [3. Dynamic Labyrinth](#3-dynamic-labyrinth)
  - [Testing](#testing)
  - [API Endpoints](#api-endpoints)
  - [Future Improvements](#future-improvements)
  - [License](#license)

## Project Structure

```
.
├── __tests__            # Contains test files for different parts of the application
│   ├── api              # API route tests
│   ├── logic            # Business logic tests (e.g., shortest path calculation)
│   └── ui               # UI component tests
├── app
│   ├── api              # API route handlers
│   ├── favicon.ico      # Favicon for the application
│   ├── globals.css      # Global CSS styles for the application
│   ├── layout.tsx       # Layout component for consistent UI structure
│   ├── page.tsx         # Main page component
├── components           # React components used in the application
├── lib
│   ├── constants.ts     # Contains shared constants used across the application
│   ├── helpers.ts       # Helper functions for common logic
│   ├── labyrinthEscape.ts # Core logic for finding the shortest path in the labyrinth
│   └── types.ts         # Type definitions for the application
```

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mcaleb808/labyrinth-escape.git
   cd labyrinth-escape
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development Process

### 1. TDD Approach

The project was developed following a Test-Driven Development (TDD) approach. For each new feature, the corresponding tests were written first, and then the feature was implemented to pass the tests.

### 2. Modularization

The application is divided into reusable components, helper functions, and constants to ensure a clean and maintainable codebase.

### 3. Dynamic Labyrinth

The labyrinth grid is dynamic, allowing easy changes to the grid size by adjusting the `initialLabyrinth` in the constants file.

## Testing

The project includes unit tests, integration tests, and API route tests. All tests are located in the `__tests__` directory. The testing framework used is Jest, and tests can be run using the following command:

```bash
npm run test
```

## API Endpoints

- **POST /api/escape**

  This endpoint receives a labyrinth array and returns the shortest path from the start (`S`) to the end (`E`).

  **Request:**
  
  ```json
  {
    "labyrinth": [
      ["S", "0", "1", "0", "E"],
      ["1", "0", "1", "0", "1"],
      ["1", "0", "0", "0", "0"],
      ["0", "0", "1", "1", "1"],
      ["0", "0", "0", "0", "0"]
    ]
  }
  ```

  **Response:**
  
  ```json
  {
    "length": 8,
    "path": [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ]
  }
  ```

## Future Improvements

- **Enhance the UI**: Add more styling and animations to make the user experience more interactive.
- **Multiple Labyrinth Sizes**: Allow the user to select different sizes for the labyrinth grid.

## License

This project is licensed under the MIT License.
