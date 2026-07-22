import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { t as $$ContactContent } from "./ContactContent_Cs61GS6z.mjs";
//#region src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Hubungi Kami | Konsultasi Arsitektur & Proyek VEINTECH" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ContactContent", $$ContactContent, { "locale": "id" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/contact.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/contact.astro";
var $$url = "/contact";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
