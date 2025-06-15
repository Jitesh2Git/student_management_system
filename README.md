# EduPanel - MERN Stack Student Management System

A comprehensive student management system built with the MERN stack, featuring role-based authentication, student CRUD operations, and modern admin dashboard.

## 🌐 Live Demo

**Frontend:** [https://edupanel.netlify.app](https://edupanel.netlify.app)  
**Backend API:** Deployed on Render

## 📹 Demo Video

https://github.com/user-attachments/assets/f44720ea-a20b-4779-81a7-4438770140f7

## 🚀 Features

- **Role-Based Authentication**: Secure admin/user login with cookie-based JWT tokens
- **Admin Dashboard**: Complete student management with CRUD operations
- **User Profile Management**: Students can view and edit their basic information
- **Student Registration**: Admin can add new students to the system
- **Profile Updates**: Admin can modify any student details, users can edit basic info
- **Account Management**: Admin can delete student accounts
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Instant UI updates with Redux state management
- **Secure API**: Protected routes with JWT middleware and role-based access
- **Modern UI**: Clean and intuitive interface with Tailwind CSS
- **Date Selection**: Interactive date picker for date fields

## 🛠️ Tech Stack

### Frontend

- **React** - UI Library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Motion** - Animation library
- **Tabler Icons** - Icon library
- **Sonner** - Toast notifications
- **React Date Picker** - Date selection component

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware

### Development Tools

- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variables

## 📁 Project Structure

```
edupanel/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets (favicon, logos, manifest)
│   ├── src/
│   │   ├── assets/            # Images and illustrations
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Redux store configuration
│   │   ├── lib/               # Utility / Validation / Env config
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── .env.development.local # Development environment variables
│   ├── .env.production.local  # Production environment variables
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── vite.config.js         # Vite configuration
├── server/                     # Backend Express application
│   ├── config/                # Configuration files
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── database/              # Database configuration
│   ├── .env.development.local # Development environment variables
│   ├── .env.production.local  # Production environment variables
│   ├── .env.example           # Environment variables template
│   ├── app.js                 # Entry point
│   └── package.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Jitesh2Git/student_management_system.git
cd edupanel
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create environment configuration in the server directory using one of these options:

**Option 1:** Create `.env` file  
**Option 2:** Use `.env.development.local` for development environment  
**Option 3:** Use `.env.production.local` for production environment  
**Option 4:** Copy `.env.example` to `.env` and fill in your values

```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/edupanel
# OR for MongoDB Atlas:
MONGO_URI=mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=1d
FRONTEND_URL=http://localhost:3000
```

Start the development server (using nodemon - use npm start if you don't want to use nodemon):

```bash
npm run dev
```

The server will run on `http://localhost:8000`

### 3. Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create environment configuration in the client directory using one of these options:

**Option 1:** Create `.env` file  
**Option 2:** Use `.env.development.local` for development environment  
**Option 3:** Use `.env.production.local` for production environment  
**Option 4:** Copy `.env.example` to `.env` and fill in your values

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Schema

### User Model (Admin)

```javascript
{
  _id: ObjectId,
  name: String (required, trimmed, 2–50 characters),
  email: String (required, unique, lowercase, validated format),
  password: String (required, hashed, min 6 chars with uppercase, lowercase, number, special char),
  role: String (enum: ['admin', 'user'], default: 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Student Model (User)

```javascript
{
 {
  _id: ObjectId,
  firstName: String (required, trimmed, 2–50 characters),
  lastName: String (required, trimmed, 2–50 characters),
  email: String (required, unique, lowercase, validated format),
  phone: String (required, valid Indian number),
  course: String (required, trimmed),
  enrollmentNumber: String (required, unique, format: ABCD-123-456),
  admissionDate: Date (required),
  user: ObjectId (required, reference to User),
  createdAt: Date,
  updatedAt: Date
}
}
```

## 🔐 API Endpoints

### Authentication Routes

```
GET  /api/v1/auth/verify                    # Verify JWT token
POST /api/v1/auth/sign-up                   # Admin registration
POST /api/v1/auth/sign-up-user              # Student registration by admin (Protected, Admin only)
POST /api/v1/auth/sign-in                   # User/Admin login
POST /api/v1/auth/sign-out                  # User/Admin logout
```

### Admin Routes (Protected, Admin only)

```
GET    /api/v1/admin/get-users              # Get all students
PATCH  /api/v1/admin/update-user/:id        # Update student by admin
DELETE /api/v1/admin/delete-user/:id        # Delete student account
GET    /api/v1/admin/:id                    # Get admin profile
PUT    /api/v1/admin/:id                    # Update admin profile
DELETE /api/v1/admin/:id                    # Delete admin account
```

### User Routes (Protected, User only)

```
GET   /api/v1/users/:id                     # Get user profile
PATCH /api/v1/users/:id                     # Update user basic info
```

**Note:** Admin routes require JWT authentication and admin role verification. User routes require JWT authentication.

## 🎨 UI Components

- **Authentication Forms**: Role-based login and signup forms with validation
- **Admin Dashboard**: Comprehensive student management interface
- **Student Cards**: Student information display cards
- **User Profile**: Personal information view and edit forms
- **Navigation**: Role-based responsive navigation with header
- **Modals**: Student creation and editing modals
- **Date Picker**: Interactive date selection for date fields
- **Toast Notifications**: Success/error feedback
- **Loading States**: Skeleton loaders and spinners

## 🔒 Security Features

- **JWT Authentication**: Secure cookie-based token authentication
- **Role-Based Access Control**: Admin and user role segregation
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Frontend and backend route protection
- **Admin Middleware**: Role verification for admin-only operations
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side request validation
- **Error Handling**: Comprehensive error handling and logging

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes
- Adaptive admin dashboard

## 🚀 Deployment

### Frontend (Netlify)

1. Connect your GitHub repository
   • Import your frontend repo (e.g., Vite + React) into Netlify.
2. Go through the build steps
   • Build command: `npm run build`
   • Publish directory: `dist`
3. Set environment variables
   • Add any required variables (e.g., `VITE_API_URL`) under:
   • Site settings → Environment variables
4. Deploy with automatic builds on push
   • Netlify will redeploy the site whenever you push changes to your GitHub branch.

### Backend (Render)

1. Connect your GitHub repository to Render
   • Import your backend repo (e.g., Node.js/Express) into Render.
2. Go through the build steps
   • Build command: `npm install`
   • Start command: `npm start`
   • Make sure your package.json has a valid "start" script.
3. Set environment variables
   • Add all necessary backend environment variables like:
   `PORT`, `MONGO_URI`, `JWT_SECRET`, etc.
4. Deploy with automatic builds on push
   • Render will automatically redeploy your backend whenever you push updates.

## 📋 Available Scripts

### Frontend (client/)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend (server/)

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 👥 User Roles

### Admin Capabilities

- View all students in the system
- Add new students to the platform
- Edit any student's complete profile
- Delete student accounts
- Manage their own admin profile

### Student (User) Capabilities

- View their own profile information
- Edit basic personal information
- Update contact details
- Cannot access other students' data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
