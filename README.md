# Task Manager CLI
A simple Task Management CLI built using **Node.js** and **TypeScript**.
This CLI tool allows users to manage tasks with features like adding, listing, updating and deleting tasks.

## Features
  - Add a new task
  - List all tasks (with optional filtering by status)
  - Update task description
  - Update task status (Todo, In-Progress, Done)
  - Delete a task with confirmation prompt
  
## Installation
### Prerequisites
Ensure you have Node.js installed on your system.
  1. Clone the repository: ```git clone https://github.com/ShimanshuChauhan/Task-Tracker-CLI.git```
  2. Install dependencies: ```npm install```
   
## Usage
### Run the CLI 
```task-cli <command>```

### Available Commands

| Command              | Description                                      | Arguments                                      | Example Usage                         |
|----------------------|--------------------------------------------------|-----------------------------------------------|---------------------------------------|
| `add`               | Add a new task                                   | `<taskName>` (Task description)              | `task-cli add "Buy groceries"`   |
| `list`              | List all tasks                                   | `[status]` (Optional: `todo`, `in-progress`, `done`) | `task-cli list done`            |
| `delete`            | Delete a task                                   | `<taskId>` (ID of the task)                   | `task-cli delete 2`              |
| `update`            | Update task description                         | `<taskId>`, `<updatedDescription>`           | `task-cli update 3 "New title"`  |
| `mark-in-progress`  | Mark a task as in progress                      | `<taskId>`                                    | `task-cli mark-in-progress 4`    |
| `mark-done`         | Mark a task as done                             | `<taskId>`                                    | `task-cli mark-done 5`           |

## Project Structure
```
├── src
│   ├── index.ts          # Entry point of the CLI
│   ├── controller.ts     # Functions handling tasks
│   ├── data.json         # Storage file for tasks
│   ├── id.json           # Stores last used task ID
├── dist                  # Compiled JavaScript files
├── package.json          # Dependencies & scripts
└── tsconfig.json         # TypeScript configuration
```

## Dependencies
  - Commander.js - CLI framework
  - Kleur - Terminal text styling

Made with ❤️ using Node.js and TypeScript
