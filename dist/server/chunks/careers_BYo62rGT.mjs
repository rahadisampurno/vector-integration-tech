import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
//#region src/pages/careers.astro
var careers_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Careers,
	file: () => $$file,
	url: () => $$url
});
var $$Careers = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Careers",
		"data-astro-cid-updltw2v": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="careers-hero" data-astro-cid-updltw2v><div class="container text-center" data-astro-cid-updltw2v><span class="badge" data-astro-cid-updltw2v>Join the Mission</span><h1 data-astro-cid-updltw2v>Build the <span class="highlight" data-astro-cid-updltw2v>Future with Us</span></h1><p data-astro-cid-updltw2v>We are always looking for visionary engineers, designers, and strategists.</p></div></section><section class="culture section" data-astro-cid-updltw2v><div class="container grid-2" data-astro-cid-updltw2v><div class="image-placeholder glass" data-astro-cid-updltw2v></div><div class="content" data-astro-cid-updltw2v><h2 data-astro-cid-updltw2v>Our Culture</h2><p data-astro-cid-updltw2v>Innovation is at the heart of everything we do. We foster an environment of continuous learning, architectural excellence, and collaborative problem-solving.</p><ul class="benefits" data-astro-cid-updltw2v><li data-astro-cid-updltw2v>Flexible Remote Work</li><li data-astro-cid-updltw2v>Learning & Development Budget</li><li data-astro-cid-updltw2v>High-end Tech Stipend</li></ul></div></div></section>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/careers.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/careers.astro";
var $$url = "/careers";
//#endregion
//#region \0virtual:astro:page:src/pages/careers@_@astro
var page = () => careers_exports;
//#endregion
export { page };
