import { T as createAstro, g as addAttribute, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/components/ServiceCTA.astro
createAstro("https://veintech.id");
var $$ServiceCTA = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceCTA;
	const { title, description, ctaText, ctaLink = "/contact" } = Astro.props;
	const t = {
		id: {
			tagline: "MULAI TRANSFORMASI ANDA",
			guarantee: "Respons cepat dalam 24 jam",
			benefitsTitle: "Yang Akan Anda Dapatkan:",
			benefit1Title: "Analisis Sistem Gratis",
			benefit1Desc: "Tim arsitek kami akan meninjau kebutuhan infrastruktur Anda tanpa biaya di awal.",
			benefit2Title: "Desain Skalabel",
			benefit2Desc: "Solusi dirancang untuk mengakomodasi pertumbuhan bisnis Anda 5-10 tahun ke depan.",
			benefit3Title: "Prioritas Komunikasi",
			benefit3Desc: "Jalur komunikasi langsung dengan lead engineer untuk memastikan project berjalan lancar."
		},
		en: {
			tagline: "START YOUR TRANSFORMATION",
			guarantee: "Fast response within 24 hours",
			benefitsTitle: "What You Will Get:",
			benefit1Title: "Free System Analysis",
			benefit1Desc: "Our architects will review your infrastructure requirements at no initial cost.",
			benefit2Title: "Scalable Design",
			benefit2Desc: "Solutions engineered to accommodate your business growth for the next 5-10 years.",
			benefit3Title: "Priority Communication",
			benefit3Desc: "Direct communication channels with lead engineers to ensure smooth project delivery."
		}
	}[Astro.currentLocale || "id"];
	return renderTemplate`${maybeRenderHead($$result)}<section class="max-w-[1440px] mx-auto px-12 mb-20 animate-reveal"><div class="relative rounded-[2rem] overflow-hidden bg-[#0c121e] border border-outline-variant/15 shadow-2xl"><!-- Abstract Background Effects --><div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;"></div><div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-fixed-dim/20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div><div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-fixed-dim/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div><div class="relative z-10 flex flex-col lg:flex-row"><!-- Left: Main Content --><div class="flex-1 p-12 lg:p-20 flex flex-col justify-center"><div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-mono tracking-widest uppercase mb-8 backdrop-blur-sm w-fit"><span class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim animate-pulse"></span>${t.tagline}</div><h2 class="text-3xl lg:text-4xl xl:text-5xl font-headline font-bold text-white mb-6 leading-[1.1] tracking-tight">${title}</h2><p class="text-slate-400 text-base md:text-lg leading-relaxed mb-12 max-w-xl font-body">${description}</p><div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto"><a${addAttribute(ctaLink, "href")} class="px-8 py-4 bg-primary-fixed-dim text-on-primary-container font-headline font-bold rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(76,214,255,0.3)] whitespace-nowrap flex items-center gap-2 group">${ctaText}<span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span></a><div class="flex items-center gap-2 text-sm text-slate-500 font-medium"><span class="material-symbols-outlined text-primary-fixed-dim/80" style="font-size: 16px;">verified_user</span>${t.guarantee}</div></div></div><!-- Right: Value Proposition List --><div class="w-full lg:w-[480px] bg-white/[0.02] backdrop-blur-md border-l border-white/[0.05] p-12 lg:p-16 flex flex-col justify-center relative"><!-- Inner glow --><div class="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div><h3 class="text-lg font-headline font-bold text-white mb-10 relative z-10">${t.benefitsTitle}</h3><ul class="space-y-8 relative z-10"><li class="flex items-start gap-5"><div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner"><span class="material-symbols-outlined text-primary-fixed-dim text-xl" data-icon="search_insights">search_insights</span></div><div><h4 class="text-white font-bold text-sm mb-1">${t.benefit1Title}</h4><p class="text-[13px] text-slate-400 leading-relaxed font-body">${t.benefit1Desc}</p></div></li><li class="flex items-start gap-5"><div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner"><span class="material-symbols-outlined text-primary-fixed-dim text-xl" data-icon="account_tree">account_tree</span></div><div><h4 class="text-white font-bold text-sm mb-1">${t.benefit2Title}</h4><p class="text-[13px] text-slate-400 leading-relaxed font-body">${t.benefit2Desc}</p></div></li><li class="flex items-start gap-5"><div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner"><span class="material-symbols-outlined text-primary-fixed-dim text-xl" data-icon="support_agent">support_agent</span></div><div><h4 class="text-white font-bold text-sm mb-1">${t.benefit3Title}</h4><p class="text-[13px] text-slate-400 leading-relaxed font-body">${t.benefit3Desc}</p></div></li></ul></div></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/ServiceCTA.astro", void 0);
//#endregion
//#region src/components/WhyChooseUs.astro
createAstro("https://veintech.id");
var $$WhyChooseUs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WhyChooseUs;
	const { title = "Mengapa Memilih VeinTech?", subtitle = "Pendekatan kami bukan sekadar menulis kode, tapi memberikan solusi bisnis end-to-end yang menjamin ROI, keamanan, dan skalabilitas jangka panjang." } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="max-w-[1440px] mx-auto px-12 mb-20"><div class="bg-surface-container-low border border-outline-variant/15 rounded-3xl p-12 lg:p-16 relative overflow-hidden"><!-- Decorative Background --><div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-fixed-dim/5 rounded-full blur-3xl pointer-events-none"></div><div class="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-secondary-fixed-dim/5 rounded-full blur-3xl pointer-events-none"></div><div class="text-center mb-16 relative z-10"><h2 class="text-3xl lg:text-4xl font-headline font-bold text-slate-900 dark:text-white mb-4 animate-reveal">${title}</h2><p class="text-on-surface-variant max-w-2xl mx-auto animate-reveal delay-75">${subtitle}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"><!-- Reason 1 --><div class="flex flex-col animate-reveal delay-100 group"><div class="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-outline-variant/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-fixed-dim/10 transition-all"><span class="material-symbols-outlined text-primary-fixed-dim text-2xl">workspace_premium</span></div><h3 class="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3">Enterprise-Grade Quality</h3><p class="text-sm text-on-surface-variant leading-relaxed">Framework dan arsitektur yang kami gunakan setara dengan standar tech-giant untuk menjamin performa tanpa kompromi.</p></div><!-- Reason 2 --><div class="flex flex-col animate-reveal delay-150 group"><div class="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-outline-variant/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-fixed-dim/10 transition-all"><span class="material-symbols-outlined text-primary-fixed-dim text-2xl">verified_user</span></div><h3 class="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3">Keamanan Bersertifikasi</h3><p class="text-sm text-on-surface-variant leading-relaxed">Penerapan enkripsi end-to-end, regulasi UU PDP, dan zero-trust architecture pada setiap layer aplikasi.</p></div><!-- Reason 3 --><div class="flex flex-col animate-reveal delay-200 group"><div class="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-outline-variant/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-fixed-dim/10 transition-all"><span class="material-symbols-outlined text-primary-fixed-dim text-2xl">support_agent</span></div><h3 class="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3">Dedicated Support 24/7</h3><p class="text-sm text-on-surface-variant leading-relaxed">Tim khusus selalu siap sedia untuk memelihara dan memastikan sistem Anda beroperasi stabil tanpa ada downtime.</p></div><!-- Reason 4 --><div class="flex flex-col animate-reveal delay-250 group"><div class="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-outline-variant/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-fixed-dim/10 transition-all"><span class="material-symbols-outlined text-primary-fixed-dim text-2xl">query_stats</span></div><h3 class="text-xl font-headline font-bold text-slate-900 dark:text-white mb-3">Fokus Pada ROI Bisnis</h3><p class="text-sm text-on-surface-variant leading-relaxed">Kami mencegah over-engineering. Setiap fitur dikembangkan untuk menekan biaya operasional atau meningkatkan omset Anda.</p></div></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/WhyChooseUs.astro", void 0);
//#endregion
//#region src/components/ServiceEcosystem.astro
createAstro("https://veintech.id");
var $$ServiceEcosystem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceEcosystem;
	const corePath = Astro.url.pathname.replace(/^\/en/, "") || "/";
	const normalizedCorePath = corePath.endsWith("/") && corePath !== "/" ? corePath.slice(0, -1) : corePath;
	const lang = Astro.currentLocale || "id";
	const customDescriptions = {
		"/services/chatbot-ai": {
			id: "Chatbot AI kami dirancang untuk terhubung langsung dengan platform komunikasi omnichannel dan CRM yang sudah tim Anda gunakan.",
			en: "Our AI chatbot is designed to connect directly with the omnichannel communication platforms and CRMs your team already uses."
		},
		"/services/ai-computer-vision": {
			id: "Sistem vision kami terintegrasi mulus dengan infrastruktur kamera CCTV, VMS, dan sistem kontrol akses yang sudah berjalan di fasilitas Anda.",
			en: "Our vision system integrates seamlessly with the CCTV camera infrastructure, VMS, and access control systems already running at your facilities."
		},
		"/services/ai-otomatisasi": {
			id: "Otomatisasi kami berlabuh dengan aman ke dalam infrastruktur cloud dan tumpukan aplikasi Anda, mengonversi data menjadi eksekusi instan.",
			en: "Our automation anchors securely into your cloud infrastructure and application stack, converting data into instant execution."
		},
		"/services/cyber-security": {
			id: "Protokol keamanan Zero Trust kami diterapkan pada layer cloud provider (AWS/GCP) hingga server klien tanpa mengganggu alur produktivitas internal.",
			en: "Our Zero Trust security protocols are deployed from the cloud provider layer to client servers without disrupting internal productivity workflows."
		},
		"/services/pengembangan-software": {
			id: "Arsitektur produk yang kami bangun sanggup mengakomodasi teknologi database terstandarisasi industri atau integrasi vendor pihak ketiga dengan mulus.",
			en: "The product architecture we build is capable of seamlessly accommodating industry-standard database technologies and third-party vendor integrations."
		},
		"/services/saas-web-dev": {
			id: "Aplikasi SaaS Anda akan ditopang oleh teknologi performa tinggi dan dirancang mudah berkomunikasi dengan sistem API payment gateway apa pun.",
			en: "Your SaaS application will be backed by high-performance technologies natively designed to communicate easily with any payment gateway API."
		},
		"/services/mobile-app-dev": {
			id: "Aplikasi mobile native kami sepenuhnya siap terkoneksi ke backend internal perusahaan, penyimpanan cloud, maupun mesin analytics pihak ketiga Anda.",
			en: "Our native mobile applications are fully ready to connect to your enterprise's internal backend, cloud storage, or third-party analytics engines."
		},
		"/services/integrasi-sistem": {
			id: "Misi utama kami adalah meleburkan pangkalan data silo, software ERP usang, dan platform terpisah ke satu kesatuan infrastruktur terpusat.",
			en: "Our core mission is to merge siloed databases, legacy ERP software, and disparate cloud platforms into a single, centralized infrastructure unit."
		},
		"/services/integrasi-api": {
			id: "Menyediakan pipeline data seketika dan super aman antara ekosistem aplikasi internal Anda dengan ratusan layanan API publik dan perbankan.",
			en: "Delivering instant and highly secure data pipelines between your internal enterprise ecosystem and hundreds of public and banking API services."
		},
		"/services/ecommerce-solutions": {
			id: "Platform eCommerce Anda tersinkronisasi murni dengan ekosistem manajemen inventaris internal, sistem POS, serta gerbang pembayaran mutakhir.",
			en: "Your eCommerce platform syncs organically with your internal inventory management ecosystem, POS systems, and cutting-edge payment gateways."
		},
		"/services/audit-it": {
			id: "Audit komprehensif kami mensyaratkan perombakan desain strategis agar sinkron sepenuhnya dengan kebutuhan software dan standar hardware saat ini.",
			en: "Our comprehensive audit dictates strategic design overhauls to ensure your system aligns entirely with modern software and hardware requirements."
		},
		"/services/konsultasi": {
			id: "Peta jalan rekomendasi digital kami selalu diarahkan untuk memaksimalkan utilitas dari komponen arsitektur cloud dan aplikasi yang sudah ada.",
			en: "Our digital roadmap recommendations are consistently geared toward maximizing the utility of the cloud architecture constraints you've established."
		},
		"default": {
			id: "Solusi kami dirancang untuk terhubung secara mulus dengan spesifikasi infrastruktur teknologi dan aplikasi bisnis yang sudah Anda gunakan.",
			en: "Our solutions are perfectly designed to connect seamlessly with your existing applications and technology infrastructure."
		}
	};
	const defaultTitle = lang === "en" ? "Ecosystem & Deep Integration" : "Ekosistem & Integrasi Mendalam";
	const { title = defaultTitle } = Astro.props;
	const computedDescription = customDescriptions[normalizedCorePath] ? customDescriptions[normalizedCorePath][lang] : customDescriptions["default"][lang];
	const techLogos = [
		{
			name: "AWS",
			icon: "cloud"
		},
		{
			name: "Google Cloud",
			icon: "backup"
		},
		{
			name: "Microsoft Azure",
			icon: "cloud_sync"
		},
		{
			name: "WhatsApp",
			icon: "chat"
		},
		{
			name: "Salesforce",
			icon: "leaderboard"
		},
		{
			name: "Zendesk",
			icon: "support_agent"
		},
		{
			name: "Docker",
			icon: "view_in_ar"
		},
		{
			name: "Kubernetes",
			icon: "device_hub"
		},
		{
			name: "Node.js",
			icon: "javascript"
		},
		{
			name: "Python",
			icon: "data_object"
		},
		{
			name: "PostgreSQL",
			icon: "database"
		},
		{
			name: "Redis",
			icon: "memory"
		}
	];
	const marqueeItems = [...techLogos, ...techLogos];
	return renderTemplate`${maybeRenderHead($$result)}<section class="max-w-[1440px] mx-auto px-12 mb-20" data-astro-cid-sinx5f5j><div class="text-center mb-12" data-astro-cid-sinx5f5j><h2 class="text-3xl font-headline font-bold text-slate-900 dark:text-white mb-4" data-astro-cid-sinx5f5j>${title}</h2><p class="text-on-surface-variant max-w-2xl mx-auto" data-astro-cid-sinx5f5j>${computedDescription}</p></div><!-- Marquee Container --><div class="relative overflow-hidden flex items-center bg-surface-container-low border border-outline-variant/15 rounded-3xl p-8" data-astro-cid-sinx5f5j><!-- Left & Right Gradient Masks --><div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--app-surface-container-low)] to-transparent z-10" data-astro-cid-sinx5f5j></div><div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--app-surface-container-low)] to-transparent z-10" data-astro-cid-sinx5f5j></div><!-- Marquee Content --><div class="flex gap-12 animate-marquee whitespace-nowrap items-center hover:[animation-play-state:paused]" data-astro-cid-sinx5f5j>${marqueeItems.map((tech) => renderTemplate`<div class="flex items-center gap-3 shrink-0 group opacity-70 hover:opacity-100 transition-opacity cursor-default" data-astro-cid-sinx5f5j><div class="w-12 h-12 rounded-xl bg-primary-fixed-dim/10 text-primary-fixed-dim flex items-center justify-center group-hover:scale-110 transition-transform" data-astro-cid-sinx5f5j><span class="material-symbols-outlined" data-astro-cid-sinx5f5j>${tech.icon}</span></div><span class="font-headline font-bold text-slate-700 dark:text-slate-300" data-astro-cid-sinx5f5j>${tech.name}</span></div>`)}</div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/ServiceEcosystem.astro", void 0);
//#endregion
export { $$WhyChooseUs as n, $$ServiceCTA as r, $$ServiceEcosystem as t };
