import { Command } from "commander";
import kleur from "kleur";
import readline from "readline";
import { getAllTasks, addTask, deleteTask, updateTaskDescription } from "./controller";

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


program.exitOverride((err: any) => {
  console.error(kleur.red(`Error: ${err.message}`));
  process.exit(1);
});

program.parse();
