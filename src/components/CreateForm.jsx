import { useState } from "react";
import axios from "axios";
import blogService from "../services/blogs";

const CreateForm = ({ user, setSuccessMsg, setErrorMsg, onBlogCreate }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const [likes, setLikes] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const baseUrl = "http://localhost:3003/api/blogs";

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const token = user.token;
            const newBlog = { title, author, url, likes };
            const createdBlog = await blogService.create(newBlog, token);
            setTitle("");
            setAuthor("");
            setUrl("");
            setLikes("");
            onBlogCreate();
            setSuccessMsg(`a new blog ${title} by ${author} added`);
            setTimeout(() => {
                setSuccessMsg(null);
            }, 2000);
        } catch (error) {
            console.error("Error creating blog:", error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data.error : "An error occurred");
        }
    };

    return (
        <>
            <h3>create new</h3>
            <form onSubmit={handleCreate}>
                <div>
                    title
                    <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author
                    <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url
                    <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <div>
                    likes
                    <input type="number" value={likes} name="likes" onChange={({ target }) => setLikes(target.value)} />
                </div>
                <button type="submit" name="create">
                    create
                </button>
                <br />
                <br />
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </>
    );
};

export default CreateForm;
