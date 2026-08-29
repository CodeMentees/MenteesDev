import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReusableTable from '../../Components/Table/Table';
import Toast from '../../Components/UI/Toast';
import { useSchoolCourseAPI } from '../../api/schoolCourseApi';

function SchoolCourseList() {
    const { fetchSchoolCourses, deleteSchoolCourse } = useSchoolCourseAPI();
    const [courses, setCourses] = useState([]);
    const [isToast, setToast] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetchSchoolCourses();
        setCourses(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteSchoolCourse(id);
            setToast(true);
            setTimeout(() => setToast(false), 3000);
            fetchData();
        }
    };

    const headers = ['title', 'level', 'duration', 'language'];
    const actions = [
        { label: 'Update', handler: (id) => navigate(`/admin/school-courses/edit/${id}`) },
        { label: 'Delete', handler: handleDelete },
    ];

    return (
        <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>School Coding Courses</h1>
                <button
                    onClick={() => navigate('/admin/school-courses/add')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                    Add New Course
                </button>
            </div>

            <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
                <Toast message="Course deleted successfully" visible={isToast} />
                <div className="overflow-x-auto">
                    <ReusableTable
                        headers={headers}
                        data={courses}
                        actions={actions}
                    />
                </div>
            </div>
        </div>
    );
}

export default SchoolCourseList;
