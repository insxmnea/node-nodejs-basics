import fsSync from "fs";
import path from "path";

export const handleCat = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const catPath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const readStream = fsSync.createReadStream(catPath, "utf-8");
  readStream.pipe(process.stdout);
};
