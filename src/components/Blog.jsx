import { useState } from "react";

const Blog = ({ blog }) => {
    const [fullView, setFullView] = useState(false);

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

    const toggleView = () => {
        setFullView(!fullView);
    };

    return (
        <div style={blogStyle}>
            <div className="blogContact">
                <div>{blog.title}</div>
                {fullView && (
                    <div>
                        <div>{blog.url}</div>
                        <div style={likeContent}>
                            <div>likes {blog.likes}</div>
                            <button>like</button>
                        </div>

                        <div>{blog.author}</div>
                    </div>
                )}
            </div>
            {fullView ? <button onClick={toggleView}>hide</button> : <button onClick={toggleView}>view</button>}
        </div>
    );
};

export default Blog;
