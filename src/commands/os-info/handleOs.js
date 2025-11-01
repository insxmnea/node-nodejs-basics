import os from "os";

export const handleOs = (args) => {
  if (args.length !== 1) throw new Error("Invalid input");

  const option = args[0];

  try {
    switch (option) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));
        break;
      case "--cpus":
        const cpus = os.cpus();

        console.log(`Overall amount: ${cpus.length}`);
        console.table(
          cpus.map((cpu) => ({
            Model: cpu.model,
            "Clock rate (GHz)": cpu.speed / 1000,
          }))
        );
        break;
      case "--homedir":
        console.log(os.homedir());
        break;
      case "--username":
        console.log(os.userInfo().username);
        break;
      case "--architecture":
        console.log(process.arch);
        break;
      default:
        throw new Error("Invalid input");
    }
  } catch {
    throw new Error("Operation failed");
  }
};
