import { get, remove, clear, create, History } from "./helper";
import { introAscii } from "../info/ascii";
import { about, skills } from "../info/text";

export class CLI {
  path: string[];
  history: History[];
  directories: any;

  constructor() {
    this.path = get("path") ? get("path") : create("path", ["~"]);
    this.history = get("history") ? get("history") : [];
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

    let currentDir = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }
    

    if (typeof currentDir === "undefined") {
      this.path.pop();
      return `cd: ${dir}: No such file or directory`;
    };
    this.updatePath();
    return "";
  }

  mkdir(dir: string) {
    if (!dir) return "mkdir: missing operand";
    let currentDir = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }

    currentDir[dir] = {};
    this.updateDirectories();
    return "";
  }

  ls() {
    let currentDir = this.directories[this.path[0]];
    const list: string[] = [];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }
    
    for (const dir of Object.keys(currentDir)) {
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
    let currentDir = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }

    for (const fileOrDir of Object.keys(currentDir)) {
      if (!fileOrDir.includes(".") && file === fileOrDir) return [`cat: ${file}: Is a directory`];
      if (file === fileOrDir) return [currentDir[fileOrDir]];
    }

    return [`cat: ${file}: No such file or directory`];
  }
  
  touch(file: string) {
    if (!file.includes(".")) return `touch: ${file}: Has no file type`;
    let currentDir = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }
    currentDir[file] = "";
    this.updateDirectories();
    return "";
  }

  echo(value1: string | undefined, value2: string | undefined, value3: string[] | undefined) {
    if (value2 === ">") {
      let currentDir = this.directories[this.path[0]];
      let file = value3?.[0];
      
      for (let i = 1; i < this.path.length; i++) {
        currentDir = currentDir[this.path[i]];
      }

      if (!file) return `echo: ${file}: No such file or directory`;
      if (!file.includes(".")) return `echo: ${file}: Is a directory`; 
      currentDir[file] = value1;
      this.updateDirectories();
      return "";
    }

    if (value3?.includes(">")) {
      let currentDir = this.directories[this.path[0]];
      const strArr:string[] | null = value3 ? [...value3] : null;
      let file = strArr?.pop();
      
      for (let i = 1; i < this.path.length; i++) {
        currentDir = currentDir[this.path[i]];
      }

      const filesAndDirectories = Object.keys(currentDir);

      if (!file || !filesAndDirectories.includes(file)) return `echo: ${file}: No such file or directory`;
      if (!file.includes(".")) return `echo: ${file}: Is a directory`; 
      strArr?.pop();
      currentDir[file] = `${value1} ${value2} ${strArr?.join(" ")}`;
      this.updateDirectories();
      return "";
    }
    return `${value1 ? value1 : ""} ${value2 ? value2 : ""} ${value3?.join(" ")}`
  }

  rm(fileOrDir: string) {
    if(!fileOrDir) return "rm: missing operand"
    let currentDir = this.directories[this.path[0]];

    for (let i = 1; i < this.path.length; i++) {
      currentDir = currentDir[this.path[i]];
    }

    if (!currentDir[fileOrDir]) return `rm: cannot remove '${fileOrDir}': No such file or directory`;
    delete currentDir[fileOrDir];
    this.updateDirectories();

    return "";
  }

  cp(fileOrDir1: string, fileOrDir2: string) {
    if (!fileOrDir1) return "cp: missing file operand";
    if (!fileOrDir2) return `cp: missing destination file operand after '${fileOrDir1}'`;
    const dirArr1 = fileOrDir1.split("/");
    const dirArr2 = fileOrDir2.split("/");

    let firstDir = this.directories[this.path[0]];
    let secondDir = this.directories[this.path[0]];
    
    for (let i = 0; i < dirArr1.length; i++) {
      firstDir = firstDir[dirArr1[i]];
    }
    for (let i = 0; i < dirArr2.length; i++) {
      secondDir = secondDir[dirArr2[i]];
    }
    
    if (!firstDir && firstDir !== "") return `cp: cannot stat '${fileOrDir1}': No such file or directory`;
    if (!secondDir && secondDir !== "") return `cp: cannot stat '${fileOrDir2}': No such file or directory`;
    if (!dirArr1[dirArr1.length - 1].includes(".") && dirArr2[dirArr2.length - 1].includes(".")) return `cp: ${fileOrDir1}: Is a directory`;
    
    if (dirArr1[dirArr1.length - 1].includes(".") && !dirArr2[dirArr2.length - 1].includes(".")) secondDir[dirArr1[dirArr1.length - 1]] = firstDir;
    if ((!dirArr1[dirArr1.length - 1].includes(".") && !dirArr2[dirArr2.length - 1].includes(".")) || (dirArr1[dirArr1.length - 1].includes(".") && dirArr2[dirArr2.length - 1].includes("."))) {
      let newDir = this.directories[this.path[0]];
      for (let i = 0; i < dirArr2.length - 1; i++) {
        newDir = newDir[dirArr2[i]];
      }
      newDir[dirArr2[dirArr2.length-1]] = firstDir;
    }

    this.updateDirectories();
    return "";
  }

  mv(fileOrDir1: string, fileOrDir2: string) {
    if (!fileOrDir1) return "mv: missing file operand";
    if (!fileOrDir2) return `mv: missing destination file operand after '${fileOrDir1}'`;
    const dirArr1 = fileOrDir1.split("/");
    const dirArr2 = fileOrDir2.split("/");

    let firstDir = this.directories[this.path[0]];
    let secondDir = this.directories[this.path[0]];
    
    for (let i = 0; i < dirArr1.length; i++) {
      firstDir = firstDir[dirArr1[i]];
    }
    for (let i = 0; i < dirArr2.length; i++) {
      secondDir = secondDir[dirArr2[i]];
    }
    
    if (!firstDir && firstDir !== "") this.touch(fileOrDir1);
    if (!secondDir && secondDir !== "") this.touch(fileOrDir2);

    this.cp(fileOrDir1, fileOrDir2);
    this.rm(fileOrDir1);
    this.updateDirectories();
    
    return "";
  }

  predictCommand(commandStr: string | undefined) {
    if (!commandStr) return "";
    const commands = ["cat", "cd", "clear", "clearLocal", "contact", "cp", "date", "echo", "goto", "help", "info", "ls", "mkdir", "mv", "pwd", "rm", "touch"];

    return commands.find(command => {
      const isMatchArr: boolean[] = [];
      for (let i = 0; i < commandStr.length; i++) {
        isMatchArr.push(command[i] === commandStr[i]);
      }
      return !isMatchArr.includes(false);
    })?.slice(commandStr?.length) ?? "";
  }

  parseCommand(commandStr: string) {
    const [command, value1, value2, ...value3] = commandStr.split(" ");
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
          ["mv <file1> <file2>", "- rename or move <file1> to <file2>"],
          ["touch <file>", "- create or update <file>"],
          ["cat <file>", "- output <file> contents"],
          ["date", "- show the current date and time"],
          ["info", "- output this site's intro panel"],
          ["clear", "- clear commands"],
          ["clearLocal", "- clear local storage"]
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
      case "info":
        output = [introAscii];
        break;
      case "cat":
        output = this.cat(value1);
        break;
      case "echo":
        output = [this.echo(value1, value2, value3)];
        break;
      case "contact":
        output = [[value1, value2, value3?.join(" ")]]
        break;
      case "touch":
        output = [this.touch(value1)];
        break;
      case "goto":
        output = [value1];
        break;
      case "rm":
        output = [this.rm(value1)];
        break;
      case "cp":
        output = [this.cp(value1, value2)];
        break;
      case "mv":
        output = [this.mv(value1, value2)];
        break;
      default:
        output = [`${command}: command not found`];
    }
    
    if (command !== "clear" && command !== "clearLocal") {
      this.history.push({ command, commandStr: `${command} ${value1 ? value1 : ""} ${value2 ? value2 : ""} ${value3 ? value3.join(" ") : ""}`.trim(), output, path: this.path });
      this.updateHistory();
    }
  }
}