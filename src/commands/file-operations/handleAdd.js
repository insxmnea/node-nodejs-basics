import fs from "fs/promises";
import path from "path";

export const handleAdd = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const addPath = path.join(currentDir, args[0]);
  await fs.writeFile(addPath, "");
};
