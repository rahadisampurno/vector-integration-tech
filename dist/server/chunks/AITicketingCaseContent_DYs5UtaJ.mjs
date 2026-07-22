import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$CaseStudyLayout } from "./CaseStudyLayout_3iHfK3ol.mjs";
//#region src/components/portfolio/AITicketingCaseContent.astro
createAstro("https://veintech.id");
var $$AITicketingCaseContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AITicketingCaseContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "AI Operational Ticketing & Resolution Engine",
		clientIndustry: "Enterprise Telecommunications Infrastructure",
		summary: "Implementasi arsitektur Retrieval-Augmented Generation (RAG) + LLM Classifier untuk mengklasifikasikan, mendiagnosis, dan merespons ribuan tiket gangguan jaringan secara real-time.",
		challenge: "Perusahaan penyedia infrastruktur telekomunikasi menerima lebih dari 12.000 laporan gangguan jaringan (outage ticket) setiap bulan. Triase manual memakan waktu rata-rata 4,2 jam per tiket, menyebabkan keterlambatan penanganan pada pelanggan tier-1.",
		solution: "VEINTECH merancang arsitektur event-driven di mana setiap tiket baru langsung dikonversi menjadi embedding semantik, dicocokkan dengan basis pengetahuan topologi jaringan eksisting (PostgreSQL pgvector), dan diproses oleh LLM Classifier untuk menentukan keparahan dan akar masalah dalam hitungan detik.",
		outcome: "Waktu triase berkurang 88% dari 4,2 jam menjadi di bawah 3 menit. Akurasi penentuan rute gangguan meningkat hingga 94.8%, menghemat waktu tim Network Operations Center (NOC) lebih dari 1.800 jam setiap bulan.",
		metrics: [
			{
				val: "88%",
				label: "Pemangkasan Waktu Triase & Diagnosis Awal"
			},
			{
				val: "94.8%",
				label: "Akurasi Klasifikasi & Routing Tiket Otomatis"
			},
			{
				val: "1.800+ Jam",
				label: "Penghematan Waktu Operasional NOC / Bulan"
			},
			{
				val: "< 1.2 Detik",
				label: "Rata-rata Waktu Analisis per Tiket"
			}
		],
		techStack: [
			"PostgreSQL pgvector",
			"Python (FastAPI)",
			"Apache Kafka",
			"LangChain / RAG Engine",
			"Docker / Kubernetes"
		],
		flow: [
			{
				step: "01",
				title: "Ingestion & Webhook",
				desc: "Tiket baru dari portal NOC atau API klien masuk via webhook terenkripsi ke antrean Apache Kafka."
			},
			{
				step: "02",
				title: "Vector Search (RAG)",
				desc: "Mesin RAG mencari riwayat penanganan gangguan serupa dan dokumen topologi jaringan dari pgvector."
			},
			{
				step: "03",
				title: "LLM Diagnostic Engine",
				desc: "LLM menganalisis akar masalah dan menyusun draf langkah pemecahan berdasarkan SOP terverifikasi."
			},
			{
				step: "04",
				title: "Automated Routing",
				desc: "Tiket dengan keparahan kritis langsung diteruskan ke engineer spesialis bersangkutan dengan resume lengkap."
			}
		]
	} : {
		title: "AI Operational Ticketing & Resolution Engine",
		clientIndustry: "Enterprise Telecommunications Infrastructure",
		summary: "Architecting a production Retrieval-Augmented Generation (RAG) + LLM Classifier pipeline to triage, diagnose, and route thousands of incoming network outage tickets in real time.",
		challenge: "An enterprise telecom infrastructure provider received over 12,000 network outage tickets monthly. Manual triage averaged 4.2 hours per ticket, delaying incident response for SLA-bound tier-1 enterprise clients.",
		solution: "VEINTECH engineered an event-driven architecture where incoming tickets are converted into semantic embeddings, matched against existing network topology knowledge bases (PostgreSQL pgvector), and processed by an LLM Classifier to pinpoint severity and root cause instantly.",
		outcome: "Triage latency dropped 88% from 4.2 hours to under 3 minutes. Automated incident routing accuracy reached 94.8%, saving Network Operations Center (NOC) engineers over 1,800 manual hours monthly.",
		metrics: [
			{
				val: "88%",
				label: "Reduction in Initial Triage & Diagnostic Latency"
			},
			{
				val: "94.8%",
				label: "Automated Incident Routing Accuracy"
			},
			{
				val: "1,800+ Hrs",
				label: "Monthly Engineering Hours Saved"
			},
			{
				val: "< 1.2s",
				label: "Average Automated Inference Time per Ticket"
			}
		],
		techStack: [
			"PostgreSQL pgvector",
			"Python (FastAPI)",
			"Apache Kafka",
			"LangChain / RAG Engine",
			"Docker / Kubernetes"
		],
		flow: [
			{
				step: "01",
				title: "Ingestion & Webhook",
				desc: "Incoming incident tickets stream via encrypted webhooks into fault-tolerant Apache Kafka queues."
			},
			{
				step: "02",
				title: "Vector Search (RAG)",
				desc: "Semantic retrieval queries pgvector for historical resolution logs and relevant network topology diagrams."
			},
			{
				step: "03",
				title: "LLM Diagnostic Engine",
				desc: "Fine-tuned LLM synthesizes root cause analysis and drafts initial remediation action plans."
			},
			{
				step: "04",
				title: "Automated Routing",
				desc: "Critical incidents are escalated directly to specialist engineering tiers with comprehensive summaries."
			}
		]
	};
	return renderTemplate`${renderComponent($$result, "CaseStudyLayout", $$CaseStudyLayout, {
		"title": t.title,
		"clientIndustry": t.clientIndustry,
		"summary": t.summary,
		"challenge": t.challenge,
		"solution": t.solution,
		"outcome": t.outcome,
		"metrics": t.metrics,
		"techStack": t.techStack,
		"architectureFlow": t.flow
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-12 max-w-4xl"><!-- Deep Dive Architecture Explanation --><div class="space-y-4"><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "Mengapa Triase Manual Tidak Lagi Skalabel" : "Why Manual Incident Triage Failed at Scale"}</h2><p class="text-slate-600 dark:text-slate-300 leading-relaxed">${lang === "id" ? "Dalam jaringan telekomunikasi berskala besar, satu gangguan serat optik di jalur utama dapat memicu ratusan peringatan simultan dari berbagai perangkat router dan switch. Sistem manual membuat teknisi NOC kebanjiran notifikasi yang duplikatif. Dengan arsitektur AI Classifier VEINTECH, sistem secara cerdas mengelompokkan insiden yang berkorelasi ke dalam satu tiket induk dan memberikan rekomendasi pemulihan yang tepat." : "In large-scale telecom networks, a single fiber cut can trigger hundreds of downstream router alerts. Manual triage overwhelmed NOC operators with duplicate noise. VEINTECH’s AI Classifier intelligently clusters correlated alerts into a single root-cause incident and surfaces verified remediation steps."}</p></div></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/portfolio/AITicketingCaseContent.astro", void 0);
//#endregion
export { $$AITicketingCaseContent as t };
