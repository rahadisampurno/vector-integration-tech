import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$ServiceLayout } from "./ServiceLayout_CbeyYdOc.mjs";
//#region src/components/services/CyberSecurityContent.astro
createAstro("https://veintech.id");
var $$CyberSecurityContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CyberSecurityContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "Cybersecurity & Zero Trust Architecture",
		subtitle: "Menerapkan kerangka keamanan arsitektur kepercayan nol (Zero Trust), audit kerentanan menyeluruh, serta pengerasan infrastruktur untuk melindungi aset vital organisasi Anda.",
		category: "SECURE & SCALE",
		badge: "Zero Trust Enterprise Defense",
		specs: [
			{
				label: "Security Framework Standards",
				value: "NIST CSF / ISO/IEC 27001 / OWASP Top 10 Enterprise Alignment"
			},
			{
				label: "Identity & Access Control",
				value: "Zero Trust Network Access (ZTNA) + Role-Based Least Privilege"
			},
			{
				label: "Vulnerability Assessment",
				value: "Automated DAST / SAST & Comprehensive Manual Penetration Testing"
			},
			{
				label: "Data Encryption",
				value: "TLS 1.3 In-Transit + AES-256 At-Rest Encryption Standards"
			},
			{
				label: "Incident Observability",
				value: "SIEM & Security Event Logging Integration"
			}
		],
		deliverables: [
			"Laporan Audit Kerentanan & Penetration Testing komprehensif dengan bukti reproduksi",
			"Peta jalan remediasi keamanan dan prioritas perbaikan arsitektur kode",
			"Konfigurasi Zero Trust Network Access (ZTNA) untuk titik masuk infrastruktur",
			"Pengerasan kebijakan enkripsi data (in-transit & at-rest)",
			"Dokumen kebijakan keamanan aplikasi dan SOP respons insiden"
		],
		flow: [
			{
				step: "01",
				title: "Threat Surface Discovery",
				desc: "Pemetaan seluruh endpoint API, kredensial, dan titik kerentanan pada sistem."
			},
			{
				step: "02",
				title: "Penetration Review",
				desc: "Pengujian penetrasi terukur untuk mengidentifikasi celah otentikasi maupun injeksi data."
			},
			{
				step: "03",
				title: "Zero Trust Hardening",
				desc: "Penerapan batas akses ketat, enkripsi mTLS, dan verifikasi identitas berlapis."
			},
			{
				step: "04",
				title: "Continuous Protection",
				desc: "Integrasi alat pemindaian kerentanan otomatis dalam pipeline CI/CD."
			}
		]
	} : {
		title: "Cybersecurity & Zero Trust Architecture",
		subtitle: "Implementing rigorous Zero Trust architectural principles, deep vulnerability audits, and infrastructure hardening to safeguard your mission-critical assets.",
		category: "SECURE & SCALE",
		badge: "Zero Trust Enterprise Defense",
		specs: [
			{
				label: "Security Framework Standards",
				value: "NIST CSF / ISO/IEC 27001 / OWASP Top 10 Enterprise Alignment"
			},
			{
				label: "Identity & Access Control",
				value: "Zero Trust Network Access (ZTNA) + Role-Based Least Privilege"
			},
			{
				label: "Vulnerability Assessment",
				value: "Automated DAST / SAST & Comprehensive Manual Penetration Testing"
			},
			{
				label: "Data Encryption",
				value: "TLS 1.3 In-Transit + AES-256 At-Rest Encryption Standards"
			},
			{
				label: "Incident Observability",
				value: "SIEM & Security Event Logging Integration"
			}
		],
		deliverables: [
			"Comprehensive Vulnerability Assessment & Penetration Testing report with reproduction steps",
			"Architectural remediation roadmap and prioritized security hardening action plan",
			"Zero Trust Network Access (ZTNA) configuration across ingress boundaries",
			"End-to-end encryption enforcement (in-transit & at-rest)",
			"Application security policies and incident response runbook documentation"
		],
		flow: [
			{
				step: "01",
				title: "Threat Surface Discovery",
				desc: "Comprehensive mapping of API endpoints, authentication tokens, and exposed surfaces."
			},
			{
				step: "02",
				title: "Penetration Review",
				desc: "Evidence-based penetration testing uncovering authentication bypasses or data leaks."
			},
			{
				step: "03",
				title: "Zero Trust Hardening",
				desc: "Enforcing least-privilege RBAC, mTLS boundaries, and strict identity verification."
			},
			{
				step: "04",
				title: "Continuous Protection",
				desc: "Integrating automated vulnerability scanning directly inside CI/CD release pipelines."
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-16"><div class="max-w-3xl space-y-4"><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "Keamanan Sejak Tahap Desain, Bukan Tambahan Akhir" : "Security by Design, Not an Afterthought"}</h2><p class="text-slate-600 dark:text-slate-300 leading-relaxed">${lang === "id" ? "Dalam era ancaman siber modern, firewall konvensional tidak lagi cukup. VEINTECH menerapkan filosofi Zero Trust: tidak mempercayai permintaan apa pun secara default, baik dari luar maupun dalam jaringan. Setiap permintaan diverifikasi secara eksplisit dengan otentikasi identitas dan otorisasi ketat." : "In the modern cyber landscape, perimeter firewalls are obsolete. VEINTECH applies true Zero Trust principles: never trust, always verify. Every service-to-service call and user request is explicitly authenticated and continuously validated."}</p></div></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/services/CyberSecurityContent.astro", void 0);
//#endregion
export { $$CyberSecurityContent as t };
