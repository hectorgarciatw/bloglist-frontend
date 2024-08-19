import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

//Components
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";

const App = () => {
    // List of blogs of the user
    const [blogs, setBlogs] = useState([]);
    // The user state for the login
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedUser");
        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            setUser(user);
        }
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
        } catch (exception) {
            // Manejo de error aquí si es necesario
            console.error("Wrong credentials");
        }
    };

    const logout = () => {
        window.localStorage.removeItem("loggedUser");
        setUser(null);
    };

    const refreshBlogs = async () => {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
    };

    return (
        <div>
            <h2>blog list frontend</h2>
            {!user && <LoginForm onLogin={handleLogin} />}

            {user ? (
                <div>
                    <div>
                        <p style={{ fontWeight: "bold" }}>{user.name} logged in</p>
                        <button onClick={logout}>logout</button>
                    </div>
                    <CreateForm user={user} onBlogCreate={refreshBlogs} />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            ) : (
                <p>Please log in to view blogs</p>
            )}
        </div>
    );
};

export default App;
