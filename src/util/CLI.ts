import { get, remove, clear, create, History } from "./helper";
import { introAscii } from "../info/ascii";
import { about, skills } from "../info/text";

export class CLI {
  path: string[];
  history: History[];
  currentDir: string;
  directories: any;

  constructor() {
    this.path = get("path") ? get("path") : create("path", ["~"]);
    this.history = get("history") ? get("history") : [];
    this.currentDir = create("currentDir", this.path[this.path.length - 1]);
    this.directories = get("directories") ? get("directories") : {
      "~": {
        "projects": {
          "stonks": "",
          "chess-openings": "",
          "mars-gallery": ""
        },
        "about.txt": about,
        "skills.txt": skills
      }
    }
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

    let obj = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      obj = obj[this.path[i]];
    }
    

    if (typeof obj === "undefined") {
      this.path.pop();
      return `cd: ${dir}: No such file or directory`;
    };
    this.updatePath();
    this.updateCurrentDir();
    return "";
  }

  mkdir(dir: string) {
    if (!dir) return "mkdir: missing operand";
    let obj = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      obj = obj[this.path[i]];
    }

    obj[dir] = {};
    this.updateDirectories();
    return "";
  }

  ls() {
    let obj = this.directories[this.path[0]];
    const list: string[] = [];

    for (let i = 1; i < this.path.length; i++) {
      obj = obj[this.path[i]];
    }
    
    for (const dir of Object.keys(obj)) {
      list.push(dir.includes(".") ? dir : "/" + dir);
    }

    return list.length ? list.sort() : [""];
  }

  date() {
    return new Date().toString();
  }

  cat(file: string) {
    if (file === "about.txt") return [about];
    if (file === "skills.txt") return skills;

    return [`cat: ${file}: No such file or directory`];
  }
  
  parseCommand(commandString: string) {
    const [command, value1, value2, ...value3] = commandString.split(" ");
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
          ["echo <message>", "- returns whatever is passed into it"],
          ["rm <file>", "- remove <file>"],
          ["rm <dir>", "- remove directory <dir>"],
          ["cp <file1> <file2>", "- copy <file1> to <file2>"],
          ["cp <dir1> <dir2>", "- copy <dir1> to <dir2>"],
          ["mv <file1> <file2>", "- rename or move <file1> to <file2>. If <file2> is an existing directory, moves into directory <file2>"],
          ["touch <file>", "- create or update <file>"],
          ["cat <file>", "- output <file> contents"],
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
        output = [this.mkdir(value1)];
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
      case "cat":
        output = this.cat(value1);
        break;
      case "echo":
        output = [`${value1} ${value2 ? value2 : ""} ${value3?.join(" ")}`];
        break;
      default:
        output = [`${command}: command not found`];
    }
    
    if (command !== "clear" && command !== "clearLocal") {
      this.history.push({ command: `${command} ${value1 ? value1 : ""} ${value2 ? value2 : ""} ${value3 ? value3.join(" ") : ""}`.trim(), output, path: this.path });
      this.updateHistory();
    }
  }
}