import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';

function AddCourseCategory() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [categoryData, setCategoryData] = useState({
        name: '',
        image: '',
        description: ''
    });

    useEffect(() => {
        initFlowbite();
    }, []);

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const addCategory = async () => {
        try {
            const response = await fetch("/api/category", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData)
            });
            if (response.ok) {
                const data = await response.json();
                setToast({ visible: true, message: data.message, type: "success" });
                setTimeout(() => {
                    setToast({ visible: false, message: "", type: "success" });
                }, 5000);
                setCategoryData({ name: '', image: '', description: '' });
            } else {
                alert("Some error occurred");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="bg-white">
            {toast.visible && (
                <div className={`fixed top-5 right-5 p-4 text-sm font-medium ${toast.type === "error" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
                    {toast.message}
                </div>
            )}
            <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Create a Category</h2>
                <form>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <input type="text" name="name" placeholder="Category Name" value={categoryData.name} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <input type="text" name="image" placeholder="Image URL" value={categoryData.image} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <textarea name="description" placeholder="Description" value={categoryData.description} onChange={handleChange} className="border p-2 w-full rounded-lg"></textarea>
                    </div>
                    <button type="button" onClick={addCategory} className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg">Create Category</button>
                </form>
            </div>
        </section>
    );
}

export default AddCourseCategory;
