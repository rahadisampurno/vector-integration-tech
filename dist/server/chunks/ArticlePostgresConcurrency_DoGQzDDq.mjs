import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$KnowledgeArticleLayout } from "./KnowledgeArticleLayout_DJCQejlV.mjs";
//#region src/components/insights/ArticlePostgresConcurrency.astro
createAstro("https://veintech.id");
var $$ArticlePostgresConcurrency = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticlePostgresConcurrency;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "Mengeliminasi N+1 Queries & Strategi Indeksing PostgreSQL untuk Sistem Beban Tinggi",
		summary: "Cara mendiagnosis bottleneck kueri database, merancang index B-tree yang presisi, serta mengelola connection pooling untuk sistem dengan puluhan ribu request per detik.",
		date: "24 Mei 2026",
		readTime: "12 MENIT BACA",
		category: "DATABASE & SCALE"
	} : {
		title: "Eliminating N+1 Queries & Advanced PostgreSQL Indexing for High-Concurrency Systems",
		summary: "How to diagnose query bottlenecks, structure composite B-tree indexes, and optimize connection pooling for 10,000+ requests per second.",
		date: "May 24, 2026",
		readTime: "12 MIN READ",
		category: "DATABASE & SCALE"
	};
	return renderTemplate`${renderComponent($$result, "KnowledgeArticleLayout", $$KnowledgeArticleLayout, {
		"title": t.title,
		"summary": t.summary,
		"date": t.date,
		"readTime": t.readTime,
		"category": t.category
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "1. Akar Masalah N+1 Query pada ORM Modern" : "1. Root Cause of N+1 Queries in Modern ORMs"}</h2><p>${lang === "id" ? "Object-Relational Mapping (ORM) memudahkan penulisan kode, tetapi sering menyembunyikan eksekusi ribuan kueri kecil di latar belakang saat me-loop data berelasi. Akibatnya, latensi meningkat tajam dan koneksi database kehabisan kapasitas." : "Modern ORMs simplify developer experience but often mask destructive query proliferation during loop traversals over relational entities."}</p><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white pt-4">${lang === "id" ? "2. Composite Indexing & EXPLAIN ANALYZE" : "2. Composite Indexing & EXPLAIN ANALYZE"}</h2><p>${lang === "id" ? "Kunci utama efisiensi PostgreSQL pada konkurensi tinggi adalah urutan kolom pada composite index berdasarkan kardinalitas serta pemanfaatan Covering Index (INCLUDE) agar kueri dapat dilayani langsung dari index tanpa menyentuh heap table." : "The key to PostgreSQL read throughput under high concurrency is ordering composite index columns by cardinality and leveraging Covering Indexes (INCLUDE clauses) for index-only scans."}</p></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/insights/ArticlePostgresConcurrency.astro", void 0);
//#endregion
export { $$ArticlePostgresConcurrency as t };
