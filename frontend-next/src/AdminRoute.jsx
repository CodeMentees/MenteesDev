'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// All roles that are allowed into the admin dashboard.
// 'super admin' is the canonical admin role; others have partial access.
const ADMIN_ROLES = new Set(['super admin', 'editor', 'instructor', 'intern', 'viewer']);
const isAdminUser = (user) => user && (ADMIN_ROLES.has(user.role) || user.isAdmin === true);

export default function AdminRoute({ children }) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useSelector((state) => state?.auth || {});

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!isAdminUser(user)) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdminUser(user)) {
    return null;
  }

  return children;
}
