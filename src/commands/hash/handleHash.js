import fs from "fs";
import path from "path";
import { createHash } from "crypto";

export const handleHash = async (args, currentDir) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const filePath = path.isAbsolute(args[0])
    ? args[0]
    : path.join(currentDir, args[0]);

  const hash = createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => hash.update(chunk));
  stream.on("end", () => {
    console.log(hash.digest("hex"));
  });
};
