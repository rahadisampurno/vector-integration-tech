import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CROTEY_l.mjs";
import { t as $$InsightsOverviewContent } from "./InsightsOverviewContent_BT9_T1TP.mjs";
//#region src/pages/en/blog.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blog,
	file: () => $$file,
	url: () => $$url
});
var $$Blog = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog & Technical Insights | VEINTECH Knowledge Center" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "InsightsOverviewContent", $$InsightsOverviewContent, { "locale": "en" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/blog.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/blog.astro";
var $$url = "/en/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/en/blog@_@astro
var page = () => blog_exports;
//#endregion
export { page };
