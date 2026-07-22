import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$KnowledgeArticleLayout } from "./KnowledgeArticleLayout_DJCQejlV.mjs";
//#region src/components/insights/ArticleRAGvsFineTuning.astro
createAstro("https://veintech.id");
var $$ArticleRAGvsFineTuning = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ArticleRAGvsFineTuning;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "RAG vs Fine-Tuning di Lingkungan Produksi: Arsitektur Mana yang Tepat untuk Enterprise AI?",
		summary: "Analisis teknis empiris membandingkan Retrieval-Augmented Generation (RAG) dan Fine-Tuning untuk mencegah halusinasi LLM dan menjaga privasi data korporat.",
		date: "12 Juli 2026",
		readTime: "10 MENIT BACA",
		category: "AI ARCHITECTURE"
	} : {
		title: "RAG vs Fine-Tuning in Production: Which Architecture Wins for Enterprise AI?",
		summary: "Empirical technical comparison of Retrieval-Augmented Generation versus Fine-Tuning to eliminate LLM hallucinations and enforce corporate data governance.",
		date: "July 12, 2026",
		readTime: "10 MIN READ",
		category: "AI ARCHITECTURE"
	};
	const codeSnippet = `query_embedding = embed_model.encode(user_query)
docs = pgvector_db.similarity_search(query_embedding, top_k=4)
context = "\\n".join([d.page_content for d in docs])

prompt = f"""Use ONLY the verified context below to answer:
Context: {context}
Question: {user_query}"""`;
	return renderTemplate`${renderComponent($$result, "KnowledgeArticleLayout", $$KnowledgeArticleLayout, {
		"title": t.title,
		"summary": t.summary,
		"date": t.date,
		"readTime": t.readTime,
		"category": t.category
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6"><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "1. Dilema Arsitektur AI Korporat" : "1. The Enterprise AI Architectural Dilemma"}</h2><p>${lang === "id" ? "Ketika perusahaan ingin menerapkan Large Language Model (LLM) pada data internal mereka, pertanyaan pertama yang selalu muncul adalah: \"Apakah kita harus melakukan fine-tuning model sendiri atau membangun pipeline Retrieval-Augmented Generation (RAG)?\" Kesalahan dalam memilih pendekatan ini dapat menguras ratusan juta rupiah biaya komputasi GPU dan menyisakan model yang rapuh." : "When enterprises set out to deploy Large Language Models (LLMs) over proprietary datasets, the immediate question is: \"Should we fine-tune an open model or build a Retrieval-Augmented Generation (RAG) pipeline?\" Choosing wrongly wastes hundreds of thousands of dollars in GPU training compute."}</p><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white pt-4">${lang === "id" ? "2. Kapan Harus Menggunakan RAG" : "2. When to Architect a RAG Pipeline"}</h2><p>${lang === "id" ? "RAG sangat unggul ketika sumber kebenaran (source of truth) organisasi selalu berubah secara dinamis, seperti polis asuransi terbaru, status inventaris harian, atau SOP operasional internal. RAG memisahkan basis pengetahuan dari bobot parameter LLM." : "RAG is the definitive architecture when your knowledge base changes continuously—such as updated insurance policies, dynamic stock levels, or real-time SOPs. RAG decouples data storage from LLM neural weights."}</p><div class="p-6 rounded-xl bg-surface-container-low border border-outline-variant/20 font-mono text-xs overflow-x-auto"><p class="text-primary-fixed-dim font-bold mb-2">// Sample RAG Context Injection Pipeline (Python / LangChain)</p><pre><code>${codeSnippet}</code></pre></div><h2 class="text-2xl font-bold font-headline text-slate-900 dark:text-white pt-4">${lang === "id" ? "3. Kesimpulan & Standar VEINTECH" : "3. Conclusion & VEINTECH Standards"}</h2><p>${lang === "id" ? "Dalam 85% kasus produksi korporat, VEINTECH merekomendasikan pendekatan Hybrid: RAG yang dioptimalkan dengan database vektor berkecepatan tinggi (PostgreSQL pgvector) sebagai lapisan utama, digabungkan dengan fine-tuning ringan (LoRA) hanya untuk standarisasi gaya bahasa atau format keluaran JSON spesifik." : "In 85% of production enterprise deployments, VEINTECH recommends a Hybrid approach: a high-speed RAG pipeline powered by PostgreSQL pgvector as the factual source of truth, combined with lightweight fine-tuning (LoRA) strictly for tone and JSON output formatting."}</p></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/insights/ArticleRAGvsFineTuning.astro", void 0);
//#endregion
export { $$ArticleRAGvsFineTuning as t };
