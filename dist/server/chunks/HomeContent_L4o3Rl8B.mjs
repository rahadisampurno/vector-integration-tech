import { T as createAstro, g as addAttribute, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
//#region src/components/home/HomeContent.astro
createAstro("https://veintech.id");
var $$HomeContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HomeContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		badge: "Technology Partner for Business Growth",
		heroTitle: "Merancang, Membangun & Mengembangkan Sistem Digital",
		heroHighlight: "Production-Ready & Scalable.",
		heroSub: "Dari otomatisasi operasional UMKM hingga arsitektur high-availability enterprise. Kami membangun software, AI, dan infrastruktur yang bekerja nyata untuk pertumbuhan bisnis Anda.",
		ctaPrimary: "Diskusikan Proyek",
		ctaSecondary: "Lihat Layanan",
		trustHeading: "STANDAR ARSITEKTUR & PENGEMBANGAN ENTERPRISE",
		trustItems: [
			{
				icon: "verified_user",
				title: "Zero Trust Security",
				desc: "Keamanan teruji sejak desain arsitektur awal."
			},
			{
				icon: "architecture",
				title: "Enterprise Scalability",
				desc: "Sistem siap menahan lonjakan beban tinggi."
			},
			{
				icon: "precision_manufacturing",
				title: "Production-Ready AI",
				desc: "Implementasi LLM & RAG dengan evaluasi akurat."
			},
			{
				icon: "sync_alt",
				title: "Seamless Integration",
				desc: "Integrasi API tanpa sekat antar sistem bisnis."
			}
		],
		problemSectionTitle: "Tantangan Nyata Sistem Bisnis vs. Solusi VEINTECH",
		problemSectionSub: "Mengapa pendekatan software house konvensional sering gagal mendukung skala bisnis jangka panjang.",
		problems: [
			{
				issue: "Operasional & Alur Kerja Masih Manual",
				impact: "Proses lambat, rentan human error, dan memakan biaya operasional tinggi.",
				solution: "Otomatisasi Alur Kerja & AI Agent kustom yang bekerja 24/7 tanpa gangguan."
			},
			{
				issue: "Data Terjebak di Silo Terpisah (ERP/CRM/Aplikasi)",
				impact: "Sulit mengambil keputusan real-time karena sistem tidak saling berbicara.",
				solution: "Integrasi API Enterprise & Event-Driven Architecture yang tersinkronisasi."
			},
			{
				issue: "Sistem Lama Sulit Dikembangkan & Rentan Down",
				impact: "Perubahan kecil memicu bug di area lain dan membahayakan keamanan data.",
				solution: "Modernisasi Arsitektur & Audit Codebase dengan standar keamanan tertinggi."
			}
		],
		servicesHeading: "Kemampuan Rekayasa & Layanan Inti",
		servicesSub: "Pendekatan menyeluruh untuk membangun ekosistem digital bisnis Anda.",
		categories: [
			{
				id: "build",
				name: "BUILD",
				label: "Pengembangan Sistem",
				items: [
					{
						title: "Custom Software Development",
						desc: "Aplikasi bisnis khusus yang dirancang presisi sesuai alur operasional unik perusahaan Anda.",
						href: "/services/pengembangan-software"
					},
					{
						title: "SaaS & Web Applications",
						desc: "Platform cloud multi-tenant berkapasitas tinggi dengan performa optimal dan keamanan terjamin.",
						href: "/services/saas-web-dev"
					},
					{
						title: "Mobile Application (iOS/Android)",
						desc: "Aplikasi seluler berkinerja tinggi untuk pelanggan maupun tim operasional lapangan.",
						href: "/services/mobile-app-dev"
					}
				]
			},
			{
				id: "integrate",
				name: "INTEGRATE",
				label: "Integrasi & API",
				items: [{
					title: "Enterprise API Integration",
					desc: "Menyatukan aplikasi terpisah, CRM, ERP, dan payment gateway dalam satu pipa data aman.",
					href: "/services/integrasi-api"
				}, {
					title: "System Synchronization",
					desc: "Sinkronisasi data real-time dan rekayasa ETL untuk konsistensi di seluruh organisasi.",
					href: "/services/integrasi-sistem"
				}]
			},
			{
				id: "automate",
				name: "AUTOMATE",
				label: "AI & Otomatisasi",
				items: [{
					title: "LLM, RAG & AI Agent Production",
					desc: "Implementasi kecerdasan buatan terverifikasi untuk otomatisasi keputusan dan analitik.",
					href: "/services/ai-otomatisasi"
				}, {
					title: "Intelligent Chatbot & NLP",
					desc: "Asisten AI konversasional dengan pemahaman konteks bisnis akurat 24/7.",
					href: "/services/chatbot-ai"
				}]
			},
			{
				id: "secure",
				name: "SECURE & SCALE",
				label: "Keamanan & Audit",
				items: [{
					title: "Cybersecurity & Zero Trust Architecture",
					desc: "Perlindungan data sensitif, audit kerentanan, dan kepatuhan standar regulasi keamanan.",
					href: "/services/cyber-security"
				}, {
					title: "IT Architecture Audit & Cloud DevOps",
					desc: "Evaluasi menyeluruh infrastruktur untuk efisiensi biaya cloud dan high availability.",
					href: "/services/audit-it"
				}]
			}
		],
		processTitle: "Proses Engineering 8-Tahap yang Terukur",
		processSub: "Kami bekerja transparan dengan metodologi rekayasa terstruktur dari awal hingga pasca-peluncuran.",
		processSteps: [
			{
				num: "01",
				title: "Discovery",
				desc: "Pemahaman mendalam mengenai target bisnis, pemangku kepentingan, dan batasan teknis."
			},
			{
				num: "02",
				title: "Requirement Analysis",
				desc: "Spesifikasi fungsional dan non-fungsional yang jelas dan dapat diverifikasi."
			},
			{
				num: "03",
				title: "Solution Architecture",
				desc: "Perancangan arsitektur sistem, basis data, keamanan, dan alur integrasi."
			},
			{
				num: "04",
				title: "UI/UX Engineering",
				desc: "Desain antarmuka intuitif berdasarkan prinsip ergonomi pengguna dan efisiensi alur."
			},
			{
				num: "05",
				title: "Development",
				desc: "Penulisan kode modular, type-safe, dan teruji oleh tim software engineer berpengalaman."
			},
			{
				num: "06",
				title: "Testing & Security Review",
				desc: "Pengujian unit, integrasi, performa, serta audit keamanan menyeluruh sebelum rilis."
			},
			{
				num: "07",
				title: "Deployment",
				desc: "Peluncuran zero-downtime dengan pemantauan CI/CD dan otomatisasi infrastruktur."
			},
			{
				num: "08",
				title: "Monitoring & Maintenance",
				desc: "Observability berkelanjutan, pemeliharaan jangka panjang, dan evolusi sistem."
			}
		],
		techTitle: "Kedalaman Keahlian Teknis",
		techSub: "Teknologi modern dan tangguh yang kami gunakan untuk membangun sistem berkelas enterprise.",
		techGroups: [
			{
				group: "Backend & Engineering",
				techs: [
					"Golang",
					"Node.js",
					"NestJS",
					"TypeScript",
					"Microservices",
					"Event-Driven"
				]
			},
			{
				group: "Data & Architecture",
				techs: [
					"PostgreSQL",
					"Redis",
					"Vector Database",
					"MongoDB",
					"ETL Pipelines",
					"High Availability"
				]
			},
			{
				group: "AI & Automation",
				techs: [
					"LLM Integration",
					"RAG Systems",
					"AI Agents",
					"Semantic Search",
					"Intelligent Automation"
				]
			},
			{
				group: "Cloud & Zero Trust Security",
				techs: [
					"Docker",
					"Kubernetes",
					"CI/CD",
					"OWASP Standards",
					"Tenant Isolation",
					"Observability"
				]
			}
		],
		caseStudiesTitle: "Studi Kasus & Rekayasa Terpilih",
		caseStudiesSub: "Contoh nyata bagaimana kami menyelesaikan kompleksitas arsitektur dan bisnis.",
		cases: [{
			title: "AI Operational Ticketing & Resolution System",
			industry: "Enterprise Telecommunications",
			challenge: "Waktu penanganan ribuan tiket gangguan memakan waktu 4+ jam dengan rute eskalasi manual.",
			solution: "Arsitektur RAG + AI Classifier yang memilah, mendiagnosis, dan merespons tiket secara instan.",
			outcome: "Akurasi triase meningkat drastis dan efisiensi waktu penyelesaian gangguan terakselerasi.",
			href: "/portfolio"
		}, {
			title: "Core API Integration Engine & Logistik Hub",
			industry: "Supply Chain & E-Commerce Ecosystem",
			challenge: "Silo data antar WMS (Warehouse) lama dengan sistem pesanan multi-channel.",
			solution: "Event-driven API Gateway dengan mekanisme antrean tahan banting dan retry otomatis.",
			outcome: "Sinkronisasi pesanan real-time tanpa duplikasi transaksi pada beban puncak.",
			href: "/portfolio"
		}],
		finalCtaTitle: "Punya Kebutuhan Sistem atau Tantangan Arsitektur?",
		finalCtaSub: "Ceritakan tantangan bisnis atau sistem yang sedang Anda hadapi. Tim arsitek kami siap memetakan kebutuhan, risiko, dan opsi implementasi terbaik.",
		finalCtaBtn: "Mulai Konsultasi Proyek",
		basePath: ""
	} : {
		badge: "Technology Partner for Business Growth",
		heroTitle: "Architecting, Building & Scaling Digital Systems",
		heroHighlight: "Production-Ready & Secure.",
		heroSub: "From SME workflow automations to mission-critical enterprise architectures. We build software, AI, and cloud systems designed for real business growth.",
		ctaPrimary: "Start Consultation",
		ctaSecondary: "Explore Services",
		trustHeading: "ENTERPRISE ENGINEERING & ARCHITECTURAL STANDARDS",
		trustItems: [
			{
				icon: "verified_user",
				title: "Zero Trust Security",
				desc: "Built-in enterprise defense from system design."
			},
			{
				icon: "architecture",
				title: "Enterprise Scalability",
				desc: "Architected to withstand peak concurrent loads."
			},
			{
				icon: "precision_manufacturing",
				title: "Production-Ready AI",
				desc: "Pragmatic LLM & RAG workflows with verified accuracy."
			},
			{
				icon: "sync_alt",
				title: "Seamless Integration",
				desc: "Frictionless API connectivity across your software stack."
			}
		],
		problemSectionTitle: "Real Business Bottlenecks vs. VEINTECH Engineering",
		problemSectionSub: "Why conventional agency approaches fail long-term business scaling needs.",
		problems: [
			{
				issue: "Manual Workflows & Operational Friction",
				impact: "Slow execution, prone to human errors, and escalating operational overhead.",
				solution: "Custom Workflow Automation & AI Agents running autonomously 24/7."
			},
			{
				issue: "Isolated Data Silos Across Legacy Apps",
				impact: "Inability to get real-time business visibility due to fragmented systems.",
				solution: "Enterprise API Gateway & Event-Driven Architecture synchronization."
			},
			{
				issue: "Fragile Systems Prone to Downtime",
				impact: "Minor code changes break production and expose critical security risks.",
				solution: "Modernized Clean Architecture with automated testing and Zero Trust audits."
			}
		],
		servicesHeading: "Core Capabilities & Engineering Services",
		servicesSub: "End-to-end technical authority across custom development, AI, and systems design.",
		categories: [
			{
				id: "build",
				name: "BUILD",
				label: "Custom Engineering",
				items: [
					{
						title: "Custom Software Development",
						desc: "Precision-tailored business applications designed around your exact operational processes.",
						href: "/en/services/software-development"
					},
					{
						title: "SaaS & Web Applications",
						desc: "High-throughput cloud web applications with secure multi-tenant architectures.",
						href: "/en/services/saas-web-dev"
					},
					{
						title: "Mobile Application Development",
						desc: "High-performance iOS and Android applications for customers and internal field teams.",
						href: "/en/services/mobile-app-dev"
					}
				]
			},
			{
				id: "integrate",
				name: "INTEGRATE",
				label: "API & Systems",
				items: [{
					title: "Enterprise API Integration",
					desc: "Unifying disparate software, legacy ERPs, CRMs, and payment systems into secure data flows.",
					href: "/en/services/integrasi-api"
				}, {
					title: "System Synchronization",
					desc: "Real-time data pipelines and robust ETL architectures for single-source-of-truth accuracy.",
					href: "/en/services/system-integration"
				}]
			},
			{
				id: "automate",
				name: "AUTOMATE",
				label: "AI & Workflows",
				items: [{
					title: "LLM, RAG & AI Agent Production",
					desc: "Verified artificial intelligence implementations for workflow automation and decision insight.",
					href: "/en/services/ai-automation"
				}, {
					title: "Intelligent Chatbot & NLP",
					desc: "Smart conversational AI assistants integrated directly with your enterprise knowledge base.",
					href: "/en/services/chatbot-ai"
				}]
			},
			{
				id: "secure",
				name: "SECURE & SCALE",
				label: "Security & Cloud",
				items: [{
					title: "Cybersecurity & Zero Trust Architecture",
					desc: "Data protection, vulnerability assessment, and enterprise compliance defense.",
					href: "/en/services/cyber-security"
				}, {
					title: "IT Architecture Audit & DevOps",
					desc: "Comprehensive system evaluation for cloud cost efficiency and mission-critical availability.",
					href: "/en/services/audit-it"
				}]
			}
		],
		processTitle: "Evidence-Based 8-Step Engineering Process",
		processSub: "Structured, transparent delivery methodology from initial discovery to long-term lifecycle support.",
		processSteps: [
			{
				num: "01",
				title: "Discovery",
				desc: "Deep alignment on business objectives, stakeholder needs, and technical constraints."
			},
			{
				num: "02",
				title: "Requirement Analysis",
				desc: "Clear, verifiable functional and non-functional engineering specifications."
			},
			{
				num: "03",
				title: "Solution Architecture",
				desc: "System blueprinting, database modeling, security boundaries, and API topology."
			},
			{
				num: "04",
				title: "UI/UX Engineering",
				desc: "Ergonomic interface design engineered for workflow speed and clarity."
			},
			{
				num: "05",
				title: "Development",
				desc: "Clean, type-safe, modular code written by experienced software engineers."
			},
			{
				num: "06",
				title: "Testing & Security Review",
				desc: "Unit, integration, performance testing, and thorough security reviews."
			},
			{
				num: "07",
				title: "Deployment",
				desc: "Zero-downtime automated releases with CI/CD and infrastructure observability."
			},
			{
				num: "08",
				title: "Monitoring & Maintenance",
				desc: "Proactive telemetry, security updates, and long-term architectural scaling."
			}
		],
		techTitle: "Technical Depth & Engineering Stack",
		techSub: "Proven, production-grade technologies we use to architect high-reliability systems.",
		techGroups: [
			{
				group: "Backend & Engineering",
				techs: [
					"Golang",
					"Node.js",
					"NestJS",
					"TypeScript",
					"Microservices",
					"Event-Driven"
				]
			},
			{
				group: "Data & Architecture",
				techs: [
					"PostgreSQL",
					"Redis",
					"Vector Database",
					"MongoDB",
					"ETL Pipelines",
					"High Availability"
				]
			},
			{
				group: "AI & Automation",
				techs: [
					"LLM Integration",
					"RAG Systems",
					"AI Agents",
					"Semantic Search",
					"Intelligent Automation"
				]
			},
			{
				group: "Cloud & Zero Trust Security",
				techs: [
					"Docker",
					"Kubernetes",
					"CI/CD",
					"OWASP Standards",
					"Tenant Isolation",
					"Observability"
				]
			}
		],
		caseStudiesTitle: "Selected Architectural Case Studies",
		caseStudiesSub: "Verifiable engineering outcomes solving complex enterprise & operational challenges.",
		cases: [{
			title: "AI Operational Ticketing & Resolution System",
			industry: "Enterprise Telecommunications",
			challenge: "Manual triage of thousands of support tickets taking 4+ hours per escalation cycle.",
			solution: "Production RAG + classification AI engine diagnosing and routing issues automatically.",
			outcome: "Triaged response time reduced drastically with verified diagnostic accuracy.",
			href: "/en/portfolio"
		}, {
			title: "Core API Integration & Logistics Hub Engine",
			industry: "Supply Chain & E-Commerce Ecosystem",
			challenge: "Fragmented inventory data across legacy Warehouse Management Systems.",
			solution: "High-throughput event-driven API Gateway with idempotent retry processing.",
			outcome: "Real-time order synchronization across millions of high-concurrency transactions.",
			href: "/en/portfolio"
		}],
		finalCtaTitle: "Have a System Challenge or Application Idea?",
		finalCtaSub: "Share your operational bottleneck or technical ambition. Our engineering team will help map the architecture, risks, and implementation options.",
		finalCtaBtn: "Start Technical Consultation",
		basePath: "/en"
	};
	return renderTemplate`${maybeRenderHead($$result)}<!-- Hero Section --><section class="relative pt-28 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-surface text-on-surface border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"><!-- Left Column: High-Impact Enterprise Positioning --><div class="lg:col-span-7 space-y-8"><div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary-fixed-dim/10 border border-primary-fixed-dim/30 text-primary-fixed-dim text-xs font-mono font-bold tracking-wider uppercase"><span class="w-2 h-2 rounded-full bg-primary-fixed-dim"></span>${t.badge}</div><h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline tracking-tighter leading-[1.08] text-slate-900 dark:text-white">${t.heroTitle}<span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed-dim via-cyan-400 to-emerald-400 mt-1">${t.heroHighlight}</span></h1><p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-body">${t.heroSub}</p><!-- CTA Group --><div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"><a${addAttribute(lang === "id" ? "/contact" : "/en/contact", "href")} class="px-8 py-4 rounded-xl bg-primary-fixed-dim hover:brightness-110 text-on-primary-fixed font-headline font-bold text-base shadow-lg shadow-primary-fixed-dim/20 transition-all flex items-center justify-center gap-2 group"><span>${t.ctaPrimary}</span><span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span></a><a${addAttribute(lang === "id" ? "/services" : "/en/services", "href")} class="px-8 py-4 rounded-xl border border-outline-variant/30 hover:border-primary-fixed-dim/60 bg-surface-container-low hover:bg-surface-container transition-all text-slate-900 dark:text-white font-headline font-semibold text-base flex items-center justify-center">${t.ctaSecondary}</a></div><!-- Audience Trust Cues --><div class="pt-6 border-t border-outline-variant/15 grid grid-cols-3 gap-6"><div><div class="text-xs font-mono uppercase tracking-wider text-slate-500">UMKM & Retail</div><div class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Operational Automation</div></div><div><div class="text-xs font-mono uppercase tracking-wider text-slate-500">Startups & Scale-ups</div><div class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">High-Throughput SaaS</div></div><div><div class="text-xs font-mono uppercase tracking-wider text-slate-500">Enterprise</div><div class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Zero Trust & Core API</div></div></div></div><!-- Right Column: System Architecture Preview Card --><div class="lg:col-span-5 relative"><div class="relative rounded-2xl bg-surface-container-low border border-outline-variant/20 p-6 sm:p-8 shadow-2xl overflow-hidden"><div class="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-6"><div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-rose-500/80"></span><span class="w-3 h-3 rounded-full bg-amber-500/80"></span><span class="w-3 h-3 rounded-full bg-emerald-500/80"></span></div><span class="text-[11px] font-mono text-slate-400">ARCH-DEPLOY::PROD-ZERO-TRUST</span></div><div class="space-y-4 font-mono text-xs"><div class="p-3.5 rounded-xl bg-surface/80 border border-outline-variant/20 flex items-center justify-between"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary-fixed-dim">hub</span><span class="font-bold text-slate-900 dark:text-white">API Gateway & Event Pipeline</span></div><span class="text-emerald-500 font-bold">ACTIVE</span></div><div class="p-3.5 rounded-xl bg-surface/80 border border-outline-variant/20 flex items-center justify-between"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-cyan-400">smart_toy</span><span class="font-bold text-slate-900 dark:text-white">RAG + LLM Operational Agent</span></div><span class="text-emerald-500 font-bold">SECURED</span></div><div class="p-3.5 rounded-xl bg-surface/80 border border-outline-variant/20 flex items-center justify-between"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-amber-400">storage</span><span class="font-bold text-slate-900 dark:text-white">Distributed PostgreSQL & Vector DB</span></div><span class="text-emerald-500 font-bold">SYNCHRONIZED</span></div><div class="pt-3 flex items-center justify-between text-[11px] text-slate-500"><span>Latency: &lt;14ms</span><span>Uptime Target: High Availability</span></div></div></div></div></div></section><!-- Trust Bar Section --><section class="py-14 bg-surface-container-lowest border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><h2 class="text-xs font-mono font-bold tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase text-center mb-10">${t.trustHeading}</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${t.trustItems.map((item) => renderTemplate`<div class="p-6 rounded-xl bg-surface-container-low border border-outline-variant/15 flex flex-col gap-3"><span class="material-symbols-outlined text-primary-fixed-dim text-2xl">${item.icon}</span><h3 class="font-headline font-bold text-sm text-slate-900 dark:text-white">${item.title}</h3><p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${item.desc}</p></div>`)}</div></div></section><!-- Business Problem vs VEINTECH Engineering Section --><section class="py-24 bg-surface border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="max-w-3xl mb-16"><h2 class="text-3xl sm:text-4xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white mb-4">${t.problemSectionTitle}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">${t.problemSectionSub}</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8">${t.problems.map((prob) => renderTemplate`<div class="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between space-y-6"><div class="space-y-3"><div class="text-xs font-mono font-bold text-rose-500 uppercase tracking-wider flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>BOTTLENECK BISNIS</div><h3 class="font-headline font-bold text-lg text-slate-900 dark:text-white">${prob.issue}</h3><p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${prob.impact}</p></div><div class="pt-6 border-t border-outline-variant/15 space-y-2"><div class="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>VEINTECH ENGINEERING SOLUTION</div><p class="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">${prob.solution}</p></div></div>`)}</div></div></section><!-- Structured Services Section (Build, Integrate, Automate, Secure) --><section class="py-24 bg-surface-container-lowest border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="max-w-3xl mb-16"><h2 class="text-3xl sm:text-4xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white mb-4">${t.servicesHeading}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">${t.servicesSub}</p></div><div class="space-y-12">${t.categories.map((cat) => renderTemplate`<div class="space-y-6"><div class="flex items-center gap-3"><span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary-fixed-dim/15 text-primary-fixed-dim border border-primary-fixed-dim/30">${cat.name}</span><h3 class="text-xl font-bold font-headline text-slate-900 dark:text-white">${cat.label}</h3></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${cat.items.map((svc) => renderTemplate`<a${addAttribute(svc.href, "href")} class="group p-7 rounded-2xl bg-surface border border-outline-variant/15 hover:border-primary-fixed-dim/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"><div class="space-y-3"><h4 class="font-headline font-bold text-base text-slate-900 dark:text-white group-hover:text-primary-fixed-dim transition-colors">${svc.title}</h4><p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${svc.desc}</p></div><div class="pt-6 flex items-center gap-2 text-xs font-bold font-headline text-primary-fixed-dim"><span>${lang === "id" ? "Pelajari Arsitektur" : "Explore Architecture"}</span><span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span></div></a>`)}</div></div>`)}</div></div></section><!-- 8-Step Engineering Process --><section class="py-24 bg-surface border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="max-w-3xl mb-16"><h2 class="text-3xl sm:text-4xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white mb-4">${t.processTitle}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">${t.processSub}</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">${t.processSteps.map((step) => renderTemplate`<div class="p-6 rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-4"><div class="text-xs font-mono font-bold text-primary-fixed-dim">${step.num}</div><h3 class="font-headline font-bold text-base text-slate-900 dark:text-white">${step.title}</h3><p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${step.desc}</p></div>`)}</div></div></section><!-- Case Studies & Engineering Outcomes --><section class="py-24 bg-surface-container-lowest border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6"><div class="max-w-2xl"><h2 class="text-3xl sm:text-4xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white mb-4">${t.caseStudiesTitle}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">${t.caseStudiesSub}</p></div><a${addAttribute(`${t.basePath}/portfolio`, "href")} class="inline-flex items-center gap-2 text-sm font-bold font-headline text-primary-fixed-dim hover:underline"><span>${lang === "id" ? "Lihat Semua Studi Kasus" : "View All Case Studies"}</span><span class="material-symbols-outlined text-sm">arrow_forward</span></a></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8">${t.cases.map((cs) => renderTemplate`<div class="p-8 rounded-2xl bg-surface border border-outline-variant/15 flex flex-col justify-between space-y-6"><div class="space-y-4"><div class="text-xs font-mono text-slate-500 uppercase tracking-wider">${cs.industry}</div><h3 class="text-xl font-bold font-headline text-slate-900 dark:text-white">${cs.title}</h3><p class="text-sm text-slate-600 dark:text-slate-400"><strong class="text-slate-800 dark:text-slate-200">Tantangan:</strong> ${cs.challenge}</p><p class="text-sm text-slate-600 dark:text-slate-400"><strong class="text-slate-800 dark:text-slate-200">Arsitektur Solusi:</strong> ${cs.solution}</p></div><div class="pt-6 border-t border-outline-variant/15 flex items-center justify-between"><div class="text-xs font-mono text-emerald-500 font-bold">${cs.outcome}</div><a${addAttribute(cs.href, "href")} class="text-xs font-bold font-headline text-primary-fixed-dim flex items-center gap-1"><span>Detail</span><span class="material-symbols-outlined text-sm">arrow_forward</span></a></div></div>`)}</div></div></section><!-- Technical Authority / Stack Showcase --><section class="py-24 bg-surface border-b border-outline-variant/15"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="max-w-3xl mb-16"><h2 class="text-3xl sm:text-4xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white mb-4">${t.techTitle}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed">${t.techSub}</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">${t.techGroups.map((grp) => renderTemplate`<div class="p-7 rounded-2xl bg-surface-container-low border border-outline-variant/15 space-y-4"><h3 class="font-headline font-bold text-sm text-primary-fixed-dim uppercase tracking-wider">${grp.group}</h3><ul class="space-y-2">${grp.techs.map((tech) => renderTemplate`<li class="text-sm font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim"></span>${tech}</li>`)}</ul></div>`)}</div></div></section><!-- Final CTA Section --><section class="py-24 bg-surface-container-lowest"><div class="max-w-[1440px] mx-auto px-6 md:px-12 text-center max-w-3xl space-y-6"><h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline tracking-tighter text-slate-900 dark:text-white">${t.finalCtaTitle}</h2><p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">${t.finalCtaSub}</p><div class="pt-4"><a${addAttribute(lang === "id" ? "/contact" : "/en/contact", "href")} class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary-fixed-dim hover:brightness-110 text-on-primary-fixed font-headline font-bold text-base shadow-lg shadow-primary-fixed-dim/20 transition-all"><span>${t.finalCtaBtn}</span><span class="material-symbols-outlined text-base">arrow_forward</span></a></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/home/HomeContent.astro", void 0);
//#endregion
export { $$HomeContent as t };
