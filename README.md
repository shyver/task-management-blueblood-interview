# Take Home Blueblood

This is a web application built with Next.js, Prisma. The application allows users to manage tasks with CRUD operations.

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database
# Project Documentation

## Features Implemented

    - CRUD (Create, Read, Update, Delete) operations for posts/articles.
    - Tagging and categorization of content for better organization.
    - Mobile-friendly interface.
    - Adaptive layout for different screen sizes.
    - Accessibility features for better user experience.



## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/take-home-blueblood.git
cd take-home-blueblood
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

```sh
DATABASE_URL="your_database_connection_string"
```

### 4. Initialize Prisma

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Development Server

```sh
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## API Documentation

### Endpoints

#### 1. Create Task

- **URL:** `/api/tasks`
- **Method:** `POST`
- **Description:** Create a new task.
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 2. Get All Tasks

- **URL:** `/api/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
  ```

#### 3. Get Task by ID

- **URL:** `/api/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieve a task by its ID.
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 4. Update Task

- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Description:** Update a task by its ID.
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### 5. Delete Task

- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.
- **Response:**

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```


