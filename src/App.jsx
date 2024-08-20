import axios from "axios";

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

//Components
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const baseUrl = "http://localhost:3003/api/blogs";
    // List of blogs of the user
    const [blogs, setBlogs] = useState([]);
    // The user state for the login
    const [user, setUser] = useState(null);
    // States for notification handling
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const loggedStyle = {
        display: "flex",
        alignItems: "baseLine",
        gap: "10px",
    };

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

    // Updating the likes of a blog entry
    const updateBlogOnServer = (id, updatedBlog) => {
        return axios
            .put(`${baseUrl}/${id}/likes`, { likes: updatedBlog.likes })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Error updating blog:", error);
                throw error;
            });
    };

    // Removing a blog entry
    const deleteBlogOnServer = (id) => {
        return axios
            .delete(`${baseUrl}/${id}`)
            .then((res) => res.data)
            .catch((error) => {
                console.error("");
                throw error;
            });
    };

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
        } catch (exception) {
            throw new Error("Wrong credentials");
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
            {successMsg && <Notification msg={successMsg} type="success" />}
            {errorMsg && <Notification msg={errorMsg} type="error" />}
            {!user && <LoginForm onLogin={handleLogin} setErrorMsg={setErrorMsg} />}

            {user ? (
                <div>
                    <div style={loggedStyle}>
                        <p style={{ fontWeight: "bold" }}>{user.name} logged in</p>
                        <button onClick={logout}>logout</button>
                    </div>
                    <Togglable buttonLabel="new note">
                        <CreateForm user={user} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} onBlogCreate={refreshBlogs} />
                    </Togglable>
                    <br />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} />
                    ))}
                </div>
            ) : (
                <p>Please log in to view blogs</p>
            )}
        </div>
    );
};

export default App;
