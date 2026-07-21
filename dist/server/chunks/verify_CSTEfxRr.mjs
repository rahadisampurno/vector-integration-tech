import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { n as downloadAccesses, r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { eq } from "drizzle-orm";
import { createHash, randomBytes } from "node:crypto";
//#region src/pages/api/admin/orders/[id]/verify.ts
var verify_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ params }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "Order ID is required" }), { status: 400 });
	try {
		const order = db.select().from(orders).where(eq(orders.id, id)).get();
		if (!order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
		if (order.status !== "PAYMENT_CONFIRMATION_SENT" && order.status !== "PAYMENT_REVIEW") return new Response(JSON.stringify({ error: "Order is not waiting for verification" }), { status: 400 });
		const rawCode = `VT-${randomBytes(2).toString("hex").toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
		const codeHash = createHash("sha256").update(rawCode).digest("hex");
		const token = randomBytes(16).toString("hex");
		const tokenHash = createHash("sha256").update(token).digest("hex");
		const maxDownloads = 3;
		const expiresAt = new Date(Date.now() + 10080 * 60 * 1e3);
		db.update(orders).set({ status: "DOWNLOAD_READY" }).where(eq(orders.id, id)).run();
		db.insert(downloadAccesses).values({
			id: crypto.randomUUID(),
			order_id: id,
			download_code_hash: codeHash,
			token_hash: tokenHash,
			raw_code: rawCode,
			raw_token: token,
			max_downloads: maxDownloads,
			download_count: 0,
			expires_at: expiresAt
		}).run();
		return new Response(JSON.stringify({
			success: true,
			download_code: rawCode,
			download_token: token,
			status: "DOWNLOAD_READY"
		}), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/orders/[id]/verify@_@ts
var page = () => verify_exports;
//#endregion
export { page };
