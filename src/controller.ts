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
    const taskIdData = JSON.parse(fs.readFileSync(path.join(__dirname, "id.json"), "utf-8"));
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
    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify({ tasks: updatedTasks }, null, 2));
    fs.writeFileSync(path.join(__dirname, "id.json"), JSON.stringify({ id: taskId + 1 }, null, 2));
  } catch (err: any) {
    console.error(kleur.red(err.message));
  }
}

