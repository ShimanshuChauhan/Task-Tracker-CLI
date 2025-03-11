import kleur from "kleur";
import fs from "fs";
import path from "path";

enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export function getAllTasks(): Task[] {
  try {
    const filePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawData);
    return jsonData.tasks;
  } catch (err: any) {
    console.error(kleur.red(err.message));
    return [];
  }
}


export function addTask(description: string): void {
  try {
    const dataFilePath = path.join(__dirname, "data.json");
    const idFilePath = path.join(__dirname, "id.json");

    //Create data.json and id.json if they don't exist
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify({ tasks: [] }, null, 2));
    }
    if (!fs.existsSync(idFilePath)) {
      fs.writeFileSync(idFilePath, JSON.stringify({ id: 0 }, null, 2));
    }

    const taskIdData = JSON.parse(fs.readFileSync(idFilePath, "utf-8"));
    const taskId: number = taskIdData.id;
    const tasks = getAllTasks();
    const newTask: Task = {
      id: taskId + 1,
      description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTasks = [...tasks, newTask];
    fs.writeFileSync(dataFilePath, JSON.stringify({ tasks: updatedTasks }, null, 2));
    fs.writeFileSync(idFilePath, JSON.stringify({ id: taskId + 1 }, null, 2));
  } catch (err: any) {
    console.error(kleur.red(err.message));
  }
}

export function deleteTask(taskId: number): boolean {
  try {
    const tasks = getAllTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    if (updatedTasks.length === tasks.length) {
      console.log(kleur.red("Task not found"));
      return false;
    }

    //data.json will surely exist as getAllTasks() is called before this function
    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify({ tasks: updatedTasks }, null, 2));
    return true;
  } catch (err: any) {
    console.error(kleur.red(err.message));
    return false;
  }
}


export function updateTaskDescription(taskId: number, description: string): boolean {
  try {
    const tasks = getAllTasks();
    const taskToUpdate = tasks.filter((task) => task.id === taskId);
    if (taskToUpdate.length === 0) {
      console.log(kleur.red("Task not found"));
      return false;
    }
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.description = description;
        task.updatedAt = new Date();
      }
      return task;
    })
    //data.json will surely exist as getAllTasks() is called before this function
    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify({ tasks: updatedTasks }, null, 2));
    return true;
  } catch (err: any) {
    console.error(kleur.red(err.message));
    return false;
  }
}

