import { useEffect, useState } from "react";
import ConditionCard from "./ConditionCard.jsx";

export default function ProConDash(props) {
    return(
        <div>
            <ul>
                {props.conditions.map((condition, i) => 
                <li key={i}><ConditionCard condition={condition}/></li>)}
            </ul>
        </div>
    );
}