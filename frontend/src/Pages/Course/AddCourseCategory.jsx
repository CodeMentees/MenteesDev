import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';
import { useCategoryAPI } from '../../api/categoryApi';
import { useParams } from 'react-router-dom';
import Toast from "../../Components/UI/Toast"

function AddCourseCategory() {
    const {createCategory,updateCategory,fetchCategory} = useCategoryAPI()
    const { id } = useParams();
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [categoryData, setCategoryData] = useState({
        name: '',
        image: '',
        description: ''
    });

    const fetchCategoryData = async () => {
        const data = await fetchCategory(id);
        if (data) {
            setCategoryData(data);
        }
    };

    useEffect(() => {
        initFlowbite();
        if (id) {
            fetchCategoryData();
        }
    }, [id]);



    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        let data;
        if (id) {
            data = await updateCategory(id, categoryData);
        } else {
            data = await createCategory(categoryData);
        }
        
        if (data) {
            setToast({ visible: true, message: data.message, type: "success" });
            setTimeout(() => {
                setToast({ visible: false, message: "", type: "success" });
            }, 5000);
            if (!id) {
                setCategoryData({ name: '', image: '', description: '' });
            }
        }
    };

    return (
        <section className="bg-white">
            <Toast visible={toast.visible} message='Updated successfully'   />
            <div className="py-2 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900">{id ? "Update" : "Create"} Category</h2>
                <form>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <input type="text" name="name" placeholder="Category Name" value={categoryData.name} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <input type="text" name="image" placeholder="Image URL" value={categoryData.image} onChange={handleChange} className="border p-2 w-full rounded-lg" />
                        <textarea name="description" placeholder="Description" value={categoryData.description} onChange={handleChange} className="border p-2 w-full rounded-lg"></textarea>
                    </div>
                    <button type="button" onClick={handleSubmit} className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg">{id ? "Update" : "Create"} Category</button>
                </form>
            </div>
        </section>
    );
}

export default AddCourseCategory;
