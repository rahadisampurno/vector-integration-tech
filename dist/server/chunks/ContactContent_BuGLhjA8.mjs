import { T as createAstro, g as addAttribute, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/components/contact/ContactContent.astro
createAstro("https://veintech.id");
var $$ContactContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		badge: "KONSULTASI ARSITEKTUR & PROYEK",
		title: "Mulai Percakapan Teknis Bersama Tim Arsitek Kami",
		subtitle: "Kami siap mendiskusikan tantangan arsitektur, kebutuhan integrasi sistem, maupun roadmap transformasi AI organisasi Anda tanpa komitmen awal.",
		formTitle: "Kirim Detail Kebutuhan Proyek",
		nameLabel: "NAMA LENGKAP",
		emailLabel: "EMAIL PROFESIONAL",
		companyLabel: "PERUSAHAAN / ORGANISASI",
		tierLabel: "KATEGORI KEBUTUHAN TEKNIS",
		msgLabel: "RINGKASAN TANTANGAN OPERASIONAL",
		sendBtn: "Kirim Permintaan Konsultasi",
		waCardTitle: "Jalur Cepat WhatsApp Principal Architect",
		waCardSub: "Untuk kebutuhan mendesak atau konsultasi langsung dengan Principal Engineer kami:",
		waBtnText: "Chat WhatsApp Sekarang (+62 877-8729-0712)",
		tiers: [
			"Enterprise System Architecture & Microservices",
			"Production AI Automation & RAG Development",
			"IT Architecture Audit & Cloud FinOps Optimization",
			"Zero Trust Cybersecurity & Penetration Testing",
			"Custom Web & High-Throughput API Gateway"
		],
		waMsg: "Halo VEINTECH, saya tertarik untuk mendiskusikan kebutuhan arsitektur sistem / solusi teknologi untuk perusahaan saya."
	} : {
		badge: "ARCHITECTURAL & PROJECT CONSULTATION",
		title: "Start a Technical Conversation With Our Principal Architects",
		subtitle: "Discuss your operational bottlenecks, system integration requirements, or AI transformation roadmap directly with our engineering leadership.",
		formTitle: "Submit Project Specification",
		nameLabel: "FULL NAME",
		emailLabel: "WORK EMAIL",
		companyLabel: "COMPANY / ORGANIZATION",
		tierLabel: "TECHNICAL SCOPE & REQUIREMENT",
		msgLabel: "SUMMARY OF OPERATIONAL BOTTLENECK",
		sendBtn: "Request Technical Consultation",
		waCardTitle: "Direct WhatsApp Fast-Track",
		waCardSub: "For immediate assistance or urgent architectural inquiries with our principal team:",
		waBtnText: "Chat via WhatsApp (+62 877-8729-0712)",
		tiers: [
			"Enterprise System Architecture & Microservices",
			"Production AI Automation & RAG Development",
			"IT Architecture Audit & Cloud FinOps Optimization",
			"Zero Trust Cybersecurity & Penetration Testing",
			"Custom Web & High-Throughput API Gateway"
		],
		waMsg: "Hello VEINTECH, I would like to schedule a technical consultation regarding our engineering and system architecture requirements."
	};
	const waLink = `https://wa.me/6287787290712?text=${encodeURIComponent(t.waMsg)}`;
	return renderTemplate`${maybeRenderHead($$result)}<!-- Header Section --><header class="pt-32 pb-20 bg-surface border-b border-outline-variant/15 text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><!-- Breadcrumbs --><nav class="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6"><a${addAttribute(lang === "id" ? "/" : "/en", "href")} class="hover:text-primary-fixed-dim transition-colors">${lang === "id" ? "Beranda" : "Home"}</a><span>/</span><span class="text-slate-400">${lang === "id" ? "Hubungi Kami" : "Contact"}</span></nav><div class="max-w-4xl space-y-6"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-primary-fixed-dim/15 text-primary-fixed-dim border border-primary-fixed-dim/30"><span>${t.badge}</span></div><h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter leading-tight text-slate-900 dark:text-white">${t.title}</h1><p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">${t.subtitle}</p></div></div></header><!-- Main Contact Grid --><section class="py-24 bg-surface-container-lowest"><div class="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12"><!-- Contact & Scoping Form --><div class="lg:col-span-7 bg-surface p-8 sm:p-10 rounded-2xl border border-outline-variant/15 space-y-8 shadow-sm"><div class="border-b border-outline-variant/15 pb-6"><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white">${t.formTitle}</h2></div><form class="space-y-6" onsubmit="event.preventDefault(); alert('Permintaan Anda telah tercatat. Tim Arsitek VEINTECH akan menghubungi Anda segera.');"><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div class="space-y-2"><label class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">${t.nameLabel}</label><input type="text" required class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-fixed-dim transition-colors text-sm"${addAttribute(lang === "id" ? "Nama Lengkap Anda" : "Your Full Name", "placeholder")}></div><div class="space-y-2"><label class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">${t.emailLabel}</label><input type="email" required class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-fixed-dim transition-colors text-sm" placeholder="nama@perusahaan.com"></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div class="space-y-2"><label class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">${t.companyLabel}</label><input type="text" class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-fixed-dim transition-colors text-sm"${addAttribute(lang === "id" ? "Nama Perusahaan / Startup" : "Company Name", "placeholder")}></div><div class="space-y-2"><label class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">${t.tierLabel}</label><select class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary-fixed-dim transition-colors text-sm">${t.tiers.map((opt) => renderTemplate`<option${addAttribute(opt, "value")}>${opt}</option>`)}</select></div></div><div class="space-y-2"><label class="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">${t.msgLabel}</label><textarea rows="4" required class="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-fixed-dim transition-colors text-sm"${addAttribute(lang === "id" ? "Jelaskan secara singkat kendala sistem, target performa, atau rencana pengembangan yang ingin Anda capai..." : "Describe your architecture challenge, latency bottlenecks, or deployment goals...", "placeholder")}></textarea></div><div class="pt-4"><button type="submit" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-fixed-dim hover:brightness-110 text-on-primary-fixed font-headline font-bold text-sm shadow-lg shadow-primary-fixed-dim/20 transition-all flex items-center justify-center gap-2"><span>${t.sendBtn}</span><span class="material-symbols-outlined text-base">send</span></button></div></form></div><!-- Direct Fast-Track & Engineering Contact Cards --><div class="lg:col-span-5 space-y-8"><!-- WhatsApp Fast Track Box --><div class="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-6"><div class="flex items-center gap-3 text-emerald-500"><span class="material-symbols-outlined text-3xl">chat</span><h3 class="text-xl font-bold font-headline text-slate-900 dark:text-white">${t.waCardTitle}</h3></div><p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${t.waCardSub}</p><a${addAttribute(waLink, "href")} target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-headline font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"><span>${t.waBtnText}</span><span class="material-symbols-outlined text-base">open_in_new</span></a></div><!-- Corporate Office Info Card --><div class="p-8 rounded-2xl bg-surface border border-outline-variant/15 space-y-6"><h3 class="text-lg font-bold font-headline text-slate-900 dark:text-white border-b border-outline-variant/15 pb-4">${lang === "id" ? "Informasi Kontak & Lokasi" : "Corporate Headquarters"}</h3><div class="space-y-4"><div class="flex items-start gap-3"><span class="material-symbols-outlined text-primary-fixed-dim mt-0.5">mail</span><div><span class="text-xs font-mono uppercase text-slate-500 block">EMAIL INQUIRY</span><span class="text-sm font-medium text-slate-900 dark:text-white">connect@veintech.com</span></div></div><div class="flex items-start gap-3"><span class="material-symbols-outlined text-primary-fixed-dim mt-0.5">phone</span><div><span class="text-xs font-mono uppercase text-slate-500 block">WHATSAPP / PHONE</span><span class="text-sm font-medium text-slate-900 dark:text-white">+62 877-8729-0712</span></div></div><div class="flex items-start gap-3"><span class="material-symbols-outlined text-primary-fixed-dim mt-0.5">location_on</span><div><span class="text-xs font-mono uppercase text-slate-500 block">HEADQUARTERS</span><span class="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">Vector Plaza, Level 42<br>Sudirman Central Business District (SCBD)<br>Jakarta Selatan, Indonesia 12190</span></div></div></div></div></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/contact/ContactContent.astro", void 0);
//#endregion
export { $$ContactContent as t };
