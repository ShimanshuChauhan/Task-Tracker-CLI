/**
 * Task manager CLI
 * 
 * A simple CLI to manage tasks
 * Supports the following commands:
 * 1. add - Add a new task
 * 2. list - List all tasks
 * 3. delete - Delete a task
 * 4. update - Update a task
 */

import { Command } from "commander";
import kleur from "kleur";
import readline from "readline";
import { getAllTasks, addTask, deleteTask, updateTaskDescription, updateTaskStatus, getTasksByStatus, TaskStatus } from "./controller";

const program = new Command();

/** 
 * Command to add a new task
 * @argument {string} taskName - Task description
*/
program
  .version("0.0.1")
  .name("Task manager")
  .description("A task management CLI");

/**
 * Command to list all tasks
 * @argument {string} taskName - Description of the task
 */

program.command("add")
  .description("Add a new task")
  .argument("<taskName>", "Task description")
  .action((taskName: string) => {
    try {
      addTask(taskName);
      console.log(kleur.green("Task added successfully"));
    } catch (err: any) {
      console.error(kleur.red(err.message));
    }
  });

/**
 * Command to list all tasks
 * @argument {string} [status] - Task status (optional filter for task status: todo, in-progress, done)
 */

program.command("list")
  .description("List all tasks")
  .argument("[status]", "Task status (optional: todo, in-progress, done)")
  .action((status?: string) => {
    if (status) {
      if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        console.log(kleur.red("Invalid status. Please use one of the following: todo, in-progress, done"));
        return;
      }
      const tasks = getTasksByStatus(status as TaskStatus);
      console.log(tasks);
    } else {
      const tasks = getAllTasks();
      console.log(tasks);
    }
  });

/**
 * Command to delete a task
 * @argument {string} taskId - ID of the task to be deleted
 */

program.command("delete")
  .description("Delete a task")
  .argument("<taskId>", "ID of the task to be deleted")
  .action((taskId: string) => {
    //Prompt the user for conformation to delete
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(kleur.red(`Are you sure you want to delete ${taskId} task? (yes/no): `), (answer) => {
      if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        if (deleteTask(parseInt(taskId)))
          console.log(kleur.green("Task deleted successfully"));
      }
      else if (answer.toLowerCase() === "no" || answer.toLowerCase() === "n") {
        console.log(kleur.yellow("Task deletion aborted"));
      } else {
        console.log(kleur.red("Invalid input"));
        console.log(kleur.yellow("Task deletion aborted"));
      }
      rl.close();
      return;
    });
  });

/**
 * Command to update a task
 * @argument {string} taskId - ID of the task to be updated
 * @argument {string} updatedDescription - New description for the task
 */

program.command("update")
  .description("Update a task")
  .argument("<taskId>", "ID of the task to be updated")
  .argument("<updatedDescription>", "New description for the task")
  .action((taskId: string, updatedDescription: string) => {
    if (updateTaskDescription(parseInt(taskId), updatedDescription)) {
      console.log(kleur.green("Task updated successfully"));
    }
  });

/**
 * Command to mark a task as in-progress
 * @argument {string} taskId - ID of the task to be marked as in-progress
 */

program.command("mark-in-progress")
  .description("Mark task in progress")
  .argument("<taskId>", "ID of the task to be marked as in-progress")
  .action((taskId: string) => {
    if (updateTaskStatus(parseInt(taskId), "in-progress")) {
      console.log(kleur.green(`Task ${taskId} marked as in-progress`));
    }
  });


/**
 * Command to mark a task as done
 * @argument {string} taskId - ID of the task to be marked as done
 */
program.command("mark-done")
  .description("Mark task done")
  .argument("<taskId", "ID of the task to be marked as done")
  .action((taskId: string) => {
    if (updateTaskStatus(parseInt(taskId), "done")) {
      console.log(kleur.green(`Task ${taskId} marked as done`));
    }
  });

program.parse();
