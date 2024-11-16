import { useEffect, useState } from "react";
import ConditionCard from "./ConditionCard.jsx";

export default function ProConDash(props) {
    return(
        <div>
            <ul>
                {props.conditions.map((condition) => 
                <li><ConditionCard condition={condition}/></li>)}
            </ul>
        </div>
    );
}