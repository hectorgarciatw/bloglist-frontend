const Notification = ({ msg, type }) => {
    if (msg === null) {
        return null;
    }

    const notificationStyle = {
        color: type === "success" ? "green" : "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    return <div style={notificationStyle}>{msg}</div>;
};

export default Notification;
