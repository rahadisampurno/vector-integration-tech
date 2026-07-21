import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { r as orders, t as db } from "./db_Bdm_bksG.mjs";
import fs from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
//#region src/pages/api/admin/orders/[id]/upload-license.ts
var upload_license_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request, params }) => {
	const { id } = params;
	if (!id) return new Response(JSON.stringify({ error: "Order ID is required" }), { status: 400 });
	try {
		const file = (await request.formData()).get("license_file");
		if (!file) return new Response(JSON.stringify({ error: "License file is required" }), { status: 400 });
		const order = db.select().from(orders).where(eq(orders.id, id)).get();
		if (!order) return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
		const uploadDir = path.join(process.cwd(), "public", "uploads", "licenses");
		if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
		const ext = path.extname(file.name) || ".lic";
		const fileName = `${order.order_code}${ext}`;
		const filePath = path.join(uploadDir, fileName);
		const buffer = Buffer.from(await file.arrayBuffer());
		fs.writeFileSync(filePath, buffer);
		const licenseUrl = `/api/download/license/${fileName}`;
		db.update(orders).set({
			status: "COMPLETED",
			license_url: licenseUrl
		}).where(eq(orders.id, id)).run();
		return new Response(JSON.stringify({
			success: true,
			license_url: licenseUrl
		}), { status: 200 });
	} catch (error) {
		console.error("Error uploading license:", error);
		return new Response(JSON.stringify({ error: error.message || "Server error" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/orders/[id]/upload-license@_@ts
var page = () => upload_license_exports;
//#endregion
export { page };
