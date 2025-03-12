import { Command } from "commander";
import kleur from "kleur";
import readline from "readline";
import { getAllTasks, addTask, deleteTask, updateTaskDescription, updateTaskStatus } from "./controller";

const program = new Command();

program
  .version("0.0.1")
  .name("Task manager")
  .description("A task management CLI");

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

program.command("list")
  .description("List all tasks")
  .action(() => {
    const tasks = getAllTasks();
    console.log(tasks);
  })

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

program.command("update")
  .description("Update a task")
  .argument("<taskId>", "ID of the task to be updated")
  .argument("<updatedDescription>", "New description for the task")
  .action((taskId: string, updatedDescription: string) => {
    if (updateTaskDescription(parseInt(taskId), updatedDescription)) {
      console.log(kleur.green("Task updated successfully"));
    }
  });

program.command("mark-in-progress")
  .description("Mark task in progress")
  .argument("<taskId")
  .action((taskId: string) => {
    if (updateTaskStatus(parseInt(taskId), "in-progress")) {
      console.log(kleur.green(`Task ${taskId} marked as in-progress`));
    }
  });

program.command("mark-done")
  .description("Mark task done")
  .argument("<taskId")
  .action((taskId: string) => {
    if (updateTaskStatus(parseInt(taskId), "done")) {
      console.log(kleur.green(`Task ${taskId} marked as done`));
    }
  });

program.parse();
