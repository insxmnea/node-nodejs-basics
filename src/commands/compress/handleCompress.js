import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

export const handleCompress = async (args, currentDir) => {
  if (args.length !== 2) throw new Error("Invalid input");

  const srcPath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const destPath = path.isAbsolute(args[1])
    ? args[1]
    : path.join(currentDir, args[1]);

  await pipeline(
    fs.createReadStream(srcPath),
    createBrotliCompress(),
    fs.createWriteStream(destPath)
  );
};
