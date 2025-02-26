# Stationery Shop Project

### [Client Live Link](https://stationery-shop-project-phi.vercel.app/)

### [Backend Live Link](https://stationery-shop-project-server.vercel.app/)

## Project Overview

**Stationery Shop Project** is a user-friendly stationery shop application designed for seamless product management, secure authentication, and a visually appealing shopping experience. This platform ensures smooth operations with role-based access control, payment integration, and a fully responsive interface.

## Features

### 1. User Registration & Authentication (Role-Based)

- Secure user registration with name, email, and password.
- Default role: `customer` (admin role must be manually assigned).
- Secure password hashing before storing in the database.
- Login via email and password.
- **JWT Authentication:**
  - Generates a JWT token upon login for secure access.
  - Token stored in local storage to maintain user sessions.
- **Logout:**
  - Clears token and redirects user to login page.

### 2. Public Routes

#### **Home Page**

- **Navbar:** Logo, favicon, navigation links, login/signup buttons.
- **Banner:** Highlight special offers, includes a carousel option.
- **Featured Products:** Displays up to 6 products with a "View All" button.
- **Extra Section:** Testimonials, blog posts, or other engaging content.
- **Footer:** Essential links, social media, and contact details.

#### **All Products Page**

- **Search Functionality:** Search by brand, stationery name, or category.
- **Filters:** Price range, model, brand, category, and availability.
- **Dynamic Results:** Updates based on search terms or filters.
- **Product Cards:** Show product name, brand, model, price, and category.
- **View Details:** Button to view full product details.

#### **Product Details Page**

- Displays product image and full details.
- "Buy Now" button for checkout.

#### **About Page**

- Information about the shop and its mission.

### 3. Private Routes

#### **Checkout Page**

- Users can place orders with a form including:
  - Product details, user details, total price, and payment method.
- **Stock Validation:** Ensures ordered quantity does not exceed available stock.
- **Payment Integration:** SurjoPay gateway for secure transactions.
- "Order Now" button for purchase confirmation.

#### **Dashboard (Role-Based Access)**

##### **Admin Dashboard**

- Manage users (deactivate accounts, role management).
- Manage products (CRUD operations).
- Manage orders (CRUD operations).

##### **User Dashboard**

- View order history.
- Update profile settings.
- Change password (requires current password for security).

## UI/UX Design

- **Responsive Design:** Optimized for all screen sizes.
- **Error Handling:** User-friendly error messages for invalid login, registration errors, and failed operations.
- **Loading States:** Spinners/loaders for API calls (e.g., login, data fetch).
- **Toasts:** Notifications for key actions (e.g., "Login Successful," "Order Placed").

## Backend Requirements

### **Database: MongoDB**

- **Users Schema:** Includes roles (`customer`, `admin`).
- **Products Schema:** Stores details like name, brand, price, model, and stock.
- **Orders Schema:** Includes user reference, product details, total price, and order status.

### **Authentication & Security**

- Secure user registration, login, JWT generation, and logout.
- Passwords securely hashed before storing.
- Authentication middleware for private routes.

### **Product Management**

- Full CRUD operations for product management.

### **Order Management**

- CRUD operations for orders.
- Stock validation before order placement.

### **Payment Integration**

- SurjoPay integrated for payment processing.

### **Error Handling & Performance Optimization**

- Consistent and user-friendly error responses.
- Optimized API responses for large data loads.
- Pagination support for product listings and orders.

## Installation & Setup

### **Backend Setup**

1. Clone the repository:
   ```sh
   git clone https://github.com/sajib9988/Stationery-Shop-Project.git

2. Navigate to the backend directory:
   
sh
   cd server

3. Install dependencies:
   
sh
   npm install

4. Set up environment variables in a .env file:
   
env
   BCRYPT_SALT_ROUND=8
   PORT=5000
   DATABASE_URL=YOUR_DATABASE_URL
   NODE_ENV=development
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=15d
   JWT_ACCESS_SECRET=secret
   JWT_REFRESH_SECRET=secret2
   SP_ENDPOINT=https://sandbox.shurjopayment.com
   SP_USERNAME=sp_sandbox
   SP_PASSWORD=pyyk97hu&6u6
   SP_PREFIX=SP
   SP_RETURN_URL=http://localhost:5173/response

5. Start the backend server:
   
sh
   npm run start:dev


### **Frontend Setup**

1. Navigate to the frontend directory:
   
sh
   cd client

2. Install dependencies:
   
sh
   npm install

3. Set up environment variables in a .env file:
   
env
   VITE_REACT_APP_SERVER_URI=yur_serverLink/api

4. Start the development server:
   
sh
   npm run dev


## Technologies Used

### **Frontend:**

- React.js
- Redux Toolkit
- Tailwind CSS
- ShadCN UI

### **Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)

### **Other Tools:**

- SurjoPay (Payment Gateway)
- Cloudinary (for image uploads, if needed)

## Contribution Guidelines

- Fork the repository.
- Create a new branch (feature-branch).
- Commit changes with meaningful messages.
- Open a pull request for review.

## License

This project is licensed under the MIT License.

## Contact

For any queries, contact us at **[sajib.biswas9988@gmail.com](mailto\:sajib.biswas9988@gmail.com)**.