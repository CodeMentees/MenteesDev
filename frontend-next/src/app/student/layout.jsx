'use client';

import React from 'react';
import StudentRoute from '@/StudentRoute';
import StudentDashboard from '@/views/Student/StudentDashboard';

export default function StudentLayout({ children }) {
  return (
    <StudentRoute>
      <StudentDashboard>{children}</StudentDashboard>
    </StudentRoute>
  );
}
