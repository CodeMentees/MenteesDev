import { initFlowbite } from 'flowbite'
import React, { useEffect, useState } from 'react'
import RichTextEditor from '../../Components/RichTextEditor';



function AddPost() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [postData, setPostData] = useState({
        title: '',
        category: '',
        image: '',
        content: ''

    })

    useEffect(() => {
        initFlowbite();
    }, [])


    const [editorContent, setEditorContent] = useState('');

    // Function to handle editor content changes
    const handleEditorChange = (content) => {
        setEditorContent(content);
        setPostData({ ...postData, content: editorContent })
    };

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }

    const addPost = async (e) => {
        try {
            const response = await fetch("/api/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            if (response) {
                const data = await response.json()
                setToast({ visible: true, message: data.message, type: "success" });
                setTimeout(() => {
                    setToast({ visible: false, message: "", type: "success" });
                }, 5000);
                setPostData({
                    title: '',
                    category: '',
                    image: '',
                    content: ''

                });
            } else {
                alert("Some error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-white">
            {toast.visible && (
                <div
                    className={`fixed top-5 right-5 inline-flex items-center p-4 space-x-2 text-sm font-medium text-green-500 bg-green-100 rounded-lg ${toast.type === "error" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
                        }`}
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span>{toast.message}</span>
                </div>
            )}
            <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Add a Blog
                </h2>
                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-black-900"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                                className="bg-black-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-black-900"
                            >
                                Image
                            </label>
                            <input
                                type="text"
                                name="image"
                                onChange={handleChange}
                                value={postData.image}
                                className="bg-black-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            />
                        </div>
                        <div className='sm:col-span-2'>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <select
                                value={postData.category}
                                onChange={handleChange}
                                name='category'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                            >
                                <option selected="">Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Description
                            </label>
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
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-yellow-500"
                    >
                        Add Post
                    </button>
                </form>
            </div>
        </section>

    )
}

export default AddPost