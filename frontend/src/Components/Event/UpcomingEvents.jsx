import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEvent } from "../../api/eventApi";
import { FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";

const UpcomingEvents = () => {
    const { fetchEvents } = useEvent();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEvents(1, 10); // Fetch top 10 events
                if (data && data.events) {
                    // Filter only upcoming events and sort by date
                    const upcoming = data.events
                        .filter((event) => new Date(event.startDate) >= new Date().setHours(0, 0, 0, 0))
                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        .slice(0, 4); // Show only top 4
                    setEvents(upcoming);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (!loading && events.length === 0) return null; // Don't show section if no events

    return (
        <div className="py-8 bg-gradient-to-b from-dark-background to-dark-box">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-12">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dark-primary to-blue-400 mb-4">
                        Upcoming Events & Webinars
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Join our expert-led sessions to level up your coding skills. Don't miss out on live workshops and tech talks.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event, index) => (
                            <div
                                key={event._id}
                                className="bg-dark-box rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-700/50 flex flex-col h-full"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                                        alt={event.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute top-0 right-0 bg-dark-primary text-white text-xs font-bold px-3 py-1 m-2 rounded-full shadow-md">
                                        Upcoming
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center text-xs text-dark-primary font-semibold mb-2 gap-2">
                                        <FaCalendarAlt />
                                        {new Date(event.startDate).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{event.title}</h3>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                                        {event.description}
                                    </p>

                                    <div className="border-t border-gray-700/50 pt-4 mt-auto">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-gray-300 text-sm gap-2">
                                                <FaClock className="text-dark-secondary" />
                                                {event.time}
                                            </div>
                                            <a
                                                href={event.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-dark-primary hover:text-white transition-colors flex items-center gap-1 text-sm font-semibold group"
                                            >
                                                Register <FaExternalLinkAlt className="text-xs transition-transform group-hover:translate-x-1" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpcomingEvents;
