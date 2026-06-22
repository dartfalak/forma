import { useContext} from "react";

import { NameContext} from "./NameContext";

function Child() {
  const theme = useContext(NameContext);

  return <h1>Current Theme: {theme}</h1>
}

export default Child;
