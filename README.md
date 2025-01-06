# Task Manager

A modern, feature-rich task management application built with React, Redux Toolkit, and Framer Motion. This application provides a beautiful and intuitive interface for managing your daily tasks with smooth animations and real-time feedback.

## Features

### Core Functionality
- ✨ Create, read, update, and delete tasks (CRUD operations)
- ✅ Mark tasks as complete/incomplete
- 📝 Edit task descriptions
- 🔄 Real-time updates with smooth animations
- 💾 Persistent storage with MongoDB

### User Experience
- 🎯 Duplicate task detection
- ⌨️ Keyboard shortcuts support
  - Enter to save
  - Escape to cancel
- 🎨 Smooth animations and transitions
- 📱 Responsive design

### Visual Feedback
- 🚦 Color-coded notifications for different actions
  - Green for success
  - Yellow for warnings
  - Red for errors
- ✨ Interactive hover effects
- ⚡ Animated task transitions
- 🔄 Loading spinner animation

### Data Validation
- 🛡️ Empty task prevention
- 🔍 Duplicate task detection
- ⚠️ Error handling with user feedback

## Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Heroicons** - Icons
- **Axios** - API requests
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Cors** - Cross-origin resource sharing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Create `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

Create `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoList.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   ├── taskSlice.js
│   │   │   └── alertSlice.js
│   │   ├── context/
│   │   │   └── TodoContext.jsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── routes/
    │   └── tasks.js
    ├── models/
    │   └── Task.js
    ├── package.json
    └── server.js
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)