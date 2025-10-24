import fs from "fs/promises";

const list = async () => {
  try {
    const files = await fs.readdir("src/fs/files");

    for (const file of files) {
      console.log(file);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await list();
