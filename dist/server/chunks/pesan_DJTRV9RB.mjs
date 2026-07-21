import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CROTEY_l.mjs";
import { i as products, r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
//#region src/components/produk-digital/CheckoutContent.astro
createAstro("https://veintech.id");
var $$CheckoutContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CheckoutContent;
	const { slug, errorMessage } = Astro.props;
	let product = {
		id: "test-product",
		slug: "veintools-desktop",
		name: "VeinTools Desktop",
		category: "Aplikasi Desktop",
		regular_price: 199e3,
		thumbnail_url: "/veintools_logo.png"
	};
	if (slug) {
		const dbProduct = db.select().from(products).where(eq(products.slug, slug)).get();
		if (dbProduct) product = dbProduct;
	}
	return renderTemplate`${maybeRenderHead($$result)}<section class="pt-32 pb-24 bg-surface min-h-screen text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="mb-8"><h1 class="text-3xl md:text-4xl font-headline font-bold mb-2">Form Pemesanan</h1><p class="text-on-surface-variant">Lengkapi data di bawah ini untuk melanjutkan pesanan Anda.</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20"><!-- Form Section --><div class="lg:col-span-2">${errorMessage && renderTemplate`<div class="bg-red-500/10 border border-red-500/50 text-red-600 p-4 rounded-xl mb-6">${errorMessage}</div>`}<form method="POST" class="bg-surface-container p-6 md:p-8 rounded-2xl border border-outline-variant/30 space-y-6"><h2 class="text-xl font-headline font-bold border-b border-outline-variant/30 pb-4">Data Pembeli</h2><div><label for="customer_name" class="block text-sm font-medium mb-2">Nama Lengkap *</label><input type="text" id="customer_name" name="customer_name" required class="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors" placeholder="Masukkan nama lengkap Anda"></div><div><label for="business_name" class="block text-sm font-medium mb-2">Nama Usaha (Opsional)</label><input type="text" id="business_name" name="business_name" class="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors" placeholder="Masukkan nama usaha atau brand Anda"></div><div><label for="referral_code" class="block text-sm font-medium mb-2">Kode Referal (Opsional)</label><input type="text" id="referral_code" name="referral_code" class="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors uppercase" placeholder="Jika ada, masukkan kode dari tim marketing"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="whatsapp" class="block text-sm font-medium mb-2">Nomor WhatsApp *</label><input type="tel" id="whatsapp" name="whatsapp" required class="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors" placeholder="Contoh: 081234567890"></div><div><label for="email" class="block text-sm font-medium mb-2">Email Aktif *</label><input type="email" id="email" name="email" required class="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-colors" placeholder="Email untuk notifikasi"></div></div><div class="pt-6 border-t border-outline-variant/30"><label class="flex items-start gap-3 cursor-pointer"><input type="checkbox" required class="mt-1 w-5 h-5 rounded border-outline-variant/50 text-primary-fixed focus:ring-primary-fixed"><span class="text-sm text-on-surface-variant">Saya menyetujui syarat dan ketentuan yang berlaku dan memastikan data yang saya masukkan sudah benar.</span></label></div><button type="submit" class="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Lanjut ke Pembayaran</button></form></div><!-- Summary Section --><div class="lg:col-span-1"><div class="bg-surface-container p-6 rounded-2xl border border-outline-variant/30 sticky top-28"><h2 class="text-xl font-headline font-bold border-b border-outline-variant/30 pb-4 mb-4">Ringkasan Pesanan</h2><div class="flex gap-4 mb-6"><img${addAttribute(product.thumbnail_url, "src")}${addAttribute(product.name, "alt")} class="w-20 h-20 object-cover rounded-lg"><div><h3 class="font-bold">${product.name}</h3><p class="text-sm text-slate-500 font-medium">${product.category}</p></div></div><div class="space-y-3 text-sm mb-6 border-b border-outline-variant/30 pb-6"><div class="flex justify-between"><span class="text-on-surface-variant">Harga Produk</span><span>Rp ${product.regular_price.toLocaleString("id-ID")}</span></div><div class="flex justify-between"><span class="text-on-surface-variant">Kode Unik</span><span class="text-green-600 font-medium">Diakumulasikan di halaman selanjutnya</span></div></div><div class="flex justify-between items-center font-bold text-lg"><span>Subtotal</span><span>Rp ${product.regular_price.toLocaleString("id-ID")}</span></div></div></div></div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/produk-digital/CheckoutContent.astro", void 0);
//#endregion
//#region src/pages/produk-digital/[slug]/pesan.astro
var pesan_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Pesan,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://veintech.id");
var $$Pesan = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pesan;
	const { slug } = Astro.params;
	let errorMessage = "";
	if (Astro.request.method === "POST") try {
		const data = await Astro.request.formData();
		const name = data.get("customer_name")?.toString() || "";
		const whatsapp = data.get("whatsapp")?.toString() || "";
		const email = data.get("email")?.toString() || "";
		const businessName = data.get("business_name")?.toString() || "";
		const referralCode = data.get("referral_code")?.toString() || "";
		if (!name || !whatsapp || !email) throw new Error("Nama, WhatsApp, dan Email wajib diisi.");
		let normalizedWa = whatsapp.replace(/\D/g, "");
		if (normalizedWa.startsWith("08")) normalizedWa = "628" + normalizedWa.substring(2);
		else if (normalizedWa.startsWith("8")) normalizedWa = "628" + normalizedWa.substring(1);
		let product = {
			id: "test-product",
			slug: "veintools-desktop",
			name: "VeinTools Desktop",
			category: "Aplikasi Desktop",
			regular_price: 199e3,
			thumbnail_url: "/veintools_logo.png"
		};
		if (slug) {
			const dbProduct = db.select().from(products).where(eq(products.slug, slug)).get();
			if (dbProduct) product = dbProduct;
		}
		const orderCode = `VD-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0].replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;
		const uniqueAmount = Math.floor(Math.random() * 900) + 100;
		const totalAmount = product.regular_price + uniqueAmount;
		if (!db.select().from(products).where(eq(products.id, product.id)).get()) db.insert(products).values({
			id: product.id,
			slug: product.slug,
			name: product.name,
			category: product.category,
			regular_price: product.regular_price,
			thumbnail_url: product.thumbnail_url,
			created_at: /* @__PURE__ */ new Date()
		}).run();
		db.insert(orders).values({
			id: crypto.randomUUID(),
			order_code: orderCode,
			product_id: product.id,
			customer_name: name,
			whatsapp: normalizedWa,
			email,
			business_name: businessName,
			referral_code: referralCode || null,
			total_amount: totalAmount,
			status: "WAITING_PAYMENT",
			created_at: /* @__PURE__ */ new Date()
		}).run();
		return Astro.redirect(`/produk-digital/pesanan/${orderCode}/pembayaran`);
	} catch (error) {
		if (error instanceof Error) errorMessage = error.message;
	}
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Pesan Produk Digital - VeinTech" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "CheckoutContent", $$CheckoutContent, {
		"slug": slug,
		"locale": "id",
		"errorMessage": errorMessage
	})}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/[slug]/pesan.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/[slug]/pesan.astro";
var $$url = "/produk-digital/[slug]/pesan";
//#endregion
//#region \0virtual:astro:page:src/pages/produk-digital/[slug]/pesan@_@astro
var page = () => pesan_exports;
//#endregion
export { page };
