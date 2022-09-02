import { get } from "../../util/helper";

const Path = () => {
  const path = get("path");

  return <p>{path}{">"}</p>
}
export default Path;