import fs from "fs/promises";

const rename = async () => {
  const oldPath = "src/fs/files/wrongFilename.txt";
  const newPath = "src/fs/files/properFilename.md";

  try {
    await fs.access(newPath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  try {
    await fs.rename(oldPath, newPath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }

    throw err;
  }
};

await rename();
