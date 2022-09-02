import { useState } from "react";
import { CLI } from "../../util/helper";


const Input = () => {
  // ls list
  // cd <dir>
  // cd
  // pwd
  // mkdir
  // rm <file>
  // rm <dir>
  // cp <file1> <file2>
  // cp <dir1> <dir2>
  // mv <file1> <file2>
  // touch <file>
  // vim <file>
  // cat > <file>
  // head <file>
  // tail <file>
  // date
  // cal
  // clear

  const cli = new CLI();
  const [value, setValue] = useState("");

  return <form onSubmit={() => cli.parseCommand(value)}>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
    </form>
}
export default Input;