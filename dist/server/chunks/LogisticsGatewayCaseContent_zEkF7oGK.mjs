import { T as createAstro, i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$CaseStudyLayout } from "./CaseStudyLayout_3iHfK3ol.mjs";
//#region src/components/portfolio/LogisticsGatewayCaseContent.astro
createAstro("https://veintech.id");
var $$LogisticsGatewayCaseContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LogisticsGatewayCaseContent;
	const t = (Astro.props.locale || Astro.currentLocale || "id") === "id" ? {
		title: "Core API Gateway & Multi-ERP Synchronization Engine",
		clientIndustry: "Supply Chain & E-Commerce Logistics Hub",
		summary: "Arsitektur event-driven API Gateway berkapasitas tinggi untuk menyinkronkan data inventaris dan transaksi pesanan di 14 sistem ERP terpisah secara real-time.",
		challenge: "Perusahaan logistik skala nasional menghadapi masalah siloing data di mana sistem WMS (Warehouse Management System) lama tidak mampu memberikan update inventaris real-time ke saluran penjualan e-commerce, menyebabkan overselling hingga 14% pada saat hari diskon besar.",
		solution: "VEINTECH membangun lapisan API Gateway terpusat dengan message queuing terdistribusi (Apache Kafka) dan mekanisme retry idempotent. Setiap transaksi dijamin dieksekusi tepat satu kali (exactly-once semantics) tanpa risiko duplikasi atau pemotongan stok ganda.",
		outcome: "Insiden overselling turun menjadi 0%. Kapasitas penanganan transaksi meningkat dari 350 request/detik menjadi lebih dari 12.000 request/detik dengan latensi rata-rata di bawah 14 milidetik.",
		metrics: [
			{
				val: "0%",
				label: "Insiden Overselling pada Jam Beban Puncak"
			},
			{
				val: "< 14ms",
				label: "Rata-rata Latensi Sinkronisasi API"
			},
			{
				val: "12.000+ RPS",
				label: "Throughput Transaksi Konkuren Tertinggi"
			},
			{
				val: "99.999%",
				label: "Keandalan Eksekusi Transaksi (Zero Loss)"
			}
		],
		techStack: [
			"Golang",
			"Apache Kafka",
			"Kong API Gateway",
			"Redis Enterprise",
			"Kubernetes"
		],
		flow: [
			{
				step: "01",
				title: "API Gateway Ingress",
				desc: "Semua permintaan masuk diverifikasi dengan mTLS dan rate-limiting sebelum diteruskan."
			},
			{
				step: "02",
				title: "Event Partitioning",
				desc: "Pesan transaksi dipartisi berdasarkan ID gudang di Kafka untuk menjaga urutan pesanan."
			},
			{
				step: "03",
				title: "Idempotent Processing",
				desc: "Worker Golang memverifikasi kunci transaksi untuk mencegah eksekusi ganda."
			},
			{
				step: "04",
				title: "Distributed Cache Sync",
				desc: "Status stok di-update seketika ke Redis Cluster sebelum persistensi ke ERP lama."
			}
		]
	} : {
		title: "Core API Gateway & Multi-ERP Synchronization Engine",
		clientIndustry: "Supply Chain & E-Commerce Logistics Hub",
		summary: "High-throughput event-driven API Gateway architecture synchronizing inventory and orders across 14 fragmented legacy ERP instances in real time.",
		challenge: "A national supply chain enterprise faced severe data fragmentation where legacy Warehouse Management Systems (WMS) could not propagate real-time inventory updates to e-commerce channels, causing a 14% overselling rate during peak flash sales.",
		solution: "VEINTECH engineered a centralized API Gateway layer decoupled by distributed event streams (Apache Kafka) with idempotent retry boundaries. Transactions are guaranteed exactly-once processing with zero race conditions.",
		outcome: "Overselling incidents dropped to 0%. Transaction throughput scaled from 350 req/sec to over 12,000 req/sec while maintaining sub-14ms average sync latency.",
		metrics: [
			{
				val: "0%",
				label: "Overselling Rate During Peak Flash Sales"
			},
			{
				val: "< 14ms",
				label: "Average Distributed Sync Latency"
			},
			{
				val: "12,000+ RPS",
				label: "Peak Concurrent Transaction Throughput"
			},
			{
				val: "99.999%",
				label: "Transaction Execution Reliability"
			}
		],
		techStack: [
			"Golang",
			"Apache Kafka",
			"Kong API Gateway",
			"Redis Enterprise",
			"Kubernetes"
		],
		flow: [
			{
				step: "01",
				title: "API Gateway Ingress",
				desc: "Incoming requests are validated via mTLS and rate-limited at the ingress proxy."
			},
			{
				step: "02",
				title: "Event Partitioning",
				desc: "Orders are partitioned by warehouse ID in Kafka to preserve strict transactional ordering."
			},
			{
				step: "03",
				title: "Idempotent Processing",
				desc: "Golang consumer workers verify deduplication tokens to prevent double processing."
			},
			{
				step: "04",
				title: "Distributed Cache Sync",
				desc: "Stock states are instantly refreshed in Redis before asynchronous persistence to legacy ERPs."
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
	})}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/portfolio/LogisticsGatewayCaseContent.astro", void 0);
//#endregion
export { $$LogisticsGatewayCaseContent as t };
