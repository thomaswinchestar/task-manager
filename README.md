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

### Key Files and Their Purposes

- **App.jsx**: Contains the todo list implementation with:
  - Todo state management using localStorage
  - CRUD operations (Create, Read, Update, Delete)
  - Framer Motion animations
  - Keyboard shortcuts handling

- **vite.config.js**: Development server configuration:
  - Port: 3000
  - Auto-open browser feature

- **tailwind.config.js**: Tailwind CSS setup:
  - Content paths
  - Theme configuration

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/thomaswinchestar/task-manager.git
```

2. Navigate to the project directory

```bash
cd todo-list
```

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will automatically open in your browser at `http://localhost:3000`.

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

### Dependencies Installation Details

Main dependencies:

```bash
npm install framer-motion @heroicons/react
```

Dev dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

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


