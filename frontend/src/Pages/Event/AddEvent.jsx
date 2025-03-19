import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import Pagination from "../../Components/UI/Pagination";
import { useEvent } from "../../api/eventApi";

const EventManager = () => {
  const {addEvent, fetchEvents, updateEvent } = useEvent()
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { deleteItem, isSuccess, isLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      setEvents(data.events);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    };
    getEvents();
  }, [currentPage]);

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "Event deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      fetchEvents().then(data => setEvents(data.events));
    }
  }, [isSuccess]);

  useEffect(() => {
    initFlowbite();
  }, [events]);

  const handleDelete = async (id) => {
    await deleteItem(id, "/api/events");
    setEvents(events.filter(event => event.id !== id));
  };

  const headers = ["title", "startDate", "endDate", "time", "link"];
  const actions = [
    { label: "Edit", handler: (id) => navigate(`/admin/events/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-2 py-10">
      {toast.visible && (
        <div className="fixed z-50 top-5 right-5 p-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
      <section className="p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <Link to="/events/add" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2">
                Add Event
              </Link>
            </div>
            <div className="overflow-x-auto">
              <ReusableTable headers={headers} data={events} actions={actions} isLoading={isLoading} />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CreateEvent = () => {
  const {createEvent, fetchEvents, updateEvent } = useEvent()
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({ title: "", description: "", time: "", startDate: "", endDate: "", link: "",image:""});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEvents().then(data => {
        const eventToEdit = data.events.find(e => e._id === id);
        if (eventToEdit) {
          setEventData(eventToEdit);
          setIsEditing(true);
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateEvent(id, eventData);
    } else {
      await createEvent(eventData);
    }
    navigate("/admin/events");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">{isEditing ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-2 border rounded-md" required />
        <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 border rounded-md" required />
        <input type="time" name="time" value={eventData.time} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="url" name="link" value={eventData.link} onChange={handleChange} placeholder="Event Link" className="w-full px-4 py-2 border rounded-md" required />
        <input type="url" name="image" value={eventData.image} onChange={handleChange} placeholder="Poster Image" className="w-full px-4 py-2 border rounded-md" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">{isEditing ? "Update" : "Create"} Event</button>
      </form>
    </div>
  );
};

export { EventManager, CreateEvent };
