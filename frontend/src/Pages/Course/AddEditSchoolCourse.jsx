import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSchoolCourseAPI } from "../../api/schoolCourseApi";
import Toast from "../../Components/UI/Toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getDirectImageUrl, handleImageError, INVALID_IMAGE_URL } from "../../utils/imageUtils";

function AddEditSchoolCourse() {
    const { createSchoolCourse, fetchSchoolCourse, updateSchoolCourse } = useSchoolCourseAPI();
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [toast, setToast] = useState({ visible: false, message: "" });
    const [imageFile, setImageFile] = useState(null);

    const [courseData, setCourseData] = useState({
        title: "",
        image: "",
        description: "",
        level: "Middle School",
        duration: "Full Year",
        contactHours: "",
        language: "",
        category: "Foundations",
        units: [{ title: "", description: "" }],
        syllabus: [{ title: "", content: "" }],
    });

    useEffect(() => {
        if (id) {
            const loadCourse = async () => {
                const response = await fetchSchoolCourse(id);
                setCourseData(response.data.data || response.data);
            };
            loadCourse();
        }
    }, [id]);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setCourseData({ ...courseData, image: URL.createObjectURL(file) });
        }
    };

    // Unit handlers
    const handleUnitChange = (index, e) => {
        const newUnits = [...courseData.units];
        newUnits[index][e.target.name] = e.target.value;
        setCourseData({ ...courseData, units: newUnits });
    };

    const addUnit = () => {
        setCourseData({ ...courseData, units: [...courseData.units, { title: "", description: "" }] });
    };

    const removeUnit = (index) => {
        const newUnits = courseData.units.filter((_, i) => i !== index);
        setCourseData({ ...courseData, units: newUnits });
    };

    // Syllabus handlers
    const handleSyllabusChange = (index, e) => {
        const newSyllabus = [...courseData.syllabus];
        newSyllabus[index][e.target.name] = e.target.value;
        setCourseData({ ...courseData, syllabus: newSyllabus });
    };

    const addSyllabusItem = () => {
        setCourseData({ ...courseData, syllabus: [...courseData.syllabus, { title: "", content: "" }] });
    };

    const removeSyllabusItem = (index) => {
        const newSyllabus = courseData.syllabus.filter((_, i) => i !== index);
        setCourseData({ ...courseData, syllabus: newSyllabus });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(courseData).forEach(key => {
            if (key === 'units' || key === 'syllabus') {
                formData.append(key, JSON.stringify(courseData[key]));
            } else if (key === 'image') {
                if (imageFile) {
                    formData.append('image', imageFile);
                } else {
                    formData.append('image', courseData.image);
                }
            } else {
                formData.append(key, courseData[key]);
            }
        });

        try {
            if (id) {
                await updateSchoolCourse(id, formData);
                setToast({ visible: true, message: "Course updated successfully!" });
            } else {
                await createSchoolCourse(formData);
                setToast({ visible: true, message: "Course created successfully!" });
            }
            setTimeout(() => {
                setToast({ visible: false, message: "" });
                navigate("/admin/school-courses");
            }, 2000);
        } catch (error) {
            console.error("Error saving course:", error);
            const errorMsg = error.response?.data?.message || error.message || "Error saving course. Please check all required fields.";
            setToast({ visible: true, message: errorMsg });
            setTimeout(() => setToast({ visible: false, message: "" }), 5000);
        }
    };

    return (
        <section className="p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-10 border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))" }}>
            <Toast visible={toast.visible} message={toast.message} />
            <div className="py-2 px-4">
                <h2 className="mb-6 text-2xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                    {id ? "Edit School Course" : "Add School Course"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Course Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Introduction to Python"
                                value={courseData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Icon/Image URL</label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="URL to image"
                                        value={courseData.image}
                                        onChange={handleChange}
                                        className="flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                    />
                                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center transition-colors">
                                        <FaPlus className="mr-2" /> Upload
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                {/* Image Preview */}
                                <div className="mt-2 p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center min-h-[150px]">
                                    {courseData.image ? (
                                        <div className="relative group w-full flex justify-center">
                                            <img
                                                src={getDirectImageUrl(courseData.image)}
                                                alt="Preview"
                                                className="max-h-32 object-contain rounded shadow-sm"
                                                onError={(e) => handleImageError(e, INVALID_IMAGE_URL)}
                                            />
                                            <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Image Preview
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-xs italic">No image URL provided</p>
                                    )}
                                </div>

                                <p className="mt-1 text-[11px] text-gray-500 italic">
                                    Tip: Use high-quality public URLs. Avoid restricted links. For Google Drive, ensure the file is shared as "Anyone with the link".
                                </p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Grade Level</label>
                            <select
                                name="level"
                                value={courseData.level}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            >
                                <option value="Elementary">Elementary</option>
                                <option value="Middle School">Middle School</option>
                                <option value="High School">High School</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Duration</label>
                            <select
                                name="duration"
                                value={courseData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            >
                                <option value="Full Year">Full Year</option>
                                <option value="Semester">Semester</option>
                                <option value="Quarter">Quarter</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Contact Hours</label>
                            <input
                                type="text"
                                name="contactHours"
                                placeholder="e.g. 125-175"
                                value={courseData.contactHours}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Language</label>
                            <input
                                type="text"
                                name="language"
                                placeholder="e.g. Python, Scratch"
                                value={courseData.language}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Category</label>
                            <input
                                type="text"
                                name="category"
                                placeholder="e.g. Foundations, AP"
                                value={courseData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={courseData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                            style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                        ></textarea>
                    </div>

                    {/* Units Section */}
                    <div className="border rounded-xl p-6" style={{ borderColor: "rgba(var(--dash-border))", backgroundColor: "rgb(var(--surface-1))" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold" style={{ color: "rgb(var(--text-primary))" }}>Units (Modules)</h3>
                            <button type="button" onClick={addUnit} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm transition-colors">
                                <FaPlus /> Add Unit
                            </button>
                        </div>
                        <div className="space-y-4">
                            {courseData.units.map((unit, index) => (
                                <div key={index} className="p-4 rounded-xl relative border" style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))" }}>
                                    <button
                                        type="button"
                                        onClick={() => removeUnit(index)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                    <div className="grid gap-4 mt-2">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Unit Title"
                                            value={unit.title}
                                            onChange={(e) => handleUnitChange(index, e)}
                                            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                            style={{ backgroundColor: "rgb(var(--surface-3))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                        />
                                        <textarea
                                            name="description"
                                            placeholder="Unit Description"
                                            rows="2"
                                            value={unit.description}
                                            onChange={(e) => handleUnitChange(index, e)}
                                            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                            style={{ backgroundColor: "rgb(var(--surface-3))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Syllabus Section */}
                    <div className="border rounded-xl p-6" style={{ borderColor: "rgba(var(--dash-border))", backgroundColor: "rgb(var(--surface-1))" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold" style={{ color: "rgb(var(--text-primary))" }}>Syllabus Details</h3>
                            <button type="button" onClick={addSyllabusItem} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-sm transition-colors">
                                <FaPlus /> Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {courseData.syllabus.map((item, index) => (
                                <div key={index} className="p-4 rounded-xl relative border" style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))" }}>
                                    <button
                                        type="button"
                                        onClick={() => removeSyllabusItem(index)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                    <div className="grid gap-4 mt-2">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Section Title (e.g. Unit 1: Programming)"
                                            value={item.title}
                                            onChange={(e) => handleSyllabusChange(index, e)}
                                            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                            style={{ backgroundColor: "rgb(var(--surface-3))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                        />
                                        <textarea
                                            name="content"
                                            placeholder="Section Content / Topics"
                                            rows="3"
                                            value={item.content}
                                            onChange={(e) => handleSyllabusChange(index, e)}
                                            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                            style={{ backgroundColor: "rgb(var(--surface-3))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-4 text-white font-bold rounded-xl transition-all transform active:scale-95 disabled:opacity-50 shadow-lg"
                        style={{ backgroundColor: "rgb(var(--accent))" }}
                    >
                        {id ? "Update Course" : "Create Course"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AddEditSchoolCourse;
