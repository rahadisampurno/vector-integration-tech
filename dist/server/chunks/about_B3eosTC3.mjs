import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { t as $$AboutContent } from "./AboutContent_Cz9Z-IBV.mjs";
//#region src/pages/en/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "About VEINTECH | Engineering-Driven Technology Company" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "AboutContent", $$AboutContent, { "locale": "en" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/about.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/about.astro";
var $$url = "/en/about";
//#endregion
//#region \0virtual:astro:page:src/pages/en/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
