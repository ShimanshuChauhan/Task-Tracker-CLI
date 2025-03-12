import kleur from "kleur";
import fs from "fs";
import path from "path";

/**
 * Enum representating the possible status of a task
 * @readonly
 * @enum {string}
 */
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

/**
 * Interface representing a task
 * @interface
 * @property {number} id - The id of the task
 * @property {string} description - The description of the task
 * @property {TaskStatus} status - The status of the task
 * @property {Date} createdAt - The date the task was created
 * @property {Date} updatedAt - The date the task was last updated
 */

interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 *Retrives all tasks from data file (data.json)
 * @returns {Task[]} - An array of tasks
 */

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

/**
 * Adds a task to the data file (data.json)
 * @param {string} description - The description of the task
 * @returns {void}
 */
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

/**
 * Deletes a task from the data file (data.json) by it's id
 * @param taskId - The id of the task to be deleted
 * @returns {boolean} True if the task was deleted successfully, false otherwise
 */

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

/**
 * Updates the description of a task in the data file (data.json) by it's id
 * @param {number} taskId 
 * @param {string} description 
 * @returns {boolean} True if the task was updated successfully, false otherwise
 */

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

/**
 * Updates the status of a task in the data file (data.json) by it's id
 * @param {number} taskId - The ID of the task to be updated
 * @param {string} taskStatus - The new status of the task
 * @returns {boolean} True if the task was updated successfully, false otherwise
 */

export function updateTaskStatus(taskId: number, taskStatus: string): boolean {
  try {
    const tasks = getAllTasks();
    let updated = false;
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (taskStatus === "in-progress") {
          task.status = TaskStatus.IN_PROGRESS;
        }
        if (taskStatus === "done") {
          task.status = TaskStatus.DONE;
        }
        updated = true;
      }
      return task
    })

    if (!updated) {
      console.log(kleur.red("Task not found"));
      return false;
    }
    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify({ tasks: updatedTasks }, null, 2));
    return true;
  } catch (err: any) {
    console.log(kleur.red(err.message));
    return false;
  }
}

/**
 * Retrives all tasks filtered by status
 * @param {string} status - The status of the tasks to be retrieved
 * @returns {Task[]} - An array of tasks
 */

export function getTasksByStatus(status: string): Task[] {
  const tasks = getAllTasks();
  return tasks.filter((task) => task.status === status);
}

