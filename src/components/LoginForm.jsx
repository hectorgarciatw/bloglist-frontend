import { useState } from "react";

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await onLogin(username, password);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;
