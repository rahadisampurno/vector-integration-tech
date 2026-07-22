import { O as defineMiddleware, _ as sequence } from "./chunks/render_BnMqMA0U.mjs";
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(defineMiddleware((context, next) => {
	const path = new URL(context.request.url).pathname;
	if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
		if (path === "/admin/login" || path === "/api/admin/login" || path === "/api/admin/logout") return next();
		if (context.cookies.get("admin_session")?.value !== "active") {
			if (path.startsWith("/api/admin")) return new Response(JSON.stringify({
				error: "Unauthorized",
				message: "Silakan login terlebih dahulu"
			}), {
				status: 401,
				headers: { "Content-Type": "application/json" }
			});
			return context.redirect("/admin/login");
		}
	}
	return next();
}));
//#endregion
export { onRequest };
