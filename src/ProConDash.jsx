import { useEffect, useState } from "react";
import ConditionCard from "./ConditionCard.jsx";

export default function ProConDash(props) {
    return(
        <div>
                {props.conditions.map((condition, i) => 
                <div key={i}><ConditionCard condition={condition}/></div>)}
        </div>
    );
}