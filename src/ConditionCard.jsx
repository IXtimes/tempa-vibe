export default function ConditionCard(props) {
    return (
        <div>
            {/* Apply conditional styling based off prop.eval */}
            <p>{props.condition.condition}</p>
        </div>
    )
}