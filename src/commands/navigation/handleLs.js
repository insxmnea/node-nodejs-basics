import fs from "fs/promises";

export const handleLs = async (_, currentDir) => {
  try {
    const files = await fs.readdir(currentDir, {
      withFileTypes: true,
    });
    const dirs = files
      .filter((f) => f.isDirectory())
      .map((f) => ({ Name: f.name, Type: "directory" }));
    const filesList = files
      .filter((f) => f.isFile())
      .map((f) => ({ Name: f.name, Type: "file" }));
    dirs.sort((a, b) => a.Name.localeCompare(b.Name));
    filesList.sort((a, b) => a.Name.localeCompare(b.Name));
    console.table([...dirs, ...filesList]);
  } catch {
    throw new Error("Operation failed");
  }
};
