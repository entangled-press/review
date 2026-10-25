// Both routes must use the same public-release conditions.
export function isPublishable({ data }) {
  return data.status === 'published' && data.consent === 'confirmed'
    && data.published instanceof Date && !Number.isNaN(data.published.getTime());
}
