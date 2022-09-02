import { useState } from "react";
import { CLI } from "../../util/helper";


const Input = () => {

  const cli = new CLI();
  const [value, setValue] = useState("");

  return <form onSubmit={() => cli.parseCommand(value)}>
      <input type="text" onChange={(e) => setValue(e.target.value)} autoFocus />
    </form>
}
export default Input;