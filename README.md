# draftio_backend

This repository contains the backend setup for the **Draftio** project, built using **Express.js** following the **MVC (Model-View-Controller)** structure. This guide provides an overview of the setup and the steps necessary to run the project locally.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

## Project Overview
The **draftio_backend** is designed to serve as the backend for the Draftio platform, which communicates with a frontend (assumed to be running on a separate server). The backend manages authentication, data handling, and integrates with **Cloudinary** for media storage.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** (using **Mongoose** for object data modeling)
- **JWT (JSON Web Token)** for authentication
- **Cloudinary** for media uploads

## Installation
To get the backend server running locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/draftio_backend.git
   cd draftio_backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory of the project and add the following environment variable names:
   ```
   PORT=
   MONGODB_URL=
   FRONTEND_URL=
   JWT_SECRET=
   NODE_ENV=
   CLOUD_NAME=
   CLOUDINARY_KEY=
   CLOUDINARY_SECRET=
   ```
   > **Note:** Fill in the values for the above variables with your own configurations (do not share these publicly).

## Environment Variables Explained
Ensure the following environment variables are set:

- **PORT**: The port on which the server runs (e.g., 3001).
- **MONGODB_URL**: Your MongoDB connection string.
- **FRONTEND_URL**: The URL where the frontend is hosted (e.g., `http://localhost:5000`).
- **JWT_SECRET**: A secret key used for signing JWT tokens.
- **NODE_ENV**: The environment the server is running in (e.g., `development` or `production`).
- **CLOUD_NAME**: Your Cloudinary cloud name.
- **CLOUDINARY_KEY**: Your Cloudinary API key.
- **CLOUDINARY_SECRET**: Your Cloudinary API secret.

## Running the Project
1. Ensure your MongoDB server is running.
2. Start the backend server:
   ```bash
   npm start
   ```
   > The server will run on the specified `PORT` (e.g., `http://localhost:3001`).

## Project Structure
This project follows the **MVC** structure:
- **models/**: Contains Mongoose models.
- **controllers/**: Contains logic for handling routes.
- **routes/**: Defines API endpoints.
- **middlewares/**: Contains custom middleware functions.
- **config/**: Stores configuration for database and other services.

## Notes
- Ensure your `.env` file is properly configured before running the project.
- Keep your environment variables secure and do not expose sensitive data in public repositories.

## Additional Information
- **Cloudinary** integration is used for image and file uploads. Ensure that you have a valid Cloudinary account and API credentials.
- For any questions or issues, feel free to open an issue in the repository.

---

Happy coding and welcome to the Draftio backend!

