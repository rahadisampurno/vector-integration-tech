import { C as unescapeHTML, T as createAstro, g as addAttribute, h as renderHead, i as renderComponent, m as maybeRenderHead, s as renderSlot, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/utils/seo.ts
var ID_TO_EN_SLUGS = {
	"/services/ai-otomatisasi": "/en/services/ai-automation",
	"/services/integrasi-sistem": "/en/services/system-integration",
	"/services/pengembangan-software": "/en/services/software-development",
	"/services/konsultasi": "/en/services/consulting",
	"/services/website-umkm": "/en/services/business-website",
	"/services/ai-computer-vision": "/en/services/ai-computer-vision",
	"/services/chatbot-ai": "/en/services/chatbot-ai",
	"/services/integrasi-api": "/en/services/integrasi-api",
	"/services/cyber-security": "/en/services/cyber-security",
	"/services/saas-web-dev": "/en/services/saas-web-dev",
	"/services/mobile-app-dev": "/en/services/mobile-app-dev",
	"/services/audit-it": "/en/services/audit-it",
	"/services/ecommerce-solutions": "/en/services/ecommerce-solutions",
	"/services/website-bisnis": "/en/services/website-bisnis"
};
var EN_TO_ID_SLUGS = Object.fromEntries(Object.entries(ID_TO_EN_SLUGS).map(([id, en]) => [en.replace(/^\/en/, ""), id]));
function normalizePathname(pathname) {
	const clean = pathname.replace(/^\/en/, "") || "/";
	if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
	return clean;
}
function computeAlternatePaths(pathname) {
	const norm = normalizePathname(pathname);
	const enPath = ID_TO_EN_SLUGS[norm] ?? `/en${norm === "/" ? "" : norm}`;
	return {
		idPath: EN_TO_ID_SLUGS[norm] ?? norm,
		enPath
	};
}
function formatSEOTitle(pageTitle, brand = "VEINTECH") {
	if (!pageTitle || pageTitle === brand) return `${brand} | Technology Partner for Business Growth`;
	return `${pageTitle} | ${brand}`;
}
//#endregion
//#region src/components/layout/SEOHead.astro
createAstro("https://veintech.id");
var $$SEOHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SEOHead;
	const { title, description, ogImage = "/logo.png" } = Astro.props;
	const lang = Astro.currentLocale || "id";
	const siteUrl = Astro.site || "https://veintech.id";
	const canonicalUrl = new URL(Astro.url.pathname, siteUrl);
	const { idPath, enPath } = computeAlternatePaths(Astro.url.pathname);
	const idUrl = new URL(idPath, siteUrl);
	const enUrl = new URL(enPath, siteUrl);
	const ogImageUrl = new URL(ogImage, siteUrl);
	const finalDescription = description || (lang === "id" ? "VEINTECH — Technology Partner for Business Growth. Membangun sistem digital, AI & otomatisasi, dan arsitektur enterprise yang aman dan scalable." : "VEINTECH — Technology Partner for Business Growth. Building secure, scalable enterprise software, AI automation, and cloud architecture.");
	const finalTitle = formatSEOTitle(title);
	return renderTemplate`<meta charset="UTF-8"><script>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return 'light';
  })();
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  window.localStorage.setItem('theme', theme);
<\/script><meta name="description"${addAttribute(finalDescription, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><link rel="alternate" hreflang="id"${addAttribute(idUrl, "href")}><link rel="alternate" hreflang="en"${addAttribute(enUrl, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(idUrl, "href")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:title"${addAttribute(finalTitle, "content")}><meta property="og:description"${addAttribute(finalDescription, "content")}><meta property="og:image"${addAttribute(ogImageUrl, "content")}><meta property="og:site_name" content="VEINTECH"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(canonicalUrl, "content")}><meta name="twitter:title"${addAttribute(finalTitle, "content")}><meta name="twitter:description"${addAttribute(finalDescription, "content")}><meta name="twitter:image"${addAttribute(ogImageUrl, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${finalTitle}</title><!-- JSON-LD Structured Data for SEO & GEO (AI Engine Optimization) --><script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Organization",
			"@id": `${siteUrl}/#organization`,
			"name": "VEINTECH",
			"legalName": "PT Vector Integration Tech",
			"url": siteUrl,
			"logo": `${siteUrl}/favicon.svg`,
			"description": finalDescription,
			"foundingDate": "2021",
			"areaServed": ["ID", "Global"],
			"knowsAbout": [
				"Artificial Intelligence",
				"System Integration",
				"Cloud FinOps",
				"Software Engineering",
				"Zero Trust Cybersecurity"
			]
		}, {
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			"url": siteUrl,
			"name": "VEINTECH — Technology Partner for Business Growth",
			"publisher": { "@id": `${siteUrl}/#organization` },
			"inLanguage": [lang]
		}]
	}))}<\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/layout/SEOHead.astro", void 0);
//#endregion
//#region src/components/layout/Footer.astro
createAstro("https://veintech.id");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const lang = Astro.currentLocale || "id";
	const { idPath, enPath } = computeAlternatePaths(Astro.url.pathname);
	const t = lang === "id" ? {
		tagline: "Technology Partner for Business Growth. Merancang, membangun, dan memodernisasi sistem digital high-availability & AI production-ready.",
		services: "Layanan Ekosistem",
		company: "Perusahaan",
		contactTitle: "Kontak & Konsultasi",
		address: "Jl. Ir. H. Juanda No.84, Bandung",
		rights: "© 2026 VEINTECH. All Rights Reserved. Engineered for Scale.",
		basePath: ""
	} : {
		tagline: "Technology Partner for Business Growth. Architecting, building, and modernizing secure digital systems & production-ready AI.",
		services: "Service Ecosystem",
		company: "Company",
		contactTitle: "Contact & Consultation",
		address: "Jl. Ir. H. Juanda No.84, Bandung",
		rights: "© 2026 VEINTECH. All Rights Reserved. Engineered for Scale.",
		basePath: "/en"
	};
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-surface-container-lowest w-full pt-20 pb-12 border-t border-outline-variant/15 text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12"><!-- Brand Info --><div class="md:col-span-4 space-y-4"><div class="flex items-center gap-2"><span class="text-2xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white">VEINTECH</span><span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-fixed-dim/15 text-primary-fixed-dim border border-primary-fixed-dim/30">ENTERPRISE</span></div><p class="font-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">${t.tagline}</p><div class="pt-2 flex items-center gap-3"><span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span><span class="text-xs font-mono text-slate-500">Systems Operational & Secure</span></div></div><!-- Services Column --><div class="md:col-span-3"><h5 class="text-slate-900 dark:text-white font-headline font-bold mb-6 text-xs uppercase tracking-[0.2em]">${t.services}</h5><ul class="space-y-3"><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm flex items-center gap-2"${addAttribute(`${t.basePath}/services/pengembangan-software`, "href")}>Custom Software & Web App</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm flex items-center gap-2"${addAttribute(`${t.basePath}/services/ai-otomatisasi`, "href")}>AI, LLM & Workflow Automation</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm flex items-center gap-2"${addAttribute(`${t.basePath}/services/integrasi-sistem`, "href")}>System Integration & API</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm flex items-center gap-2"${addAttribute(`${t.basePath}/services/cyber-security`, "href")}>Cybersecurity & Zero Trust</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm flex items-center gap-2"${addAttribute(`${t.basePath}/services/audit-it`, "href")}>Enterprise Architecture Audit</a></li></ul></div><!-- Company Column --><div class="md:col-span-2"><h5 class="text-slate-900 dark:text-white font-headline font-bold mb-6 text-xs uppercase tracking-[0.2em]">${t.company}</h5><ul class="space-y-3"><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm"${addAttribute(`${t.basePath}/about`, "href")}>${lang === "id" ? "Tentang Kami" : "About Us"}</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm"${addAttribute(`${t.basePath}/portfolio`, "href")}>${lang === "id" ? "Studi Kasus" : "Case Studies"}</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm"${addAttribute(`${t.basePath}/blog`, "href")}>${lang === "id" ? "Wawasan & Artikel" : "Insights"}</a></li><li><a class="text-slate-600 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors text-sm"${addAttribute(`${t.basePath}/contact`, "href")}>${lang === "id" ? "Konsultasi Proyek" : "Start Project"}</a></li></ul></div><!-- Contact & Direct Inquiry --><div class="md:col-span-3"><h5 class="text-slate-900 dark:text-white font-headline font-bold mb-6 text-xs uppercase tracking-[0.2em]">${t.contactTitle}</h5><ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400"><li class="flex items-center gap-3"><span class="material-symbols-outlined text-base text-primary-fixed-dim">mail</span><span>hello@veintech.id</span></li><li class="flex items-center gap-3"><span class="material-symbols-outlined text-base text-primary-fixed-dim">chat</span><span>WhatsApp Engineering Consultation</span></li><li class="flex items-start gap-3"><span class="material-symbols-outlined text-base text-primary-fixed-dim mt-0.5">location_on</span><span>${t.address}</span></li></ul></div></div><div class="max-w-[1440px] mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500"><div>${t.rights}</div><div class="flex items-center gap-4"><a${addAttribute(idPath, "href")}${addAttribute(`hover:text-primary-fixed-dim transition-colors ${lang === "id" ? "text-primary-fixed-dim font-bold" : ""}`, "class")}>ID</a><span>/</span><a${addAttribute(enPath, "href")}${addAttribute(`hover:text-primary-fixed-dim transition-colors ${lang === "en" ? "text-primary-fixed-dim font-bold" : ""}`, "class")}>EN</a></div></div></footer>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/layout/Footer.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://veintech.id");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const currentPath = Astro.url.pathname;
	const corePath = currentPath.replace(/^\/en/, "") || "/";
	const lang = Astro.currentLocale || "id";
	const idToEn = {
		"/services/ai-otomatisasi": "/en/services/ai-automation",
		"/services/integrasi-sistem": "/en/services/system-integration",
		"/services/pengembangan-software": "/en/services/software-development",
		"/services/konsultasi": "/en/services/consulting",
		"/services/website-umkm": "/en/services/business-website"
	};
	const enToId = Object.fromEntries(Object.entries(idToEn).map(([id, en]) => [en.replace("/en", ""), id]));
	const pathWithoutEn = currentPath.replace(/^\/en/, "") || "/";
	const normalizedPath = pathWithoutEn.endsWith("/") && pathWithoutEn !== "/" ? pathWithoutEn.slice(0, -1) : pathWithoutEn;
	const enAlternatePath = idToEn[normalizedPath] ?? `/en${pathWithoutEn === "/" ? "" : pathWithoutEn}`;
	const idAlternatePath = enToId[normalizedPath] ?? pathWithoutEn;
	const pathDescriptions = {
		id: {
			"/": "VEINTECH adalah perusahaan teknologi berfokus pada otomatisasi berbasis AI dan solusi digital untuk efisiensi bisnis.",
			"/about": "Pelajari lebih lanjut tentang visi VEINTECH dalam merancang arsitektur masa depan yang cerdas dan efisien.",
			"/services": "Jelajahi ekosistem layanan kami: mulai dari sistem kecerdasan buatan, migrasi cloud, hingga keamanan Zero Trust.",
			"/portfolio": "Lihat studi kasus dan portofolio penerapan arsitektur teknologi kami pada berbagai industri global.",
			"/n8n-workflows": "Unduh dan pasang alur kerja otomatisasi n8n yang khusus dirancang oleh engineer VEINTECH.",
			"/blog": "Wawasan analitis terbaru, pembaruan keamanan, dan berita teknologi dari divisi kecerdasan VEINTECH.",
			"/contact": "Hubungi arsitek sistem VEINTECH hari ini untuk mengamankan konsultasi teknis infrastruktur perusahaan Anda."
		},
		en: {
			"/": "VEINTECH is a software enterprise focusing on AI-driven automation and seamless digital system integrations.",
			"/about": "Learn more about VEINTECH's vision in architecting smart and efficient future infrastructures.",
			"/services": "Explore our services ecosystem: from AI systems and cloud migration to Zero Trust security architectures.",
			"/portfolio": "Review case studies and portfolios of our technological architecture implementations across global industries.",
			"/n8n-workflows": "Download and deploy production-ready n8n automation workflows engineered by VEINTECH.",
			"/blog": "Latest analytical insights, security updates, and technology news from the VEINTECH intelligence division.",
			"/contact": "Contact VEINTECH system architects today to secure your enterprise technical infrastructure consultation."
		}
	};
	const { title, description, ogImage } = Astro.props;
	const finalDescription = description || pathDescriptions[lang] && pathDescriptions[lang][corePath] || pathDescriptions[lang]["/"];
	const siteUrl = Astro.site || "https://veintech.id";
	new URL(Astro.url.pathname, siteUrl);
	new URL(idAlternatePath, siteUrl);
	new URL(enAlternatePath, siteUrl);
	const isActive = (path) => {
		const normalizedCore = corePath.endsWith("/") && corePath !== "/" ? corePath.slice(0, -1) : corePath;
		if (path === "/") return normalizedCore === "/";
		return normalizedCore.startsWith(path);
	};
	const t = {
		id: {
			home: "Beranda",
			about: "Tentang Kami",
			services: "Layanan",
			portfolio: "Portofolio",
			workflows: "Alur n8n",
			blog: "Blog",
			contact: "Kontak",
			consult: "Konsultasi",
			footerDesc: "© 2024 VEINTECH. Mengotomatisasi sistem untuk masa depan yang lebih cerdas.",
			footerCompany: "Perusahaan",
			digitalProducts: "Produk Digital",
			basePath: ""
		},
		en: {
			home: "Home",
			about: "About Us",
			services: "Services",
			portfolio: "Portfolio",
			workflows: "n8n Workflows",
			blog: "Blog",
			contact: "Contact",
			consult: "Consult Now",
			footerDesc: "© 2024 VEINTECH. Integrating systems for a smarter future.",
			footerCompany: "Company",
			digitalProducts: "Digital Products",
			basePath: "/en"
		}
	}[lang];
	return renderTemplate`<html${addAttribute(lang, "lang")}><head>${renderComponent($$result, "SEOHead", $$SEOHead, {
		"title": title,
		"description": finalDescription,
		"ogImage": ogImage
	})}${renderHead($$result)}</head><body class="bg-surface text-on-surface font-body selection:bg-primary-fixed-dim/30">${renderSlot($$result, $$slots["top-banner"])}<nav id="main-nav" class="fixed top-0 w-full z-50 transition-all duration-500 bg-transparent border-b border-transparent"><div class="flex justify-between items-center max-w-[1440px] mx-auto px-6 md:px-12 h-20"><a${addAttribute(`${t.basePath}/`, "href")} class="flex flex-shrink-0 items-center"><img src="/logo.svg" alt="VeinTech Logo" class="h-auto w-32 md:w-44"></a><div class="hidden lg:flex items-center gap-8"><a${addAttribute(`font-headline tracking-tight text-sm transition-colors ${isActive("/") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}${addAttribute(`${t.basePath}/`, "href")}>${t.home}</a><!-- Company Dropdown --><div class="relative group/company"><button${addAttribute(`flex items-center gap-1 font-headline tracking-tight text-sm transition-colors ${isActive("/about") || isActive("/contact") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}>${t.footerCompany}<span class="material-symbols-outlined transition-transform group-hover/company:rotate-180" style="font-size:14px">expand_more</span></button><div class="absolute top-full left-0 pt-6 opacity-0 pointer-events-none group-hover/company:opacity-100 group-hover/company:pointer-events-auto transition-all duration-300 z-50"><div class="w-56 bg-white/95 dark:bg-[#0a0d14]/95 backdrop-blur-2xl border border-outline-variant/15 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 transform scale-95 group-hover/company:scale-100 origin-top transition-transform duration-300"><a${addAttribute(`${t.basePath}/about`, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline tracking-tight transition-all ${isActive("/about") ? "bg-primary-fixed-dim/10 text-primary-fixed-dim font-bold" : "text-slate-600 dark:text-slate-300 hover:bg-surface-container-high hover:text-primary-fixed-dim"}`, "class")}><span class="material-symbols-outlined" style="font-size:18px">info</span>${t.about}</a><a${addAttribute(`${t.basePath}/contact`, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline tracking-tight transition-all ${isActive("/contact") ? "bg-primary-fixed-dim/10 text-primary-fixed-dim font-bold" : "text-slate-600 dark:text-slate-300 hover:bg-surface-container-high hover:text-primary-fixed-dim"}`, "class")}><span class="material-symbols-outlined" style="font-size:18px">mail</span>${t.contact}</a></div></div></div><a${addAttribute(`font-headline tracking-tight text-sm transition-colors ${isActive("/produk-digital") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}${addAttribute(`${t.basePath}/produk-digital`, "href")}>${t.digitalProducts}</a><!-- Services Mega Dropdown --><div class="relative group/services"><button${addAttribute(`flex items-center gap-1 font-headline tracking-tight text-sm transition-colors ${isActive("/services") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}>${t.services}<span class="material-symbols-outlined transition-transform group-hover/services:rotate-180" style="font-size:14px">expand_more</span></button><!-- Mega Menu Panel --><div class="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover/services:opacity-100 group-hover/services:pointer-events-auto transition-all duration-300 z-50"><div class="w-[1100px] bg-white/95 dark:bg-[#0a0d14]/95 backdrop-blur-2xl border border-outline-variant/15 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex transform scale-95 group-hover/services:scale-100 transition-transform duration-300 origin-top"><!-- Left Sidebar: Categories --><div class="w-72 bg-slate-50/50 dark:bg-white/5 border-r border-outline-variant/10 p-8"><div class="mb-8"><h4 class="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-4 opacity-80">${lang === "id" ? "Kategori Layanan" : "Service Categories"}</h4><div class="space-y-1"><button data-filter="all" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl bg-primary-fixed-dim/10 text-primary-fixed-dim font-headline font-bold text-sm group/cat transition-all hover:brightness-110 active-filter">${lang === "id" ? "Semua Produk" : "All Products"}<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button><button data-filter="ai-automation" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-headline font-medium text-sm hover:bg-surface-container-high transition-colors group/cat text-left">${lang === "id" ? "AI & Otomatisasi" : "AI & Automation"}<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button><button data-filter="infrastructure" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-headline font-medium text-sm hover:bg-surface-container-high transition-colors group/cat text-left">${lang === "id" ? "Infrastruktur Cloud" : "Cloud Infrastructure"}<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button><button data-filter="development" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-headline font-medium text-sm hover:bg-surface-container-high transition-colors group/cat text-left">${lang === "id" ? "Pengembangan Digital" : "Digital Development"}<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button></div></div><div><h4 class="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase mb-4 opacity-80">${lang === "id" ? "Tipe Bisnis" : "Business Types"}</h4><div class="space-y-1"><button data-filter="enterprise" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-headline font-medium text-sm hover:bg-surface-container-high transition-colors group/cat text-left">Enterprise<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button><button data-filter="business" class="mega-menu-filter w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-headline font-medium text-sm hover:bg-surface-container-high transition-colors group/cat text-left">UMKM / Startup<span class="material-symbols-outlined text-xs group-hover/cat:translate-x-1 transition-transform"></span></button></div></div></div><!-- Right Content: Grid --><div class="flex-1 flex flex-col h-[600px] bg-white dark:bg-[#0a0d14]"><div class="p-10 pb-4"><div class="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/10"><h4 class="text-2xl font-headline font-bold text-slate-900 dark:text-white" id="mega-menu-title">${lang === "id" ? "Semua Produk & Layanan" : "All Products & Services"}</h4><span class="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-outline-variant/10"><span id="mega-menu-count">9</span> ${lang === "id" ? "Layanan Tersedia" : "Services Available"}</span></div></div><div class="flex-1 overflow-y-auto p-10 pt-0 custom-scrollbar"><div class="grid grid-cols-3 gap-6" id="mega-menu-grid"><!-- AI Computer Vision --><a${addAttribute(lang === "id" ? "/services/ai-computer-vision" : "/en/services/ai-computer-vision", "href")} data-category="ai-automation enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="AI Computer Vision"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Analisis visual cerdas untuk keamanan dan operasional bisnis." : "Intelligent visual analysis for business security and operations."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">AI & AUTOMATION</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">AI Computer Vision</h5></div></a><!-- Website UMKM & Bisnis --><a${addAttribute(lang === "id" ? "/services/website-bisnis" : "/en/services/website-bisnis", "href")} data-category="business" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-75"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="Business Website"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Paket website siap pakai lengkap dengan hosting dan domain." : "Ready-to-use website packages with hosting and domain."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">BUSINESS</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><div class="flex items-center justify-between gap-2"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Website UMKM & Bisnis</h5><span class="bg-red-600 text-[8px] font-black text-white px-1.5 py-0.5 rounded-md animate-pulse">50% OFF</span></div></div></a><!-- Chatbot AI & NLP --><a${addAttribute(lang === "id" ? "/services/chatbot-ai" : "/en/services/chatbot-ai", "href")} data-category="ai-automation business" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-100"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="Chatbot AI"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Asisten virtual cerdas untuk layanan pelanggan 24/7 otomatis." : "Smart virtual assistants for 24/7 automated customer service."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">AI & AUTOMATION</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Chatbot AI & NLP</h5></div></a><!-- System Integration API --><a${addAttribute(lang === "id" ? "/services/integrasi-api" : "/en/services/integrasi-api", "href")} data-category="infrastructure enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-150"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="API Integration"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Menyatukan ekosistem software Anda ke dalam alur kerja otomatis." : "Unifying your software ecosystem into automated workflows."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">INFRASTRUCTURE</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Integrasi Sistem API</h5></div></a><!-- Cyber Security --><a${addAttribute(lang === "id" ? "/services/cyber-security" : "/en/services/cyber-security", "href")} data-category="infrastructure enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-150"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="Cyber Security"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Perlindungan data perusahaan dengan standar keamanan tingkat tinggi." : "Enterprise data protection with high-level security standards."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">INFRASTRUCTURE</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Cyber Security & Zero Trust</h5></div></a><!-- SaaS & Web Dev --><a${addAttribute(lang === "id" ? "/services/saas-web-dev" : "/en/services/saas-web-dev", "href")} data-category="development business enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-200"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="Web Development"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Membangun aplikasi web dan platform SaaS kustom berskala tinggi." : "Building custom web apps and high-scale SaaS platforms."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">DEVELOPMENT</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">SaaS & Web Development</h5></div></a><!-- Mobile App Dev --><a${addAttribute(lang === "id" ? "/services/mobile-app-dev" : "/en/services/mobile-app-dev", "href")} data-category="development business enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-300"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="Mobile Development"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Aplikasi iOS dan Android yang intuitif dan berperforma tinggi." : "Intuitive and high-performance iOS and Android applications."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">DEVELOPMENT</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Mobile App Development</h5></div></a><!-- IT Audit & Architecture --><a${addAttribute(lang === "id" ? "/services/audit-it" : "/en/services/audit-it", "href")} data-category="consulting enterprise" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-[350ms]"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="IT Audit"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Audit menyeluruh dan desain arsitektur IT untuk efisiensi biaya." : "Thorough audits and IT architecture design for cost efficiency."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">CONSULTING</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">Arsitektur & Audit IT</h5></div></a><!-- E-commerce Solutions --><a${addAttribute(lang === "id" ? "/services/ecommerce-solutions" : "/en/services/ecommerce-solutions", "href")} data-category="business" class="service-card group/item flex flex-col bg-slate-50 dark:bg-white/5 border border-outline-variant/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary-fixed-dim/10 hover:-translate-y-1 transition-all duration-500 animate-reveal delay-[450ms]"><div class="h-40 relative overflow-hidden flex items-end p-4"><img src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 opacity-80 dark:opacity-60" alt="E-commerce"><div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5"><p class="text-[11px] text-white/90 leading-relaxed line-clamp-3 mb-3 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">${lang === "id" ? "Platform toko online kustom untuk memperluas jangkauan bisnis Anda." : "Custom online store platforms to expand your business reach."}</p><div class="flex items-center gap-2 text-primary-fixed-dim font-bold text-[10px] uppercase tracking-wider transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-150">${lang === "id" ? "Selengkapnya" : "Learn More"}<span class="material-symbols-outlined text-xs">arrow_forward</span></div></div><span class="relative z-10 text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-primary-fixed-dim/80 backdrop-blur-md px-2 py-1 rounded-lg group-hover/item:opacity-0 transition-opacity">BUSINESS</span></div><div class="p-5 flex-1 flex flex-col bg-white dark:bg-transparent"><h5 class="font-headline font-bold text-xs text-slate-900 dark:text-white group-hover/item:text-primary-fixed-dim transition-colors leading-snug whitespace-normal">E-commerce Solutions</h5></div></a></div></div><div class="p-10 pt-4 border-t border-outline-variant/10 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></div><p class="text-[11px] text-slate-600 dark:text-slate-400 font-medium">${lang === "id" ? "Butuh solusi kustom? Tim arsitek kami siap membantu mewujudkannya." : "Need a custom solution? Our architectural team is ready to help."}</p></div><a${addAttribute(`${t.basePath}/services`, "href")} class="text-xs font-bold font-headline text-primary-fixed-dim flex items-center gap-2 group/all hover:gap-3 transition-all">${lang === "id" ? "Lihat Semua Layanan" : "View All Services"}<span class="material-symbols-outlined text-sm">arrow_forward</span></a></div></div></div></div></div><a${addAttribute(`font-headline tracking-tight text-sm transition-colors ${isActive("/portfolio") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}${addAttribute(`${t.basePath}/portfolio`, "href")}>${t.portfolio}</a><a${addAttribute(`font-headline tracking-tight text-sm transition-colors ${isActive("/n8n-workflows") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}${addAttribute(`${t.basePath}/n8n-workflows`, "href")}>${t.workflows}</a><a${addAttribute(`font-headline tracking-tight text-sm transition-colors ${isActive("/blog") ? "text-primary-fixed-dim font-bold drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300 hover:text-primary-fixed-dim"}`, "class")}${addAttribute(`${t.basePath}/blog`, "href")}>${t.blog}</a></div><div class="flex items-center gap-3 md:gap-4"><div class="hidden sm:flex items-center gap-2 text-[10px] md:text-xs font-headline font-bold text-slate-600 dark:text-slate-400 border border-outline-variant/30 px-2 py-1 md:px-3 md:py-2 rounded-lg bg-surface-container-low"><a${addAttribute(idAlternatePath, "href")}${addAttribute(`hover:text-slate-900 dark:hover:text-white transition-colors ${lang === "id" ? "text-primary-fixed-dim" : ""}`, "class")}>ID</a><span class="text-outline-variant/50">|</span><a${addAttribute(enAlternatePath, "href")}${addAttribute(`hover:text-slate-900 dark:hover:text-white transition-colors ${lang === "en" ? "text-primary-fixed-dim" : ""}`, "class")}>EN</a></div><button id="theme-toggle" class="flex items-center justify-center w-8 h-8 rounded-md border border-outline-variant/30 bg-surface-container-low text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Toggle Theme"><span class="material-symbols-outlined dark:hidden block" style="font-size: 16px;">light_mode</span><span class="material-symbols-outlined hidden dark:block" style="font-size: 16px;">dark_mode</span></button><button id="mobile-menu-btn" class="lg:hidden flex items-center justify-center text-slate-800 dark:text-slate-200" aria-label="Open Mobile Menu"><span id="menu-icon" class="material-symbols-outlined transition-all" style="font-size: 28px;">menu</span></button></div></div></nav><!-- Mobile Menu Drawer --><div id="mobile-menu" class="fixed inset-0 z-40 bg-surface/98 dark:bg-[#10141a]/98 backdrop-blur-3xl flex flex-col pt-24 px-8 transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden"><div class="flex flex-col gap-6 text-2xl font-bold font-headline tracking-tight"><a${addAttribute(`transition-colors ${isActive("/") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}${addAttribute(`${t.basePath}/`, "href")}>${t.home}</a><!-- Mobile Company Accordion --><div class="flex flex-col gap-2"><button id="mobile-company-toggle"${addAttribute(`flex items-center justify-between w-full transition-colors text-left ${isActive("/about") || isActive("/contact") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}>${t.footerCompany}<span id="mobile-company-icon" class="material-symbols-outlined transition-transform duration-300" style="font-size:22px">expand_more</span></button><div id="mobile-company-list" class="hidden flex-col gap-1 pl-4 border-l border-outline-variant/20"><a${addAttribute(`${t.basePath}/about`, "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px">info</span>${t.about}</a><a${addAttribute(`${t.basePath}/contact`, "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px">mail</span>${t.contact}</a></div></div><a${addAttribute(`transition-colors ${isActive("/produk-digital") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}${addAttribute(`${t.basePath}/produk-digital`, "href")}>${t.digitalProducts}</a><!-- Mobile Services Accordion --><div class="flex flex-col gap-2"><button id="mobile-services-toggle"${addAttribute(`flex items-center justify-between w-full transition-colors text-left ${isActive("/services") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}>${t.services}<span id="mobile-services-icon" class="material-symbols-outlined transition-transform duration-300" style="font-size:22px">expand_more</span></button><div id="mobile-services-list" class="hidden flex-col gap-1 pl-4 border-l border-outline-variant/20"><a${addAttribute(lang === "id" ? "/services/ai-computer-vision" : "/en/services/ai-computer-vision", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="auto_awesome">auto_awesome</span>${lang === "id" ? "AI Computer Vision" : "AI Computer Vision"}</a><a${addAttribute(lang === "id" ? "/services/website-bisnis" : "/en/services/website-bisnis", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="store">store</span><span class="flex items-center gap-2">${lang === "id" ? "Website UMKM & Bisnis" : "UMKM & Business Website"}<span class="bg-red-600 text-[10px] font-black text-white px-2 py-0.5 rounded-lg animate-pulse">SALE</span></span></a><a${addAttribute(lang === "id" ? "/services/chatbot-ai" : "/en/services/chatbot-ai", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="forum">forum</span>${lang === "id" ? "Chatbot AI & NLP" : "Chatbot AI & NLP"}</a><a${addAttribute(lang === "id" ? "/services/integrasi-api" : "/en/services/integrasi-api", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="hub">hub</span>${lang === "id" ? "Integrasi Sistem API" : "System Integration API"}</a><a${addAttribute(lang === "id" ? "/services/cyber-security" : "/en/services/cyber-security", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="verified_user">verified_user</span>${lang === "id" ? "Cyber Security & Zero Trust" : "Cyber Security & Zero Trust"}</a><a${addAttribute(lang === "id" ? "/services/saas-web-dev" : "/en/services/saas-web-dev", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="terminal">terminal</span>${lang === "id" ? "SaaS & Web Development" : "SaaS & Web Development"}</a><a${addAttribute(lang === "id" ? "/services/mobile-app-dev" : "/en/services/mobile-app-dev", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="smartphone">smartphone</span>${lang === "id" ? "Mobile App Development" : "Mobile App Development"}</a><a${addAttribute(lang === "id" ? "/services/audit-it" : "/en/services/audit-it", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="strategy">strategy</span>${lang === "id" ? "Arsitektur & Audit IT" : "Architecture & IT Audit"}</a><a${addAttribute(lang === "id" ? "/services/ecommerce-solutions" : "/en/services/ecommerce-solutions", "href")} class="flex items-center gap-3 py-3 text-base font-normal text-slate-500 dark:text-slate-400 hover:text-primary-fixed-dim transition-colors"><span class="material-symbols-outlined text-primary-fixed-dim" style="font-size:18px" data-icon="shopping_cart">shopping_cart</span>${lang === "id" ? "E-commerce Solutions" : "E-commerce Solutions"}</a></div></div><a${addAttribute(`transition-colors ${isActive("/portfolio") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}${addAttribute(`${t.basePath}/portfolio`, "href")}>${t.portfolio}</a><a${addAttribute(`transition-colors ${isActive("/n8n-workflows") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}${addAttribute(`${t.basePath}/n8n-workflows`, "href")}>${t.workflows}</a><a${addAttribute(`transition-colors ${isActive("/blog") ? "text-primary-fixed-dim drop-shadow-[0_0_12px_rgba(76,214,255,0.4)]" : "text-slate-600 dark:text-slate-300"}`, "class")}${addAttribute(`${t.basePath}/blog`, "href")}>${t.blog}</a></div><div class="mt-auto mb-10 flex gap-4 text-xs font-headline font-bold text-slate-500 justify-center border-t border-outline-variant/10 pt-6"><a${addAttribute(idAlternatePath, "href")}${addAttribute(`hover:text-slate-900 dark:hover:text-white transition-colors ${lang === "id" ? "text-primary-fixed-dim" : ""}`, "class")}>INDONESIA (ID)</a><span class="text-outline-variant/50">|</span><a${addAttribute(enAlternatePath, "href")}${addAttribute(`hover:text-slate-900 dark:hover:text-white transition-colors ${lang === "en" ? "text-primary-fixed-dim" : ""}`, "class")}>ENGLISH (EN)</a></div></div><main class="min-h-screen">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}<!-- Floating Action Buttons --><div class="fixed bottom-6 right-6 md:right-10 flex items-stretch z-50 shadow-2xl shadow-black/30 rounded-md overflow-hidden group/fab"><!-- Hubungi Kami (WhatsApp) --><a href="https://wa.me/6287787290712" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-4 py-3 bg-[#242b35] dark:bg-[#1a202a] hover:bg-[#2c3440] dark:hover:bg-[#242b36] transition-colors border-r border-[#10151c]/20"><span class="text-[10px] md:text-xs font-bold text-white tracking-widest font-headline">${lang === "id" ? "HUBUNGI KAMI" : "CONTACT US"}</span><div class="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center transform group-hover/fab:rotate-12 transition-transform shadow-md shadow-[#25D366]/20"><svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg></div></a><!-- Scroll to Top --><button id="scroll-to-top" class="flex items-center justify-center px-3 bg-[#e2e8f0] hover:bg-white text-slate-900 transition-all opacity-0 pointer-events-none w-[42px]"><span class="material-symbols-outlined leading-none" style="font-size: 22px;">expand_less</span></button></div><script>
			const themeToggleBtn = document.getElementById('theme-toggle');
			if (themeToggleBtn) {
				themeToggleBtn.addEventListener('click', () => {
					const isDark = document.documentElement.classList.contains('dark');
					if (isDark) {
						document.documentElement.classList.remove('dark');
						window.localStorage.setItem('theme', 'light');
					} else {
						document.documentElement.classList.add('dark');
						window.localStorage.setItem('theme', 'dark');
					}
				});
			}

			// Mobile Menu Toggle Logic
			const menuBtn = document.getElementById('mobile-menu-btn');
			const mobileMenu = document.getElementById('mobile-menu');
			const menuIcon = document.getElementById('menu-icon');
            let isMenuOpen = false;

			if (menuBtn && mobileMenu && menuIcon) {
				menuBtn.addEventListener('click', () => {
					isMenuOpen = !isMenuOpen;
					if (isMenuOpen) {
						mobileMenu.classList.remove('translate-x-full');
                        mobileMenu.classList.add('translate-x-0');
                        menuIcon.textContent = 'close';
                        document.body.style.overflow = 'hidden'; 
					} else {
						mobileMenu.classList.add('translate-x-full');
                        mobileMenu.classList.remove('translate-x-0');
                        menuIcon.textContent = 'menu';
                        document.body.style.overflow = ''; 
					}
				});
			}

			// Mobile Services Accordion Toggle
			const servicesToggle = document.getElementById('mobile-services-toggle');
			const servicesList = document.getElementById('mobile-services-list');
			const servicesIcon = document.getElementById('mobile-services-icon');

			if (servicesToggle && servicesList && servicesIcon) {
				servicesToggle.addEventListener('click', () => {
					const isOpen = !servicesList.classList.contains('hidden');
					if (isOpen) {
						servicesList.classList.add('hidden');
						servicesList.classList.remove('flex');
						servicesIcon.style.transform = 'rotate(0deg)';
					} else {
						servicesList.classList.remove('hidden');
						servicesList.classList.add('flex');
						servicesIcon.style.transform = 'rotate(180deg)';
					}
				});
			}

			// Mobile Company Accordion Toggle
			const companyToggle = document.getElementById('mobile-company-toggle');
			const companyList = document.getElementById('mobile-company-list');
			const companyIcon = document.getElementById('mobile-company-icon');

			if (companyToggle && companyList && companyIcon) {
				companyToggle.addEventListener('click', () => {
					const isOpen = !companyList.classList.contains('hidden');
					if (isOpen) {
						companyList.classList.add('hidden');
						companyList.classList.remove('flex');
						companyIcon.style.transform = 'rotate(0deg)';
					} else {
						companyList.classList.remove('hidden');
						companyList.classList.add('flex');
						companyIcon.style.transform = 'rotate(180deg)';
					}
				});
			}

			// Navbar and FAB Scroll Logic
			const mainNav = document.getElementById('main-nav');
			const scrollToTopBtn = document.getElementById('scroll-to-top');

			const handleScroll = () => {
				const isScrolled = window.scrollY > 20;
				if (isScrolled) {
					mainNav.classList.remove('bg-transparent', 'border-transparent');
					mainNav.classList.add('bg-surface/90', 'dark:bg-[#0a0d14]/80', 'backdrop-blur-2xl', 'border-outline-variant/10', 'shadow-lg', 'shadow-black/5');
				} else {
					mainNav.classList.add('bg-transparent', 'border-transparent');
					mainNav.classList.remove('bg-surface/90', 'dark:bg-[#0a0d14]/80', 'backdrop-blur-2xl', 'border-outline-variant/10', 'shadow-lg', 'shadow-black/5');
				}

				if (scrollToTopBtn) {
					if (window.scrollY > 400) {
						scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
					} else {
						scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
					}
				}
			};

			window.addEventListener('scroll', handleScroll);
			// Run once on load
			handleScroll();

			if (scrollToTopBtn) {
				scrollToTopBtn.addEventListener('click', () => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				});
			}

			// Mega Menu Filtering Logic
			const filterButtons = document.querySelectorAll('.mega-menu-filter');
			const serviceCards = document.querySelectorAll('.service-card');
			const menuTitle = document.getElementById('mega-menu-title');
			const menuCount = document.getElementById('mega-menu-count');

			filterButtons.forEach(btn => {
				btn.addEventListener('click', () => {
					const filterValue = btn.getAttribute('data-filter');
					
					// Update active state
					filterButtons.forEach(b => {
						b.classList.remove('bg-primary-fixed-dim/10', 'text-primary-fixed-dim', 'active-filter');
						b.classList.add('text-slate-600', 'dark:text-slate-300');
					});
					btn.classList.add('bg-primary-fixed-dim/10', 'text-primary-fixed-dim', 'active-filter');
					btn.classList.remove('text-slate-600', 'dark:text-slate-300');

					// Filter cards with fade effect
					let count = 0;
					serviceCards.forEach(card => {
						const categories = card.getAttribute('data-category').split(' ');
						if (filterValue === 'all' || categories.includes(filterValue)) {
							card.style.display = 'flex';
							setTimeout(() => {
								card.style.opacity = '1';
								card.style.transform = 'translateY(0)';
							}, 10);
							count++;
						} else {
							card.style.opacity = '0';
							card.style.transform = 'translateY(10px)';
							setTimeout(() => {
								card.style.display = 'none';
							}, 300);
						}
					});

					// Update title and count
					if (menuTitle) {
						menuTitle.textContent = btn.innerText.trim();
					}
					if (menuCount) {
						menuCount.textContent = count;
					}
				});
			});

			// Global Intersection Observer for scroll animations
			const observerOptions = {
				root: null,
				rootMargin: '0px',
				threshold: 0.15
			};

			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						observer.unobserve(entry.target);
					}
				});
			}, observerOptions);

			// Observe elements outside mega-menu that need animation
			document.querySelectorAll('.animate-reveal').forEach((el) => {
				// Don't observe mega menu items as they use hover logic
				if (!el.closest('.group\\\\/services')) {
					observer.observe(el);
				}
			});
		<\/script></body></html>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
