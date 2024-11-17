export default function ConditionCard(props) {
    return (
        <div style={{
            backgroundColor: props.condition.level === "Info" 
                ? "lime" 
                : (props.condition.level === "Warning" ? "yellow" : "red"),
            padding: "15px",
            borderRadius: "10px",
            margin: "10px",
            width: "250px", // Adjust width of each card
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                {props.condition.level}: {props.condition.condition}
            </p>
        </div>
    );
}