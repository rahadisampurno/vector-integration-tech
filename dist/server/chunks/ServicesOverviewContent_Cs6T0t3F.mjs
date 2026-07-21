import { T as createAstro, g as addAttribute, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/components/services/ServicesOverviewContent.astro
createAstro("https://veintech.id");
var $$ServicesOverviewContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServicesOverviewContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		badge: "ENTERPRISE ENGINEERING ARCHITECTURE",
		title: "Ekosistem Layanan & Rekayasa Sistem Digital",
		subtitle: "Dari pembuatan aplikasi bisnis kustom, integrasi API berskala tinggi, hingga otomatisasi AI production-ready dan pengamanan infrastruktur Zero Trust.",
		categories: [
			{
				id: "build",
				name: "BUILD",
				title: "Pengembangan Aplikasi & Perangkat Lunak",
				desc: "Rekayasa perangkat lunak presisi tinggi yang disesuaikan dengan alur operasional unik organisasi Anda.",
				items: [
					{
						title: "Custom Software Development",
						desc: "Sistem manajemen operasional, ERP kustom, dan portal bisnis kompleks berkinerja tinggi.",
						href: "/services/pengembangan-software",
						tag: "Enterprise Core"
					},
					{
						title: "SaaS & Cloud Web Applications",
						desc: "Aplikasi cloud multi-tenant dengan isolasi data aman dan arsitektur scalable.",
						href: "/services/saas-web-dev",
						tag: "High Throughput"
					},
					{
						title: "Mobile Application (iOS & Android)",
						desc: "Aplikasi seluler native & cross-platform dengan responsivitas tinggi untuk pelanggan dan tim lapangan.",
						href: "/services/mobile-app-dev",
						tag: "Mobile Ecosystem"
					},
					{
						title: "Website Bisnis & Korporasi Enterprise",
						desc: "Portal korporat interaktif dengan standar keamanan, aksesibilitas, dan SEO berkelas dunia.",
						href: "/services/website-bisnis",
						tag: "Corporate Trust"
					},
					{
						title: "Website UMKM & Presensi Digital Cepat",
						desc: "Solusi web hemat biaya dan terotomatisasi untuk meningkatkan konversi penjualan.",
						href: "/services/website-umkm",
						tag: "Growth Ready"
					}
				]
			},
			{
				id: "integrate",
				name: "INTEGRATE",
				title: "Integrasi Sistem & Arsitektur API",
				desc: "Menghubungkan aplikasi terpisah dan silo data menjadi satu aliran informasi tersinkronisasi.",
				items: [
					{
						title: "Enterprise API Gateway & Integration",
						desc: "Penyatuan sistem pembayaran, CRM, ERP lama, dan layanan pihak ketiga dalam satu pipa data.",
						href: "/services/integrasi-api",
						tag: "Real-time API"
					},
					{
						title: "System Synchronization & ETL Pipelines",
						desc: "Sinkronisasi basis data terdistribusi dengan toleransi kesalahan tinggi.",
						href: "/services/integrasi-sistem",
						tag: "Data Integrity"
					},
					{
						title: "E-commerce & Logistic Integration Solutions",
						desc: "Sistem inventaris terpadu multi-channel untuk ritel dan logistik.",
						href: "/services/ecommerce-solutions",
						tag: "Commerce Hub"
					}
				]
			},
			{
				id: "automate",
				name: "AUTOMATE",
				title: "Kecerdasan Buatan (AI) & Otomatisasi Alur Kerja",
				desc: "Penerapan AI terverifikasi yang bekerja secara nyata untuk mempercepat pengambilan keputusan operasional.",
				items: [
					{
						title: "LLM, RAG & AI Agent Production Systems",
						desc: "Sistem pencarian berbasis konteks internal dan otomatisasi proses bisnis mandiri.",
						href: "/services/ai-otomatisasi",
						tag: "Production AI"
					},
					{
						title: "Intelligent Conversational AI & NLP",
						desc: "Asisten virtual cerdas dengan pemahaman bahasa mendalam 24/7.",
						href: "/services/chatbot-ai",
						tag: "24/7 Autonomy"
					},
					{
						title: "AI Computer Vision & Image Analytics",
						desc: "Analisis visual otomatis untuk kendali mutu produksi, verifikasi identitas, dan pemantauan.",
						href: "/services/ai-computer-vision",
						tag: "Deep Vision"
					}
				]
			},
			{
				id: "secure",
				name: "SECURE & SCALE",
				title: "Keamanan Cyber, Audit IT & Konsultasi Strategis",
				desc: "Pengamanan lapisan infrastruktur dan audit kelayakan kode untuk ketahanan jangka panjang.",
				items: [
					{
						title: "Cybersecurity & Zero Trust Architecture",
						desc: "Audit kerentanan sistem, pentest, dan penerapan prinsip kepercayan nol (Zero Trust).",
						href: "/services/cyber-security",
						tag: "Zero Trust"
					},
					{
						title: "IT Architecture Audit & Cloud Optimization",
						desc: "Evaluasi kesehatan sistem, perbaikan bottleneck performa, dan efisiensi biaya cloud.",
						href: "/services/audit-it",
						tag: "High Availability"
					},
					{
						title: "Digital Transformation & IT Strategy Consulting",
						desc: "Penyusunan peta jalan teknologi bersama konsultan dan arsitek senior.",
						href: "/services/konsultasi",
						tag: "Strategic Advisory"
					}
				]
			}
		],
		tableTitle: "Matriks Perbandingan Layanan & Rekayasa",
		tableHeaders: [
			"Layanan",
			"Kategori",
			"Ideal Untuk",
			"Waktu Implementasi",
			"Standar Output"
		],
		tableData: [
			{
				name: "Custom Software Development",
				cat: "BUILD",
				ideal: "Perusahaan dengan alur kerja unik & sistem mission-critical",
				time: "8 - 16 Minggu",
				output: "Clean Code Architecture + Unit Test + CI/CD"
			},
			{
				name: "Enterprise API Integration",
				cat: "INTEGRATE",
				ideal: "Organisasi dengan banyak aplikasi terfragmentasi",
				time: "4 - 8 Minggu",
				output: "API Gateway + Documentation + Idempotent Queue"
			},
			{
				name: "LLM & RAG AI Automation",
				cat: "AUTOMATE",
				ideal: "Otomatisasi riset dokumen, triase tiket & layanan pelanggan",
				time: "6 - 12 Minggu",
				output: "Production RAG Engine + Evaluation Metrics + Guardrails"
			},
			{
				name: "Zero Trust Security & Audit",
				cat: "SECURE",
				ideal: "Aplikasi penanganan transaksi keuangan & data sensitif",
				time: "2 - 4 Minggu",
				output: "Security Report + Remediation Plan + Architecture Hardening"
			}
		]
	} : {
		badge: "ENTERPRISE ENGINEERING ARCHITECTURE",
		title: "Engineering Services & Digital Ecosystem",
		subtitle: "From bespoke software engineering and high-throughput API gateways to verified production AI automations and Zero Trust cloud security.",
		categories: [
			{
				id: "build",
				name: "BUILD",
				title: "Custom Application & Software Engineering",
				desc: "Precision-engineered software designed around your organization's exact workflows and growth trajectory.",
				items: [
					{
						title: "Custom Software Development",
						desc: "High-performance operational management systems, custom ERPs, and complex web applications.",
						href: "/en/services/software-development",
						tag: "Enterprise Core"
					},
					{
						title: "SaaS & Cloud Web Applications",
						desc: "Multi-tenant cloud platforms built with secure data isolation and horizontal scalability.",
						href: "/en/services/saas-web-dev",
						tag: "High Throughput"
					},
					{
						title: "Mobile Application (iOS & Android)",
						desc: "Native and cross-platform high-responsiveness mobile applications for end users and field teams.",
						href: "/en/services/mobile-app-dev",
						tag: "Mobile Ecosystem"
					},
					{
						title: "Corporate Enterprise Web Systems",
						desc: "Interactive corporate web portals built to elite standards of security, speed, and technical SEO.",
						href: "/en/services/business-website",
						tag: "Corporate Trust"
					},
					{
						title: "SME Digital Presence Solutions",
						desc: "High-conversion automated web solutions architected for rapid deployment.",
						href: "/en/services/website-bisnis",
						tag: "Growth Ready"
					}
				]
			},
			{
				id: "integrate",
				name: "INTEGRATE",
				title: "System Integration & API Architecture",
				desc: "Unifying legacy software stacks and fragmented data silos into seamless, event-driven pipelines.",
				items: [
					{
						title: "Enterprise API Gateway & Integration",
						desc: "Connecting payment gateways, CRMs, legacy ERPs, and third-party APIs into secure streams.",
						href: "/en/services/integrasi-api",
						tag: "Real-time API"
					},
					{
						title: "System Synchronization & ETL Pipelines",
						desc: "Fault-tolerant distributed database synchronization and high-accuracy data transformation.",
						href: "/en/services/system-integration",
						tag: "Data Integrity"
					},
					{
						title: "E-commerce & Logistics Hub Solutions",
						desc: "Unified multi-channel inventory and logistics architectures for retail enterprises.",
						href: "/en/services/ecommerce-solutions",
						tag: "Commerce Hub"
					}
				]
			},
			{
				id: "automate",
				name: "AUTOMATE",
				title: "Artificial Intelligence & Workflow Automation",
				desc: "Verified AI and RAG implementations delivering tangible autonomy across complex operational decisions.",
				items: [
					{
						title: "LLM, RAG & AI Agent Production Systems",
						desc: "Internal context-aware enterprise search and autonomous business workflow agents.",
						href: "/en/services/ai-automation",
						tag: "Production AI"
					},
					{
						title: "Intelligent Conversational AI & NLP",
						desc: "Smart conversational virtual assistants providing accurate 24/7 operational support.",
						href: "/en/services/chatbot-ai",
						tag: "24/7 Autonomy"
					},
					{
						title: "AI Computer Vision & Image Analytics",
						desc: "Automated visual inspection for manufacturing quality control and security verification.",
						href: "/en/services/ai-computer-vision",
						tag: "Deep Vision"
					}
				]
			},
			{
				id: "secure",
				name: "SECURE & SCALE",
				title: "Cybersecurity, Architecture Audit & Strategic Advisory",
				desc: "Securing critical infrastructure layers and auditing codebases for enterprise resilience.",
				items: [
					{
						title: "Cybersecurity & Zero Trust Architecture",
						desc: "Vulnerability audits, penetration reviews, and complete Zero Trust architectural hardening.",
						href: "/en/services/cyber-security",
						tag: "Zero Trust"
					},
					{
						title: "IT Architecture Audit & Cloud Optimization",
						desc: "System health assessment, latency bottleneck resolution, and cloud cost efficiency.",
						href: "/en/services/audit-it",
						tag: "High Availability"
					},
					{
						title: "Digital Transformation & IT Strategy Consulting",
						desc: "Technical roadmap formulation with principal enterprise architects.",
						href: "/en/services/consulting",
						tag: "Strategic Advisory"
					}
				]
			}
		],
		tableTitle: "Service & Engineering Comparison Matrix",
		tableHeaders: [
			"Service",
			"Category",
			"Best Fit For",
			"Typical Implementation",
			"Deliverable Standard"
		],
		tableData: [
			{
				name: "Custom Software Development",
				cat: "BUILD",
				ideal: "Enterprises with unique workflows & mission-critical operations",
				time: "8 - 16 Weeks",
				output: "Clean Code Architecture + Unit Test + CI/CD"
			},
			{
				name: "Enterprise API Integration",
				cat: "INTEGRATE",
				ideal: "Organizations with fragmented third-party & legacy software",
				time: "4 - 8 Weeks",
				output: "API Gateway + Documentation + Idempotent Queue"
			},
			{
				name: "LLM & RAG AI Automation",
				cat: "AUTOMATE",
				ideal: "Automating document triage, customer support & internal research",
				time: "6 - 12 Weeks",
				output: "Production RAG Engine + Evaluation Metrics + Guardrails"
			},
			{
				name: "Zero Trust Security & Audit",
				cat: "SECURE",
				ideal: "Financial systems & applications processing sensitive data",
				time: "2 - 4 Weeks",
				output: "Security Report + Remediation Plan + Architecture Hardening"
			}
		]
	};
	return renderTemplate`${maybeRenderHead($$result)}<!-- Header Section --><header class="pt-32 pb-20 bg-surface border-b border-outline-variant/15 text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><!-- Breadcrumbs --><nav class="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6"><a${addAttribute(lang === "id" ? "/" : "/en", "href")} class="hover:text-primary-fixed-dim transition-colors">${lang === "id" ? "Beranda" : "Home"}</a><span>/</span><span class="text-slate-400">${lang === "id" ? "Ekosistem Layanan" : "Services Ecosystem"}</span></nav><div class="max-w-4xl space-y-6"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-primary-fixed-dim/15 text-primary-fixed-dim border border-primary-fixed-dim/30"><span>${t.badge}</span></div><h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter leading-tight text-slate-900 dark:text-white">${t.title}</h1><p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">${t.subtitle}</p></div></div></header><!-- Categorized Services Grid --><section class="py-24 bg-surface-container-lowest"><div class="max-w-[1440px] mx-auto px-6 md:px-12 space-y-20">${t.categories.map((cat) => renderTemplate`<div class="space-y-8"><!-- Category Title Header --><div class="border-b border-outline-variant/15 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"><div><div class="text-xs font-mono font-bold text-primary-fixed-dim uppercase tracking-widest mb-2">${cat.name}</div><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white">${cat.title}</h2></div><p class="text-sm text-slate-600 dark:text-slate-400 max-w-lg">${cat.desc}</p></div><!-- Service Cards Grid --><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${cat.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="group p-7 rounded-2xl bg-surface border border-outline-variant/15 hover:border-primary-fixed-dim/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"><div class="space-y-3"><div class="flex items-center justify-between"><span class="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-surface-container-low text-slate-600 dark:text-slate-300 border border-outline-variant/15">${item.tag}</span><span class="material-symbols-outlined text-slate-400 group-hover:text-primary-fixed-dim transition-colors">open_in_new</span></div><h3 class="text-lg font-bold font-headline text-slate-900 dark:text-white group-hover:text-primary-fixed-dim transition-colors pt-2">${item.title}</h3><p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${item.desc}</p></div><div class="pt-4 border-t border-outline-variant/15 flex items-center gap-2 text-xs font-bold font-headline text-primary-fixed-dim"><span>${lang === "id" ? "Arsitektur & Spesifikasi" : "Architecture & Specs"}</span><span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span></div></a>`)}</div></div>`)}</div></section><!-- Service Comparison Table --><section class="py-24 bg-surface border-t border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="mb-12"><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white mb-3">${t.tableTitle}</h2><p class="text-sm text-slate-600 dark:text-slate-400">${lang === "id" ? "Perbandingan ruang lingkup kerja dan standar kualitas eksekusi kami." : "Scope comparison and our verifiable engineering execution standards."}</p></div><div class="rounded-2xl border border-outline-variant/20 overflow-x-auto bg-surface-container-lowest"><table class="w-full text-left text-sm whitespace-nowrap"><thead><tr class="border-b border-outline-variant/15 bg-surface-container-low text-xs font-mono uppercase text-slate-500">${t.tableHeaders.map((hdr) => renderTemplate`<th class="py-4 px-6 font-semibold">${hdr}</th>`)}</tr></thead><tbody class="divide-y divide-outline-variant/15">${t.tableData.map((row) => renderTemplate`<tr class="hover:bg-surface/50 transition-colors"><td class="py-4 px-6 font-bold font-headline text-slate-900 dark:text-white">${row.name}</td><td class="py-4 px-6"><span class="text-xs font-mono font-bold px-2 py-1 rounded bg-primary-fixed-dim/10 text-primary-fixed-dim">${row.cat}</span></td><td class="py-4 px-6 text-slate-600 dark:text-slate-300">${row.ideal}</td><td class="py-4 px-6 font-mono text-xs text-slate-600 dark:text-slate-400">${row.time}</td><td class="py-4 px-6 font-mono text-xs text-emerald-500 font-semibold">${row.output}</td></tr>`)}</tbody></table></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/services/ServicesOverviewContent.astro", void 0);
//#endregion
export { $$ServicesOverviewContent as t };
