import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { r as orders, t as db } from "./db_Bdm_bksG.mjs";
import fs from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";
//#region src/pages/api/admin/license/generate.ts
var generate_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { deviceFingerprint, customerName, orderId } = await request.json();
		if (!deviceFingerprint || !customerName) return new Response(JSON.stringify({
			success: false,
			message: "Format salah. Pastikan mengirimkan 'deviceFingerprint' dan 'customerName'."
		}), { status: 400 });
		const privateKeyPath = path.join(process.cwd(), "src/lib/keys/private.pem");
		if (!fs.existsSync(privateKeyPath)) return new Response(JSON.stringify({
			success: false,
			message: "Sistem error: private.pem tidak ditemukan di server."
		}), { status: 500 });
		const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));
		const payload = {
			license_id: `LIC-${Date.now()}`,
			product_id: "veintools-desktop",
			edition: "VeinTools Business V1.0",
			customer_name: customerName,
			device_fingerprint: deviceFingerprint,
			issued_at: Math.floor(Date.now() / 1e3),
			expires_at: Math.floor(Date.now() / 1e3) + 365 * 24 * 60 * 60,
			entitlements: [
				"hpp",
				"invoice",
				"quotation",
				"buku_kas",
				"stok",
				"piutang"
			],
			max_devices: 1
		};
		const canonicalPayloadStr = JSON.stringify(payload);
		const canonicalPayload = Buffer.from(canonicalPayloadStr);
		const envelope = {
			payload,
			signature: crypto.sign(null, canonicalPayload, privateKey).toString("hex")
		};
		const safeDeviceStr = deviceFingerprint.replace(/[^a-zA-Z0-9]/g, "-");
		const fileName = `VeinTools_${payload.license_id}_${safeDeviceStr}.veinlicense`;
		const uploadDir = path.join(process.cwd(), "public", "uploads", "licenses");
		if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
		const filePath = path.join(uploadDir, fileName);
		fs.writeFileSync(filePath, JSON.stringify(envelope, null, 2));
		const licenseUrl = `/api/download/license/${fileName}`;
		if (orderId) try {
			db.update(orders).set({
				status: "COMPLETED",
				license_url: licenseUrl
			}).where(eq(orders.id, orderId)).run();
		} catch (dbErr) {
			console.error("Failed to update order status:", dbErr);
		}
		return new Response(JSON.stringify({
			success: true,
			licenseUrl,
			fileName
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error generating license:", error);
		return new Response(JSON.stringify({
			success: false,
			message: error.message || "Terjadi kesalahan internal saat membuat lisensi."
		}), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/license/generate@_@ts
var page = () => generate_exports;
//#endregion
export { page };
