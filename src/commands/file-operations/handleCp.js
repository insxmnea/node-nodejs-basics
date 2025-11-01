import fsSync from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const handleCp = async (args, currentDir) => {
  if (args.length !== 2) throw new Error("Invalid input");

  const srcPath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const destDir = path.isAbsolute(args[1])
    ? args[1]
    : path.join(currentDir, args[1]);

  const destPath = path.join(destDir, path.basename(srcPath));
  await pipeline(
    fsSync.createReadStream(srcPath),
    fsSync.createWriteStream(destPath)
  );
  return currentDir;
};
