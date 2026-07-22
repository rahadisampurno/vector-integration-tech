import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$KnowledgeArticleLayout } from "./KnowledgeArticleLayout_DJCQejlV.mjs";
//#region src/components/insights/ArticleZeroTrust.astro
createAstro("https://veintech.id");
var $$ArticleZeroTrust = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleZeroTrust;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "Checklist Implementasi Zero Trust Architecture pada Lingkungan Kubernetes & Microservices",
		summary: "Langkah pengerasan jaringan antar servis menggunakan Mutual TLS (mTLS), kebijakan otorisasi berlapis, dan proteksi rahasia kredensial pada Amazon EKS.",
		date: "18 Juni 2026",
		readTime: "8 MENIT BACA",
		category: "CYBERSECURITY"
	} : {
		title: "Zero Trust Architecture Checklist for Production Kubernetes & Microservices",
		summary: "Step-by-step service mesh hardening using Mutual TLS (mTLS), least-privilege RBAC policies, and Vault secret management in Amazon EKS.",
		date: "June 18, 2026",
		readTime: "8 MIN READ",
		category: "CYBERSECURITY"
	};
	return renderTemplate`${renderComponent($$result, "KnowledgeArticleLayout", $$KnowledgeArticleLayout, {
		"title": t.title,
		"summary": t.summary,
		"date": t.date,
		"readTime": t.readTime,
		"category": t.category
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "1. Mengapa Perimeter Firewall Tidak Lagi Cukup" : "1. Why Perimeter Firewalls Fail in Microservices"}</h2><p>${lang === "id" ? "Dalam arsitektur microservices terdistribusi, jika penyerang berhasil menembus satu pod aplikasi, mereka dapat dengan mudah menjelajahi jaringan internal (lateral movement) apabila lalu lintas antar servis tidak diotentikasi dan dienkripsi." : "In distributed microservices, once an attacker breaches an externally facing pod, unencrypted east-west internal traffic allows rapid lateral movement across cluster services."}</p><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white pt-4">${lang === "id" ? "2. Tiga Pilar Zero Trust VEINTECH" : "2. Three Pillars of VEINTECH Zero Trust"}</h2><ul class="list-disc pl-6 space-y-2"><li><strong>Mutual TLS (mTLS) Everywhere:</strong> Wajibkan verifikasi sertifikat dua arah untuk setiap request internal.</li><li><strong>Least Privilege RBAC:</strong> Setiap workload pod hanya memiliki izin akses API yang mutlak diperlukan untuk fungsinya.</li><li><strong>Ephemeral Secrets:</strong> Kredensial database dirotasi otomatis dengan masa aktif singkat via HashiCorp Vault.</li></ul></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/insights/ArticleZeroTrust.astro", void 0);
//#endregion
export { $$ArticleZeroTrust as t };
