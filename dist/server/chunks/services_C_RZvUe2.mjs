import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CROTEY_l.mjs";
import { t as $$ServicesOverviewContent } from "./ServicesOverviewContent_Cs6T0t3F.mjs";
//#region src/pages/en/services.astro
var services_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Services,
	file: () => $$file,
	url: () => $$url
});
var $$Services = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Engineering Services & Digital Ecosystem" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ServicesOverviewContent", $$ServicesOverviewContent, { "locale": "en" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services.astro";
var $$url = "/en/services";
//#endregion
//#region \0virtual:astro:page:src/pages/en/services@_@astro
var page = () => services_exports;
//#endregion
export { page };
