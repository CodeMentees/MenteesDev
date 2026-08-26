import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  ArrowLeft, 
  Info, 
  BookOpen, 
  Star,
  ChevronRight,
  ChevronDown,
  Layout,
  Image as ImageIcon,
  Tag,
  DollarSign
} from 'lucide-react';
import { useCourse } from "../../api/courseApi";
import { useCategoryAPI } from "../../api/categoryApi";
import Toast from "../../Components/UI/Toast";

// --- Sortable Item Component ---
const SortableItem = ({ id, children, handleProps }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div className="flex items-start gap-3 /50 border  p-4 rounded-xl mb-3 hover:border-blue-500/50 transition-all" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgb(var(--surface-2))"}}>
        <div {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing  hover:" style={{color: "rgb(var(--text-primary))"}}>
          <GripVertical size={20} />
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const CourseManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createCourse, fetchCourse, updateCourse, updateDetails } = useCourse();
  const { fetchCategories } = useCategoryAPI();

  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [courseData, setCourseData] = useState({
    name: "",
    image: "",
    tags: ["Online"],
    price: "",
    category: "",
    description: "",
    features: [],
    details: [] // This is the Syllabus: [{ label: "Topic", content: [{ title: "", description: "" }] }]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await fetchCategories();
        setCategories(catRes.categories || []);
        
        if (id) {
          setLoading(true);
          const res = await fetchCourse(id);
          if (res && res.data) {
            setCourseData({
              ...res.data,
              category: res.data.category?._id || res.data.category || "",
              features: res.data.features || [],
              details: res.data.details || []
            });
          }
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setCourseData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  // --- Syllabus (Details) Handlers ---
  const addTopic = () => {
    const newTopic = {
      id: Math.random().toString(36).substr(2, 9),
      label: "",
      content: [{ title: "", description: "" }]
    };
    setCourseData(prev => ({
      ...prev,
      details: [...prev.details, newTopic]
    }));
  };

  const removeTopic = (index) => {
    const newDetails = [...courseData.details];
    newDetails.splice(index, 1);
    setCourseData(prev => ({ ...prev, details: newDetails }));
  };

  const updateTopicLabel = (index, value) => {
    const newDetails = [...courseData.details];
    newDetails[index].label = value;
    setCourseData(prev => ({ ...prev, details: newDetails }));
  };

  const addSubTopic = (topicIndex) => {
    const newDetails = [...courseData.details];
    newDetails[topicIndex].content.push({ title: "", description: "" });
    setCourseData(prev => ({ ...prev, details: newDetails }));
  };

  const removeSubTopic = (topicIndex, subIndex) => {
    const newDetails = [...courseData.details];
    newDetails[topicIndex].content.splice(subIndex, 1);
    setCourseData(prev => ({ ...prev, details: newDetails }));
  };

  const updateSubTopic = (topicIndex, subIndex, field, value) => {
    const newDetails = [...courseData.details];
    newDetails[topicIndex].content[subIndex][field] = value;
    setCourseData(prev => ({ ...prev, details: newDetails }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCourseData((prev) => {
        const oldIndex = prev.details.findIndex(item => (item.id || item._id) === active.id);
        const newIndex = prev.details.findIndex(item => (item.id || item._id) === over.id);
        return {
          ...prev,
          details: arrayMove(prev.details, oldIndex, newIndex),
        };
      });
    }
  };

  // --- Features Handlers ---
  const addFeature = () => {
    setCourseData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...courseData.features];
    newFeatures[index] = value;
    setCourseData(prev => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index) => {
    const newFeatures = courseData.features.filter((_, i) => i !== index);
    setCourseData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      // Only include fields relevant for the main update
      formData.append("name", courseData.name);
      formData.append("category", courseData.category);
      formData.append("price", courseData.price);
      formData.append("description", courseData.description);
      formData.append("tags", JSON.stringify(courseData.tags));

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (typeof courseData.image === 'string' && !courseData.image.startsWith('blob:')) {
        formData.append("image", courseData.image);
      }

      let res;
      if (id) {
        // First update main info
        res = await updateCourse(id, formData);
        // Then update details (syllabus) and features
        await updateDetails(id, { 
          details: courseData.details, 
          features: courseData.features 
        });
        showToast("Course updated successfully!");
      } else {
        // For new course, we might need a two-step or handle details in create
        // Assuming create handles details if passed in formData or separate call
        formData.append("details", JSON.stringify(courseData.details));
        formData.append("features", JSON.stringify(courseData.features));
        res = await createCourse(formData);
        if (res && res.data) {
          showToast("Course created successfully!");
          navigate(`/admin/courses/${res.data._id}/manage`);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.message || "Failed to save course", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !courseData.name && id) {
    return <div className="flex items-center justify-center min-h-screen " style={{color: "rgb(var(--text-primary))"}}>Loading Premium Dashboard...</div>;
  }

  return (
    <div className="min-h-screen  " style={{backgroundColor: "rgb(var(--dash-bg))"}}>
      <Toast visible={toast.visible} message={toast.message} />
      
      {/* Header */}
      <div className="sticky top-0 z-30 /80 backdrop-blur-md border-b  p-4 mb-6" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgb(var(--dash-bg))"}}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/admin/courses")}
              className="p-2 hover: rounded-lg transition-colors hover:" style={{color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}>
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold  tracking-tight" style={{color: "rgb(var(--text-primary))"}}>
                {id ? "Edit Course" : "New Course"}
              </h1>
              <p className=" text-sm font-medium" style={{color: "rgb(var(--text-secondary))"}}>
                {courseData.name || "Enter course details"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50  px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95" style={{color: "rgb(var(--text-primary))"}}>
              <Save size={20} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8  p-1.5 rounded-2xl border  w-fit" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgba(var(--dash-panel), 0.5)"}}>
          {[
            { id: "general", label: "General Info", icon: <Info size={18} /> },
            { id: "syllabus", label: "Syllabus", icon: <BookOpen size={18} /> },
            { id: "features", label: "Key Features", icon: <Star size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id 
                  ? "bg-gray-800 text-blue-400 shadow-xl border border-gray-700" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className=" border  rounded-2xl p-6" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgba(var(--dash-panel), 0.5)"}}>
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Layout className="text-blue-500" size={20} /> Basic Information
                  </h3>
                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-medium  mb-2" style={{color: "rgb(var(--text-secondary))"}}>Course Title</label>
                      <input 
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Master Web Development"
                        className="w-full  border  rounded-xl px-4 py-3  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium  mb-2" style={{color: "rgb(var(--text-secondary))"}}>Category</label>
                        <select 
                          name="category"
                          value={courseData.category}
                          onChange={handleInputChange}
                          className="w-full  border  rounded-xl px-4 py-3  focus:ring-2 focus:ring-blue-500 transition-all outline-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}>
                          <option value="">Select a category</option>
                          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium  mb-2" style={{color: "rgb(var(--text-secondary))"}}>Price ($)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 " style={{color: "rgb(var(--text-secondary))"}}size={18} />
                          <input 
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className="w-full  border  rounded-xl pl-10 pr-4 py-3  focus:ring-2 focus:ring-blue-500 transition-all outline-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}/>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium  mb-2" style={{color: "rgb(var(--text-secondary))"}}>Description</label>
                      <textarea 
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Write a compelling overview of the course..."
                        className="w-full  border  rounded-xl px-4 py-3  focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}/>
                    </div>
                  </div>
                </div>

                <div className=" border  rounded-2xl p-6" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgba(var(--dash-panel), 0.5)"}}>
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <ImageIcon className="text-blue-500" size={20} /> Course Media
                  </h3>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-medium  mb-2" style={{color: "rgb(var(--text-secondary))"}}>Cover Image</label>
                      <div className="flex gap-4">
                        <input 
                          type="text"
                          name="image"
                          value={typeof courseData.image === 'string' ? (courseData.image.startsWith('blob:') ? '' : courseData.image) : ''}
                          onChange={handleInputChange}
                          placeholder="Or paste an image URL..."
                          className="flex-1  border  rounded-xl px-4 py-3  focus:ring-2 focus:ring-blue-500 transition-all outline-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}/>
                        <label className="cursor-pointer bg-gray-700 hover:bg-gray-600  px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-medium border " style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))"}}>
                          Browse
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "syllabus" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold " style={{color: "rgb(var(--text-primary))"}}>Course Curriculum</h3>
                  <button 
                    onClick={addTopic}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                  >
                    <Plus size={18} /> Add New Topic
                  </button>
                </div>
                
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={courseData.details.map(d => d.id || d._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {courseData.details.map((topic, index) => (
                      <SortableItem key={topic.id || topic._id} id={topic.id || topic._id}>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <input 
                              type="text"
                              value={topic.label}
                              onChange={(e) => updateTopicLabel(index, e.target.value)}
                              placeholder="Topic Name (e.g. Introduction to React)"
                              className="flex-1 bg-transparent border-b  focus:border-blue-500 px-0 py-1 text-lg font-bold  outline-none transition-all" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))"}}/>
                            <button 
                              onClick={() => removeTopic(index)}
                              className="p-2  hover:text-red-400 transition-colors" style={{color: "rgb(var(--text-secondary))"}}title="Delete Topic"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="pl-4 border-l-2 /50 space-y-4 ml-2" style={{borderColor: "rgba(var(--dash-border))"}}>
                            {topic.content.map((sub, subIndex) => (
                              <div key={subIndex} className="/30 p-4 rounded-xl relative group/sub" style={{backgroundColor: "rgb(var(--dash-panel))"}}>
                                <div className="grid gap-3">
                                  <input 
                                    type="text"
                                    value={sub.title}
                                    onChange={(e) => updateSubTopic(index, subIndex, "title", e.target.value)}
                                    placeholder="Sub-topic Title"
                                    className="w-full bg-transparent text-sm font-semibold  outline-none border-b /30 focus:border-blue-500/50" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))"}}/>
                                  <textarea 
                                    value={sub.description}
                                    onChange={(e) => updateSubTopic(index, subIndex, "description", e.target.value)}
                                    placeholder="Brief explanation..."
                                    rows={1}
                                    className="w-full bg-transparent text-xs  outline-none resize-none" style={{color: "rgb(var(--text-secondary))"}}/>
                                </div>
                                <button 
                                  onClick={() => removeSubTopic(index, subIndex)}
                                  className="absolute top-2 right-2 p-1 text-gray-600 hover:text-red-400 opacity-0 group-hover/sub:opacity-100 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => addSubTopic(index)}
                              className="flex items-center gap-1.5 text-xs  hover:text-blue-400 font-medium transition-colors mt-2" style={{color: "rgb(var(--text-secondary))"}}>
                              <Plus size={14} /> Add lesson
                            </button>
                          </div>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </DndContext>

                {courseData.details.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed  rounded-3xl" style={{borderColor: "rgba(var(--dash-border))"}}>
                    <BookOpen size={48} className="mx-auto text-gray-700 mb-4" />
                    <p className=" font-medium" style={{color: "rgb(var(--text-secondary))"}}>No topics added yet. Start building your curriculum.</p>
                    <button onClick={addTopic} className="mt-4 px-6 py-2   rounded-xl hover:bg-gray-700 transition-all font-semibold" style={{color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}>
                      Create First Topic
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className=" border  rounded-2xl p-6" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgba(var(--dash-panel), 0.5)"}}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Star className="text-blue-500" size={20} /> Key Highlights
                    </h3>
                    <button onClick={addFeature} className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 focus:outline-none">
                      <Plus size={16} /> Add Feature
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {courseData.features.map((feature, index) => (
                      <div key={index} className="flex gap-3 group">
                        <div className="flex-1 relative">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input 
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder="e.g. 24/7 Mentorship Support"
                            className="w-full  border  rounded-xl pl-10 pr-4 py-2.5  focus:ring-2 focus:ring-blue-500 transition-all outline-none" style={{borderColor: "rgba(var(--dash-border))", color: "rgb(var(--text-primary))", backgroundColor: "rgb(var(--surface-2))"}}/>
                        </div>
                        <button 
                          onClick={() => removeFeature(index)}
                          className="p-2  hover:text-red-400 transition-colors" style={{color: "rgb(var(--text-secondary))"}}>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                    
                    {courseData.features.length === 0 && (
                      <div className="text-center py-8  text-sm italic" style={{color: "rgb(var(--text-secondary))"}}>
                        No features added yet. Highlight what makes this course special.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className=" border  rounded-3xl overflow-hidden shadow-2xl" style={{borderColor: "rgba(var(--dash-border))", backgroundColor: "rgb(var(--dash-panel))"}}>
                <div className="aspect-video  relative group overflow-hidden" style={{backgroundColor: "rgb(var(--surface-2))"}}>
                  {courseData.image ? (
                    <img 
                      src={courseData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                      <ImageIcon size={40} />
                      <span className="text-xs font-medium uppercase tracking-widest " style={{color: "rgb(var(--text-secondary))"}}>Image Preview</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="bg-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider " style={{color: "rgb(var(--text-primary))"}}>
                      Live Preview
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold  mb-2 leading-tight" style={{color: "rgb(var(--text-primary))"}}>
                      {courseData.name || "Course Title"}
                    </h4>
                    <p className=" text-sm line-clamp-2" style={{color: "rgb(var(--text-secondary))"}}>
                      {courseData.description || "No description provided yet."}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t " style={{borderColor: "rgba(var(--dash-border))"}}>
                    <span className="text-2xl font-black " style={{color: "rgb(var(--text-primary))"}}>
                      {courseData.price ? `$${courseData.price}` : "Free"}
                    </span>
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-gray-900 bg-blue-500"></div>
                      <div className="w-7 h-7 rounded-full border-2 border-gray-900 bg-purple-500"></div>
                      <div className="w-7 h-7 rounded-full border-2 border-gray-900 bg-pink-500"></div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold " style={{color: "rgb(var(--text-secondary))"}}>
                      <BookOpen size={14} className="text-blue-500" />
                      {courseData.details.length} Modules revealed
                    </div>
                    
                    <div className="space-y-2">
                      {courseData.details.slice(0, 3).map((d, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]  font-medium" style={{color: "rgb(var(--text-secondary))"}}>
                          <ChevronRight size={12} className="text-blue-600" />
                          <span className="truncate">{d.label || "Untitled Module"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center  shrink-0" style={{color: "rgb(var(--text-primary))"}}>
                    <Save size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold  mb-1" style={{color: "rgb(var(--text-primary))"}}>Stay Productive</h5>
                    <p className="text-[11px] text-blue-300/60 leading-relaxed font-medium">
                      All changes are kept in local state until you hit save. We recommend saving frequently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
