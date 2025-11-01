import path from "path";
import fs from "fs/promises";

export const handleCd = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");
  const targetPath = args[0];
  const newDir = path.resolve(currentDir, targetPath);

  try {
    const stats = await fs.stat(newDir);
    if (!stats.isDirectory()) throw new Error("Not a directory");
    return newDir;
  } catch {
    throw new Error("Operation failed");
  }
};
