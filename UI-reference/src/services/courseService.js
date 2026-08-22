import api from './api';

export const getCourses = async (search = "", techStack = "", page = 1) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (techStack) params.append("techStack", techStack);
        params.append("page", page);
        params.append("limit", 10);

        const res = await api.get(`/courses?${params.toString()}`);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch courses");
    }
}

export const getCourseById = async (id)=>{
    try{
        const res=await api.get(`/courses/${id}`);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch course");
    }
};

export const createCourse = async (courseData)=>{
    try{
        const res=await api.post("/courses",courseData);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to create course");
    }
};

export const updateCourse =async (id,courseData)=>{
    try{
        const res=await api.patch(`/courses/${id}`,courseData);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to update course");
    }
};

export const deleteCourse = async(id)=>{
    try{
        const res = await api.delete(`/courses/${id}`);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to delete course");
    }
};

export const toggleCoursePublish = async(id)=>{
    try{
        const res = await api.patch(`/courses/${id}/toggle`);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to toggle publish status");
    }
};

export const getMyCourses = async()=>{
    try{
        const res= await api.get("/courses/mentor/my-courses");
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch your courses");
    }
};

export const enrollCourse =async(id)=>{
    try{
        const res=await api.post(`/courses/${id}/enroll`);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to enroll");
    }
};

export const getEnrolledCourses = async()=>{
    try{
        const res=await api.get("/courses/student/enrollments");
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch enrolled courses");
    }
}

export const updateCourseSyllabus = async(id, syllabus) => {
    try {
        const res = await api.patch(`/courses/${id}/syllabus`, { syllabus });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update syllabus");
    }
};

export const updateCourseContent = async(id, content) => {
    try {
        const res = await api.patch(`/courses/${id}/content`, { content });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update content");
    }
};

export const addSyllabusItem = async(id, item) => {
    try {
        const res = await api.post(`/courses/${id}/syllabus/add`, item);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add syllabus item");
    }
};

export const addContentItem = async(id, item) => {
    try {
        const res = await api.post(`/courses/${id}/content/add`, item);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add content item");
    }
};