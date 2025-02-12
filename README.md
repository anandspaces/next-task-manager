# Task Management System

## Overview
This is a **Full-Stack Personal Task Management System** built using Next.js 15, PostgreSQL, Drizzle ORM, and modern frontend technologies. It provides users with an intuitive dashboard to manage tasks and projects efficiently.

## Tech Stack
### **Frontend**
- Next.js 15 (App Router)
- React Query
- Zustand (State Management)
- Tailwind CSS (Styling)

### **Backend**
- Next.js API Routes
- PostgreSQL (Database)
- Drizzle ORM (Database ORM)

## Features
- **Authentication** (Sign up, Login, Logout)
- **Task & Project Management** (CRUD Operations, Categorization, Filtering)
- **Dashboard** (Task Stats, Progress Tracking, Calendar View)
- **Optimistic UI Updates** for better user experience

---

## Setup Instructions
### **Prerequisites**
- Node.js & npm
- PostgreSQL installed & running

### **Installation**
1. Clone the repository:
   ```sh
   git clone https://github.com/anandspaces/next-task-manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following:
   ```ini
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=root
   DB_NAME=tasks_db
   DATABASE_URL=postgres://postgres:root@localhost:5432/tasks_db
   ```

4. Generate the database schema and apply migrations:
   ```sh
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

---

## Project Structure
```
/task-manager
│── drizzle/             # Database migration files
│── src/
│   ├── app/            # Next.js pages and components
│   ├── db/
│   │   ├── schema.ts   # Database schema
│   │   ├── drizzle.config.ts  # Drizzle ORM configuration
│   ├── store/          # Zustand state management
│── .env.local          # Environment variables (ignored in Git)
│── .gitignore
│── package.json
│── README.md
```

---

## Scripts
- **`npm run dev`** - Start development server
- **`npx drizzle-kit generate`** - Generate migration files
- **`npx drizzle-kit push`** - Apply migrations to the database

---

## Contributing
Feel free to fork this repository and submit pull requests!

---
