import fs from "fs/promises";
import path from "path";

export const handleMkdir = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const dirPath = path.join(currentDir, args[0]);
  await fs.mkdir(dirPath);
};
