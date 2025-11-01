import fs from "fs/promises";
import path from "path";

export const handleRm = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const rmPath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  await fs.unlink(rmPath);
};
