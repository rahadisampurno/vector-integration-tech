import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { eq } from "drizzle-orm";
//#region src/pages/api/orders/[id]/confirm.ts
var confirm_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ params, request }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "Order ID is required" }), { status: 400 });
	try {
		const order = db.select().from(orders).where(eq(orders.id, id)).get();
		if (!order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
		const { senderName, senderBank } = await request.json().catch(() => ({}));
		if (order.status === "WAITING_PAYMENT") db.update(orders).set({
			status: "PAYMENT_CONFIRMATION_SENT",
			sender_name: senderName || null,
			sender_bank: senderBank || null
		}).where(eq(orders.id, id)).run();
		return new Response(JSON.stringify({
			success: true,
			status: "PAYMENT_CONFIRMATION_SENT"
		}), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/orders/[id]/confirm@_@ts
var page = () => confirm_exports;
//#endregion
export { page };
