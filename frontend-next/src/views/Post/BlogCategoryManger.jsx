'use client';

import React, { useState, useEffect } from 'react';
import { useBlogCategory } from '../../api/blogCategoryApi';

export default function BlogCategoryManger() {
  const { fetchCategories } = useBlogCategory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(res => {
      if (res?.data) setCategories(res.data);
    }).catch(() => {});
  }, []);

  return (
    <div className="p-6 text-white" style={{ background: '#000005' }}>
      <h1 className="text-3xl font-bold mb-6">Blog Category Manager</h1>
      <div className="bg-white/5 p-4 rounded-xl">
        <ul className="space-y-2">
          {categories.map((cat, idx) => (
            <li key={cat.id || idx} className="p-2 border-b border-white/10">{cat.name || cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
