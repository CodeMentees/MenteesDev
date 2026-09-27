'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaBrain, FaRocket, FaCalendarAlt, FaClock, FaFire,
  FaChevronDown, FaChevronRight, FaCheckCircle, FaBook,
  FaCode, FaFlask, FaSync, FaDownload, FaSpinner,
  FaStar, FaLightbulb, FaTrophy, FaLayerGroup
} from "react-icons/fa";

// ─── Helpers ────────────────────────────────────────────────────────────────

const LEVELS = ["Beginner", "Basic DSA done", "Intermediate", "Advanced"];
const FOCUS_OPTIONS = [
  "Arrays & Strings", "Linked Lists", "Trees & Graphs", "Dynamic Programming",
  "Recursion & Backtracking", "Greedy Algorithms", "Sorting & Searching",
  "System Design", "OS Concepts", "DBMS", "Computer Networks",
  "Object-Oriented Design", "Aptitude & Puzzles", "Company-Specific Prep"
];

const TYPE_STYLES = {
  learn:    { bg: "bg-blue-500/10 border-blue-500/30 text-blue-300",   icon: <FaBook className="text-blue-400" />,    label: "Learn" },
  practice: { bg: "bg-orange-500/10 border-orange-500/30 text-orange-300", icon: <FaCode className="text-orange-400" />,  label: "Practice" },
  revise:   { bg: "bg-purple-500/10 border-purple-500/30 text-purple-300", icon: <FaSync className="text-purple-400" />,  label: "Revise" },
  test:     { bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300", icon: <FaFlask className="text-emerald-400" />, label: "Test" },
};

function TaskChip({ type }) {
  const s = TYPE_STYLES[type] || TYPE_STYLES.learn;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${s.bg}`}>
      {s.icon} {s.label}
    </span>
  );
}

function DayCard({ day, stageColor }) {
  const [open, setOpen] = useState(false);
  const totalMins = day.tasks?.reduce((s, t) => s + (t.estimated_minutes || 0), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border overflow-hidden ${day.is_off ? "opacity-50" : ""}`}
      style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <button
        onClick={() => !day.is_off && setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${stageColor}`}>
            {day.day_number}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {day.is_off ? "🏖 Rest Day" : `Day ${day.day_number}`}
            </p>
            <p className="text-xs text-gray-500">{day.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!day.is_off && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <FaClock className="text-gray-500" /> {Math.floor(totalMins / 60)}h {totalMins % 60}m
            </span>
          )}
          {!day.is_off && (
            <FaChevronDown className={`text-gray-500 text-xs transition-transform ${open ? "rotate-180" : ""}`} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && !day.is_off && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
              {day.tasks?.map((task, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.03]">
                  <div className="mt-0.5 flex-shrink-0"><TaskChip type={task.type} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{task.topic}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{task.description}</p>
                    {task.resources?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {task.resources.map((r, ri) => (
                          <span key={ri} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-gray-300">{r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 mt-1">
                    {task.estimated_minutes}m
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const STAGE_COLORS = [
  "bg-pink-500/20 text-pink-300",
  "bg-orange-500/20 text-orange-300",
  "bg-yellow-500/20 text-yellow-300",
  "bg-emerald-500/20 text-emerald-300",
  "bg-blue-500/20 text-blue-300",
  "bg-purple-500/20 text-purple-300",
];

function StageSection({ stage, idx }) {
  const [collapsed, setCollapsed] = useState(false);
  const color = STAGE_COLORS[idx % STAGE_COLORS.length];
  const totalDays = stage.days?.length || 0;
  const offDays = stage.days?.filter(d => d.is_off).length || 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
      className="rounded-3xl border overflow-hidden"
      style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Stage Header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg ${color}`}>
            {idx + 1}
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{stage.stage_name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{stage.stage_goal}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><FaCalendarAlt /> {totalDays} days</span>
            {offDays > 0 && <span className="flex items-center gap-1">🏖 {offDays} off</span>}
          </div>
          <FaChevronDown className={`text-gray-500 transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </div>
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 pb-4 space-y-3 border-t border-white/5 pt-4">
              {stage.days?.map((day) => (
                <DayCard key={day.day_number} day={day} stageColor={color} />
              ))}

              {/* Stage Assessment */}
              {stage.stage_end_assessment && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTrophy className="text-amber-400" />
                    <span className="text-sm font-bold text-amber-300">Stage Assessment</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{stage.stage_end_assessment.suggested_test}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stage.stage_end_assessment.focus_areas?.map((fa, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full font-semibold">{fa}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PlanlyPage() {
  const [step, setStep] = useState("form"); // 'form' | 'loading' | 'result'
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [weakTopics, setWeakTopics] = useState("");
  const [vacationDays, setVacationDays] = useState("");
  const [form, setForm] = useState({
    goal: "",
    current_level: "Beginner",
    hours_per_day: 4,
    start_date: new Date().toISOString().split("T")[0],
    target_date: "",
  });

  const toggleFocus = (item) => {
    setFocusAreas(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const handleGenerate = async () => {
    if (!form.goal.trim() || !form.target_date) {
      setError("Please fill in Goal and Target Date.");
      return;
    }
    setError("");
    setStep("loading");

    try {
      const res = await axios.post("/api/planly/generate", {
        ...form,
        focus_areas: focusAreas,
        weak_topics: weakTopics,
        vacation_days: vacationDays,
      }, { withCredentials: true });

      if (res.data?.success) {
        setPlan(res.data.data);
        setStep("result");
      } else {
        setError(res.data?.message || "Generation failed.");
        setStep("form");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      setStep("form");
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planly-${plan.plan_title?.replace(/\s+/g, "-").toLowerCase() || "plan"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── LOADING STATE ──
  if (step === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8"
        style={{ background: "linear-gradient(135deg, #050508 0%, #090912 50%, #06060e 100%)" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500"
        />
        <div className="text-center">
          <p className="text-white font-bold text-xl">Building your personalized plan...</p>
          <p className="text-gray-400 text-sm mt-2">Gemini AI is crafting your day-by-day schedule</p>
        </div>
      </div>
    );
  }

  // ── RESULT STATE ──
  if (step === "result" && plan) {
    return (
      <div className="min-h-screen text-white"
        style={{ background: "linear-gradient(135deg, #050508 0%, #090912 50%, #06060e 100%)" }}>

        {/* Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 py-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-4">
              <FaStar /> Your Personalized Plan
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">{plan.plan_title}</h1>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400 flex-wrap">
              <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-purple-400" /> {plan.total_duration_days} days</span>
              <span className="flex items-center gap-1.5"><FaLayerGroup className="text-blue-400" /> {plan.stages?.length} stages</span>
            </div>
            {plan.adjustment_notes && (
              <div className="mt-6 max-w-2xl mx-auto p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <FaLightbulb className="text-blue-400 text-sm" />
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Adjustment Notes</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{plan.adjustment_notes}</p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <div className="flex gap-3 mb-10 justify-center flex-wrap">
            <button
              onClick={() => setStep("form")}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:bg-white/10 transition flex items-center gap-2"
            >
              <FaSync /> Regenerate
            </button>
            <button
              onClick={downloadJSON}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm font-bold text-white transition flex items-center gap-2"
            >
              <FaDownload /> Download Plan
            </button>
          </div>

          {/* Stages */}
          <div className="space-y-5">
            {plan.stages?.map((stage, idx) => (
              <StageSection key={idx} stage={stage} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── FORM STATE ──
  return (
    <div className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #050508 0%, #090912 60%, #07070f 100%)" }}>

      {/* Glows */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 py-20">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
            <FaBrain /> Powered by Gemini AI
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            Meet <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Planly</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Your AI placement prep coach. Get a realistic, day-by-day study plan personalized for <strong className="text-white">product-based company</strong> interviews.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500 flex-wrap">
            {["Striver-inspired", "DSA + CS Subjects", "Mock & Revision built-in", "Adapts to your schedule"].map(tag => (
              <span key={tag} className="flex items-center gap-1.5"><FaCheckCircle className="text-emerald-400 text-xs" />{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border p-8 md:p-10 space-y-8"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{error}</div>
          )}

          {/* Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              <FaFire className="inline mr-1.5 text-orange-400" />Your Goal
            </label>
            <input
              type="text"
              value={form.goal}
              onChange={e => setForm(p => ({ ...p, goal: e.target.value }))}
              placeholder="e.g. Crack Google SDE-1 by February 2026"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm transition"
            />
          </div>

          {/* Level + Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Current Level</label>
              <select
                value={form.current_level}
                onChange={e => setForm(p => ({ ...p, current_level: e.target.value }))}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500 text-sm transition"
              >
                {LEVELS.map(l => <option key={l} value={l} className="bg-neutral-900">{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Hours/Day <span className="text-purple-400 font-black">{form.hours_per_day}h</span>
              </label>
              <input
                type="range" min={1} max={12} step={0.5}
                value={form.hours_per_day}
                onChange={e => setForm(p => ({ ...p, hours_per_day: parseFloat(e.target.value) }))}
                className="w-full accent-purple-500 mt-2"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>1h</span><span>12h</span></div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                <FaCalendarAlt className="inline mr-1.5 text-blue-400" />Start Date
              </label>
              <input
                type="date"
                value={form.start_date}
                onChange={e => setForm(p => ({ ...p, start_date: e.target.value }))}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500 text-sm transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                <FaCalendarAlt className="inline mr-1.5 text-pink-400" />Target Date
              </label>
              <input
                type="date"
                value={form.target_date}
                onChange={e => setForm(p => ({ ...p, target_date: e.target.value }))}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-purple-500 text-sm transition"
              />
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Focus Areas <span className="text-gray-600 font-normal normal-case tracking-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {FOCUS_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleFocus(opt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    focusAreas.includes(opt)
                      ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                      : "bg-white/3 border-white/8 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Weak Topics */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Weak Topics <span className="text-gray-600 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={weakTopics}
              onChange={e => setWeakTopics(e.target.value)}
              placeholder="e.g. DP, Graph algorithms, OS scheduling"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm transition"
            />
          </div>

          {/* Vacation Days */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Vacation / Off Days <span className="text-gray-600 font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={vacationDays}
              onChange={e => setVacationDays(e.target.value)}
              placeholder="e.g. 2026-01-01, 2026-01-26, weekends"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm transition"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleGenerate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-black text-base shadow-2xl shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
          >
            <FaRocket /> Generate My Placement Plan
          </button>

          <p className="text-center text-xs text-gray-600">
            Powered by Gemini 1.5 Flash · Typically takes 15–30 seconds
          </p>
        </motion.div>
      </div>
    </div>
  );
}
