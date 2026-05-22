# SmartStore AI

An AI-powered e-commerce admin dashboard built using the MERN stack.  
The platform allows store owners to manage products, generate AI-based product content, and analyze sales insights through an intelligent dashboard.

---

# 🚀 Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login using localStorage

---

## Product Management
- Add Products
- Edit Products
- Delete Products
- Dynamic Product Table
- MongoDB Product Storage

---

## AI Features
- AI Product Description Generation
- SEO Tag Suggestions
- Marketing Caption Generation
- AI Sales Insights (Future Scope)

---

## Dashboard Features
- Revenue Overview
- Product Statistics
- AI Suggestion Tracking
- Responsive Admin Dashboard UI

---

# 🛠 Tech Stack

## Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

---

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt.js

---

## Database
- MongoDB Atlas

---

# 📂 Project Structure

smartstore-ai/
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── context/
│ ├── services/
│ └── types/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
└── README.md

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/VaishnaviSaw01/SmartStore-AI.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside backend:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
```

---

# 🔐 Authentication Flow

User Login/Register  
→ JWT Token Generated  
→ Token Stored in localStorage  
→ Protected Dashboard Access

---

# 📦 Product CRUD Flow

Frontend Form  
→ Axios API Request  
→ Express Route  
→ MongoDB Database  
→ Dynamic UI Update

---

# 🤖 AI Integration

The platform is designed to integrate OpenAI APIs for:
- product description generation
- SEO optimization
- marketing captions
- intelligent sales insights

---

# 📈 Future Scope

- AI Inventory Forecasting
- Sales Analytics Dashboard
- Chart.js Revenue Visualizations
- AI Pricing Recommendations
- Multi-store Support
- Cloud Deployment
- Role-Based Access Control

---

# 🧠 Concepts Used

- REST APIs
- JWT Authentication
- React Context API
- CRUD Operations
- MongoDB Integration
- Protected Routes
- State Management
- TypeScript Architecture

---

# 👩‍💻 Author

Vaishnavi Saw

---

