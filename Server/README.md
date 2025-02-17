                          Blog Management Backend Project (Assignment 3)
This repository hosts the backend implementation for a comprehensive Blog Management System. Designed with scalability and security in mind, the application leverages modern web development technologies to ensure efficient and robust performance.

🚀 Features
1. User Authentication
JWT-based authentication for secure user login.
Encrypted password storage using bcrypt.
Supports user registration and login functionalities.

2. Blog Management
Create, update, delete, and fetch blogs.
Blogs are linked to authors and have flexible publishing options.

3. Admin Capabilities
Block users to restrict access.
Moderate and delete blogs to ensure content compliance.

4. Error Handling
Centralized error handling with custom AppError classes.
Improved debugging through structured error messages.

5. Environment Configuration
Dynamic configuration management using dotenv.


src/
├── app.ts                  # Main application setup
├── server.ts               # Application entry point
├── config/
│   └── index.ts            # Configuration management
├── middlewares/            # Custom middleware functions
│   ├── auth.ts             # Authentication middleware
│   ├── globalErrorHandler.ts  # Centralized error handling
│   └── validateRequest.ts  # Request validation logic
├── module/                 # Application modules
│   ├── admin/              # Admin functionalities
│   ├── auth/               # Authentication features
│   ├── blog/               # Blog-related features
│   └── user/               # User management
├── utils/                  # Utility functions
│   ├── AppError.ts         # Custom error class
│   ├── catchAsync.ts       # Async function wrapper
│   └── sendResponse.ts     # Standardized response helper

🛠️ Technologies Used
Node.js: Runtime environment.
Express.js: Backend framework.
TypeScript: Ensures type safety and better code maintainability.
MongoDB: Database for efficient data storage.
JWT: Secure token-based authentication.
Zod: Validation library for data integrity.
Prettier & ESLint: Maintain consistent and clean codebase.


1. Authentication
1.1 Register User
Endpoint: POST /api/auth/register
Description: Registers a new user by validating their data and saving it to the database.
Response: Success provides user details; failure indicates validation issues.
1.2 Login User
Endpoint: POST /api/auth/login
Description: Authenticates a user with email and password, returning a JWT token.
Response: Success provides an authentication token; failure indicates invalid credentials.

2. Blog Management
2.1 Create Blog
Endpoint: POST /api/blogs
Description: Allows authenticated users to create a blog by providing a title and content.
Response: Success returns the created blog details.
2.2 Update Blog
Endpoint: PATCH /api/blogs/:id
Description: Allows authenticated users to update their own blogs by providing updated details.
Response: Success returns the updated blog details.
2.3 Delete Blog
Endpoint: DELETE /api/blogs/:id
Description: Allows authenticated users to delete their own blogs.
Response: Confirms blog deletion.
2.4 Get All Blogs (Public)
Endpoint: GET /api/blogs
Description: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.
Response: Success returns a list of blogs based on applied filters.

3. Admin Actions
3.1 Block User
Endpoint: PATCH /api/admin/users/:userId/block
Description: Allows admins to block users by updating their isBlocked status.
Response: Confirms the user is blocked.
3.2 Delete Blog
Endpoint: DELETE /api/admin/blogs/:id
Description: Allows admins to delete any blog by its ID.
Response: Confirms blog deletion.


4.Search Endpoint and Others Query
Endpoint: /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18


🛡️ Security Highlights
Passwords hashed using bcrypt for enhanced security.
Role-based access control for admin and user functionalities.
Robust error handling to prevent sensitive data exposure.