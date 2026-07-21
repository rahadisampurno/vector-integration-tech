import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$ServiceLayout } from "./ServiceLayout_CbeyYdOc.mjs";
//#region src/components/services/SoftwareDevelopmentContent.astro
createAstro("https://veintech.id");
var $$SoftwareDevelopmentContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SoftwareDevelopmentContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "Custom Enterprise Software & Web Development",
		subtitle: "Pengembangan sistem core operasional, aplikasi web berskala tinggi, dan arsitektur microservices kustom yang dirancang khusus untuk mendukung keunggulan kompetitif bisnis Anda.",
		category: "BUILD",
		badge: "Bespoke Enterprise Engineering",
		specs: [
			{
				label: "Backend Core Languages",
				value: "Golang / Node.js (NestJS) / TypeScript (Strict Type Safety)"
			},
			{
				label: "Architecture Standard",
				value: "Clean Domain-Driven Design (DDD) & Event-Driven Architecture"
			},
			{
				label: "Database Engine",
				value: "PostgreSQL / MongoDB / Redis Caching Layer"
			},
			{
				label: "Quality Assurance",
				value: "85%+ Unit & Integration Test Coverage with Automated CI/CD Pipelines"
			},
			{
				label: "Containerization & Cloud",
				value: "Docker / Kubernetes Ready on AWS / GCP / Azure"
			}
		],
		deliverables: [
			"Source code repositori penuh dengan kepemilikan intelektual (IP) 100% milik perusahaan Anda",
			"Arsitektur modular berbasis Domain-Driven Design yang mudah dipelihara dan diperluas",
			"Serangkaian pengujian otomatis (unit testing, integration testing, & E2E)",
			"Pipeline CI/CD siap produksi untuk peluncuran pembaruan tanpa downtime",
			"Panduan dokumentasi teknis arsitektur sistem dan spesifikasi database"
		],
		flow: [
			{
				step: "01",
				title: "Domain Discovery",
				desc: "Pemodelan mendalam mengenai alur kerja bisnis, pemangku kepentingan, dan batasan domain."
			},
			{
				step: "02",
				title: "Architecture Blueprint",
				desc: "Perancangan arsitektur basis data, modul layanan, serta protokol komunikasi API."
			},
			{
				step: "03",
				title: "Iterative Engineering",
				desc: "Pengembangan sprint iteratif dengan verifikasi kualitas berkelanjutan dan demo fungsional."
			},
			{
				step: "04",
				title: "Zero-Downtime Release",
				desc: "Peluncuran ke lingkungan produksi dengan sistem pemantauan performa dan log real-time."
			}
		]
	} : {
		title: "Custom Enterprise Software & Web Development",
		subtitle: "Architecting bespoke operational core systems, high-throughput cloud platforms, and clean-architecture software tailored to your organization's unique competitive edge.",
		category: "BUILD",
		badge: "Bespoke Enterprise Engineering",
		specs: [
			{
				label: "Backend Core Languages",
				value: "Golang / Node.js (NestJS) / TypeScript (Strict Type Safety)"
			},
			{
				label: "Architecture Standard",
				value: "Clean Domain-Driven Design (DDD) & Event-Driven Architecture"
			},
			{
				label: "Database Engine",
				value: "PostgreSQL / MongoDB / Redis Caching Layer"
			},
			{
				label: "Quality Assurance",
				value: "85%+ Unit & Integration Test Coverage with Automated CI/CD Pipelines"
			},
			{
				label: "Containerization & Cloud",
				value: "Docker / Kubernetes Ready on AWS / GCP / Azure"
			}
		],
		deliverables: [
			"Full source code repository with 100% intellectual property ownership transferred to your enterprise",
			"Clean modular architecture engineered following Domain-Driven Design (DDD) principles",
			"Comprehensive automated testing suite (Unit, Integration & E2E verification)",
			"Automated Zero-Downtime CI/CD deployment pipelines",
			"Complete architectural blueprint documentation and database schema diagrams"
		],
		flow: [
			{
				step: "01",
				title: "Domain Discovery",
				desc: "Mapping core business workflows, domain boundaries, and operational constraints."
			},
			{
				step: "02",
				title: "Architecture Blueprint",
				desc: "Blueprinting database structures, microservice boundaries, and API topology."
			},
			{
				step: "03",
				title: "Iterative Engineering",
				desc: "Iterative sprint development with continuous code reviews and automated testing."
			},
			{
				step: "04",
				title: "Zero-Downtime Release",
				desc: "Production rollout backed by real-time observability and automated health checks."
			}
		]
	};
	return renderTemplate`${renderComponent($$result, "ServiceLayout", $$ServiceLayout, {
		"title": t.title,
		"subtitle": t.subtitle,
		"category": t.category,
		"badge": t.badge,
		"specs": t.specs,
		"deliverables": t.deliverables,
		"architectureFlow": t.flow
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-16"><div class="max-w-3xl space-y-4"><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "Pendekatan Engineering-Driven vs. Template Software House" : "Engineering-Driven vs. Template Agency Development"}</h2><p class="text-slate-600 dark:text-slate-300 leading-relaxed">${lang === "id" ? "Banyak software house mengandalkan template siap pakai atau plugin yang menumpuk, menyebabkan aplikasi menjadi lambat, sulit dikustomisasi, dan rentan kerentanan keamanan. VEINTECH membangun software dari fondasi arsitektur bersih (Clean Architecture) dengan tipe data ketat dan otomatisasi tes, memastikan sistem Anda dapat dikembangkan hingga dekade mendatang." : "Many agencies rely on heavy off-the-shelf templates and convoluted plugin stacks, leading to sluggish performance and architectural dead-ends. VEINTECH engineers custom software from clean-architecture foundations with strict typing and automated testing, ensuring your codebase scales smoothly for years to come."}</p></div></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/services/SoftwareDevelopmentContent.astro", void 0);
//#endregion
export { $$SoftwareDevelopmentContent as t };
