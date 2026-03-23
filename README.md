# done.

A modern, multi-project todo application for organizing and tracking your tasks efficiently.

## Features

- **Multi-Project Support**: Organize your todos into different projects
- **Task Management**: Create, complete, and organize todos with titles, descriptions, due dates, and priority levels
- **Persistent Storage**: All data is automatically saved to local storage
- **Clean UI**: Simple and intuitive user interface for managing tasks
- **Priority Levels**: Organize tasks by priority (low, medium, high)
- **Due Dates**: Track task deadlines with date support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Chrono-QuasarDev/done..git
cd done.
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server with hot reload:
```bash
npm start
```

This will open the application in your default browser and watch for file changes.

## Build

Create an optimized production build:
```bash
npm build
```

## Project Structure

```
├── src/
│   ├── index.html          # Application entry point HTML
│   ├── index.js            # Main application file
│   ├── style.css           # Global styles
│   ├── modules/            # Core application logic
│   │   ├── project.js      # Project class definition
│   │   ├── state.js        # Application state management
│   │   ├── storage.js      # Local storage management
│   │   └── todo.js         # Todo class definition
│   └── ui/
│       └── domController.js # DOM manipulation and rendering
├── webpack.config.js       # Webpack configuration
└── package.json            # Project metadata and dependencies
```

## Technologies Used

- **Webpack**: Module bundler and dev server
- **Babel**: JavaScript transpiler
- **date-fns**: Modern date utility library
- **CSS**: For styling

## Usage

1. Start the development server: `npm start`
2. Create a new project to organize your todos
3. Add todos to your projects with titles, descriptions, and due dates
4. Mark todos as complete when finished
5. Your progress is automatically saved to local storage

## License

ISC

## Repository

[GitHub Repository](https://github.com/Chrono-QuasarDev/done.)
