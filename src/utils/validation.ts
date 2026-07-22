export interface ContactFormData {
  name: string;
  company: string;
  contact: string; // Email or WhatsApp
  serviceType: string;
  timeline: string;
  description: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/** Normalizes common Indonesian WhatsApp formats to 62xxxxxxxxxx. */
export function normalizeWhatsAppNumber(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('62')) return digits;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Nama harus diisi minimal 2 karakter.';
  }
  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Nama perusahaan atau bisnis harus diisi.';
  }
  if (!data.contact || data.contact.trim().length < 5) {
    errors.contact = 'Email atau nomor WhatsApp aktif wajib diisi.';
  }
  if (!data.serviceType) {
    errors.serviceType = 'Silakan pilih jenis kebutuhan sistem.';
  }
  if (!data.description || data.description.trim().length < 15) {
    errors.description = 'Jelaskan ringkasan kebutuhan atau masalah bisnis Anda minimal 15 karakter.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateWhatsAppConsultationUrl(data: Partial<ContactFormData>, phone = '6281234567890'): string {
  const name = data.name || 'Calon Mitra';
  const company = data.company || 'Perusahaan';
  const service = data.serviceType || 'Pengembangan Sistem Digital';
  const desc = data.description ? `\n\nRingkasan Kebutuhan:\n"${data.description}"` : '';

  const message = `Halo tim VEINTECH,\n\nSaya ${name} dari ${company} ingin berkonsultasi mengenai kebutuhan ${service}.${desc}\n\nMohon informasi langkah diskusi selanjutnya. Terima kasih.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
