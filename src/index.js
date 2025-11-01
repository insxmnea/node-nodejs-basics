import os from "os";
import readline from "readline";
import { handleUp } from "./commands/navigation/handleUp.js";
import { handleCd } from "./commands/navigation/handleCd.js";
import { handleLs } from "./commands/navigation/handleLs.js";
import { handleCat } from "./commands/file-operations/handleCat.js";
import { handleAdd } from "./commands/file-operations/handleAdd.js";
import { handleMkdir } from "./commands/file-operations/handleMkdir.js";
import { handleRn } from "./commands/file-operations/handleRn.js";
import { handleCp } from "./commands/file-operations/handleCp.js";
import { handleMv } from "./commands/file-operations/handleMv.js";
import { handleRm } from "./commands/file-operations/handleRm.js";
import { handleOs } from "./commands/os-info/handleOs.js";

const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
if (!usernameArg) {
  console.error("Username is required");
  process.exit(1);
}
const username = usernameArg.split("=")[1];

let currentDir = os.homedir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

rl.on("SIGINT", () => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

rl.on("line", async (input) => {
  input = input.trim();
  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  }

  try {
    const args = parseCommandLine(input);
    if (args.length === 0) {
      rl.prompt();
      return;
    }
    const command = args[0];
    const commandArgs = args.slice(1);

    await handleCommand(command, commandArgs);
    console.log(`You are currently in ${currentDir}`);
  } catch (err) {
    if (err.message === "Invalid input") {
      console.log("Invalid input");
    } else {
      console.log("Operation failed");
    }
  } finally {
    rl.prompt();
  }
});

rl.prompt();

function parseCommandLine(input) {
  const args = [];
  const regex = /"([^"]*)"|([^\s]+)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    args.push(match[1] || match[2]);
  }
  return args;
}

async function handleCommand(command, args) {
  switch (command) {
    case "up":
      currentDir = await handleUp(args, currentDir);
      break;
    case "cd":
      currentDir = await handleCd(args, currentDir);
      break;
    case "ls":
      await handleLs(args, currentDir);
      break;
    case "cat":
      await handleCat(args, currentDir);
      break;
    case "add":
      await handleAdd(args, currentDir);
      break;
    case "mkdir":
      await handleMkdir(args, currentDir);
      break;
    case "rn":
      await handleRn(args, currentDir);
      break;
    case "cp":
      await handleCp(args, currentDir);
      break;
    case "mv":
      await handleMv(args, currentDir);
      break;
    case "rm":
      await handleRm(args, currentDir);
      break;
    case "os":
      await handleOs(args);
      break;
    default:
      throw new Error("Invalid input");
  }
}
