import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { T as createAstro, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
//#region src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://veintech.id");
var $$Login = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Login;
	const { cookies, request, redirect } = Astro2;
	let errorMessage = "";
	if (request.method === "POST") try {
		const data = await request.formData();
		const username = data.get("username");
		const password = data.get("password");
		if (username === "admin" && password === "adminveintech") {
			cookies.set("admin_session", "active", {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 3600 * 24
			});
			return redirect("/admin/produk-digital/pesanan");
		} else errorMessage = "Username atau Password salah.";
	} catch (e) {
		errorMessage = "Terjadi kesalahan sistem.";
	}
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Login Admin - VeinTech" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8"><div class="sm:mx-auto sm:w-full sm:max-w-md"><div class="flex justify-center mb-6"><a href="/" class="text-2xl font-bold font-headline flex items-center gap-2"><span class="material-symbols-outlined text-primary-fixed">admin_panel_settings</span><span>Admin Login</span></a></div><h2 class="mt-6 text-center text-3xl font-extrabold text-on-surface">Sign in to your account</h2></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div class="bg-surface-container py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-outline-variant/30">${errorMessage && renderTemplate`<div class="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium border border-red-200">${errorMessage}</div>`}<form class="space-y-6" method="POST"><div><label for="username" class="block text-sm font-medium text-on-surface">Username</label><div class="mt-1"><input id="username" name="username" type="text" required class="appearance-none block w-full px-3 py-2 border border-outline-variant rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-surface"></div></div><div><label for="password" class="block text-sm font-medium text-on-surface">Password</label><div class="mt-1"><input id="password" name="password" type="password" required class="appearance-none block w-full px-3 py-2 border border-outline-variant rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-surface"></div></div><div><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">Sign in</button></div></form></div></div></div>` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/login.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/login.astro";
var $$url = "/admin/login";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
