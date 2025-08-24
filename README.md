🛒 MERN E-Commerce App – Front-End (React)

This is the front-end of a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This React app handles the client-side user interface, state management, routing, and integrates with a Node.js/Express backend API.

🌐 Tech Stack (Front-End)

React (UI library)

React Router (client-side routing)

Axios (HTTP requests)

Context API (state management for Auth & Cart)

CSS (styling)

📁 Folder Structure
src/
│
├── client/
│   └── axios.js            # Axios configuration for API calls
│
├── components/
│   ├── Header.jsx          # Navigation bar
│   └── Footer.jsx          # Footer component
│
├── context/
│   ├── AuthContext.jsx     # Authentication state context
│   └── CartContext.jsx     # Cart state context
│
├── data/
│   └── products.js         # Sample/mock product data (temporary)
│
├── pages/                  # Main route-level pages
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Profile.jsx
│   └── ProfilePage.jsx
│
├── services/
│   └── homeService.js      # Service functions to interact with backend APIs
│
├── App.jsx                 # App layout, routes, providers
├── App.css                 # App-wide CSS
├── index.css               # Global base styles
└── main.jsx        

📁 Project Structure: Detailed Explanation
src/

This is the main source directory where all your application code lives.

1. client/

Purpose: Handles configuration of API communication between front-end and back-end.

• axios.js

This file exports a customized Axios instance.

It's used to send HTTP requests (GET, POST, etc.) to your Express backend.

You can configure:

baseURL: The API base path (http://localhost:5000/api)

Interceptors for attaching auth tokens to headers

✅ Why? Centralizes all request settings so you don’t repeat them in each service/page.

2. components/

Purpose: Contains reusable UI components that appear on multiple pages.

• Header.jsx

Navigation bar with links (e.g., Home, Products, Cart, Profile)

Often displays user info or login/logout buttons if authenticated.

• Footer.jsx

Static footer with links, copyright, etc.

✅ Why? Keeps your layout clean and consistent across pages.

3. context/

Purpose: Implements React Context API to manage global state like authentication and cart.

• AuthContext.jsx

Stores the logged-in user's info (JWT, user ID, etc.)

Handles login/logout functions

Provides auth status (isAuthenticated)

• CartContext.jsx

Stores cart items and quantities

Provides cart actions like addToCart, removeFromCart, getTotalPrice, etc.

✅ Why? Allows you to share data (user or cart) across components without prop-drilling.

4. data/

Purpose: Holds static or mock data used during development or testing.

• products.js

Temporary list of product objects

Used before you integrate the back-end API

✅ Why? Lets you build and test the front-end without needing a live database.

5. pages/

Purpose: Contains all main pages/views in your app, used with React Router.

• Home.jsx

Landing page showing featured products or intro content

• Products.jsx

Displays all products (likely fetched from the backend)

• ProductDetail.jsx

Shows details for a single product, accessed via URL params like /product/:id

• Cart.jsx

Displays items added to the cart with total price

Options to change quantity or remove items

• Checkout.jsx

Form to submit shipping/payment information

Finalizes order (calls back-end API to create order)

• Login.jsx

Login form for users

Calls backend /login route, stores token in context

• Register.jsx

Sign-up form

Sends POST request to backend /register endpoint

• Profile.jsx

Displays current user info (name, email, etc.)

Might allow editing profile

• ProfilePage.jsx

Could include extra profile info, like:

Order history

Address book

Settings

✅ Why? Separates each route/page for maintainability and easier routing.

6. services/

Purpose: Contains functions that abstract API calls away from the UI logic.

• homeService.js

Might include functions like:

getFeaturedProducts()

getCategories()

Uses axios.js to send HTTP requests

✅ Why? Keeps your components clean by separating data-fetching logic.

7. App.jsx

The root component for your app

Sets up layout and routes using <Routes> and <Route>

Likely wraps children in AuthContext and CartContext providers

✅ Why? It’s the main layout wrapper and route manager.

8. main.jsx

The entry point of your React app

Uses ReactDOM.createRoot to render <App /> into the DOM

Wraps the app with context providers or router (BrowserRouter)

✅ Why? Bootstraps the React app with the root-level providers.

9. App.css / index.css

App.css: Styles specific to App.jsx or high-level layout

index.css: Global styles (e.g., resets, base font, colors)

✅ Why? Helps maintain a consistent design system.

🔁 How It All Connects (MERN Context)

React (Front-End):

Displays UI

Sends requests using axios.js from services/ to the back-end

Context (Global State):

AuthContext and CartContext maintain app-wide state

Back-End (Node + Express):

Receives requests from the front-end

Routes like /api/products, /api/login, etc., return JSON data

MongoDB (Database):

Stores products, users, orders, etc.

Backend retrieves this and sends it to the React app via APIs