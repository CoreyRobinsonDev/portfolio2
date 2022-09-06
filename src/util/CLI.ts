import { get, remove, clear, create, History } from "./helper";
import { introAscii } from "./ascii";

export class CLI {
  path: string[];
  history: History[];
  currentDir: string;
  directories: string[]

  constructor() {
    this.path = get("path") ? get("path") : create("path", ["~"]);
    this.history = get("history") ? get("history") : [];
    this.currentDir = create("currentDir", this.path[this.path.length - 1]);
    this.directories = get("directories") ? get("directories") : ["~", "~/projects", "~/about.txt", "~/skills.txt"];
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

  updateDirectories() {
    create("directories", this.directories);
  }
  
  cd(dir: string | null) {
    if (!dir) {
      create("path", ["~"]);
      return "";
    };
    if (dir[dir.length - 1] === "/") dir = dir.slice(0, -1);
    const dirArr = dir?.split("/");

    for (const directory of dirArr) {
      if (directory === "..") {
        if (this.path?.length === 1) continue;
        this.path?.pop();
      } else {
        this.path.push(directory);
      }
    }

    let path: any = [...this.path];
    path = path.join("/");
    let isEqual = false;

    for (const key of this.directories) {
      if (path === key) {
        isEqual = true;
        break;
      }
    }

    if (!isEqual) {
      this.path.pop();
      return `bash: cd: ${dir}: No such file or directory`;
    };
    this.updatePath();
    this.updateCurrentDir();
    return "";
  }

  mkdir(dir: string) {
    const path = [...this.path];
    path?.push(dir);
    this.directories.push(path.join("/"));
    this.updateDirectories();
  }

  ls() {
    const path = this.path.join("/");
    const list = [];

    for (const dir of this.directories) {
      if (dir.includes(path)) {
        const dirArr = dir.split("/").reverse();
        for (let i = 0; i < this.path.length; i++) {
          dirArr.pop();
        }
        if (dirArr.length === 0) continue;
        list.push(`${dirArr[0].includes(".") ? "" : "/"}${dirArr[0]}`)
      }
    }
    return list.length ? list : [""];
  }

  date() {
    return new Date().toString();
  }
  
  parseCommand(commandString: string) {
    const [command, value1, value2] = commandString.split(" ");
    let output: any[];
    
    switch (command) {
      case "":
        output = [""];
        break;
      case "cd":
        output = [this.cd(value1)];
        break;
      case "help":
        output = [
          ["help", "- see list of commands"],
          ["cd <dir>", "- change to directory <dir>"],
          ["cd", "- change to home"],
          ["ls", "- list directories"],
          ["pwd", "- print working directory"],
          ["mkdir <dir>", "- make directory <dir>"],
          ["rm <file>", "- remove <file>"],
          ["rm <dir>", "- remove directory <dir>"],
          ["cp <file1> <file2>", "- copy <file1> to <file2>"],
          ["cp <dir1> <dir2>", "- copy <dir1> to <dir2>"],
          ["mv <file1> <file2>", "- rename or move <file1> to <file2>. If <file2> is an existing directory, moves into directory <file2>"],
          ["touch <file>", "- create or update <file>"],
          ["cat <file>", "- output <file> contents"],
          ["more <file>", "- output contents of <file>"],
          ["head <file>", "- output first 10 lines of <file>"],
          ["tail <file>", "- output last 10 lines of <file>"],
          ["date", "- show the current date and time"],
          ["intro", "- output this site's intro panel"],
          ["clear", "- clear commands"],
          ["clearLocal", "- clear local history"]
        ]
        break;
      case "clear":
        remove("history");
        output = [""];
        break;
      case "clearLocal":
        clear();
        output = [""];
        break;
      case "pwd":
        output = get("path") ? [get("path").join("/")] : ["~"];
        break;
      case "mkdir":
        this.mkdir(value1);
        output = [""];
        break;
      case "ls":
        output = this.ls();
        break;
      case "date":
        output = [this.date()];
        break;
      case "intro":
        output = [introAscii];
        break;
      default:
        output = [`bash: ${command}: command not found`];
    }
    
    if (command !== "clear" && command !== "clearLocal") {
      this.history.push({ command: `${command} ${value1 ? value1 : ""} ${value2 ? value2 : ""}`.trim(), output, path: this.path });
      this.updateHistory();
    }
  }
}