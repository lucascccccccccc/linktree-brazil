
# Linktree-brazil 🌳

A modern application for managing links and providing users with a unique personal page.  
Built with **Bun**, **Elysia**, **Prisma**, **JWT Authentication**, and styled using **Tailwind CSS** and **ShadCN**.  
The app features a backend API documented via **Swagger** and a frontend built with **Next.js**.

## Features

- **User Authentication**: Register, log in/out, and authenticate using **JWT** tokens.
- **Link Management**: Create and delete links for your personal page.
- **Unique Public Page**: Each user has a personalized page displaying their info and links.
- **Dashboard**: Update your profile, manage links, or delete your account from the dashboard.

## Technologies

- **Backend**: 
  - **Bun** for package management.
  - **Elysia** for building the API.
  - **Prisma** for database management.
  - **JWT** for authentication.


- **Frontend**:
  - **Next.js** for the frontend framework.
  - **Tailwind CSS** for styling.
  - **ShadCN** for UI components.

## Setup

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/linktree-brazil.git
   ```

2. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Configure the database with **Prisma**:
   - Set up your `.env` file for PostgreSQL credentials.
   - Run the migrations:
     ```bash
     npx prisma migrate dev
     ```

5. Start the backend:
   ```bash
   bun dev
   ```

### Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the frontend:
   ```bash
   bun dev
   ```

4. Access the frontend at `http://localhost:3000`.

## Swagger API Documentation

- The API is documented with **Swagger**. Visit `http://localhost:3000/swagger` to view and interact with the API endpoints.

## Project Structure

- `backend/`: API and server-side logic.
- `frontend/`: Client-side interface built with Next.js and styled with Tailwind CSS.
- `README.md`: This file.

## Screenshots

Here are some screenshots of the application:

![Screenshot 1](https://github.com/user-attachments/assets/9046a68d-650e-4dee-833c-6b4a8140dc70)
![Screenshot 2](https://github.com/user-attachments/assets/b6465621-2219-4912-b4bc-650a04af609b)
![Screenshot 3](https://github.com/user-attachments/assets/07574fe8-0de5-4169-8a9c-776990288a3b)
![Screenshot 4](https://github.com/user-attachments/assets/88d9fd78-f63b-4997-9108-45b904a364bf)
![Screenshot 5](https://github.com/user-attachments/assets/3d34d1db-3f1b-4446-be8d-3503f53fd218)





made w ❤ in 🇧🇷
