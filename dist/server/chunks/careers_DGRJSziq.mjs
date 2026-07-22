import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
//#region src/pages/en/careers.astro
var careers_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Careers,
	file: () => $$file,
	url: () => $$url
});
var $$Careers = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Careers",
		"data-astro-cid-wpjtygbs": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="careers-hero" data-astro-cid-wpjtygbs><div class="container text-center" data-astro-cid-wpjtygbs><span class="badge" data-astro-cid-wpjtygbs>Join the Mission</span><h1 data-astro-cid-wpjtygbs>Build the <span class="highlight" data-astro-cid-wpjtygbs>Future with Us</span></h1><p data-astro-cid-wpjtygbs>We are always looking for visionary engineers, designers, and strategists.</p></div></section><section class="culture section" data-astro-cid-wpjtygbs><div class="container grid-2" data-astro-cid-wpjtygbs><div class="image-placeholder glass" data-astro-cid-wpjtygbs></div><div class="content" data-astro-cid-wpjtygbs><h2 data-astro-cid-wpjtygbs>Our Culture</h2><p data-astro-cid-wpjtygbs>Innovation is at the heart of everything we do. We foster an environment of continuous learning, architectural excellence, and collaborative problem-solving.</p><ul class="benefits" data-astro-cid-wpjtygbs><li data-astro-cid-wpjtygbs>Flexible Remote Work</li><li data-astro-cid-wpjtygbs>Learning & Development Budget</li><li data-astro-cid-wpjtygbs>High-end Tech Stipend</li></ul></div></div></section>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/careers.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/careers.astro";
var $$url = "/en/careers";
//#endregion
//#region \0virtual:astro:page:src/pages/en/careers@_@astro
var page = () => careers_exports;
//#endregion
export { page };
