import React, { useEffect, useState } from "react";
import { useEvent } from "../../api/eventApi";
import { FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";

const UpcomingEvents = () => {
    const { fetchEvents } = useEvent();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEvents(1, 10);
                if (data && data.events) {
                    const upcoming = data.events
                        .filter((event) => new Date(event.startDate) >= new Date().setHours(0, 0, 0, 0))
                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                        .slice(0, 4);
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

    if (!loading && events.length === 0) return null;

    return (
        <section className="py-20 px-6 relative" style={{ background: "#000005" }}>
            {/* Separator line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)" }} />

            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#a78bfa" }}>Live Events</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Upcoming Events &amp; Webinars
                    </h2>
                    <p className="mt-3 text-base max-w-xl" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Join expert-led sessions to level up your skills. Don't miss live workshops and tech talks.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: "#a78bfa" }} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(167,139,250,0.12)",
                                }}
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img
                                        src={event.image || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1350&q=80"}
                                        alt={event.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1350&q=80";
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: "rgba(124,58,237,0.85)", backdropFilter: "blur(8px)" }}>
                                        Upcoming
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center text-xs font-semibold mb-2 gap-2" style={{ color: "#a78bfa" }}>
                                        <FaCalendarAlt />
                                        {new Date(event.startDate).toLocaleDateString(undefined, {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </div>

                                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{event.title}</h3>

                                    <p className="text-sm mb-4 line-clamp-2 flex-grow" style={{ color: "rgba(255,255,255,0.45)" }}>
                                        {event.description}
                                    </p>

                                    <div className="border-t pt-4 mt-auto" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm gap-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                                <FaClock />
                                                {event.time}
                                            </div>
                                            <a
                                                href={event.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm font-semibold transition-colors"
                                                style={{ color: "#c084fc" }}
                                            >
                                                Register <FaExternalLinkAlt className="text-xs" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
