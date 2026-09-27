'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Components/Helpers/Loading";
import Toast from "../../Components/UI/Toast";
import { FaClock, FaPlus, FaRocket, FaTrash, FaRobot, FaCircleCheck, FaSpinner } from "react-icons/fa6";

export default function AIBlogScheduler() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("Technology");
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isPostingNow, setIsPostingNow] = useState(false);
  const [publishingId, setPublishingId] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const fetchQueue = async () => {
    try {
      const response = await axios.get("/api/ai/blog-queue", { withCredentials: true });
      if (response.data?.success) {
        setQueue(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch blog topic queue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 15000); // Poll every 15s for status updates
    return () => clearInterval(interval);
  }, []);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setToast({ visible: true, message: "Please enter a topic name", type: "error" });
      return;
    }

    setIsAdding(true);
    try {
      const response = await axios.post(
        "/api/ai/blog-queue",
        { topic: topic.trim(), category },
        { withCredentials: true }
      );

      if (response.data?.success) {
        setToast({ visible: true, message: "Topic added to AI queue!", type: "success" });
        setTopic("");
        await fetchQueue();
      }
    } catch (error) {
      console.error("Error adding topic to queue:", error);
      setToast({
        visible: true,
        message: error.response?.data?.message || "Failed to add topic to queue",
        type: "error",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handlePostNow = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setToast({ visible: true, message: "Please enter a topic name", type: "error" });
      return;
    }
    setIsPostingNow(true);
    try {
      // Step 1: Add topic to queue
      const addRes = await axios.post(
        "/api/ai/blog-queue",
        { topic: topic.trim(), category },
        { withCredentials: true }
      );
      if (!addRes.data?.success) throw new Error("Failed to add topic");
      const newTopicId = addRes.data?.data?._id;

      // Step 2: Immediately trigger publish for that specific topic
      const publishRes = await axios.post(
        "/api/ai/blog-queue/trigger-now",
        { topicId: newTopicId },
        { withCredentials: true }
      );
      if (publishRes.data?.success) {
        setToast({ visible: true, message: `🚀 ${publishRes.data.message || "Blog published immediately!"}`, type: "success" });
        setTopic("");
        await fetchQueue();
      }
    } catch (error) {
      console.error("Error posting now:", error);
      setToast({
        visible: true,
        message: error.response?.data?.message || "Failed to publish immediately",
        type: "error",
      });
    } finally {
      setIsPostingNow(false);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      await axios.delete(`/api/ai/blog-queue/${id}`, { withCredentials: true });
      setToast({ visible: true, message: "Topic removed from queue", type: "success" });
      await fetchQueue();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleTriggerNow = async (topicId) => {
    setPublishingId(topicId || "any");
    try {
      const response = await axios.post(
        "/api/ai/blog-queue/trigger-now",
        { topicId },
        { withCredentials: true }
      );

      if (response.data?.success) {
        setToast({
          visible: true,
          message: `✨ ${response.data.message}`,
          type: "success",
        });
        await fetchQueue();
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
      setToast({
        visible: true,
        message: error.response?.data?.message || "Failed to auto-publish blog",
        type: "error",
      });
    } finally {
      setPublishingId(null);
    }
  };

  return (
    <div className="min-h-screen text-white p-6 md:p-10" style={{ background: "#080808" }}>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ visible: false, message: "", type: "success" })}
        />
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
            <FaRobot /> Automated AI Publisher
          </div>
          <h1 className="text-3xl md:text-4xl font-black">AI Blog Topic Queue & Scheduler</h1>
          <p className="text-gray-400 text-sm mt-1">
            Add blog topics below. Gemini AI automatically writes & publishes 1 topic every 2 hours and cleans up the queue.
          </p>
        </div>
      </div>

      {/* Cron Banner Notice */}
      <div className="max-w-6xl mx-auto mb-8 p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/30 rounded-2xl flex items-start gap-4">
        <div className="p-3 bg-orange-500/20 text-orange-400 rounded-xl text-xl mt-0.5">
          <FaClock />
        </div>
        <div>
          <h3 className="font-bold text-white text-base">Automated 2-Hour Cron Worker Active</h3>
          <p className="text-xs text-gray-300 leading-relaxed mt-1">
            The backend background worker runs every 2 hours (`0 */2 * * *`). It picks the next pending topic, uses Gemini AI to write a full Markdown article, publishes it to your Blog Post collection, and removes it from the queue table. You can also click <strong>"Publish Now with Gemini"</strong> to publish immediately on demand!
          </p>
        </div>
      </div>

      {/* Form: Add Topic */}
      <div className="max-w-6xl mx-auto bg-surface p-6 md:p-8 rounded-2xl border border-default shadow-xl mb-10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FaPlus className="text-orange-400" /> Add New Blog Topic to Queue
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Master Async/Await in JavaScript: Modern Patterns"
              className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm"
            />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 text-sm"
            >
              <option value="Technology" className="bg-neutral-900 text-white">Technology</option>
              <option value="Web Development" className="bg-neutral-900 text-white">Web Development</option>
              <option value="Data Structures" className="bg-neutral-900 text-white">Data Structures</option>
              <option value="Career & Mentorship" className="bg-neutral-900 text-white">Career & Mentorship</option>
              <option value="AI & Machine Learning" className="bg-neutral-900 text-white">AI & Machine Learning</option>
            </select>
          </div>
          {/* Two action buttons stacked in the last column */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAddTopic}
              disabled={isAdding || isPostingNow}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {isAdding ? "Adding..." : <><FaPlus /> Add to Queue</>}
            </button>
            <button
              type="button"
              onClick={handlePostNow}
              disabled={isPostingNow || isAdding}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {isPostingNow
                ? <><FaSpinner className="animate-spin" /> Publishing...</>
                : <><FaRocket /> Post Now</>}
            </button>
          </div>
        </form>
      </div>

      {/* Queue Table */}
      <div className="max-w-6xl mx-auto bg-surface rounded-2xl border border-default shadow-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-lg">Queued Blog Topics ({queue.length})</h3>
          {queue.length > 0 && (
            <button
              onClick={() => handleTriggerNow(null)}
              disabled={publishingId !== null}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {publishingId === "any" ? (
                <>
                  <FaSpinner className="animate-spin" /> Auto-Publishing Next Topic...
                </>
              ) : (
                <>
                  <FaRocket /> Publish Next Topic Now
                </>
              )}
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="p-12 flex items-center justify-center">
            <Loading message="Loading topic queue..." />
          </div>
        ) : queue.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <FaCircleCheck className="text-4xl mx-auto mb-3 text-emerald-400/60" />
            <p className="font-medium text-gray-300">No pending topics in queue!</p>
            <p className="text-xs text-gray-500 mt-1">Add a topic above to schedule automated AI blog generation.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="p-4 pl-6">Topic Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Queued Date</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {queue.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 pl-6 font-semibold text-white">{item.topic}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-orange-300 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.status === "pending" && (
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Pending Schedule
                        </span>
                      )}
                      {item.status === "processing" && (
                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                          <FaSpinner className="animate-spin text-xs" /> Writing with AI...
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 text-right pr-6 space-x-2">
                      <button
                        onClick={() => handleTriggerNow(item._id)}
                        disabled={publishingId === item._id}
                        className="px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        {publishingId === item._id ? (
                          <>
                            <FaSpinner className="animate-spin" /> Publishing...
                          </>
                        ) : (
                          <>
                            <FaRocket /> Publish Now
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteTopic(item._id)}
                        className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
