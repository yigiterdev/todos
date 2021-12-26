import "./_todocard.scss";

import {TodoCard} from "../../../../core/context/types";

interface TodocardProps {
  todocardData: TodoCard;
}

function Todocard({todocardData}: TodocardProps) {
  return (
    <div className={"todocard"}>
      <h1>{todocardData.title}</h1>
      <p>{todocardData.userId}</p>
    </div>
  );
}

export default Todocard;
