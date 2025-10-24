import fs from "fs/promises";

const read = async () => {
  try {
    const content = await fs.readFile("src/fs/files/fileToRead.txt", {
      encoding: "utf-8",
    });
    console.log(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await read();
