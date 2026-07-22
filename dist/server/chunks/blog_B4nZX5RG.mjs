import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { t as $$InsightsOverviewContent } from "./InsightsOverviewContent_BT9_T1TP.mjs";
//#region src/pages/blog.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blog,
	file: () => $$file,
	url: () => $$url
});
var $$Blog = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog & Wawasan Teknis | VEINTECH Knowledge Center" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "InsightsOverviewContent", $$InsightsOverviewContent, { "locale": "id" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/blog.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/blog.astro";
var $$url = "/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/blog@_@astro
var page = () => blog_exports;
//#endregion
export { page };
