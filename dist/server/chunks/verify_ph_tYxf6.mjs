import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { n as downloadAccesses, r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { eq } from "drizzle-orm";
import { createHash } from "node:crypto";
//#region src/pages/api/download/verify.ts
var verify_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { token, code } = await request.json();
		if (!token || !code) return new Response(JSON.stringify({ error: "Token and code are required" }), { status: 400 });
		const tokenHash = createHash("sha256").update(token).digest("hex");
		const access = db.select().from(downloadAccesses).where(eq(downloadAccesses.token_hash, tokenHash)).get();
		if (!access) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 404 });
		if (/* @__PURE__ */ new Date() > new Date(access.expires_at)) return new Response(JSON.stringify({ error: "Tautan kedaluwarsa." }), { status: 403 });
		if (access.download_count >= access.max_downloads) return new Response(JSON.stringify({ error: "Batas maksimal unduhan tercapai." }), { status: 403 });
		if (createHash("sha256").update(code).digest("hex") !== access.download_code_hash) return new Response(JSON.stringify({ error: "Kode salah. Periksa kembali kode dari WhatsApp." }), { status: 401 });
		const order = db.select().from(orders).where(eq(orders.id, access.order_id)).get();
		if (!order || order.status !== "DOWNLOAD_READY" && order.status !== "WAITING_LICENSE" && order.status !== "COMPLETED") return new Response(JSON.stringify({ error: "Pesanan belum valid untuk diunduh." }), { status: 403 });
		db.update(downloadAccesses).set({ download_count: access.download_count + 1 }).where(eq(downloadAccesses.id, access.id)).run();
		if (order.status === "DOWNLOAD_READY") db.update(orders).set({ status: "WAITING_LICENSE" }).where(eq(orders.id, order.id)).run();
		return new Response(JSON.stringify({
			success: true,
			files: [
				{
					name: "Windows (.msi)",
					url: "/produk/veintools/installers/veintools-desktop_0.1.0_x64_en-US.msi",
					icon: "window"
				},
				{
					name: "Windows (.exe)",
					url: "/produk/veintools/installers/veintools-desktop_0.1.0_x64-setup .exe",
					icon: "window"
				},
				{
					name: "Mac (.dmg)",
					url: "/produk/veintools/installers/veintools-desktop_0.1.0_aarch64.dmg",
					icon: "laptop_mac"
				}
			]
		}), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/download/verify@_@ts
var page = () => verify_exports;
//#endregion
export { page };
