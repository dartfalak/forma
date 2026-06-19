import { useContext} from "react";

import { NameContext} from "./NameContext";

function Child() {
  const name = useContext(NameContext);

  return <h1>hi {name}</h1>
}

