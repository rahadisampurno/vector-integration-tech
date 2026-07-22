import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { i as products, t as db } from "./db_Bdm_bksG.mjs";
//#region src/components/produk-digital/ProdukDigitalContent.astro
createAstro("https://veintech.id");
var $$ProdukDigitalContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProdukDigitalContent;
	const allProducts = db.select().from(products).all();
	const displayProducts = allProducts.length > 0 ? allProducts : [{
		slug: "veintools-desktop",
		name: "VeinTools Desktop",
		short_description: "Asisten bisnis offline untuk membantu UMKM menghitung HPP, membuat invoice, mencatat kas, dan menggunakan berbagai alat bisnis.",
		category: "Aplikasi Desktop",
		regular_price: 199e3,
		thumbnail_url: "/veintools_logo.png"
	}];
	const { locale } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="pt-32 pb-24 bg-surface min-h-screen text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="mb-12"><h1 class="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">Katalog Produk Digital</h1><p class="text-on-surface-variant text-lg max-w-2xl">Solusi digital terbaik untuk mempercepat bisnis dan alur kerja Anda.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${displayProducts.map((p) => renderTemplate`<a${addAttribute(`/produk-digital/${p.slug}`, "href")} class="group flex flex-col bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary-fixed transition-colors"><div class="aspect-[4/3] bg-surface-container-high relative overflow-hidden"><img${addAttribute(p.thumbnail_url || "https://placehold.co/600x400/1e293b/ffffff?text=Product", "src")}${addAttribute(p.name, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><div class="absolute top-3 left-3 flex gap-2"><span class="bg-primary/90 text-on-primary text-xs font-bold px-2 py-1 rounded-md">Terlaris</span></div></div><div class="p-6 flex flex-col flex-1 bg-surface dark:bg-surface-container"><span class="text-xs font-bold text-blue-600 dark:text-primary-fixed mb-2">${p.category}</span><h3 class="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-primary-fixed transition-colors text-slate-900 dark:text-white">${p.name}</h3><p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 flex-1 leading-relaxed">${p.short_description}</p><div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-outline-variant/20"><span class="text-lg font-bold text-slate-900 dark:text-white">Rp ${p.regular_price.toLocaleString("id-ID")}</span><span class="text-sm font-bold text-blue-600 dark:text-primary-fixed group-hover:underline">Lihat Detail &rarr;</span></div></div></a>`)}</div></div></section>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/produk-digital/ProdukDigitalContent.astro", void 0);
//#endregion
//#region src/pages/produk-digital.astro
var produk_digital_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ProdukDigital,
	file: () => $$file,
	url: () => $$url
});
var $$ProdukDigital = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Produk Digital - VeinTech" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ProdukDigitalContent", $$ProdukDigitalContent, { "locale": "id" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital.astro";
var $$url = "/produk-digital";
//#endregion
//#region \0virtual:astro:page:src/pages/produk-digital@_@astro
var page = () => produk_digital_exports;
//#endregion
export { page };
