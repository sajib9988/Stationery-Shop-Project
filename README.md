                                                 🛍️ Stationery Shop Project
This is a full-stack Stationery Shop web application built with React.js, Tailwind CSS, TypeScript, Redux, Express.js, MongoDB, and JWT authentication.

🚀 Features
🔹 Frontend
✅ Modern UI with React.js & Tailwind CSS
✅ State management using Redux
✅ TypeScript for type safety
✅ User authentication with JWT
✅ Cart & Search functionality

🔹 Backend
✅ Modular Express.js architecture
✅ MongoDB with Mongoose ORM
✅ Zod for request validation
✅ JWT Authentication with protected routes
✅ Secure API with proper error handling

🏗️ Technologies Used
📌 Frontend
React.js
Tailwind CSS
TypeScript
Redux Toolkit
React Router
📌 Backend
Node.js & Express.js
MongoDB & Mongoose
Zod for validation
JWT Authentication
dotenv for environment variables
🛠️ Installation & Setup
Clone the repository
bash
Copy
Edit
git clone https://github.com/sajib9988/Stationery-Shop-Project.git
cd Stationery-Shop-Project
Install dependencies
🔹 Frontend
bash
Copy
Edit
cd frontend
pnpm install  # Using pnpm (preferred)
# OR
npm install   # If using npm
🔹 Backend
bash
Copy
Edit
cd backend
pnpm install  # Using pnpm (preferred)
# OR
npm install   # If using npm
Configure Environment Variables
Create a .env file inside the backend folder and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the development server
🔹 Frontend
bash
Copy
Edit
pnpm dev
🔹 Backend
bash
Copy
Edit
pnpm start
📌 API Documentation
🔹 Authentication
Method	Endpoint	Description	Protected
POST	/api/auth/register	Register a new user	❌
POST	/api/auth/login	Login user and return JWT	❌
GET	/api/auth/profile	Get user profile	✅
🔹 Products
Method	Endpoint	Description	Protected
GET	/api/products	Get all products	❌
GET	/api/products/:id	Get product details by ID	❌
POST	/api/products	Create a new product	✅ (Admin)
PUT	/api/products/:id	Update product details	✅ (Admin)
DELETE	/api/products/:id	Delete a product	✅ (Admin)
🔹 Cart
Method	Endpoint	Description	Protected
GET	/api/cart	Get user cart	✅
POST	/api/cart/add	Add item to cart	✅
DELETE	/api/cart/remove/:id	Remove item from cart	✅
🔹 Orders
Method	Endpoint	Description	Protected
POST	/api/orders	Place an order	✅
GET	/api/orders	Get user orders	✅
📸 Screenshots
(You can add screenshots here)

👨‍💻 Contributing
Pull requests are welcome! If you'd like to contribute, feel free to fork the repo and submit a PR.

📜 License
This project is open-source and available under the MIT License.