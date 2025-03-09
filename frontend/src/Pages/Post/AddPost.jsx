import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';
import RichTextEditor from '../../Components/RichTextEditor';

function AddPost() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [postData, setPostData] = useState({
        title: '',
        category: '',
        image: '',
        content: ''
    });

    useEffect(() => {
        initFlowbite();
    }, []);

    const [editorContent, setEditorContent] = useState('');

    // ✅ Fix: Correctly updating the content in postData
    const handleEditorChange = (content) => {
        setEditorContent(content);
        setPostData((prev) => ({ ...prev, content })); // ✅ No stale state
    };

    const handleChange = (e) => {
        setPostData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const addPost = async () => {
        try {
            const response = await fetch("/api/post", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                const data = await response.json();
                setToast({ visible: true, message: data.message, type: "success" });
                setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 5000);
                setPostData({ title: '', category: '', image: '', content: '' });
                setEditorContent(''); // ✅ Clear editor after posting
            } else {
                alert("Some error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="bg-white">
            {toast.visible && (
                <div className={`fixed top-5 right-5 p-4 space-x-2 text-sm font-medium rounded-lg 
                    ${toast.type === "error" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
                    ✅ <span>{toast.message}</span>
                </div>
            )}
            <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Add a Blog</h2>
                <form>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-black-900">Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-black-900">Image</label>
                            <input
                                type="text"
                                name="image"
                                onChange={handleChange}
                                value={postData.image}
                                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select
                                value={postData.category}
                                onChange={handleChange}
                                name='category'
                                defaultValue=""
                                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
                            >
                                <option value="">Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <RichTextEditor
                                value={editorContent}
                                onChange={handleEditorChange}
                                placeholder="Write your content here..."
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={addPost}
                        className="px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-black bg-yellow-500"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddPost;
