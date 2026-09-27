'use client';

import { useEffect } from 'react';
import api from '@/api/api';

/**
 * VisitorTracker — fires once per session to track new visitors.
 * Extracted from AppInner in the original App.jsx.
 */
export default function VisitorTracker() {
  useEffect(() => {
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      api.post('/visitors/track')
        .then(() => {
          window.dispatchEvent(new Event('visitorTracked'));
        })
        .catch(err => {
          console.error('Failed to track visitor:', err);
        });
    }
  }, []);

  return null;
}
