import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import Pagination from "../../Components/UI/Pagination";
import { useEvent } from "../../api/eventApi";
import { FaCalendarPlus, FaEdit, FaTrash, FaLink, FaImage, FaClock, FaCalendarAlt } from "react-icons/fa";

const EventManager = () => {
  const { fetchEvents } = useEvent();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { deleteItem, isSuccess, isLoading: isDeleteLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const loadEvents = async () => {
    try {
      const data = await fetchEvents(currentPage, 50);
      setEvents(data.events || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "Event deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      loadEvents();
    }
  }, [isSuccess]);

  useEffect(() => {
    initFlowbite();
  }, [events]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteItem(id, "/events");
    }
  };

  const headers = ["title", "startDate", "endDate", "time", "link"];
  const actions = [
    { label: "Edit", handler: (id) => navigate(`/admin/events/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      {toast.visible && (
        <div className={`fixed z-50 top-5 right-5 p-4 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      <div className="bg-dark-box rounded-xl shadow-lg border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-dark-primary">Event Management</h2>
            <span className="text-sm text-gray-400">Found {events.length} events</span>
          </div>
          <Link
            to="/admin/events/create"
            className="flex items-center gap-2 text-white bg-dark-primary hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <FaCalendarPlus />
            Add New Event
          </Link>
        </div>

        <div className="p-4">
          <ReusableTable
            headers={headers}
            data={events.map(e => ({
              ...e,
              startDate: new Date(e.startDate).toLocaleDateString(),
              endDate: new Date(e.endDate).toLocaleDateString()
            }))}
            actions={actions}
            isLoading={isDeleteLoading}
          />
          <div className="mt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateEvent = () => {
  const { createEvent, fetchEvents, updateEvent } = useEvent();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    time: "",
    startDate: "",
    endDate: "",
    link: "",
    image: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchEvents(1, 100).then(data => { // Fetch enough to likely find it, or use proper getById if available
        const eventToEdit = data.events.find(e => e._id === id);
        if (eventToEdit) {
          // Format dates for input fields (YYYY-MM-DD)
          const formattedData = {
            ...eventToEdit,
            startDate: eventToEdit.startDate ? new Date(eventToEdit.startDate).toISOString().split('T')[0] : "",
            endDate: eventToEdit.endDate ? new Date(eventToEdit.endDate).toISOString().split('T')[0] : ""
          };
          setEventData(formattedData);
          setIsEditing(true);
        }
      }).finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await updateEvent(id, eventData);
      } else {
        await createEvent(eventData);
      }
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      setError("Failed to save event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-dark-box rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-dark-primary text-center">
            {isEditing ? "Edit Event" : "Create New Event"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Event Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              placeholder="e.g., Web Development Bootcamp"
              className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FaCalendarAlt className="text-dark-secondary" /> Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none scheme-dark"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FaCalendarAlt className="text-dark-secondary" /> End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none scheme-dark"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FaClock className="text-dark-secondary" /> Time
            </label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none scheme-dark"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FaLink className="text-dark-secondary" /> Event Link (Google Meet / Zoom)
            </label>
            <input
              type="url"
              name="link"
              value={eventData.link}
              onChange={handleChange}
              placeholder="https://meet.google.com/..."
              className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FaImage className="text-dark-secondary" /> Poster Image URL
            </label>
            <input
              type="url"
              name="image"
              value={eventData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Event details..."
              rows="4"
              className="w-full bg-dark-background border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-dark-primary outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-3.5 rounded-lg transition-all duration-300 transform 
              ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-dark-primary to-blue-600 hover:from-blue-600 hover:to-dark-primary hover:-translate-y-1 shadow-lg shadow-blue-500/30'}`}
          >
            {loading ? "Processing..." : (isEditing ? "Update Event" : "Create Event")}
          </button>
        </form>
      </div>
    </div>
  );
};

export { EventManager, CreateEvent };
