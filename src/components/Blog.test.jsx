import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Blog from "./Blog";

describe("Blog Component", () => {
    it("should call the updateBlogOnServer function twice when the 'like' button is clicked twice", () => {
        const updateBlogOnServer = vi.fn().mockResolvedValue({ likes: 1 });
        const deleteBlogOnServer = vi.fn().mockResolvedValue();
        const refreshBlogs = vi.fn();

        // Render the component
        const blog = {
            id: "1",
            title: "Test Blog",
            author: "Author",
            url: "http://example.com",
            likes: 0,
        };

        render(<Blog blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} />);

        // Click 'view' to reveal details
        fireEvent.click(screen.getByText("view"));

        // Click the 'like' button twice
        const likeButton = screen.getByText("like");
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);

        // Verify the updateBlogOnServer function was called twice
        expect(updateBlogOnServer).toHaveBeenCalledTimes(2);
    });

    it("should call the deleteBlogOnServer function when the 'remove' button is clicked and confirm dialog is accepted", () => {
        const updateBlogOnServer = vi.fn().mockResolvedValue({ likes: 1 });
        const deleteBlogOnServer = vi.fn().mockResolvedValue();
        const refreshBlogs = vi.fn();

        // Render the component
        const blog = {
            id: "1",
            title: "Test Blog",
            author: "Author",
            url: "http://example.com",
            likes: 0,
        };

        global.window.confirm = vi.fn(() => true);

        render(<Blog blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} />);

        // Click 'view' to reveal details
        fireEvent.click(screen.getByText("view"));

        // Click the 'remove' button
        const removeButton = screen.getByText("remove");
        fireEvent.click(removeButton);

        // Verify the deleteBlogOnServer function
        expect(deleteBlogOnServer).toHaveBeenCalledTimes(1);
    });

    it("should display the URL and number of likes when the 'view' button is clicked", () => {
        const updateBlogOnServer = vi.fn().mockResolvedValue({ likes: 1 });
        const deleteBlogOnServer = vi.fn().mockResolvedValue();
        const refreshBlogs = vi.fn();

        const blog = {
            id: "1",
            title: "Test Blog",
            author: "Author",
            url: "http://example.com",
            likes: 5,
        };

        render(<Blog blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} />);

        // Initially, URL and likes should not be visible
        expect(screen.queryByText("http://example.com")).not.toBeInTheDocument();
        expect(screen.queryByText("likes 5")).not.toBeInTheDocument();

        // Click to reveal details
        fireEvent.click(screen.getByText("view"));

        // URL and likes should be visible
        expect(screen.getByText("http://example.com")).toBeInTheDocument();
        expect(screen.getByText("likes 5")).toBeInTheDocument();
    });

    it("should display the title and author of the blog but not URL or number of likes by default", () => {
        const updateBlogOnServer = vi.fn().mockResolvedValue({ likes: 1 });
        const deleteBlogOnServer = vi.fn().mockResolvedValue();
        const refreshBlogs = vi.fn();

        const blog = {
            id: "1",
            title: "Test Blog",
            author: "Author",
            url: "http://example.com",
            likes: 5,
        };

        render(<Blog blog={blog} updateBlogOnServer={updateBlogOnServer} deleteBlogOnServer={deleteBlogOnServer} refreshBlogs={refreshBlogs} />);

        // Check if title and author are visible
        expect(screen.getByText("Test Blog")).toBeInTheDocument();
        expect(screen.getByText("Author")).toBeInTheDocument();

        // Check if URL and number of likes are not visible by default
        expect(screen.queryByText("http://example.com")).not.toBeInTheDocument();
        expect(screen.queryByText("likes 5")).not.toBeInTheDocument();
    });
});
