import React from 'react';
import PlanlyPage from '@/views/Planly';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Planly – AI Placement Prep Planner | CodeMentees',
  description: 'Get a personalized, day-by-day DSA and placement preparation plan powered by Gemini AI. Built for product-based company interviews.',
};

export default function Page() {
  return <PlanlyPage />;
}
