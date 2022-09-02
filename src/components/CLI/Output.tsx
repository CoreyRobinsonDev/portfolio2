import { get } from "../../util/helper";

const Output = () => {
  const output = get("output");
  const history = get("history")?.split(",");

  console.log(get("history")?.split("/"))

  return <div>
    <p>{history}</p>
    <p>{output}</p>
  </div>
}
export default Output;