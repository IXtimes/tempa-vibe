export default function ConditionCard(props) {
    return (
        <div>
            {/* Apply conditional styling based off prop.eval */}
            <p style={{backgroundColor: props.condition.level === "Info" ? "lime" : (props.condition.level === "Warning" ? "yellow" : "red")}}>{props.condition.level}: {props.condition.condition}</p>
        </div>
    )
}