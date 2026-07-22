import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$ServiceLayout } from "./ServiceLayout_BiEiGRq2.mjs";
//#region src/components/services/SystemIntegrationContent.astro
createAstro("https://veintech.id");
var $$SystemIntegrationContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SystemIntegrationContent;
	const lang = Astro.props.locale || Astro.currentLocale || "id";
	const t = lang === "id" ? {
		title: "Enterprise API Integration & System Synchronization",
		subtitle: "Menghubungkan silo aplikasi terfragmentasi, ERP lama, CRM, dan sistem pembayaran dalam satu pipa data real-time dengan toleransi kegagalan tinggi.",
		category: "INTEGRATE",
		badge: "High-Throughput Distributed Systems",
		specs: [
			{
				label: "API Gateway Architecture",
				value: "Event-Driven & Microservices Proxy (Kong / Traefik / Envoy)"
			},
			{
				label: "Message Broker & Queue",
				value: "Apache Kafka / RabbitMQ with Idempotent Exactly-Once Processing"
			},
			{
				label: "Throughput Capacity",
				value: "10,000+ Concurrent Requests per Second (Horizontally Scalable)"
			},
			{
				label: "Authentication & Security",
				value: "Mutual TLS (mTLS), OAuth 2.0 / OIDC & Rate Limiting Enforcement"
			},
			{
				label: "Reliability Guarantee",
				value: "Automated Dead-Letter Queue (DLQ) & Exponential Backoff Retry"
			}
		],
		deliverables: [
			"Enterprise API Gateway terpusat dengan otentikasi aman dan pembatasan laju (rate limiting)",
			"Pipeline sinkronisasi data real-time antar ERP, CRM, dan basis data operasional",
			"Mekanisme penanganan error otomatis (Dead Letter Queue & Retry Logic)",
			"Spesifikasi OpenAPI 3.0 / Swagger lengkap dan interaktif untuk tim developer internal",
			"Sistem pemantauan distributed tracing (OpenTelemetry / Jaeger)"
		],
		flow: [
			{
				step: "01",
				title: "API Audit & Schema Mapping",
				desc: "Pemetaan kontrak data dari sistem lama (ERP/WMS) ke standar skema data modern."
			},
			{
				step: "02",
				title: "Gateway Orchestration",
				desc: "Pemasangan API Gateway terpusat untuk otentikasi, enkripsi mTLS, dan pencatatan log transaksi."
			},
			{
				step: "03",
				title: "Event Queue Pipeline",
				desc: "Penampungan transaksi puncak melalui antrean asinkron yang menjamin tidak ada pesan hilang."
			},
			{
				step: "04",
				title: "Automated Synchronization",
				desc: "Pipa ETL real-time menyinkronkan perubahan ke semua sistem terkait dengan kepastian data akurat."
			}
		]
	} : {
		title: "Enterprise API Integration & System Synchronization",
		subtitle: "Connecting fragmented software silos, legacy ERPs, CRMs, and payment systems into a high-resilience, event-driven data pipeline.",
		category: "INTEGRATE",
		badge: "High-Throughput Distributed Systems",
		specs: [
			{
				label: "API Gateway Architecture",
				value: "Event-Driven & Microservices Proxy (Kong / Traefik / Envoy)"
			},
			{
				label: "Message Broker & Queue",
				value: "Apache Kafka / RabbitMQ with Idempotent Exactly-Once Processing"
			},
			{
				label: "Throughput Capacity",
				value: "10,000+ Concurrent Requests per Second (Horizontally Scalable)"
			},
			{
				label: "Authentication & Security",
				value: "Mutual TLS (mTLS), OAuth 2.0 / OIDC & Rate Limiting Enforcement"
			},
			{
				label: "Reliability Guarantee",
				value: "Automated Dead-Letter Queue (DLQ) & Exponential Backoff Retry"
			}
		],
		deliverables: [
			"Centralized Enterprise API Gateway with automated mTLS and rate-limiting policies",
			"Real-time event synchronization pipelines across ERP, CRM, and operational databases",
			"Automated fault tolerance mechanisms (Dead Letter Queues & Exponential Backoff)",
			"Comprehensive interactive OpenAPI 3.0 specifications for internal developer teams",
			"End-to-end distributed tracing observability (OpenTelemetry / Jaeger)"
		],
		flow: [
			{
				step: "01",
				title: "API Audit & Schema Mapping",
				desc: "Mapping legacy system data contracts into modern, normalized JSON/gRPC data models."
			},
			{
				step: "02",
				title: "Gateway Orchestration",
				desc: "Deploying a hardened API Gateway for centralized authentication, mTLS, and telemetry."
			},
			{
				step: "03",
				title: "Event Queue Pipeline",
				desc: "Buffering high-volume transaction bursts with fault-tolerant asynchronous message queues."
			},
			{
				step: "04",
				title: "Automated Synchronization",
				desc: "Real-time ETL pipelines propagate updates across all downstream systems with zero loss."
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-16"><div class="max-w-3xl space-y-4"><h2 class="text-2xl sm:text-3xl font-bold font-headline text-slate-900 dark:text-white">${lang === "id" ? "Arsitektur Integrasi Tanpa Risiko Kegagalan Transaksi" : "Risk-Free Transaction Integration Architecture"}</h2><p class="text-slate-600 dark:text-slate-300 leading-relaxed">${lang === "id" ? "Kegagalan integrasi sistem sering terjadi saat lalu lintas transaksi melonjak atau saat sistem pihak ketiga (ERP/bank) mengalami jeda sementara. VEINTECH merancang integrasi dengan arsitektur idempotent queueing dan automatic retry, sehingga transaksi pesanan, pembayaran, atau inventaris tetap utuh dan terproses akurat saat sistem kembali normal." : "System integration failures often strike during traffic peaks or temporary third-party API outages. VEINTECH architects event-driven integration layers with idempotent queue processing and automatic retry boundaries, ensuring zero transaction loss during downstream disruptions."}</p></div></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/services/SystemIntegrationContent.astro", void 0);
//#endregion
export { $$SystemIntegrationContent as t };
