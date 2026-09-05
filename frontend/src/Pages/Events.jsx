import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvent } from "../api/eventApi";
import SEOHead from "../seo/SEOHead";
import Loading from "../Components/Helpers/Loading";
import {
  FaCalendarAlt,
  FaClock,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { HiOutlineCalendar } from "react-icons/hi";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return new Date(a).toDateString() === new Date(b).toDateString();
};

const isUpcoming = (event) => new Date(event.startDate) >= new Date();
const isPast = (event) => new Date(event.endDate) < new Date();

const EventCard = ({ event, index }) => {
  const upcoming = isUpcoming(event);
  const past = isPast(event);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-500"
      style={{ backdropFilter: "blur(12px)" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          {upcoming ? (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">
              Upcoming
            </span>
          ) : past ? (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gray-500/80 text-gray-200 backdrop-blur-sm">
              Completed
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-pink-500/90 text-white backdrop-blur-sm animate-pulse">
              Live Now
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Date & time info */}
        <div className="flex flex-col gap-2 mb-5 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-pink-500 flex-shrink-0" />
            <span>
              {isSameDay(event.startDate, event.endDate)
                ? formatDate(event.startDate)
                : `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`}
            </span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <FaClock className="text-purple-400 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-white/10 hover:from-pink-600/40 hover:to-purple-600/40 text-white transition-all duration-300"
        >
          <span>View Details</span>
          <FaArrowRight className="text-pink-400 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
};

const Events = () => {
  const { fetchEvents } = useEvent();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | upcoming | past
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(page, 12);
        setEvents(data.events || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  const filtered = events.filter((e) => {
    if (filter === "upcoming") return isUpcoming(e);
    if (filter === "past") return isPast(e);
    return true;
  });

  const upcomingCount = events.filter(isUpcoming).length;
  const pastCount = events.filter(isPast).length;

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 50%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/events"
        title="Events | CodeMentees"
        description="Explore CodeMentees events at colleges and universities — workshops, seminars, and coding competitions."
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-pink-400 bg-pink-500/10 border border-pink-500/20 px-4 py-2 rounded-full mb-6">
              <HiOutlineCalendar className="text-sm" />
              Campus & Community Events
            </span>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Where Knowledge
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Meets Action
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We bring hands-on workshops, coding battles, and tech talks straight to colleges and universities.
              Find an event near you.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center gap-12 mt-14"
          >
            {[
              { label: "Total Events", value: events.length },
              { label: "Upcoming", value: upcomingCount },
              { label: "Completed", value: pastCount },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-12 flex-wrap"
        >
          {[
            { key: "all", label: "All Events" },
            { key: "upcoming", label: "Upcoming" },
            { key: "past", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${
                filter === tab.key
                  ? "bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-600/30"
                  : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Loading />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <HiOutlineCalendar className="text-6xl text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No events found.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-pink-400 hover:underline text-sm"
            >
              View all events
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((event, idx) => (
                <EventCard key={event._id} event={event} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16 pb-16">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all ${
                  p === page
                    ? "bg-pink-600 border-pink-600 text-white"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ── CTA Banner ── */}
      <section className="mt-8 mb-24 mx-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(139,92,246,0.15) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Want an Event at Your Campus?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              We partner with colleges and universities to bring high-quality tech workshops, hackathons, and seminars.
              Reach out to us!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-pink-600/30 hover:scale-105"
            >
              Get in Touch
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Events;
