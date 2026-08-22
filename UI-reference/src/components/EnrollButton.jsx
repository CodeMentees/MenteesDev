import { useState } from 'react';
import { motion } from 'framer-motion';
import { enrollInCourse } from '../services/enrollmentService';
import { toast } from '../utils/toast';
import LoadingSpinner from './LoadingSpinner';
import ConfirmModal from './ConfirmModal';

export default function EnrollButton({ course, onEnrollSuccess }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await enrollInCourse(course._id);
      toast.success(`🎉 Successfully enrolled in ${course.title}!`);
      if (onEnrollSuccess) onEnrollSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to enroll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative overflow-hidden w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: loading
            ? "rgb(180,80,10)"
            : "linear-gradient(135deg, rgb(249,115,22) 0%, rgb(234,88,12) 100%)",
          boxShadow: loading ? "none" : "0 4px 24px rgba(249,115,22,0.35), 0 1px 0 rgba(255,255,255,0.15) inset",
        }}
      >
        {/* Shimmer sweep */}
        {!loading && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
              animation: "shimmerSweep 2.5s ease-in-out infinite",
            }}
          />
        )}

        <span className="relative z-10 flex items-center gap-2.5">
          {loading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Enrolling…</span>
            </>
          ) : (
            <>
              <span className="text-base">🎓</span>
              <span>Enroll Now</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="text-xs"
              >→</motion.span>
            </>
          )}
        </span>
      </motion.button>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleEnroll}
        title="Confirm Enrollment"
        message={`Are you sure you want to enroll in "${course.title}"? You'll get access to all course materials and can track your progress.`}
        confirmText="Yes, Enroll Me!"
        cancelText="Cancel"
        type="info"
      />
    </>
  );
}
