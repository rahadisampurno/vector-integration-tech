import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { t as $$InsightsOverviewContent } from "./InsightsOverviewContent_BT9_T1TP.mjs";
//#region src/pages/en/insights.astro
var insights_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Insights,
	file: () => $$file,
	url: () => $$url
});
var $$Insights = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Engineering Insights & Research | VEINTECH Knowledge Center" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "InsightsOverviewContent", $$InsightsOverviewContent, { "locale": "en" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights.astro";
var $$url = "/en/insights";
//#endregion
//#region \0virtual:astro:page:src/pages/en/insights@_@astro
var page = () => insights_exports;
//#endregion
export { page };
