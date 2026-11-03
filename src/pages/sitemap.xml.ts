import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { isPublishable } from '../lib/publication.mjs';

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const interviews = await getCollection('interviews', isPublishable);
  const paths = [`${base}/`, `${base}/usage/`, ...interviews.map(entry => `${base}/interviews/${entry.id}/`)];
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const urls = paths.map(path => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
