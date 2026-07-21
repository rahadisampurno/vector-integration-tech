import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$AuditITContent } from "./AuditITContent_Kcnue8eu.mjs";
//#region src/pages/services/audit-it.astro
var audit_it_exports = /* @__PURE__ */ __exportAll({
	default: () => $$AuditIt,
	file: () => $$file,
	url: () => $$url
});
var $$AuditIt = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AuditITContent", $$AuditITContent, { "locale": "id" })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/audit-it.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/audit-it.astro";
var $$url = "/services/audit-it";
//#endregion
//#region \0virtual:astro:page:src/pages/services/audit-it@_@astro
var page = () => audit_it_exports;
//#endregion
export { page };
