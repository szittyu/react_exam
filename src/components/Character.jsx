import React, {useState} from "react";
import Subscription from "./Subscription";

const Character = ({char}) => {
 const [show, setShow] = useState(true);

 const handleChange = () => {
   setShow(!show)
 }

  return(
    <div className="characters">
      <h2>{char.name}</h2>
      { !show && <p>{char.details}</p>}
      <button onClick={handleChange}>{show ? "Show more" : "Show less"}</button>
    </div>
  );
}

export default Character;