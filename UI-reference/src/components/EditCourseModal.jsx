import { useState } from 'react';
import { updateCourseSyllabus, updateCourseContent } from '../services/courseService';

export default function EditCourseModal({ course, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [syllabus, setSyllabus] = useState(course.syllabus || []);
  const [content, setContent] = useState(course.content || []);
  const [newSyllabusItem, setNewSyllabusItem] = useState({ title: '', description: '', topics: '' });
  const [newContentItem, setNewContentItem] = useState({ title: '', description: '', videoUrl: '', resourceUrl: '', type: 'video' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSyllabusItem = () => {
    if (!newSyllabusItem.title.trim()) {
      setError('Topic title is required');
      return;
    }
    const topicsArray = newSyllabusItem.topics
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    setSyllabus([
      ...syllabus,
      {
        title: newSyllabusItem.title,
        description: newSyllabusItem.description,
        topics: topicsArray
      }
    ]);
    setNewSyllabusItem({ title: '', description: '', topics: '' });
    setError('');
  };

  const handleRemoveSyllabusItem = (index) => {
    setSyllabus(syllabus.filter((_, i) => i !== index));
  };

  const handleAddContentItem = () => {
    if (!newContentItem.title.trim()) {
      setError('Content title is required');
      return;
    }
    setContent([
      ...content,
      {
        title: newContentItem.title,
        description: newContentItem.description,
        videoUrl: newContentItem.videoUrl,
        resourceUrl: newContentItem.resourceUrl,
        type: newContentItem.type
      }
    ]);
    setNewContentItem({ title: '', description: '', videoUrl: '', resourceUrl: '', type: 'video' });
    setError('');
  };

  const handleRemoveContentItem = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');

      if (activeTab === 'syllabus') {
        await updateCourseSyllabus(course._id, syllabus);
      } else {
        await updateCourseContent(course._id, content);
      }

      onSave();
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to save');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="panel max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-default bg-gradient-to-r from-dash-panel to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-dash-ink dark:text-white">Edit Course</h2>
            <p className="text-sm text-muted mt-1">{course.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-muted hover:text-primary transition p-2"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-default bg-surface/50">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex-1 py-4 px-6 border-b-2 transition font-semibold text-center ${
              activeTab === 'syllabus'
                ? 'border-teal-500 text-dash-ink dark:text-white bg-white/50 dark:bg-slate-700/30'
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            📚 Syllabus
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-4 px-6 border-b-2 transition font-semibold text-center ${
              activeTab === 'content'
                ? 'border-teal-500 text-dash-ink dark:text-white bg-white/50 dark:bg-slate-700/30'
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            📹 Content
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              {/* Add New Syllabus Item */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 border border-teal-200 dark:border-teal-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-dash-ink dark:text-white mb-4 flex items-center gap-2">
                  <span>➕</span> Add New Topic
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Topic Title (e.g., Introduction to React)"
                    value={newSyllabusItem.title}
                    onChange={(e) => setNewSyllabusItem({ ...newSyllabusItem, title: e.target.value })}
                    className="input w-full"
                  />
                  <textarea
                    placeholder="Topic Description"
                    value={newSyllabusItem.description}
                    onChange={(e) => setNewSyllabusItem({ ...newSyllabusItem, description: e.target.value })}
                    className="input w-full"
                    rows="2"
                  />
                  <input
                    type="text"
                    placeholder="Topics to cover (comma separated, e.g., Components, Hooks, State)"
                    value={newSyllabusItem.topics}
                    onChange={(e) => setNewSyllabusItem({ ...newSyllabusItem, topics: e.target.value })}
                    className="input w-full"
                  />
                  <button
                    onClick={handleAddSyllabusItem}
                    className="dash-btn w-full"
                  >
                    + Add Topic
                  </button>
                </div>
              </div>

              {/* Existing Syllabus Items */}
              <div>
                <h3 className="text-lg font-semibold text-dash-ink dark:text-white mb-4">Topics ({syllabus.length})</h3>
                <div className="space-y-3">
                  {syllabus.length === 0 ? (
                    <div className="text-center py-8 text-muted border-2 border-dashed border-default rounded-lg">
                      <span className="text-3xl">📚</span>
                      <p className="mt-2">No topics added yet.</p>
                    </div>
                  ) : (
                    syllabus.map((item, idx) => (
                      <div key={idx} className="dash-card hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">📖</span>
                              <h4 className="font-semibold text-dash-ink dark:text-white">{item.title}</h4>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted ml-6 mb-2">{item.description}</p>
                            )}
                            {item.topics && item.topics.length > 0 && (
                              <div className="flex flex-wrap gap-2 ml-6">
                                {item.topics.map((topic, t) => (
                                  <span key={t} className="badge-soft text-xs">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveSyllabusItem(idx)}
                            className="text-red-500 hover:text-red-700 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition"
                            title="Delete topic"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Add New Content Item */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-dash-ink dark:text-white mb-4 flex items-center gap-2">
                  <span>➕</span> Add New Content
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Content Title (e.g., React Basics Tutorial)"
                    value={newContentItem.title}
                    onChange={(e) => setNewContentItem({ ...newContentItem, title: e.target.value })}
                    className="input w-full"
                  />
                  <textarea
                    placeholder="Content Description"
                    value={newContentItem.description}
                    onChange={(e) => setNewContentItem({ ...newContentItem, description: e.target.value })}
                    className="input w-full"
                    rows="2"
                  />
                  <select
                    value={newContentItem.type}
                    onChange={(e) => setNewContentItem({ ...newContentItem, type: e.target.value })}
                    className="input w-full"
                  >
                    <option value="video">🎬 Video</option>
                    <option value="text">📝 Text</option>
                    <option value="resource">📎 Resource</option>
                  </select>
                  {newContentItem.type === 'video' && (
                    <input
                      type="text"
                      placeholder="Video URL (YouTube, Vimeo, etc.)"
                      value={newContentItem.videoUrl}
                      onChange={(e) => setNewContentItem({ ...newContentItem, videoUrl: e.target.value })}
                      className="input w-full"
                    />
                  )}
                  {newContentItem.type !== 'video' && (
                    <input
                      type="text"
                      placeholder="Resource URL"
                      value={newContentItem.resourceUrl}
                      onChange={(e) => setNewContentItem({ ...newContentItem, resourceUrl: e.target.value })}
                      className="input w-full"
                    />
                  )}
                  <button
                    onClick={handleAddContentItem}
                    className="dash-btn w-full"
                  >
                    + Add Content
                  </button>
                </div>
              </div>

              {/* Existing Content Items */}
              <div>
                <h3 className="text-lg font-semibold text-dash-ink dark:text-white mb-4">Content ({content.length})</h3>
                <div className="space-y-3">
                  {content.length === 0 ? (
                    <div className="text-center py-8 text-muted border-2 border-dashed border-default rounded-lg">
                      <span className="text-3xl">📹</span>
                      <p className="mt-2">No content added yet.</p>
                    </div>
                  ) : (
                    content.map((item, idx) => (
                      <div key={idx} className="dash-card hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">
                                {item.type === 'video' ? '🎬' : item.type === 'text' ? '📝' : '📎'}
                              </span>
                              <h4 className="font-semibold text-dash-ink dark:text-white">{item.title}</h4>
                              <span className="badge-soft text-xs capitalize">{item.type}</span>
                            </div>
                            {item.description && (
                              <p className="text-sm text-muted ml-8 mb-2">{item.description}</p>
                            )}
                            {item.videoUrl && (
                              <p className="text-xs text-muted ml-8">
                                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 hover:underline">
                                  ▶️ Watch Video
                                </a>
                              </p>
                            )}
                            {item.resourceUrl && (
                              <p className="text-xs text-muted ml-8">
                                <a href={item.resourceUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 hover:underline">
                                  📥 Download/View Resource
                                </a>
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveContentItem(idx)}
                            className="text-red-500 hover:text-red-700 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded transition"
                            title="Delete content"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-default bg-surface/50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-default rounded-lg hover:bg-surface dark:hover:bg-slate-700 transition font-semibold text-dash-ink dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="dash-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '💾 Saving...' : '✓ Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
