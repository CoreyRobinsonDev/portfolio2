import { get } from "../../util/helper";

type History = {
  command: string,
  output: string[]
}
const Output = () => {
  const history: History[] = get("history").reverse();
  

  return <>
    {
      history?.map((line, key) => <span key={key}>
        <p>$ {line?.command}</p>
        {line.output?.map((item, key2) => <p key={key2}>{item}</p>)}
      </span>)
    }
  </>
}
export default Output;