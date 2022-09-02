
export const create = (key: string, value: any) => {
  localStorage.setItem(key, value);

  return { [key]: value };
}

export const get = (key: string | null) => {
  if (!key) return null;
  const item = localStorage.getItem(key);
  
  return item;
}

export const remove = (key: string) => {
  localStorage.removeItem(key);
}
  
export const clear = () => {
  localStorage.clear();
}


export class CLI {
  path: string[] | null | undefined;
  history: string[] | null | undefined;
  currentDir: string;

  constructor() {
    this.path = get("path") !== null ? get("path")?.split("/") : ["~"];
    this.history = [];
    this.currentDir = this.path![this.path ? this.path?.length - 1 : 0];
  }

  updatePath() {
    create("path", this.path?.join("/"));
  }

  updateHistory() {
    const history = get("history") !== null ? get("history") : "";
    create("history", `${history}${history ? "|" : ""}${this.history}`);
  }

  updateCurrentDir() {
    create("currentDir", this.currentDir);
  }
  
  output(msg: string) {
    create("output", msg);
  }
  
  cd(dir: string | null) {
    if (!dir) return create("path", "~");
    const dirArr = dir?.split("/");
    
    for (const directory of dirArr) {
      if (directory === "..") {
        if (this.path?.length === 1) continue;
        this.path?.pop();
      } else {
        this.path?.push(directory)
        if (get(this.path!.join("/"))) continue;
      }
    }
    this.updatePath();
    this.updateCurrentDir();
  }

  mkdir(dir: string) {
    const path = this.path;
    path?.push(dir);
    create(path!.join("/"), "");
  }
  
  parseCommand(commandString: string) {
    const [command, value1, value2] = commandString.split(" ");
    let output: string | string[] | null;
    
    switch (command) {
      case "cd":
        this.cd(value1);
        output = "";
        break;
      case "help":
        output = [
          "help - see list of commands",
          "cd <dir> - change to directory <dir>",
          "cd - change to home",
          "ls - directory listing",
          "pwd - print working directory",
          "mkdir <dir> - make directory <dir>",
          "rm <file> - remove <file>",
          "rm <dir> - remove directory <dir>",
          "cp <file1> <file2> - copy <file1> to <file2>",
          "cp <dir1> <dir2> - copy <dir1> to <dir2>",
          "mv <file1> <file2> - rename or move <file1> to <file2>. If <file2> is an existing directory, moves into directory <file2>",
          "touch <file> - create or update <file>",
          "cat > <file> - places standard input into <file>",
          "more <file> - output contents of <file>",
          "head <file> - output first 10 lines of <file>",
          "tail <file> - output last 10 lines of <file>",
          "date - show the current date and time",
          "clear - clear commands"
        ]
        break;
      case "clear":
        remove("history");
        output = "";
        break;
      case "pwd":
        output = get("path") ? get("path") : "~";
        break;
      case "mkdir":
        this.mkdir(value1);
        output = "";
        break;
      default:
        output = `bash: ${command}: command not found`;
        this.output(output);
      }
    if (command !== "clear") this.history?.push(`${commandString}, ${output}`);
    this.updateHistory();
  }
}
