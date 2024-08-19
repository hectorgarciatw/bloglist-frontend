import { useState } from "react";

const LoginForm = ({ onLogin, setErrorMsg }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await onLogin(username, password);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMsg(`wrong username or password`);
            setTimeout(() => {
                setErrorMsg(null);
            }, 2000);
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
        </form>
    );
};

export default LoginForm;
