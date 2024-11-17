import {useState} from 'react';
import ConditionCard from './ConditionCard.jsx';

export default function HighlightWidget(props) {

    return(
        <div>
            {/* Top pros */}
            <ul>
                    <li><ConditionCard condition={props.conditions.filter(cond => cond.type === "Temp")[0]}/></li>
                    <li><ConditionCard condition={props.conditions.filter(cond => cond.type === "UV")[0]}/></li>
                    <li><ConditionCard condition={props.conditions.filter(cond => cond.type === "Humid")[0]}/></li>
            </ul>
            {/* Top cons */}
            <ul>
                    <li><ConditionCard condition={[...props.conditions].reverse().filter(cond => cond.type === "Temp")[0]}/></li>
                    <li><ConditionCard condition={[...props.conditions].reverse().filter(cond => cond.type === "UV")[0]}/></li>
                    <li><ConditionCard condition={[...props.conditions].reverse().filter(cond => cond.type === "Humid")[0]}/></li>
            </ul>
        </div>
    )
}