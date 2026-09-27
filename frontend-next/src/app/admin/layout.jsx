'use client';

import React from 'react';
import AdminRoute from '@/AdminRoute';
import DashboardLayout from '@/views/Dashboard';

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </AdminRoute>
  );
}
