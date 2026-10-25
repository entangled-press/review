import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublishable } from '../src/lib/publication.mjs';

test('only explicitly approved, published, dated entries can be released', () => {
  for (const status of ['draft', 'in-review', 'published']) {
    for (const consent of ['pending', 'confirmed']) {
      for (const published of [null, new Date('invalid'), new Date('2026-10-25')]) {
        assert.equal(isPublishable({ data: { status, consent, published } }),
          status === 'published' && consent === 'confirmed' && published !== null && !Number.isNaN(published.getTime()));
      }
    }
  }
});
