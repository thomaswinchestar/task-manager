# React Todo List with Framer Motion

A modern, animated Todo List application built with React and Vite, featuring a clean UI and smooth animations. This project demonstrates the use of Framer Motion for animations and Tailwind CSS for styling, along with local storage for data persistence.

## Features

- ✨ Clean and modern UI with Tailwind CSS
- 🎯 Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- 💾 Persistent storage using localStorage
- 🎭 Smooth animations with Framer Motion
- ⌨️ Keyboard shortcuts for better accessibility
- 📱 Fully responsive design

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Hero Icons](https://heroicons.com/)

## Project Structure

todo-list/
├── src/
│ ├── App.jsx # Main todo list component
│ ├── main.jsx # Application entry point
│ └── index.css # Tailwind CSS imports and global styles
├── vite.config.js # Vite configuration (port 3000)
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
└── package.json # Project dependencies and scripts

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository

2. Navigate to the project directory

3. Install dependencies

4. Run the development server

The application will automatically open in your browser at `http://localhost:3000`.

## Usage

### Adding Todos
- Type your todo in the input field
- Press Enter or click the "Add" button

### Editing Todos
- Click the pencil icon (✎) on any todo to edit
- Press Enter to save or Escape to cancel
- Alternatively, use the check (✓) and cross (×) buttons

### Completing Todos
- Click the checkbox next to any todo to mark it as complete/incomplete

### Deleting Todos
- Click the trash icon (🗑) to delete a todo

### Keyboard Shortcuts
- `Enter`: Save todo (when editing)
- `Escape`: Cancel editing

## Key Features Implementation

### Local Storage Persistence
The app uses localStorage to persist todos between page refreshes:

### Framer Motion Animations
Smooth animations for todo items:

### Responsive Design
Fully responsive layout using Tailwind CSS:

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [Hero Icons](https://heroicons.com/) for the beautiful icons
