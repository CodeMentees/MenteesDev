import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';

function AddCourse() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [courseData, setCourseData] = useState({
        name: '',
        image: '',
        tags: ['Online'],
        price : '',
        category: '',
        description: '',
        modules: [{ icon: '', title: '' }],
        details: [{ label: '', content: [{ title: '', description: '' }] }]
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        initFlowbite();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/category");
           
                const data = await response.json();
                setCategories(data.data);
         
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleChange = (e) => {
        setCourseData({
            ...courseData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddModule = () => {
        setCourseData({
            ...courseData,
            modules: [...courseData.modules, { icon: '', title: '' }]
        });
    };

    const handleAddDetail = () => {
        setCourseData({
            ...courseData,
            details: [...courseData.details, { label: '', content: [{ title: '', description: '' }] }]
        });
    };

    const addCourse = async () => {
        try {
            const response = await fetch("/api/course", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });
            if (response.ok) {
                const data = await response.json();
                setToast({ visible: true, message: data.message, type: "success" });
                setTimeout(() => {
                    setToast({ visible: false, message: "", type: "success" });
                }, 5000);
                setCourseData({
                    name: '',
                    image: '',
                    tags: ['Online'],
                    category: '',
                    description: '',
                    price:'',
                    modules: [{ icon: '', title: '' }],
                    details: [{ label: '', content: [{ title: '', description: '' }] }]
                });
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
                <h2 className="mb-4 text-xl font-bold text-gray-900">Create a Course</h2>
                <form>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <input type="text" name="name" placeholder="Course Name" value={courseData.name} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <input type="text" name="image" placeholder="Image URL" value={courseData.image} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <input type="number" name="price" placeholder="price" value={courseData.price} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <textarea name="description" placeholder="Description" value={courseData.description} onChange={handleChange} className="border p-2 w-full rounded-lg"></textarea>
                        <select name="category" value={courseData.category} onChange={handleChange} className="border p-2 w-full rounded-lg">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" onClick={addCourse} className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg">Create Course</button>
                </form>
            </div>
        </section>
    );
}

export default AddCourse;
