import { useState } from "react";
import PropTypes from "prop-types";

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
        <div className="blog" style={blogStyle}>
            <div className="blog-header">
                <div className="blog-title">{blog.title}</div>
                <div className="blog-author">{blog.author}</div>
            </div>
            {fullView && (
                <div className="blog-details">
                    <div className="blog-url">{blog.url}</div>
                    <div className="blog-likes">likes {likes}</div>
                    <button className="likeButton" onClick={updateBlog}>
                        like
                    </button>
                    <button onClick={deleteBlog}>remove</button>
                </div>
            )}
            <button onClick={toggleView}>{fullView ? "hide" : "view"}</button>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string,
        likes: PropTypes.number,
    }).isRequired,
    updateBlogOnServer: PropTypes.func.isRequired,
    deleteBlogOnServer: PropTypes.func.isRequired,
    refreshBlogs: PropTypes.func.isRequired,
};

export default Blog;
