import { Command } from "commander";
import kleur from "kleur";

import { getAllTasks, addTask } from "./controller";

const program = new Command();

program
  .version("0.0.1")
  .name("Task manager")
  .description("A task management CLI");

program.command("add")
  .description("Add a new task")
  .argument("<taskName>", "Task name")
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


program.exitOverride((err) => {
  console.error(kleur.red(`Error: ${err.message}`));
  process.exit(1);
});

program.parse();
