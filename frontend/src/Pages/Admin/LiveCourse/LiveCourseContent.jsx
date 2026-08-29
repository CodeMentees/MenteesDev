import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveCourseAPI } from '../../../api/liveCourseApi';
import { FaPlus, FaTrash, FaEdit, FaArrowLeft, FaVideo, FaFileAlt, FaGlobe, FaLock } from 'react-icons/fa';

const LiveCourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchLiveCourse, addContent, updateContent, deleteContent } = useLiveCourseAPI();

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    contentType: 'video',
    isPublic: false
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadCourseDetails();
  }, [id]);

  const loadCourseDetails = async () => {
    try {
      const data = await fetchLiveCourse(id);
      setCourse(data);
    } catch (error) {
      console.error("Error loading course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateContent(id, editingId, formData);
      } else {
        await addContent(id, formData);
      }
      setFormData({ title: '', url: '', contentType: 'video', isPublic: false });
      setEditingId(null);
      await loadCourseDetails();
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      url: item.url,
      contentType: item.contentType || 'video',
      isPublic: item.isPublic || false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (contentId) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await deleteContent(id, contentId);
        await loadCourseDetails();
      } catch (error) {
        console.error("Error deleting content:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen text-white">
      <button 
        onClick={() => navigate('/admin/live-courses')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FaArrowLeft /> Back to Courses
      </button>

      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Manage Content: <span className="text-blue-400">{course?.name}</span></h1>
          <p className="text-gray-400">Add recorded lectures, documents, and resources to your course curriculum.</p>
        </header>

        {/* Add/Edit Form */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-12 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {editingId ? <FaEdit className="text-yellow-400" /> : <FaPlus className="text-blue-400" />}
            {editingId ? 'Edit Content Module' : 'Add New Content Module'}
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Module Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Introduction to React Hooks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Content URL (YouTube/S3/External)</label>
              <input
                type="url"
                name="url"
                required
                value={formData.url}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Content Type</label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option value="video">Video Lecture</option>
                <option value="document">PDF / Document</option>
                <option value="link">External Resource Link</option>
              </select>
            </div>

            <div className="flex items-center gap-3 md:col-span-2 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-300">Make this module public (Free users can see)</span>
              </label>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-700">
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setFormData({ title: '', url: '', contentType: 'video', isPublic: false }); }}
                  className="px-6 py-2.5 rounded-xl border border-gray-600 text-gray-400 hover:bg-gray-700 transition-all font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20'}`}
              >
                {isSubmitting ? 'Processing...' : (editingId ? 'Update Module' : 'Add Module')}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Content List */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-700 bg-gray-800/50">
            <h2 className="text-xl font-bold">Course Curriculum</h2>
            <p className="text-sm text-gray-500 mt-1">Found {course?.content?.length || 0} items in this course.</p>
          </div>

          {!course?.content || course.content.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <FaVideo size={24} />
              </div>
              <p className="text-gray-500 italic">No modules added yet. Use the form above to start building the curriculum.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {course.content.map((item, index) => (
                <div key={item._id || index} className="p-5 flex items-center justify-between hover:bg-gray-750 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="text-gray-500 font-mono text-sm w-4">{index + 1}.</div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${item.contentType === 'video' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                      {item.contentType === 'video' ? <FaVideo /> : <FaFileAlt />}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200 group-hover:text-white transition-colors">{item.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">{item.contentType || 'module'}</span>
                        {item.isPublic ? (
                          <span className="flex items-center gap-1 text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                            <FaGlobe size={8} /> PUBLIC
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <FaLock size={8} /> PREMIUM
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCourseContent;
