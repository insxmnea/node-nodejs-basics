import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const handleMv = async (args, currentDir) => {
  if (args.length !== 2) throw new Error("Invalid input");

  const src = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const destD = path.isAbsolute(args[1])
    ? args[1]
    : path.join(currentDir, args[1]);

  const dest = path.join(destD, path.basename(src));

  await pipeline(fsSync.createReadStream(src), fsSync.createWriteStream(dest));
  await fs.unlink(src);
};
