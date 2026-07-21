import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CROTEY_l.mjs";
import { t as $$PortfolioOverviewContent } from "./PortfolioOverviewContent_C_8sVmfD.mjs";
//#region src/pages/portfolio.astro
var portfolio_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Portfolio,
	file: () => $$file,
	url: () => $$url
});
var $$Portfolio = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Studi Kasus & Bukti Rekayasa Sistem" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortfolioOverviewContent", $$PortfolioOverviewContent, { "locale": "id" })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio.astro";
var $$url = "/portfolio";
//#endregion
//#region \0virtual:astro:page:src/pages/portfolio@_@astro
var page = () => portfolio_exports;
//#endregion
export { page };
