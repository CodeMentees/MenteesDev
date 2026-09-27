'use client';

import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector((state) => state?.auth || {});

  return (
    <div className="p-6 text-white" style={{ background: '#000005' }}>
      <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
      <div className="bg-white/5 p-6 rounded-2xl max-w-xl space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Name</label>
          <p className="text-lg font-semibold">{user?.name || 'Student'}</p>
        </div>
        <div>
          <label className="text-gray-400 text-sm">Email</label>
          <p className="text-lg font-semibold">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <label className="text-gray-400 text-sm">Role</label>
          <p className="text-lg font-semibold capitalize">{user?.role || 'student'}</p>
        </div>
      </div>
    </div>
  );
}
