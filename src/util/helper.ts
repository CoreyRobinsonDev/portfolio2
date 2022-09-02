
export const create = (key: string, value: any) => {
  localStorage.setItem(key, value);

  return { [key]: value };
}

export const get = (key: string) => {
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

  constructor() {
    this.path = get("path") !== null ? get("path")?.split("/") : ["~"];
    this.history = [];
  }

  updatePath() {
    create("path", this.path?.join("/"));
  }

  updateHistory() {
    const history = get("history") !== null ? get("history") : "";
    create("history", `${history}${history ? "/" : ""}${this.history}`);
  }
  
  output(msg: string) {
    create("output", msg);
  }
  
  cd(dir: string) {
    const dirArr = dir.split("/");
    
    for (const directory of dirArr) {
      if (directory === "..") {
        this.path?.pop();
      } else {
        this.path?.push(directory);
      }
    }
    this.updatePath();
  }
  
  help() {
    
  }

  
  parseCommand(commandString: string) {
    const [command, value1, value2] = commandString.split(" ");
    let output: string;
    
    switch (command) {
      case "cd":
        this.cd(value1);
        output = "";
        break;
      default:
        output = `bash: ${command}: command not found`;
        this.output(output);
      }
      
    this.history?.push(`[${commandString}, ${output}]`);
    this.updateHistory();
  }
}
