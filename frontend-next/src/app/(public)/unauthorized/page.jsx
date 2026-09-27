import React from 'react';
import Unauth from '@/views/Error/Unauth';

export const revalidate = 3600;

export default function Page() {
  return <Unauth />;
}
