'use client';

import api from './api';

/**
 * siteDataApi — hooks for site configuration data.
 */
export async function fetchSiteData() {
  const res = await api.get('/site-data');
  return res.data;
}

export async function postSiteData(data) {
  const res = await api.post('/site-data', data);
  return res.data;
}
