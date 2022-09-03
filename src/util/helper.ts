
export const create = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));

  return localStorage[key];
}

export const get = (key: string) => {
  const item = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
  
  return item;
}

export const remove = (key: string) => {
  localStorage.removeItem(key);
}
  
export const clear = () => {
  localStorage.clear();
}


export class CLI {
    path: string[];
    history: { command: string, output: string[] }[];
    currentDir: string;

  constructor() {
    this.path = get("path") ? get("path") : create("path", ["~"]);
    this.history = get("history") ? get("history") : [];
    this.currentDir = create("currentDir", this.path[this.path.length - 1]);
    if (!get("~")) create("~", "");
  }

  updatePath() {
    create("path", this.path);
  }

  updateHistory() {
    create("history", this.history);
  }

  updateCurrentDir() {
    create("currentDir", this.currentDir);
  }
  
  output(msg: string) {
    create("output", msg);
  }
  
  cd(dir: string | null) {
    if (!dir) {
      create("path", ["~"]);
      return "";
    };
    const dirArr = dir?.split("/");

    for (const directory of dirArr) {
      if (directory === "..") {
        if (this.path?.length === 1) continue;
        this.path?.pop();
      } else {
        this.path.push(directory);
      }
    }

    let path: any = this.path;
    path = path.join("/");
    let isEqual = false;

    for (const key of Object.keys(localStorage)) {
      if (path === key) {
        isEqual = true;
        break;
      }
    }

    if (!isEqual) return `bash: cd: ${dir}: No such file or directory`;


    this.updatePath();
    this.updateCurrentDir();
    return "";
  }

  mkdir(dir: string) {
    const path = this.path;
    path?.push(dir);
    create(path!.join("/"), "");
  }
  
  parseCommand(commandString: string) {
    const [command, value1, value2] = commandString.split(" ");
    let output: string[];
    
    switch (command) {
      case "":
        output = [""];
        break;
      case "cd":
        output = [this.cd(value1)];
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
          "clear - clear commands",
          "localClear - clear local history"
        ]
        break;
      case "clear":
        remove("history");
        output = [""];
        break;
      case "localClear":
        clear();
        output = [""];
        break;
      case "pwd":
        output = get("path") ? [get("path")] : ["~"];
        break;
      case "mkdir":
        this.mkdir(value1);
        output = [""];
        break;
      
      default:
        output = [`bash: ${command}: command not found`];
    }
    
    if (command !== "clear" && command !== "localClear") {
      this.history.push({ command: `${command} ${value1 ? value1 : ""} ${value2 ? value2 : ""}`, output });
      this.updateHistory();
    }
  }
}
