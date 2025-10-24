import fs from "fs/promises";

const copy = async () => {
  try {
    await fs.cp("src/fs/files", "src/fs/files_copy", {
      recursive: true,
      force: false,
      errorOnExist: true,
    });
  } catch (err) {
    if (err.code === "ENOENT" || err.code === "ERR_FS_CP_EEXIST") {
      throw new Error("FS operation failed");
    }

    throw err;
  }
};

await copy();
