import { describe, it, expect } from 'vitest';
import { validateContactForm, generateWhatsAppConsultationUrl, normalizeWhatsAppNumber } from './validation';

describe('Contact Form Validation & Lead Generation', () => {
  it('fails validation when required fields are missing or too short', () => {
    const result = validateContactForm({
      name: 'A',
      company: '',
      contact: 'abc',
      description: 'short'
    });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.company).toBeDefined();
    expect(result.errors.serviceType).toBeDefined();
    expect(result.errors.description).toBeDefined();
  });

  it('passes validation when all fields are properly provided', () => {
    const result = validateContactForm({
      name: 'Budi Santoso',
      company: 'PT Maju Digital',
      contact: 'budi@majudigital.id',
      serviceType: 'Enterprise Architecture & System Integration',
      timeline: '3-6 bulan',
      description: 'Kami ingin mengintegrasikan ERP lama dengan API WhatsApp dan sistem logistik baru.'
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('generates a properly encoded WhatsApp prefilled message', () => {
    const url = generateWhatsAppConsultationUrl({
      name: 'Rahadi',
      company: 'VeinTech Partner',
      serviceType: 'AI & Business Automation',
      description: 'Membangun AI Agent untuk ticketing.'
    });
    expect(url).toContain('https://wa.me/6281234567890?text=');
    expect(url).toContain(encodeURIComponent('Rahadi'));
    expect(url).toContain(encodeURIComponent('AI & Business Automation'));
  });
});

describe('WhatsApp number normalization', () => {
  it.each(['081298579746', '81298579746', '6281298579746', '+62 812-9857-9746', '006281298579746'])(
    'treats %s as the same Indonesian number',
    (phone) => expect(normalizeWhatsAppNumber(phone)).toBe('6281298579746')
  );
});
