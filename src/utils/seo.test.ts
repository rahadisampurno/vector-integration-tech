import { describe, it, expect } from 'vitest';
import { normalizePathname, computeAlternatePaths, formatSEOTitle } from './seo';

describe('SEO & Routing utilities', () => {
  it('normalizes pathnames correctly', () => {
    expect(normalizePathname('/en/services/')).toBe('/services');
    expect(normalizePathname('/en')).toBe('/');
    expect(normalizePathname('/about/')).toBe('/about');
  });

  it('computes alternate paths for Indonesian and English routes', () => {
    const homeAlt = computeAlternatePaths('/');
    expect(homeAlt.idPath).toBe('/');
    expect(homeAlt.enPath).toBe('/en');

    const serviceAlt = computeAlternatePaths('/services/ai-otomatisasi');
    expect(serviceAlt.enPath).toBe('/en/services/ai-automation');
    expect(serviceAlt.idPath).toBe('/services/ai-otomatisasi');
  });

  it('formats SEO titles appropriately', () => {
    expect(formatSEOTitle('Custom Software Development')).toBe('Custom Software Development | VEINTECH');
    expect(formatSEOTitle('')).toBe('VEINTECH | Technology Partner for Business Growth');
  });
});
