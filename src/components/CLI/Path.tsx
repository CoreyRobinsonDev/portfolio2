import { get } from "../../util/helper";

const Path = () => {
  const path = get("path").join("/");

  return <p>{path}{">"}</p>
}
export default Path;