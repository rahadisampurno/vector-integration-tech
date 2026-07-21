import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/components/FAQ.astro
createAstro("https://veintech.id");
var $$FAQ = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FAQ;
	const content = {
		id: {
			title: "Pertanyaan yang Sering Diajukan",
			subtitle: "FAQ",
			items: [
				{
					q: "Apa saja layanan utama yang ditawarkan oleh VeinTech?",
					a: "VeinTech menawarkan ekosistem solusi digital lengkap, mulai dari pengembangan perangkat lunak kustom, aplikasi mobile (iOS & Android), integrasi sistem API, solusi AI & Otomatisasi, hingga audit infrastruktur IT dan keamanan siber."
				},
				{
					q: "Bagaimana solusi AI dan Otomatisasi VeinTech dapat membantu bisnis saya?",
					a: "Kami membangun alur kerja otomatis yang cerdas untuk mengurangi tugas repetitif, meningkatkan akurasi data, dan memberikan wawasan prediktif, sehingga tim Anda bisa fokus pada strategi pertumbuhan bisnis."
				},
				{
					q: "Apakah VeinTech melayani pembuatan aplikasi mobile dan website custom?",
					a: "Ya, kami spesialis dalam membangun aplikasi mobile performa tinggi dan platform web/SaaS yang skalabel, dirancang khusus untuk memenuhi kebutuhan unik operasional bisnis Anda."
				},
				{
					q: "Seberapa aman data perusahaan saya saat menggunakan layanan integrasi sistem?",
					a: "Keamanan adalah prioritas kami. Kami menerapkan arsitektur Zero Trust dan enkripsi tingkat tinggi dalam setiap integrasi sistem untuk memastikan data perusahaan Anda tetap terlindungi dan mematuhi standar privasi."
				},
				{
					q: "Apakah VeinTech menyediakan layanan audit infrastruktur IT?",
					a: "Tentu. Kami menyediakan layanan audit menyeluruh untuk menganalisis efisiensi, keamanan, dan skalabilitas sistem IT Anda saat ini, serta memberikan rekomendasi perbaikan berbasis ROI."
				},
				{
					q: "Bagaimana proses konsultasi IT di VeinTech dimulai?",
					a: "Proses dimulai dengan sesi konsultasi gratis untuk memahami tantangan bisnis Anda. Tim arsitek sistem kami kemudian akan merancang peta jalan teknologi yang paling sesuai dengan tujuan strategis Anda."
				},
				{
					q: "Berapa lama waktu yang dibutuhkan untuk mengintegrasikan AI Chatbot ke dalam sistem yang sudah ada?",
					a: "Waktu integrasi bervariasi tergantung pada kompleksitas sistem Anda, namun biasanya chatbot AI dasar dapat diintegrasikan dan mulai beroperasi dalam waktu 2 hingga 4 minggu."
				}
			]
		},
		en: {
			title: "Frequently Asked Questions",
			subtitle: "FAQ",
			items: [
				{
					q: "What are the main services offered by VeinTech?",
					a: "VeinTech offers a complete ecosystem of digital solutions, ranging from custom software development, mobile applications (iOS & Android), API system integration, AI & Automation solutions, to IT infrastructure audits and cybersecurity."
				},
				{
					q: "How can VeinTech's AI and Automation solutions help my business?",
					a: "We build smart automated workflows to reduce repetitive tasks, improve data accuracy, and provide predictive insights, so your team can focus on business growth strategies."
				},
				{
					q: "Does VeinTech provide mobile application and custom website development?",
					a: "Yes, we specialize in building high-performance mobile apps and scalable web/SaaS platforms, specifically designed to meet your unique business operational needs."
				},
				{
					q: "How secure is my company data when using system integration services?",
					a: "Security is our priority. We implement Zero Trust architecture and high-level encryption in every system integration to ensure your company data remains protected and complies with privacy standards."
				},
				{
					q: "Does VeinTech provide IT infrastructure audit services?",
					a: "Certainly. We provide comprehensive audit services to analyze the efficiency, security, and scalability of your current IT systems, and provide ROI-based improvement recommendations."
				},
				{
					q: "How does the IT consultation process at VeinTech begin?",
					a: "The process begins with a free consultation session to understand your business challenges. Our system architecture team will then design a technology roadmap that best fits your strategic goals."
				},
				{
					q: "How long does it take to integrate an AI Chatbot into an existing system?",
					a: "Integration time varies depending on the complexity of your system, but typically a basic AI chatbot can be integrated and operational within 2 to 4 weeks."
				}
			]
		}
	}[Astro.currentLocale || "id"];
	return renderTemplate`${maybeRenderHead($$result)}<section class="py-24 bg-surface border-t border-outline-variant/10" data-astro-cid-7synugci><div class="max-w-[1440px] mx-auto px-6 md:px-12" data-astro-cid-7synugci><div class="max-w-3xl mx-auto" data-astro-cid-7synugci><div class="text-center mb-16" data-astro-cid-7synugci><span class="text-xs font-mono font-bold tracking-[0.3em] text-primary-fixed-dim uppercase mb-4 block animate-reveal" data-astro-cid-7synugci>${content.subtitle}</span><h2 class="text-3xl md:text-5xl font-headline font-bold text-slate-900 dark:text-white tracking-tight animate-reveal delay-75" data-astro-cid-7synugci>${content.title}</h2></div><div class="space-y-4" data-astro-cid-7synugci>${content.items.map((item, index) => renderTemplate`<div class="faq-item group border border-outline-variant/15 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 animate-reveal"${addAttribute(`animation-delay: ${100 + index * 50}ms`, "style")} data-astro-cid-7synugci><button class="faq-trigger w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none" data-astro-cid-7synugci><span class="text-base md:text-lg font-headline font-bold text-slate-900 dark:text-white group-hover:text-primary-fixed-dim transition-colors pr-8" data-astro-cid-7synugci>${item.q}</span><div class="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center transition-all duration-300 group-hover:border-primary-fixed-dim/30" data-astro-cid-7synugci><span class="material-symbols-outlined text-xl text-slate-500 dark:text-slate-400 faq-icon transition-transform duration-300 group-hover:text-primary-fixed-dim" data-astro-cid-7synugci>add</span></div></button><div class="faq-answer overflow-hidden transition-all duration-300 max-h-0 opacity-0" data-astro-cid-7synugci><div class="px-6 pb-6 md:px-8 md:pb-8" data-astro-cid-7synugci><div class="w-full h-px bg-outline-variant/10 mb-6" data-astro-cid-7synugci></div><p class="text-on-surface-variant leading-relaxed text-sm md:text-base" data-astro-cid-7synugci>${item.a}</p></div></div></div>`)}</div></div></div></section><script>
    function initFAQ() {
        const items = document.querySelectorAll('.faq-item');
        
        items.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            trigger.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('max-h-0');
                
                // Close all other items
                items.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        otherAnswer.classList.add('max-h-0', 'opacity-0');
                        otherAnswer.style.maxHeight = '0px';
                        otherIcon.textContent = 'add';
                        otherIcon.style.transform = 'rotate(0deg)';
                        otherItem.classList.remove('bg-surface-container-highest', 'border-primary-fixed-dim/30');
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    answer.classList.add('max-h-0', 'opacity-0');
                    answer.style.maxHeight = '0px';
                    icon.textContent = 'add';
                    icon.style.transform = 'rotate(0deg)';
                    item.classList.remove('bg-surface-container-highest', 'border-primary-fixed-dim/30');
                } else {
                    answer.classList.remove('max-h-0', 'opacity-0');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.textContent = 'remove';
                    icon.style.transform = 'rotate(180deg)';
                    item.classList.add('bg-surface-container-highest', 'border-primary-fixed-dim/30');
                }
            });
        });
    }

    // Run on initial load
    initFAQ();

    // Re-run if using view transitions or client-side navigation (if any)
    document.addEventListener('astro:page-load', initFAQ);
<\/script>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/FAQ.astro", void 0);
//#endregion
//#region src/components/ServiceBottomSections.astro
createAstro("https://veintech.id");
var $$ServiceBottomSections = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceBottomSections;
	const { currentSlug } = Astro.props;
	const recommended = [
		{
			slug: "ai-otomatisasi",
			category: "AI & OTOMATISASI",
			colorKey: "ai",
			title: "AI & Otomatisasi",
			description: "Mengubah proses manual menjadi mesin efisiensi AI yang berjalan otomatis 24/7.",
			icon: "auto_awesome",
			image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "chatbot-ai",
			category: "AI & OTOMATISASI",
			colorKey: "ai",
			title: "Chatbot AI & NLP",
			description: "Asisten virtual cerdas untuk layanan pelanggan otomatis 24/7.",
			icon: "forum",
			image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "ai-computer-vision",
			category: "AI & OTOMATISASI",
			colorKey: "ai",
			title: "AI Computer Vision",
			description: "Analisis visual cerdas untuk keamanan dan operasional bisnis.",
			icon: "visibility",
			image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "integrasi-sistem",
			category: "INTEGRASI SISTEM",
			colorKey: "infra",
			title: "Integrasi Sistem",
			description: "Mengorkestrasi semua platform menjadi satu ekosistem terpadu yang real-time.",
			icon: "hub",
			image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "integrasi-api",
			category: "INTEGRASI SISTEM",
			colorKey: "infra",
			title: "Integrasi Sistem API",
			description: "Menyatukan ekosistem software Anda melalui lapisan integrasi API.",
			icon: "api",
			image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "pengembangan-software",
			category: "PENGEMBANGAN",
			colorKey: "dev",
			title: "Pengembangan Software",
			description: "Produk digital yang skalabel, aman, dan siap bertahan jangka panjang.",
			icon: "terminal",
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "saas-web-dev",
			category: "PENGEMBANGAN",
			colorKey: "dev",
			title: "SaaS & Web Development",
			description: "Platform SaaS dan aplikasi web kustom berperforma tinggi.",
			icon: "code",
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "mobile-app-dev",
			category: "PENGEMBANGAN",
			colorKey: "dev",
			title: "Mobile App Development",
			description: "Aplikasi iOS dan Android yang intuitif dan berperforma tinggi.",
			icon: "smartphone",
			image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "ecommerce-solutions",
			category: "PENGEMBANGAN",
			colorKey: "dev",
			title: "E-commerce Solutions",
			description: "Platform toko online kustom untuk memperluas jangkauan bisnis.",
			icon: "shopping_cart",
			image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "cyber-security",
			category: "KEAMANAN",
			colorKey: "infra",
			title: "Cyber Security & Zero Trust",
			description: "Perlindungan data perusahaan dengan standar keamanan tingkat tinggi.",
			icon: "verified_user",
			image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "konsultasi",
			category: "KONSULTASI",
			colorKey: "consult",
			title: "Konsultasi Bisnis & IT",
			description: "Peta jalan strategis untuk transformasi digital yang menghasilkan ROI.",
			icon: "strategy",
			image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "audit-it",
			category: "KONSULTASI",
			colorKey: "consult",
			title: "Arsitektur & Audit IT",
			description: "Audit menyeluruh dan desain arsitektur IT untuk efisiensi biaya.",
			icon: "search_insights",
			image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "website-bisnis",
			category: "WEBSITE",
			colorKey: "website",
			title: "Website UMKM & Bisnis",
			description: "Paket website lengkap dengan hosting dan domain, siap go live.",
			icon: "store",
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600"
		},
		{
			slug: "website-umkm",
			category: "WEBSITE",
			colorKey: "website",
			title: "Website UMKM Profesional",
			description: "Website custom mobile-friendly siap go live dalam hitungan hari.",
			icon: "storefront",
			image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600"
		}
	].filter((s) => s.slug !== currentSlug).sort(() => .5 - Math.random()).slice(0, 4);
	return renderTemplate`${maybeRenderHead($$result)}<!-- ── Partner CTA Banner ── --><section class="partner-cta-section relative overflow-hidden" data-astro-cid-5qozopxs><!-- Background Image --><div class="absolute inset-0 z-0" data-astro-cid-5qozopxs><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" alt="" class="w-full h-full object-cover" aria-hidden="true" data-astro-cid-5qozopxs><!-- Dark overlay – always dark regardless of theme, since the banner itself is intentionally dark --><div class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/92 to-slate-950/88" data-astro-cid-5qozopxs></div><div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" data-astro-cid-5qozopxs></div></div><!-- Content --><div class="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 text-center" data-astro-cid-5qozopxs><h2 class="text-3xl md:text-5xl font-headline font-bold text-white mb-5 tracking-tight" data-astro-cid-5qozopxs>Siap Mentransformasi Bisnis Anda?</h2><p class="text-slate-300 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed" data-astro-cid-5qozopxs>Jadilah bagian dari ekosistem inovasi VEINTECH. Mari berkolaborasi menciptakan solusi digital yang berdampak dan berkelanjutan.</p><a href="/contact" class="inline-flex items-center gap-3 bg-primary-fixed-dim text-on-primary-fixed px-10 py-4 rounded-xl font-headline font-bold transition-all hover:-translate-y-0.5 hover:brightness-110 shadow-lg shadow-primary-fixed-dim/30 group" data-astro-cid-5qozopxs><span class="uppercase tracking-wider text-sm" data-astro-cid-5qozopxs>Hubungi Kami</span><span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform" data-icon="search" data-astro-cid-5qozopxs>search</span></a></div></section>${renderComponent($$result, "FAQ", $$FAQ, { "data-astro-cid-5qozopxs": true })}<!-- ── Related Services / Products ── --><section class="py-16 md:py-20 bg-surface-container-lowest" data-astro-cid-5qozopxs><div class="max-w-[1440px] mx-auto px-6 md:px-12" data-astro-cid-5qozopxs><div class="mb-10 md:mb-12" data-astro-cid-5qozopxs><h2 class="text-2xl md:text-4xl font-headline font-bold text-on-surface tracking-tight" data-astro-cid-5qozopxs>Produk lain yang mungkin Anda suka</h2></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6" data-astro-cid-5qozopxs>${recommended.map((service) => renderTemplate`<a${addAttribute(`/services/${service.slug}`, "href")}${addAttribute(`service-rec-card group flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1`, "class")}${addAttribute(service.colorKey, "data-color")} data-astro-cid-5qozopxs><div class="relative h-36 md:h-40 overflow-hidden" data-astro-cid-5qozopxs><img${addAttribute(service.image, "src")}${addAttribute(service.title, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-astro-cid-5qozopxs><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" data-astro-cid-5qozopxs></div><div class="absolute top-3 left-3" data-astro-cid-5qozopxs><span${addAttribute(`category-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase`, "class")}${addAttribute(service.colorKey, "data-color")} data-astro-cid-5qozopxs><span class="material-symbols-outlined" style="font-size: 12px;"${addAttribute(service.icon, "data-icon")} data-astro-cid-5qozopxs>${service.icon}</span>${service.category}</span></div></div><div class="card-body p-5 flex-1 flex flex-col gap-2" data-astro-cid-5qozopxs><h3 class="card-title font-headline font-bold text-base md:text-lg leading-snug transition-colors" data-astro-cid-5qozopxs>${service.title}</h3><p class="card-desc text-sm leading-relaxed line-clamp-3 flex-1" data-astro-cid-5qozopxs>${service.description}</p></div></a>`)}</div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/ServiceBottomSections.astro", void 0);
//#endregion
export { $$ServiceBottomSections as t };
