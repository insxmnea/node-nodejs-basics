import fs from "fs/promises";
import path from "path";

export const handleRn = async (args, currentDir) => {
  if (args.length !== 2) throw new Error("Invalid input");

  const oldPath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const newPath = path.join(path.dirname(oldPath), args[1]);
  await fs.rename(oldPath, newPath);
};
