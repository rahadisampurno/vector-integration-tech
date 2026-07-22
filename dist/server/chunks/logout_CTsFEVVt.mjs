import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
//#region src/pages/api/admin/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var POST = async ({ cookies, redirect }) => {
	cookies.delete("admin_session", { path: "/" });
	return redirect("/admin/login");
};
var GET = async ({ cookies, redirect }) => {
	cookies.delete("admin_session", { path: "/" });
	return redirect("/admin/login");
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
