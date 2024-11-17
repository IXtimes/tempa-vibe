export default function ConditionCard(props) {
    return (
        <div style={{
            backgroundColor: props.condition.level === "Info" 
                ? "rgba(156, 255, 156, .66)" 
                : (props.condition.level === "Warning" ? "rgba(255, 253, 133, .66)" : "rgba(255, 127, 105, .66)"),
            padding: "15px",
            paddingLeft: "15px", 
            width: "100vw", // Adjust width of each card
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
            <p style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                {props.condition.level}: {props.condition.condition}
            </p>
        </div>
    );
}