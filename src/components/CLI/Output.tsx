import { get } from "../../util/helper";

const Output = () => {
  const history = get("history")?.split("|").map(line => line.split(","));

  console.log(get("history")?.split("|").map(line => line.split(",")))

  return <>
    {history?.reverse().map((line, key) => {
      const [command, ...output] = line;
    
      return <div key={key}>
        <p>$ {command}</p>
        {output?.map((item, key2) => <p key={key2}>{item}</p>)}
      </div>
    })
    }
    
  </>
}
export default Output;