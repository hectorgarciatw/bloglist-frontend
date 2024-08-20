import { useState } from "react";

const Blog = ({ blog, updateBlogOnServer, deleteBlogOnServer, refreshBlogs }) => {
    const [fullView, setFullView] = useState(false);
    const [likes, setLikes] = useState(blog.likes);

    // Styles
    const blogStyle = {
        display: "flex",
        alignItems: "baseLine",
        gap: "10px",
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    const blogContact = {
        display: "flex",
        flexDirection: "column",
    };

    const likeContent = {
        display: "flex",
        alignItems: "baseLine",
        gap: "10px",
    };

    // End of styles

    // Toogle the details of the blog
    const toggleView = () => {
        setFullView(!fullView);
    };

    // Update a blog entry from the DB
    const updateBlog = () => {
        // The blog with the likes updated
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        };

        updateBlogOnServer(blog.id, updatedBlog)
            .then((updatedData) => {
                console.log("Blog updated successfully:", updatedData);
                setLikes(updatedBlog.likes);
            })
            .catch((error) => {
                console.error("Failed to update blog:", error);
            });
    };

    // Removes a blog entry from the DB
    const deleteBlog = () => {
        if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
            deleteBlogOnServer(blog.id)
                .then(() => {
                    console.log("Blog deleted successfully");
                    refreshBlogs();
                })
                .catch((error) => {
                    console.error("Failed to delete blog:", error);
                });
        }
    };

    return (
        <div style={blogStyle}>
            <div className="blogContact">
                <div>{blog.title}</div>
                {fullView && (
                    <div>
                        <div>{blog.url}</div>
                        <div style={likeContent}>
                            <div>likes {likes}</div>
                            <button onClick={updateBlog}>like</button>
                        </div>

                        <div>{blog.author}</div>
                        <br />
                        <button onClick={deleteBlog}>remove</button>
                    </div>
                )}
            </div>
            {fullView ? <button onClick={toggleView}>hide</button> : <button onClick={toggleView}>view</button>}
        </div>
    );
};

export default Blog;
