import path from "path";
import fs from "fs/promises";

export const handleUp = async (_, currentDir) => {
  const parentDir = path.dirname(currentDir);
  if (parentDir === currentDir) return currentDir;

  try {
    const stats = await fs.stat(parentDir);
    if (!stats.isDirectory()) throw new Error();
    return parentDir;
  } catch {
    throw new Error("Operation failed");
  }
};
