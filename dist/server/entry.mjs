import { t as __exportAll } from "./chunks/rolldown-runtime_BBjsoOtd.mjs";
import { t as path_exports } from "./chunks/path_CsLfxtPW.mjs";
import { A as readBodyWithLimit, C as validateAndDecodePathname, D as isForbiddenCrossOriginRequest, E as createCrossOriginForbiddenResponse, S as MultiLevelEncodingError, T as AstroIntegrationLogger, _ as sequence, a as createConsoleLogger, b as getOriginPathname, c as getProps, d as routeHasHtmlExtension, f as routeIsFallback, g as RedirectSinglePageBuiltModule, h as getRouteGenerator, i as PipelineFeatures, j as shouldAppendForwardSlash, k as BodySizeLimitError, l as getCustom404Route, m as SERVER_ISLAND_COMPONENT, n as ALL_PIPELINE_FEATURES, o as routeComparator, p as routeIsRedirect, r as Pipeline, s as getParams, t as Slots, u as getFallbackRoute, v as copyRequest, w as NOOP_MIDDLEWARE_FN, x as setOriginPathname, y as findRouteToRewrite } from "./chunks/render_BnMqMA0U.mjs";
import { D as isRoute500, E as isRoute404, F as fetchStateSymbol, I as nodeRequestAbortControllerCleanupSymbol, L as originPathnameSymbol, M as REROUTABLE_STATUS_CODES, N as appSymbol, O as ASTRO_ERROR_HEADER, P as clientAddressSymbol, R as pipelineSymbol, b as normalizeCspResourceEntry, d as decodeKey, j as REDIRECT_STATUS_CODES, k as ASTRO_GENERATOR, n as renderPage, p as generateCspDigest, w as renderEndpoint, x as pushDirective, z as responseSentSymbol$1 } from "./chunks/server_B0MT1nrk.mjs";
import { $ as i18nNoLocaleFoundInPath, B as PrerenderClientAddressNotAvailable, D as MiddlewareNoDataOrNextCalled, E as LocalsReassigned, J as StaticClientAddressNotAvailable, K as SessionStorageInitError, O as MiddlewareNotAResponse, T as LocalsNotAnObject, W as ResponseSentError, a as CacheNotEnabled, i as AstroResponseHeadersReassigned, m as ForbiddenRewrite, n as ActionNotFoundError, o as ClientAddressNotAvailable, q as SessionStorageSaveError, r as ActionsReturnedInvalidDataError, t as AstroError } from "./chunks/errors_CmSokKaD.mjs";
import colors from "piccolore";
import { appendForwardSlash, collapseDuplicateLeadingSlashes, collapseDuplicateSlashes, collapseDuplicateTrailingSlashes, hasFileExtension, isInternalPath, joinPaths, prependForwardSlash, removeLeadingForwardSlash, removeTrailingForwardSlash } from "@astrojs/internal-helpers/path";
import { parse, stringify, unflatten } from "devalue";
import "es-module-lexer";
import { parseCookie, stringifySetCookie } from "cookie";
import { escape } from "html-escaper";
import { matchPattern } from "@astrojs/internal-helpers/remote";
import { createStorage } from "unstorage";
import { AsyncLocalStorage } from "node:async_hooks";
import fs, { createReadStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { Http2ServerResponse } from "node:http2";
import url from "node:url";
import http from "node:http";
import https from "node:https";
import enableDestroy from "server-destroy";
import os from "node:os";
import send from "send";
//#region node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_SUPABASE_ANON_KEY": "sb_publishable_DPUSv6c3OtK9VRwXf6qcww_RLr7ptPs",
			"PUBLIC_SUPABASE_URL": "https://oyoxaywbkzftywfuavha.supabase.co",
			"SITE": "https://veintech.id",
			"SSR": true
		}, { _: "/Users/telkomdev-rahadi/Documents/VeinTech/Web/node_modules/.bin/astro" })?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const pipeline = Reflect.get(context, pipelineSymbol);
			const callerInfoName = shouldAppendForwardSlash(pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat) ? (0, path_exports.removeTrailingForwardSlash)(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await pipeline.getAction(callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = pipeline.manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_SUPABASE_ANON_KEY": "sb_publishable_DPUSv6c3OtK9VRwXf6qcww_RLr7ptPs",
			"PUBLIC_SUPABASE_URL": "https://oyoxaywbkzftywfuavha.supabase.co",
			"SITE": "https://veintech.id",
			"SSR": true
		}, { _: "/Users/telkomdev-rahadi/Documents/VeinTech/Web/node_modules/.bin/astro" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	constructor(request) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) {
			const warning = /* @__PURE__ */ new Error("Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
			warning.name = "Warning";
			console.warn(warning);
		}
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy, base } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const urlLocale = pathname.split("/").find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") if (pathname.includes(`${base}`)) newPathname = pathname.replace(`/${urlLocale}`, ``);
	else newPathname = pathname.replace(`/${urlLocale}`, `/`);
	else newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/astro/dist/i18n/path.js
function pathHasLocale(path, locales) {
	const segments = path.split("/").map(normalizeThePath);
	for (const segment of segments) for (const locale of locales) if (typeof locale === "string") {
		if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) return true;
	} else if (segment === locale.path) return true;
	return false;
}
function normalizeTheLocale(locale) {
	return locale.replaceAll("_", "-").toLowerCase();
}
function normalizeThePath(path) {
	return path.endsWith(".html") ? path.slice(0, -5) : path;
}
//#endregion
//#region node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/astro/dist/core/i18n/handler.js
var I18n = class {
	#i18n;
	#base;
	#trailingSlash;
	#format;
	#router;
	constructor(i18n, base, trailingSlash, format) {
		this.#i18n = i18n;
		this.#base = base;
		this.#trailingSlash = trailingSlash;
		this.#format = format;
		this.#router = new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		});
	}
	async finalize(state, response) {
		state.pipeline.usedFeatures |= PipelineFeatures.i18n;
		const i18n = this.#i18n;
		if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
		if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
		const url = state.url;
		const currentLocale = state.computeCurrentLocale();
		const isPrerendered = state.routeData.prerender;
		const routerContext = {
			currentLocale,
			currentDomain: url.hostname,
			routeType: state.responseRouteType,
			isReroute: false
		};
		const routeDecision = this.#router.match(url.pathname, routerContext);
		switch (routeDecision.type) {
			case "redirect": {
				let location = routeDecision.location;
				if (shouldAppendForwardSlash(this.#trailingSlash, this.#format)) location = appendForwardSlash(location);
				return new Response(null, {
					status: routeDecision.status ?? 302,
					headers: { Location: location }
				});
			}
			case "notFound": {
				if (isPrerendered) {
					const prerenderedRes = new Response(response.body, {
						status: 404,
						headers: response.headers
					});
					state.skipErrorReroute = true;
					if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
					return prerenderedRes;
				}
				const headers = new Headers();
				if (routeDecision.location) headers.set("Location", routeDecision.location);
				return new Response(null, {
					status: 404,
					headers
				});
			}
			case "continue": break;
		}
		if (i18n.fallback && i18n.fallbackType) {
			const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
			const fallbackDecision = computeFallbackRoute({
				pathname: url.pathname,
				responseStatus: effectiveStatus,
				currentLocale,
				fallback: i18n.fallback,
				fallbackType: i18n.fallbackType,
				locales: i18n.locales,
				defaultLocale: i18n.defaultLocale,
				strategy: i18n.strategy,
				base: this.#base
			});
			switch (fallbackDecision.type) {
				case "redirect": return new Response(null, {
					status: 302,
					headers: { Location: fallbackDecision.pathname + url.search }
				});
				case "rewrite": return await state.rewrite(fallbackDecision.pathname + url.search);
				case "none": break;
			}
		}
		return response;
	}
};
//#endregion
//#region node_modules/astro/dist/i18n/index.js
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		if (a.qualityValue && b.qualityValue) return Math.sign(b.qualityValue - a.qualityValue);
		return 0;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (code === browserLocale.locale) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) if (typeof value !== "undefined") {
			if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
			return value;
		} else if (responseFunctionPromise) return responseFunctionPromise;
		else throw new AstroError(MiddlewareNotAResponse);
		else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/astro/dist/core/middleware/astro-middleware.js
var AstroMiddleware = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, renderRouteCallback) {
		state.pipeline.usedFeatures |= PipelineFeatures.middleware;
		const pipeline = this.#pipeline;
		await state.getProps();
		const apiContext = state.getAPIContext();
		state.counter++;
		if (state.counter === 4) return new Response("Loop Detected", {
			status: 508,
			statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
		});
		const next = async (ctx, payload) => {
			if (payload) {
				pipeline.logger.debug("router", "Called rewriting to:", payload);
				applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request));
			}
			return renderRouteCallback(state, ctx);
		};
		let response;
		if (state.skipMiddleware) response = await next(apiContext);
		else {
			const pipelineMiddleware = await pipeline.getMiddleware();
			response = await callMiddleware(sequence(...pipeline.internalMiddleware, pipelineMiddleware), apiContext, next);
		}
		response = this.#finalize(state, response);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path, the same way
	* `PagesHandler.handleWithErrorFallback` does for `pages()`. When no
	* route matched it returns a 404 marked with `X-Astro-Error` for the
	* app's post-check; when Astro's own middleware chain throws it logs the
	* error and renders the custom `500.astro`.
	*
	* Errors surfaced through `renderRouteCallback` (the host framework's
	* `next`, e.g. host middleware mounted below `middleware()`) are
	* re-thrown instead, so the host's own error handling still runs rather
	* than being swallowed into Astro's 500 page. A sentinel tells the two
	* apart.
	*
	* Used by the composable `astro/fetch` `middleware()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state, renderRouteCallback) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		let nextError;
		try {
			return await this.handle(state, async (s, ctx) => {
				try {
					return await renderRouteCallback(s, ctx);
				} catch (err) {
					nextError = err;
					throw err;
				}
			});
		} catch (err) {
			if (err === nextError) throw err;
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
	#finalize(state, response) {
		attachCookiesToResponse(response, state.cookies);
		return response;
	}
};
//#endregion
//#region node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
var PagesHandler = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, ctx) {
		const { logger, streaming } = this.#pipeline;
		state.resetResponseMetadata();
		let response;
		const componentInstance = await state.loadComponentInstance();
		switch (state.routeData.type) {
			case "endpoint":
				response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
				break;
			case "page": {
				const props = await state.getProps();
				const actionApiContext = state.getActionAPIContext();
				const result = await state.createResult(componentInstance, actionApiContext);
				try {
					response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
				} catch (e) {
					result.cancelled = true;
					throw e;
				}
				state.responseRouteType = "page";
				if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
				break;
			}
			case "redirect": return new Response(null, {
				status: 404,
				headers: { [ASTRO_ERROR_HEADER]: "true" }
			});
			case "fallback":
				state.responseRouteType = "fallback";
				return new Response(null, { status: 500 });
		}
		const responseCookies = getCookiesFromResponse(response);
		if (responseCookies) state.cookies.merge(responseCookies);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path: unmatched routes
	* return a 404 marked with `X-Astro-Error` for the app's post-check
	* to render the 404 error page, and render-time errors are logged
	* and render the 500 error page instead of propagating to the host
	* framework.
	*
	* Used by the composable `astro/fetch` `pages()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		const ctx = state.getAPIContext();
		if (this.#pipeline.manifest.checkOrigin && isForbiddenCrossOriginRequest(ctx.request, ctx.url, ctx.isPrerendered)) return createCrossOriginForbiddenResponse(ctx.request);
		try {
			return await this.handle(state, ctx);
		} catch (err) {
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
};
//#endregion
//#region node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
	try {
		url.pathname = validateAndDecodePathname(url.pathname);
	} catch {
		try {
			url.pathname = decodeURI(url.pathname);
		} catch {}
	}
	url.pathname = collapseDuplicateSlashes(url.pathname);
	return url;
}
//#endregion
//#region node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const pipeline = state.pipeline;
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (pipeline.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, pipeline.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
	state.invalidateContexts();
}
var Rewrites = class {
	async execute(state, payload) {
		const pipeline = state.pipeline;
		pipeline.logger.debug("router", "Calling rewrite: ", payload);
		applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request), { mergeCookies: true });
		const middleware = new AstroMiddleware(pipeline);
		const pagesHandler = new PagesHandler(pipeline);
		return middleware.handle(state, pagesHandler.handle.bind(pagesHandler));
	}
};
//#endregion
//#region node_modules/astro/dist/core/routing/match.js
function matchRoute(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		let host = request.headers.get("X-Forwarded-Host");
		let protocol = request.headers.get("X-Forwarded-Proto");
		if (protocol) protocol = protocol + ":";
		else protocol = url.protocol;
		if (!host) host = request.headers.get("Host");
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? removeBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (requestPathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
function removeBase(pathname, base) {
	pathname = collapseDuplicateLeadingSlashes(pathname);
	if (pathname.startsWith(base)) return pathname.slice(removeTrailingForwardSlash(base).length + 1);
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const { hostname, port } = parseHost(sanitized);
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		if (sanitized) {
			const { hostname, port: portFromHost } = parseHost(sanitized);
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/fetch/fetch-state.js
var FetchState = class {
	pipeline;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `AstroHandler` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `AstroHandler` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	*/
	status = 200;
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Rewrites handler instance. Lazy-initialized on first rewrite(). */
	#rewrites;
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(pipeline, request, options) {
		this.pipeline = pipeline;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		url.pathname = publicPathname;
		url.pathname = collapseDuplicateSlashes(url.pathname);
		const domainPathname = computePathnameFromDomain(request, url, pipeline.manifest.i18n, pipeline.manifest.base, pipeline.manifest.trailingSlash, pipeline.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request);
		if (pipeline.manifest.allowedDomains && pipeline.manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the Rewrites handler.
	*/
	rewrite(payload) {
		return (this.#rewrites ??= new Rewrites()).execute(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const pipeline = this.pipeline;
		const { clientDirectives, inlinedScripts, compressHTML, manifest, renderers, resolve } = pipeline;
		const routeData = this.routeData;
		const { links, scripts, styles } = await pipeline.headElements(routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await pipeline.getServerIslands()).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const astroComponentPartial = {
			props,
			self: null
		};
		const Astro = Object.assign(Object.create(astroPagePartial), astroComponentPartial);
		let _slots;
		Object.defineProperty(Astro, "slots", { get: () => {
			if (!_slots) _slots = new Slots(result, slotValues, this.pipeline.logger);
			return _slots;
		} });
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, pipeline, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: pipeline.site,
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						pipeline.logger.info(null, msg);
					},
					warn(msg) {
						pipeline.logger.warn(null, msg);
					},
					error(msg) {
						pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { pipeline, clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (pipeline.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(pipeline.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		const { pipeline } = this;
		if (!pipeline.manifest.csp) {
			if (pipeline.runtimeMode === "production") pipeline.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			pipeline.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, pipeline: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = this.pipeline.getComponentByRoute(this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.pipeline.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
	}
	#resolveRouteData() {
		const pipeline = this.pipeline;
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = pipeline.matchRoute(this.pathname);
		if (matched && matched.prerender && pipeline.manifest.serverLike) if (matched.params.length > 0) {
			const allMatches = pipeline.matchAllRoutes(this.pathname);
			this.routeData = allMatches.find((r) => !r.prerender);
		} else this.routeData = void 0;
		else this.routeData = matched;
		pipeline.logger.debug("router", "Astro matched the following route for " + this.request.url);
		pipeline.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(pipeline.manifestData);
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			pipeline.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			pipeline.logger.debug("router", "Here's the available routes:\n", pipeline.manifestData);
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the pipeline's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`, including the
	* `collapseDuplicateLeadingSlashes` fix that prevents middleware
	* authorization bypass when the URL starts with `//`.
	*/
	#computePathname(normalizedPathname) {
		let pathname = collapseDuplicateLeadingSlashes(normalizedPathname);
		const base = this.pipeline.manifest.base;
		if (pathname.startsWith(base)) {
			const baseWithoutTrailingSlash = removeTrailingForwardSlash(base);
			pathname = pathname.slice(baseWithoutTrailingSlash.length + 1);
		}
		return prependForwardSlash(pathname);
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.pipeline.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.pipeline.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		const oldRequest = this.request;
		this.request = new Request(this.url, oldRequest);
		const app = Reflect.get(oldRequest, appSymbol);
		if (app !== void 0) Reflect.set(this.request, appSymbol, app);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const pipeline = this.pipeline;
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: pipeline.routeCache,
			pathname: this.pathname,
			logger: pipeline.logger,
			serverLike: pipeline.manifest.serverLike,
			base: pipeline.manifest.base,
			trailingSlash: pipeline.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: this.pipeline.site,
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						state.pipeline.logger.info(null, msg);
					},
					warn(msg) {
						state.pipeline.logger.warn(null, msg);
					},
					error(msg) {
						state.pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Callers must ensure `getProps()` has resolved at least once before
	* calling this.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		Reflect.set(actionApiContext, pipelineSymbol, this.pipeline);
		actionApiContext[fetchStateSymbol] = this;
		this.apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		return this.apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/astro/dist/actions/handler.js
var ActionHandler = class {
	/**
	* Run action handling for the current request. Expects the APIContext
	* that is already being used by the render pipeline.
	*
	* Returns a `Response` when the action fully handles the request (RPC),
	* or `undefined` when the caller should continue processing the
	* request (form actions or non-action requests).
	*/
	handle(apiContext, state) {
		state.pipeline.usedFeatures |= PipelineFeatures.actions;
		if (apiContext.isPrerendered) return;
		const { action, setActionResult } = getActionContext(apiContext);
		if (!action) return;
		if (state.pipeline.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
		return this.#executeAction(action, setActionResult);
	}
	async #executeAction(action, setActionResult) {
		const serialized = serializeActionResult(await action.handler());
		if (action.calledFrom === "rpc") {
			if (serialized.type === "empty") return new Response(null, { status: serialized.status });
			return new Response(serialized.body, {
				status: serialized.status,
				headers: { "Content-Type": serialized.contentType }
			});
		}
		setActionResult(action.name, serialized);
	}
};
//#endregion
//#region node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/astro/dist/core/routing/trailing-slash-handler.js
var TrailingSlashHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	/**
	* Returns a redirect `Response` if the request pathname needs
	* normalization, or `undefined` if no redirect is required.
	*/
	handle(state) {
		const url = new URL(state.request.url);
		const redirect = this.#redirectTrailingSlash(url.pathname);
		if (redirect === url.pathname) return;
		const addCookieHeader = state.renderOptions.addCookieHeader;
		const status = state.request.method === "GET" ? 301 : 308;
		const response = new Response(redirectTemplate({
			status,
			relativeLocation: url.pathname,
			absoluteLocation: redirect,
			from: state.request.url
		}), {
			status,
			headers: { location: redirect + url.search }
		});
		prepareResponse(response, { addCookieHeader });
		return response;
	}
	#redirectTrailingSlash(pathname) {
		const { trailingSlash } = this.#app.manifest;
		if (pathname === "/" || isInternalPath(pathname)) return pathname;
		const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
		if (path !== pathname) return path;
		if (trailingSlash === "ignore") return pathname;
		if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
		if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
		return pathname;
	}
};
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const pipeline = state.pipeline;
	if (!pipeline.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(pipeline.logger) });
		return;
	}
	if (pipeline.runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, pipeline);
}
async function provideCacheAsync(state, pipeline) {
	const cacheProvider = await pipeline.getCacheProvider();
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (pipeline.cacheConfig?.routes) {
			if (!pipeline.compiledCacheRoutes) pipeline.compiledCacheRoutes = compileCacheRoutes(pipeline.cacheConfig.routes, pipeline.manifest.base, pipeline.manifest.trailingSlash);
			const matched = matchCacheRoute(state.pathname, pipeline.compiledCacheRoutes);
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
var CacheHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	async handle(state, next) {
		this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
		if (!this.#app.pipeline.cacheProvider) return next();
		const cache = state.resolve(CACHE_KEY);
		const cacheProvider = await this.#app.pipeline.getCacheProvider();
		if (cacheProvider?.onRequest) {
			const response2 = await cacheProvider.onRequest({
				request: state.request,
				url: new URL(state.request.url),
				waitUntil: state.renderOptions.waitUntil
			}, async () => {
				const res = await next();
				applyCacheHeaders(cache, res, state.request);
				return res;
			});
			response2.headers.delete("CDN-Cache-Control");
			response2.headers.delete("Cache-Tag");
			return response2;
		}
		const response = await next();
		applyCacheHeaders(cache, response, state.request);
		return response;
	}
};
//#endregion
//#region node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") if (redirectIsExternal(redirect)) return redirect;
	else {
		let target = redirect;
		for (const param of Object.keys(params)) {
			const paramValue = params[param];
			target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
		}
		return target;
	}
	else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.redirects;
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.pipeline.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) if (typeof redirect === "string") return Response.redirect(redirect, status);
	else return Response.redirect(redirect.destination, status);
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var unflatten$1 = (parsed, _) => {
	return unflatten(parsed, { URL: (href) => new URL(href) });
};
var stringify$1 = (data, _) => {
	return stringify(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage }) {
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten$1(JSON.parse(stringify$1(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			console.error("Failed to load session data during regeneration:", err);
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			console.error("Failed to remove old session data:", err);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify$1(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				console.error("Failed to clean up session %s:", sessionId, err);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten$1(raw);
			if (!(storedMap instanceof Map)) {
				await this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			await this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.sessions;
	const config = state.pipeline.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const pipeline = state.pipeline;
	const driverFactory = await pipeline.getSessionDriver();
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: pipeline.runtimeMode,
				driverFactory,
				mockStorage: null
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region node_modules/astro/dist/core/routing/handler.js
var AstroHandler = class {
	#app;
	#trailingSlashHandler;
	#actionHandler;
	#astroMiddleware;
	#pagesHandler;
	#cacheHandler;
	/** Bound callback for the middleware chain — created once, reused per request. */
	#renderRouteCallback;
	/**
	* i18n post-processor. Only set when the app has i18n configured and
	* the strategy is not `manual` — for the manual strategy users wire
	* `astro:i18n.middleware(...)` into their own `onRequest`.
	*/
	#i18n;
	/** Whether sessions are configured on the manifest. */
	#hasSession;
	constructor(app) {
		this.#app = app;
		this.#trailingSlashHandler = new TrailingSlashHandler(app);
		this.#actionHandler = new ActionHandler();
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
		this.#cacheHandler = new CacheHandler(app);
		this.#renderRouteCallback = this.#actionsAndPages.bind(this);
		this.#hasSession = !!app.manifest.sessionConfig;
		const i18n = app.manifest.i18n;
		if (i18n && i18n.strategy !== "manual") this.#i18n = new I18n(i18n, app.manifest.base, app.manifest.trailingSlash, app.manifest.buildFormat);
	}
	/**
	* Runs actions then pages — the callback at the bottom of the
	* middleware chain. Bound once in the constructor to avoid
	* per-request closure allocation.
	*/
	#actionsAndPages(state, ctx) {
		if (!state.skipMiddleware) {
			const actionResult = this.#actionHandler.handle(ctx, state);
			if (actionResult) return actionResult.then((response) => response ?? this.#pagesHandler.handle(state, ctx));
		}
		return this.#pagesHandler.handle(state, ctx);
	}
	async handle(state) {
		state.pipeline.usedFeatures |= ALL_PIPELINE_FEATURES;
		if (state.invalidEncoding) return new Response(null, {
			status: 400,
			statusText: "Bad Request"
		});
		const trailingSlashRedirect = this.#trailingSlashHandler.handle(state);
		if (trailingSlashRedirect) return trailingSlashRedirect;
		if (!state.routeData) return this.#app.renderError(state.request, {
			...state.renderOptions,
			status: 404,
			pathname: state.pathname
		});
		return this.render(state);
	}
	/**
	* Renders a response for the given `FetchState`. Assumes
	* trailing-slash redirects and routeData resolution have already run.
	*
	* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
	* `Rewrites.execute` on the current `FetchState` — they mutate the
	* existing state in place and re-run middleware + page dispatch.
	*/
	async render(state) {
		const routeData = state.routeData;
		const pathname = state.pathname;
		const request = state.request;
		const { addCookieHeader } = state.renderOptions;
		state.status = this.#app.getDefaultStatusCode(routeData, pathname);
		let response;
		try {
			const sessionP = this.#hasSession ? provideSession(state) : void 0;
			const cacheP = provideCache(state);
			if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
			state.pipeline.usedFeatures |= PipelineFeatures.sessions;
			if (routeData.type === "redirect") {
				const redirectResponse = await renderRedirect(state);
				this.#app.logThisRequest({
					pathname,
					method: request.method,
					statusCode: redirectResponse.status,
					isRewrite: false,
					timeStart: state.timeStart
				});
				prepareResponse(redirectResponse, { addCookieHeader });
				this.#app.pipeline.logger.flush();
				return redirectResponse;
			}
			if (!this.#app.pipeline.cacheProvider) {
				this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
				response = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
				if (this.#i18n) response = await this.#i18n.finalize(state, response);
			} else {
				const runPipeline = async () => {
					let res = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
					if (this.#i18n) res = await this.#i18n.finalize(state, res);
					return res;
				};
				response = await this.#cacheHandler.handle(state, runPipeline);
			}
			this.#app.logThisRequest({
				pathname,
				method: request.method,
				statusCode: response.status,
				isRewrite: state.isRewriting,
				timeStart: state.timeStart
			});
		} catch (err) {
			this.#app.logger.error(null, err.stack || err.message || String(err));
			return this.#app.renderError(request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		} finally {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		}
		if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return this.#app.renderError(request, {
			...state.renderOptions,
			response,
			status: response.status,
			error: response.status === 500 ? null : void 0,
			pathname: state.pathname
		});
		prepareResponse(response, { addCookieHeader });
		this.#app.pipeline.logger.flush();
		return response;
	}
};
//#endregion
//#region node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#app;
	#handler;
	constructor(app) {
		this.#app = app ?? null;
		this.#handler = app ? new AstroHandler(app) : null;
	}
	/**
	* Fast path: called directly by `BaseApp.render()` with pre-resolved
	* options, avoiding the `Reflect.set/get` round-trip through the request.
	*/
	renderWithOptions(request, options) {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request, options);
		return this.#handler.handle(state);
	}
	fetch = (request) => {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request);
		if (!this.#handler) throw new Error("No fetch handler provided.");
		return this.#handler.handle(state);
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/astro/dist/i18n/error-routes.js
function isLocalizedErrorRoute(route, status, locales) {
	if (!locales) return false;
	const suffix = `/${status}`;
	if (!route.endsWith(suffix)) return false;
	const localeSegment = route.slice(0, -suffix.length);
	if (!localeSegment || localeSegment.includes("/", 1)) return false;
	return pathHasLocale(localeSegment, locales);
}
function getErrorRoutePath(pathname, status, routes, locales, appendTrailingSlash = false) {
	const suffix = appendTrailingSlash ? "/" : "";
	if (locales) {
		const firstSegment = pathname.split("/").find(Boolean);
		if (firstSegment && pathHasLocale(`/${firstSegment}`, locales)) {
			const localized = `/${firstSegment}/${status}`;
			if (routes.some((route) => route.route === localized)) return `${localized}${suffix}`;
		}
	}
	return `/${status}${suffix}`;
}
//#endregion
//#region node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${(0, path_exports.removeTrailingForwardSlash)(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${(0, path_exports.removeTrailingForwardSlash)(name || "index")}.html`;
	return `${(0, path_exports.removeTrailingForwardSlash)(name)}/index.html`;
}
//#endregion
//#region node_modules/astro/dist/core/errors/default-handler.js
var DefaultErrorHandler = class {
	#app;
	#astroMiddleware;
	#pagesHandler;
	constructor(app) {
		this.#app = app;
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
	}
	async renderError(request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
		const app = this.#app;
		const resolvedPathname = pathname ?? new FetchState(app.pipeline, request).pathname;
		const errorRouteData = matchRoute(getErrorRoutePath(resolvedPathname, status, app.manifestData.routes, app.manifest.i18n?.locales, app.manifest.trailingSlash === "always"), app.manifestData);
		const url = new URL(request.url);
		if (errorRouteData) {
			if (errorRouteData.prerender) {
				const allowedDomains = app.manifest.allowedDomains;
				const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
				const statusURL = new URL(`${app.baseWithoutTrailingSlash}${getOutputFilename(app.manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
				if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
					const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
						status,
						removeContentEncodingHeaders: true
					});
					prepareResponse(newResponse, resolvedRenderOptions);
					return newResponse;
				} catch {
					const response2 = mergeResponses(new Response(null, { status }), originalResponse);
					prepareResponse(response2, resolvedRenderOptions);
					return response2;
				}
			}
			const mod = await app.pipeline.getComponentByRoute(errorRouteData);
			const errorState = new FetchState(app.pipeline, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.routeData = errorRouteData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = mod;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			try {
				await provideSession(errorState);
				const newResponse = mergeResponses(await this.#astroMiddleware.handle(errorState, this.#pagesHandler.handle.bind(this.#pagesHandler)), originalResponse);
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				if (skipMiddleware === false) return this.renderError(request, {
					...resolvedRenderOptions,
					status,
					error,
					response: originalResponse,
					skipMiddleware: true,
					pathname: resolvedPathname
				});
			} finally {
				await errorState.finalizeAll();
			}
		}
		const response = mergeResponses(new Response(null, { status }), originalResponse);
		prepareResponse(response, resolvedRenderOptions);
		return response;
	}
};
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) if (!seen.has(name.toLowerCase())) newHeaders.append(name, value);
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) for (const cookieValue of newCookies.consume()) originalResponse.headers.append("set-cookie", cookieValue);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	manifestData;
	pipeline;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return this.pipeline.logger;
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true, ...args) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.pipeline = this.createPipeline(streaming, manifest, ...args);
		this.manifestData = this.pipeline.manifestData;
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler strategy used by this app. Override to
	* provide environment-specific behavior (dev overlay, build-time throws, etc.).
	*/
	createErrorHandler() {
		return new DefaultErrorHandler(this);
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		this.manifestData = newManifestData;
		this.pipeline.manifestData = newManifestData;
		this.pipeline.rebuildRouter();
	}
	removeBase(pathname) {
		pathname = collapseDuplicateLeadingSlashes(pathname);
		if (pathname.startsWith(this.manifest.base)) return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
		return pathname;
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		const url = new URL(request.url);
		if (this.manifest.assets.has(url.pathname)) return void 0;
		let pathname = this.computePathnameFromDomain(request);
		if (!pathname) pathname = prependForwardSlash(this.removeBase(url.pathname));
		const routeData = this.pipeline.matchRoute(this.safeDecodeURI(pathname));
		if (!routeData) return void 0;
		if (allowPrerenderedRoutes) return routeData;
		if (routeData.prerender) {
			if (routeData.params.length > 0) return this.pipeline.matchAllRoutes(this.safeDecodeURI(pathname)).find((r) => !r.prerender);
			return;
		}
		return routeData;
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await this.pipeline.getLogger();
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = this.pipeline.matchRoute(this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) {
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.renderWithOptions(request, resolvedOptions);
		} else {
			setRenderOptions(request, resolvedOptions);
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = this.pipeline.usedFeatures;
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & PipelineFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & PipelineFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & PipelineFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & PipelineFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & PipelineFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & PipelineFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless you add it to your fetch.ts pipeline.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		if (!routeData.pattern.test(pathname)) {
			for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(pathname)) return 302;
		}
		const route = removeTrailingForwardSlash(routeData.route);
		const locales = this.manifest.i18n?.locales;
		if (isRoute404(route) || isLocalizedErrorRoute(route, 404, locales)) return 404;
		if (isRoute500(route) || isLocalizedErrorRoute(route, 500, locales)) return 500;
		return 200;
	}
	getManifest() {
		return this.pipeline.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/getAssetsPrefix.js
function getAssetsPrefix(fileExtension, assetsPrefix) {
	let prefix = "";
	if (!assetsPrefix) prefix = "";
	else if (typeof assetsPrefix === "string") prefix = assetsPrefix;
	else prefix = assetsPrefix[fileExtension.slice(1)] || assetsPrefix.fallback;
	return prefix;
}
//#endregion
//#region node_modules/astro/dist/core/render/ssr-element.js
var URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
	const parsed = new URL(path, URL_PARSE_BASE);
	return {
		pathname: !URL.canParse(path) && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname,
		suffix: `${parsed.search}${parsed.hash}`
	};
}
function appendQueryParams(path, queryParams) {
	const queryString = queryParams.toString();
	if (!queryString) return path;
	const hashIndex = path.indexOf("#");
	const basePath = hashIndex === -1 ? path : path.slice(0, hashIndex);
	const hash = hashIndex === -1 ? "" : path.slice(hashIndex);
	return `${basePath}${basePath.includes("?") ? "&" : "?"}${queryString}${hash}`;
}
function createAssetLink(href, base, assetsPrefix, queryParams) {
	const { pathname, suffix } = splitAssetPath(href);
	let url = "";
	if (assetsPrefix) url = (0, path_exports.joinPaths)(getAssetsPrefix((0, path_exports.fileExtension)(pathname), assetsPrefix), (0, path_exports.slash)(pathname)) + suffix;
	else if (base) url = (0, path_exports.prependForwardSlash)((0, path_exports.joinPaths)(base, (0, path_exports.slash)(pathname))) + suffix;
	else url = href;
	if (queryParams) url = appendQueryParams(url, queryParams);
	return url;
}
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
	if (stylesheet.type === "inline") return {
		props: {},
		children: stylesheet.content
	};
	else return {
		props: {
			rel: "stylesheet",
			href: createAssetLink(stylesheet.src, base, assetsPrefix, queryParams)
		},
		children: ""
	};
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
	return new Set(stylesheets.map((s) => createStylesheetElement(s, base, assetsPrefix, queryParams)));
}
function createModuleScriptElement(script, base, assetsPrefix, queryParams) {
	if (script.type === "external") return createModuleScriptElementWithSrc(script.value, base, assetsPrefix, queryParams);
	else return {
		props: { type: "module" },
		children: script.value
	};
}
function createModuleScriptElementWithSrc(src, base, assetsPrefix, queryParams) {
	return {
		props: {
			type: "module",
			src: createAssetLink(src, base, assetsPrefix, queryParams)
		},
		children: ""
	};
}
//#endregion
//#region node_modules/astro/dist/core/app/pipeline.js
var AppPipeline = class AppPipeline extends Pipeline {
	getName() {
		return "AppPipeline";
	}
	static create({ manifest, streaming }) {
		const resolve = async function resolve2(specifier) {
			if (!(specifier in manifest.entryModules)) throw new Error(`Unable to resolve [${specifier}]`);
			const bundlePath = manifest.entryModules[specifier];
			if (bundlePath.startsWith("data:") || bundlePath.length === 0) return bundlePath;
			else return createAssetLink(bundlePath, manifest.base, manifest.assetsPrefix);
		};
		const logger = createConsoleLogger({ level: manifest.logLevel });
		return new AppPipeline(logger, manifest, "production", manifest.renderers, resolve, streaming, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
	}
	async headElements(routeData) {
		const { assetsPrefix, base } = this.manifest;
		const routeInfo = this.manifest.routes.find((route) => route.routeData.route === routeData.route);
		const links = /* @__PURE__ */ new Set();
		const scripts = /* @__PURE__ */ new Set();
		const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
		for (const script of routeInfo?.scripts ?? []) if ("stage" in script) {
			if (script.stage === "head-inline") scripts.add({
				props: {},
				children: script.children
			});
		} else scripts.add(createModuleScriptElement(script, base, assetsPrefix));
		return {
			links,
			styles,
			scripts
		};
	}
	componentMetadata() {}
	async getComponentByRoute(routeData) {
		return (await this.getModuleForRoute(routeData)).page();
	}
	async getModuleForRoute(route) {
		for (const defaultRoute of this.defaultRoutes) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
		let routeToProcess = route;
		if (routeIsRedirect(route)) if (route.redirectRoute) routeToProcess = route.redirectRoute;
		else return RedirectSinglePageBuiltModule;
		else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, this.manifest.routes);
		if (this.manifest.pageMap) {
			const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
			if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
			return await importComponentInstance();
		} else if (this.manifest.pageModule) return this.manifest.pageModule;
		throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
	}
	async tryRewrite(payload, request) {
		const { newUrl, pathname, routeData } = findRouteToRewrite({
			payload,
			request,
			routes: this.manifest?.routes.map((r) => r.routeData),
			trailingSlash: this.manifest.trailingSlash,
			buildFormat: this.manifest.buildFormat,
			base: this.manifest.base,
			outDir: this.manifest?.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
		});
		return {
			newUrl,
			pathname,
			componentInstance: await this.getComponentByRoute(routeData),
			routeData
		};
	}
};
//#endregion
//#region node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	createPipeline(streaming) {
		return AppPipeline.create({
			manifest: this.manifest,
			streaming
		});
	}
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/astro/dist/assets/endpoint/node.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about\\/?$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about.astro",
			"pathname": "/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/login",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/login\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "login",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/login.astro",
			"pathname": "/admin/login",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/produk-digital/dashboard",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/produk-digital\\/dashboard\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "produk-digital",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "dashboard",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/admin/produk-digital/dashboard.astro",
			"pathname": "/admin/produk-digital/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/produk-digital/pesanan",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/produk-digital\\/pesanan\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "produk-digital",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pesanan",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/admin/produk-digital/pesanan.astro",
			"pathname": "/admin/produk-digital/pesanan",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/admin/license/generate",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/admin\\/license\\/generate\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "license",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "generate",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/admin/license/generate.ts",
			"pathname": "/api/admin/license/generate",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/admin/logout",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/admin\\/logout\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logout",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/admin/logout.ts",
			"pathname": "/api/admin/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/admin/orders/[id]/upload-license",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/admin\\/orders\\/([^/]+?)\\/upload-license\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orders",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "upload-license",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "src/pages/api/admin/orders/[id]/upload-license.ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/admin/orders/[id]/verify",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/admin\\/orders\\/([^/]+?)\\/verify\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orders",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "src/pages/api/admin/orders/[id]/verify.ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/download/license/[filename]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/download\\/license\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "download",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "license",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "filename",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["filename"],
			"component": "src/pages/api/download/license/[filename].ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/download/verify",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/download\\/verify\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "download",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "verify",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/download/verify.ts",
			"pathname": "/api/download/verify",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/orders/[id]/confirm",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/orders\\/([^/]+?)\\/confirm\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "orders",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "confirm",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "src/pages/api/orders/[id]/confirm.ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/blog",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/blog\\/?$",
			"segments": [[{
				"content": "blog",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/blog.astro",
			"pathname": "/blog",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/careers",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/careers\\/?$",
			"segments": [[{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/careers.astro",
			"pathname": "/careers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/contact",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/contact\\/?$",
			"segments": [[{
				"content": "contact",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/contact.astro",
			"pathname": "/contact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/download/[token]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/download\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "download",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "token",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["token"],
			"component": "src/pages/download/[token].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/about\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/about.astro",
			"pathname": "/en/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/blog",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/blog\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "blog",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/blog.astro",
			"pathname": "/en/blog",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/careers",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/careers\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/careers.astro",
			"pathname": "/en/careers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/contact",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/contact\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "contact",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/contact.astro",
			"pathname": "/en/contact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/insights/high-concurrency-postgres",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/insights\\/high-concurrency-postgres\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "insights",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "high-concurrency-postgres",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/insights/high-concurrency-postgres.astro",
			"pathname": "/en/insights/high-concurrency-postgres",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/insights/rag-vs-finetuning-enterprise",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/insights\\/rag-vs-finetuning-enterprise\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "insights",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "rag-vs-finetuning-enterprise",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/insights/rag-vs-finetuning-enterprise.astro",
			"pathname": "/en/insights/rag-vs-finetuning-enterprise",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/insights/zero-trust-microservices",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/insights\\/zero-trust-microservices\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "insights",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "zero-trust-microservices",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/insights/zero-trust-microservices.astro",
			"pathname": "/en/insights/zero-trust-microservices",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/insights",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/insights\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/insights.astro",
			"pathname": "/en/insights",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/n8n-workflows",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/n8n-workflows\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "n8n-workflows",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/n8n-workflows.astro",
			"pathname": "/en/n8n-workflows",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/portfolio/ai-operational-ticketing",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/portfolio\\/ai-operational-ticketing\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "portfolio",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "ai-operational-ticketing",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/portfolio/ai-operational-ticketing.astro",
			"pathname": "/en/portfolio/ai-operational-ticketing",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/portfolio/fintech-zero-trust-audit",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/portfolio\\/fintech-zero-trust-audit\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "portfolio",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "fintech-zero-trust-audit",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/portfolio/fintech-zero-trust-audit.astro",
			"pathname": "/en/portfolio/fintech-zero-trust-audit",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/portfolio/logistics-api-gateway",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/portfolio\\/logistics-api-gateway\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "portfolio",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logistics-api-gateway",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/portfolio/logistics-api-gateway.astro",
			"pathname": "/en/portfolio/logistics-api-gateway",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/portfolio",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/portfolio\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/portfolio.astro",
			"pathname": "/en/portfolio",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/ai-automation",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/ai-automation\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "ai-automation",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/ai-automation.astro",
			"pathname": "/en/services/ai-automation",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/ai-computer-vision",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/ai-computer-vision\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "ai-computer-vision",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/ai-computer-vision.astro",
			"pathname": "/en/services/ai-computer-vision",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/audit-it",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/audit-it\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "audit-it",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/audit-it.astro",
			"pathname": "/en/services/audit-it",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/business-website",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/business-website\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "business-website",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/business-website.astro",
			"pathname": "/en/services/business-website",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/chatbot-ai",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/chatbot-ai\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "chatbot-ai",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/chatbot-ai.astro",
			"pathname": "/en/services/chatbot-ai",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/consulting",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/consulting\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "consulting",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/consulting.astro",
			"pathname": "/en/services/consulting",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/cyber-security",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/cyber-security\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "cyber-security",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/cyber-security.astro",
			"pathname": "/en/services/cyber-security",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/ecommerce-solutions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/ecommerce-solutions\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "ecommerce-solutions",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/ecommerce-solutions.astro",
			"pathname": "/en/services/ecommerce-solutions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/integrasi-api",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/integrasi-api\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "integrasi-api",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/integrasi-api.astro",
			"pathname": "/en/services/integrasi-api",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/mobile-app-dev",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/mobile-app-dev\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "mobile-app-dev",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/mobile-app-dev.astro",
			"pathname": "/en/services/mobile-app-dev",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/saas-web-dev",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/saas-web-dev\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "saas-web-dev",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/saas-web-dev.astro",
			"pathname": "/en/services/saas-web-dev",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/software-development",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/software-development\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "software-development",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/software-development.astro",
			"pathname": "/en/services/software-development",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/system-integration",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/system-integration\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "system-integration",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/system-integration.astro",
			"pathname": "/en/services/system-integration",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services/website-bisnis",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/website-bisnis\\/?$",
			"segments": [
				[{
					"content": "en",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "services",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "website-bisnis",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/en/services/website-bisnis.astro",
			"pathname": "/en/services/website-bisnis",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/services",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/services\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "services",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/services.astro",
			"pathname": "/en/services",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en/solutions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/en\\/solutions\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "solutions",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/solutions.astro",
			"pathname": "/en/solutions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/en",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/en\\/?$",
			"segments": [[{
				"content": "en",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/en/index.astro",
			"pathname": "/en",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights/high-concurrency-postgres",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/insights\\/high-concurrency-postgres\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "high-concurrency-postgres",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/insights/high-concurrency-postgres.astro",
			"pathname": "/insights/high-concurrency-postgres",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights/rag-vs-finetuning-enterprise",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/insights\\/rag-vs-finetuning-enterprise\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "rag-vs-finetuning-enterprise",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/insights/rag-vs-finetuning-enterprise.astro",
			"pathname": "/insights/rag-vs-finetuning-enterprise",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights/zero-trust-microservices",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/insights\\/zero-trust-microservices\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "zero-trust-microservices",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/insights/zero-trust-microservices.astro",
			"pathname": "/insights/zero-trust-microservices",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/insights",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/insights\\/?$",
			"segments": [[{
				"content": "insights",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/insights.astro",
			"pathname": "/insights",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/n8n-workflows",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/n8n-workflows\\/?$",
			"segments": [[{
				"content": "n8n-workflows",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/n8n-workflows.astro",
			"pathname": "/n8n-workflows",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio/ai-operational-ticketing",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/portfolio\\/ai-operational-ticketing\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ai-operational-ticketing",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/portfolio/ai-operational-ticketing.astro",
			"pathname": "/portfolio/ai-operational-ticketing",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio/fintech-zero-trust-audit",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/portfolio\\/fintech-zero-trust-audit\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "fintech-zero-trust-audit",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/portfolio/fintech-zero-trust-audit.astro",
			"pathname": "/portfolio/fintech-zero-trust-audit",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio/logistics-api-gateway",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/portfolio\\/logistics-api-gateway\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "logistics-api-gateway",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/portfolio/logistics-api-gateway.astro",
			"pathname": "/portfolio/logistics-api-gateway",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/portfolio\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/portfolio.astro",
			"pathname": "/portfolio",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/produk-digital/pesanan/[order_code]/pembayaran",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/produk-digital\\/pesanan\\/([^/]+?)\\/pembayaran\\/?$",
			"segments": [
				[{
					"content": "produk-digital",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pesanan",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "order_code",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "pembayaran",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["order_code"],
			"component": "src/pages/produk-digital/pesanan/[order_code]/pembayaran.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/produk-digital/pesanan/[order_code]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/produk-digital\\/pesanan\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "produk-digital",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pesanan",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "order_code",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["order_code"],
			"component": "src/pages/produk-digital/pesanan/[order_code].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/produk-digital/[slug]/pesan",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/produk-digital\\/([^/]+?)\\/pesan\\/?$",
			"segments": [
				[{
					"content": "produk-digital",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "pesan",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "src/pages/produk-digital/[slug]/pesan.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/produk-digital/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/produk-digital\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "produk-digital",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/produk-digital/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/produk-digital",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/produk-digital\\/?$",
			"segments": [[{
				"content": "produk-digital",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/produk-digital.astro",
			"pathname": "/produk-digital",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/ai-computer-vision",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/ai-computer-vision\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ai-computer-vision",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/ai-computer-vision.astro",
			"pathname": "/services/ai-computer-vision",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/ai-otomatisasi",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/ai-otomatisasi\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ai-otomatisasi",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/ai-otomatisasi.astro",
			"pathname": "/services/ai-otomatisasi",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/audit-it",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/audit-it\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "audit-it",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/audit-it.astro",
			"pathname": "/services/audit-it",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/chatbot-ai",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/chatbot-ai\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "chatbot-ai",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/chatbot-ai.astro",
			"pathname": "/services/chatbot-ai",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/cyber-security",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/cyber-security\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "cyber-security",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/cyber-security.astro",
			"pathname": "/services/cyber-security",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/ecommerce-solutions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/ecommerce-solutions\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "ecommerce-solutions",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/ecommerce-solutions.astro",
			"pathname": "/services/ecommerce-solutions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/integrasi-api",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/integrasi-api\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "integrasi-api",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/integrasi-api.astro",
			"pathname": "/services/integrasi-api",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/integrasi-sistem",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/integrasi-sistem\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "integrasi-sistem",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/integrasi-sistem.astro",
			"pathname": "/services/integrasi-sistem",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/konsultasi",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/konsultasi\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "konsultasi",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/konsultasi.astro",
			"pathname": "/services/konsultasi",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/mobile-app-dev",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/mobile-app-dev\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "mobile-app-dev",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/mobile-app-dev.astro",
			"pathname": "/services/mobile-app-dev",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/pengembangan-software",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/pengembangan-software\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "pengembangan-software",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/pengembangan-software.astro",
			"pathname": "/services/pengembangan-software",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/saas-web-dev",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/saas-web-dev\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "saas-web-dev",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/saas-web-dev.astro",
			"pathname": "/services/saas-web-dev",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/website-bisnis",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/website-bisnis\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "website-bisnis",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/website-bisnis.astro",
			"pathname": "/services/website-bisnis",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/website-umkm",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/website-umkm\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "website-umkm",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/website-umkm.astro",
			"pathname": "/services/website-umkm",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services.astro",
			"pathname": "/services",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/solutions",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/solutions\\/?$",
			"segments": [[{
				"content": "solutions",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/solutions.astro",
			"pathname": "/solutions",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/node_DoenjxrB.mjs");
var _page1 = () => import("./chunks/about_DFlr-Y7P.mjs");
var _page2 = () => import("./chunks/login_BBnAgsWH.mjs");
var _page3 = () => import("./chunks/dashboard_B2VvshAo.mjs");
var _page4 = () => import("./chunks/pesanan_BFrG4QjI.mjs");
var _page5 = () => import("./chunks/generate_DEfyPYSv.mjs");
var _page6 = () => import("./chunks/logout_CTsFEVVt.mjs");
var _page7 = () => import("./chunks/upload-license_C00NLjDI.mjs");
var _page8 = () => import("./chunks/verify_CSTEfxRr.mjs");
var _page9 = () => import("./chunks/_filename__CvbyEjbV.mjs");
var _page10 = () => import("./chunks/verify_ph_tYxf6.mjs");
var _page11 = () => import("./chunks/confirm_DtKb0Ioo.mjs");
var _page12 = () => import("./chunks/blog_B4nZX5RG.mjs");
var _page13 = () => import("./chunks/careers_BYo62rGT.mjs");
var _page14 = () => import("./chunks/contact_BH2ujPV2.mjs");
var _page15 = () => import("./chunks/_token__DrU87ykE.mjs");
var _page16 = () => import("./chunks/about_B3eosTC3.mjs");
var _page17 = () => import("./chunks/blog_DbJEiUHv.mjs");
var _page18 = () => import("./chunks/careers_DGRJSziq.mjs");
var _page19 = () => import("./chunks/contact_DpU0FnVD.mjs");
var _page20 = () => import("./chunks/high-concurrency-postgres_UkL69gwj.mjs");
var _page21 = () => import("./chunks/rag-vs-finetuning-enterprise_BRDwaybI.mjs");
var _page22 = () => import("./chunks/zero-trust-microservices_DOCH3nhw.mjs");
var _page23 = () => import("./chunks/insights_DN4Yh8Ay.mjs");
var _page24 = () => import("./chunks/n8n-workflows_BYN53wMp.mjs");
var _page25 = () => import("./chunks/ai-operational-ticketing_CfVAWPNt.mjs");
var _page26 = () => import("./chunks/fintech-zero-trust-audit_D4d9t8SH.mjs");
var _page27 = () => import("./chunks/logistics-api-gateway_D-0TqWVK.mjs");
var _page28 = () => import("./chunks/portfolio_D7IMGrgy.mjs");
var _page29 = () => import("./chunks/ai-automation_DNK09s8J.mjs");
var _page30 = () => import("./chunks/ai-computer-vision_CJvLm6AO.mjs");
var _page31 = () => import("./chunks/audit-it_Bsff2vkR.mjs");
var _page32 = () => import("./chunks/business-website_Weyee1DS.mjs");
var _page33 = () => import("./chunks/chatbot-ai_BIwg1-L9.mjs");
var _page34 = () => import("./chunks/consulting_D7ra7yHS.mjs");
var _page35 = () => import("./chunks/cyber-security_TYvack03.mjs");
var _page36 = () => import("./chunks/ecommerce-solutions_DZr3JdXo.mjs");
var _page37 = () => import("./chunks/integrasi-api_Bazo4ZuK.mjs");
var _page38 = () => import("./chunks/mobile-app-dev_DBfxkKxo.mjs");
var _page39 = () => import("./chunks/saas-web-dev_CQvfMytP.mjs");
var _page40 = () => import("./chunks/software-development_COmxrPmg.mjs");
var _page41 = () => import("./chunks/system-integration_BRD82yca.mjs");
var _page42 = () => import("./chunks/website-bisnis_C9aOJxj5.mjs");
var _page43 = () => import("./chunks/services_Cq3kQpuz.mjs");
var _page44 = () => import("./chunks/solutions_CDdKPtV3.mjs");
var _page45 = () => import("./chunks/index_ErNMFdeV.mjs");
var _page46 = () => import("./chunks/high-concurrency-postgres_DkpEB2Xh.mjs");
var _page47 = () => import("./chunks/rag-vs-finetuning-enterprise_BnloZ9SV.mjs");
var _page48 = () => import("./chunks/zero-trust-microservices_BcXmbdKs.mjs");
var _page49 = () => import("./chunks/insights_DbxzGsFu.mjs");
var _page50 = () => import("./chunks/n8n-workflows_CH0_b8C7.mjs");
var _page51 = () => import("./chunks/ai-operational-ticketing_-HZStdY2.mjs");
var _page52 = () => import("./chunks/fintech-zero-trust-audit_B1ZA43or.mjs");
var _page53 = () => import("./chunks/logistics-api-gateway_DA2dLaG9.mjs");
var _page54 = () => import("./chunks/portfolio_BYpS8n2Y.mjs");
var _page55 = () => import("./chunks/pembayaran_DBAEh_cP.mjs");
var _page56 = () => import("./chunks/_order_code__8X8ypI-j.mjs");
var _page57 = () => import("./chunks/pesan_BL6eScDG.mjs");
var _page58 = () => import("./chunks/_slug__CXDrF0uw.mjs");
var _page59 = () => import("./chunks/produk-digital_X-5G5Jad.mjs");
var _page60 = () => import("./chunks/ai-computer-vision_B2d06mvL.mjs");
var _page61 = () => import("./chunks/ai-otomatisasi_gCn6CLM_.mjs");
var _page62 = () => import("./chunks/audit-it_DwfZWhMU.mjs");
var _page63 = () => import("./chunks/chatbot-ai_Bo6uc_28.mjs");
var _page64 = () => import("./chunks/cyber-security_CB981_TS.mjs");
var _page65 = () => import("./chunks/ecommerce-solutions_BclQ6oxo.mjs");
var _page66 = () => import("./chunks/integrasi-api_D_X-HQTz.mjs");
var _page67 = () => import("./chunks/integrasi-sistem_Das1vf9z.mjs");
var _page68 = () => import("./chunks/konsultasi_Blu0kbFz.mjs");
var _page69 = () => import("./chunks/mobile-app-dev_Be2WHviM.mjs");
var _page70 = () => import("./chunks/pengembangan-software_C-C5N7tB.mjs");
var _page71 = () => import("./chunks/saas-web-dev_CRUYBdTw.mjs");
var _page72 = () => import("./chunks/website-bisnis_DcPM_8gy.mjs");
var _page73 = () => import("./chunks/website-umkm_Ma4D_vxd.mjs");
var _page74 = () => import("./chunks/services_DWRAjyPW.mjs");
var _page75 = () => import("./chunks/solutions_CA500XCI.mjs");
var _page76 = () => import("./chunks/index_oTzifzI3.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/astro/dist/assets/endpoint/node.js", _page0],
	["src/pages/about.astro", _page1],
	["src/pages/admin/login.astro", _page2],
	["src/pages/admin/produk-digital/dashboard.astro", _page3],
	["src/pages/admin/produk-digital/pesanan.astro", _page4],
	["src/pages/api/admin/license/generate.ts", _page5],
	["src/pages/api/admin/logout.ts", _page6],
	["src/pages/api/admin/orders/[id]/upload-license.ts", _page7],
	["src/pages/api/admin/orders/[id]/verify.ts", _page8],
	["src/pages/api/download/license/[filename].ts", _page9],
	["src/pages/api/download/verify.ts", _page10],
	["src/pages/api/orders/[id]/confirm.ts", _page11],
	["src/pages/blog.astro", _page12],
	["src/pages/careers.astro", _page13],
	["src/pages/contact.astro", _page14],
	["src/pages/download/[token].astro", _page15],
	["src/pages/en/about.astro", _page16],
	["src/pages/en/blog.astro", _page17],
	["src/pages/en/careers.astro", _page18],
	["src/pages/en/contact.astro", _page19],
	["src/pages/en/insights/high-concurrency-postgres.astro", _page20],
	["src/pages/en/insights/rag-vs-finetuning-enterprise.astro", _page21],
	["src/pages/en/insights/zero-trust-microservices.astro", _page22],
	["src/pages/en/insights.astro", _page23],
	["src/pages/en/n8n-workflows.astro", _page24],
	["src/pages/en/portfolio/ai-operational-ticketing.astro", _page25],
	["src/pages/en/portfolio/fintech-zero-trust-audit.astro", _page26],
	["src/pages/en/portfolio/logistics-api-gateway.astro", _page27],
	["src/pages/en/portfolio.astro", _page28],
	["src/pages/en/services/ai-automation.astro", _page29],
	["src/pages/en/services/ai-computer-vision.astro", _page30],
	["src/pages/en/services/audit-it.astro", _page31],
	["src/pages/en/services/business-website.astro", _page32],
	["src/pages/en/services/chatbot-ai.astro", _page33],
	["src/pages/en/services/consulting.astro", _page34],
	["src/pages/en/services/cyber-security.astro", _page35],
	["src/pages/en/services/ecommerce-solutions.astro", _page36],
	["src/pages/en/services/integrasi-api.astro", _page37],
	["src/pages/en/services/mobile-app-dev.astro", _page38],
	["src/pages/en/services/saas-web-dev.astro", _page39],
	["src/pages/en/services/software-development.astro", _page40],
	["src/pages/en/services/system-integration.astro", _page41],
	["src/pages/en/services/website-bisnis.astro", _page42],
	["src/pages/en/services.astro", _page43],
	["src/pages/en/solutions.astro", _page44],
	["src/pages/en/index.astro", _page45],
	["src/pages/insights/high-concurrency-postgres.astro", _page46],
	["src/pages/insights/rag-vs-finetuning-enterprise.astro", _page47],
	["src/pages/insights/zero-trust-microservices.astro", _page48],
	["src/pages/insights.astro", _page49],
	["src/pages/n8n-workflows.astro", _page50],
	["src/pages/portfolio/ai-operational-ticketing.astro", _page51],
	["src/pages/portfolio/fintech-zero-trust-audit.astro", _page52],
	["src/pages/portfolio/logistics-api-gateway.astro", _page53],
	["src/pages/portfolio.astro", _page54],
	["src/pages/produk-digital/pesanan/[order_code]/pembayaran.astro", _page55],
	["src/pages/produk-digital/pesanan/[order_code].astro", _page56],
	["src/pages/produk-digital/[slug]/pesan.astro", _page57],
	["src/pages/produk-digital/[slug].astro", _page58],
	["src/pages/produk-digital.astro", _page59],
	["src/pages/services/ai-computer-vision.astro", _page60],
	["src/pages/services/ai-otomatisasi.astro", _page61],
	["src/pages/services/audit-it.astro", _page62],
	["src/pages/services/chatbot-ai.astro", _page63],
	["src/pages/services/cyber-security.astro", _page64],
	["src/pages/services/ecommerce-solutions.astro", _page65],
	["src/pages/services/integrasi-api.astro", _page66],
	["src/pages/services/integrasi-sistem.astro", _page67],
	["src/pages/services/konsultasi.astro", _page68],
	["src/pages/services/mobile-app-dev.astro", _page69],
	["src/pages/services/pengembangan-software.astro", _page70],
	["src/pages/services/saas-web-dev.astro", _page71],
	["src/pages/services/website-bisnis.astro", _page72],
	["src/pages/services/website-umkm.astro", _page73],
	["src/pages/services.astro", _page74],
	["src/pages/solutions.astro", _page75],
	["src/pages/index.astro", _page76]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/","cacheDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/node_modules/.astro/","outDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/dist/","srcDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/src/","publicDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/public/","buildClientDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/dist/client/","buildServerDir":"file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/dist/server/","adapterName":"@astrojs/node","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/astro/dist/assets/endpoint/node.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/admin/produk-digital/dashboard","isIndex":false,"type":"page","pattern":"^\\/admin\\/produk-digital\\/dashboard\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/produk-digital/dashboard.astro","pathname":"/admin/produk-digital/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/admin/produk-digital/pesanan","isIndex":false,"type":"page","pattern":"^\\/admin\\/produk-digital\\/pesanan\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"pesanan","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/produk-digital/pesanan.astro","pathname":"/admin/produk-digital/pesanan","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/license/generate","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/license\\/generate\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"license","dynamic":false,"spread":false}],[{"content":"generate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/license/generate.ts","pathname":"/api/admin/license/generate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/logout.ts","pathname":"/api/admin/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/orders/[id]/upload-license","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/orders\\/([^/]+?)\\/upload-license\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"upload-license","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/admin/orders/[id]/upload-license.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/orders/[id]/verify","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/orders\\/([^/]+?)\\/verify\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/admin/orders/[id]/verify.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/download/license/[filename]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/download\\/license\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"download","dynamic":false,"spread":false}],[{"content":"license","dynamic":false,"spread":false}],[{"content":"filename","dynamic":true,"spread":false}]],"params":["filename"],"component":"src/pages/api/download/license/[filename].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/download/verify","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/download\\/verify\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"download","dynamic":false,"spread":false}],[{"content":"verify","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/download/verify.ts","pathname":"/api/download/verify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/orders/[id]/confirm","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/orders\\/([^/]+?)\\/confirm\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"confirm","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/api/orders/[id]/confirm.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".careers-hero[data-astro-cid-updltw2v]{padding:160px 0 80px}.grid-2[data-astro-cid-updltw2v]{grid-template-columns:1fr 1fr;align-items:center;gap:80px;display:grid}.image-placeholder[data-astro-cid-updltw2v]{border-radius:20px;height:400px}.benefits[data-astro-cid-updltw2v]{margin-top:20px;list-style:none}.benefits[data-astro-cid-updltw2v] li[data-astro-cid-updltw2v]:before{content:\"✓\";color:var(--accent-blue);margin-right:10px;font-weight:900}\n"}],"routeData":{"route":"/careers","isIndex":false,"type":"page","pattern":"^\\/careers\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers.astro","pathname":"/careers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/download/[token]","isIndex":false,"type":"page","pattern":"^\\/download\\/([^/]+?)\\/?$","segments":[[{"content":"download","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/download/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/about","isIndex":false,"type":"page","pattern":"^\\/en\\/about\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/about.astro","pathname":"/en/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/blog","isIndex":false,"type":"page","pattern":"^\\/en\\/blog\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/blog.astro","pathname":"/en/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".careers-hero[data-astro-cid-wpjtygbs]{padding:160px 0 80px}.grid-2[data-astro-cid-wpjtygbs]{grid-template-columns:1fr 1fr;align-items:center;gap:80px;display:grid}.image-placeholder[data-astro-cid-wpjtygbs]{border-radius:20px;height:400px}.benefits[data-astro-cid-wpjtygbs]{margin-top:20px;list-style:none}.benefits[data-astro-cid-wpjtygbs] li[data-astro-cid-wpjtygbs]:before{content:\"✓\";color:var(--accent-blue);margin-right:10px;font-weight:900}\n"}],"routeData":{"route":"/en/careers","isIndex":false,"type":"page","pattern":"^\\/en\\/careers\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/careers.astro","pathname":"/en/careers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/contact","isIndex":false,"type":"page","pattern":"^\\/en\\/contact\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/contact.astro","pathname":"/en/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/insights/high-concurrency-postgres","isIndex":false,"type":"page","pattern":"^\\/en\\/insights\\/high-concurrency-postgres\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"insights","dynamic":false,"spread":false}],[{"content":"high-concurrency-postgres","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/insights/high-concurrency-postgres.astro","pathname":"/en/insights/high-concurrency-postgres","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/insights/rag-vs-finetuning-enterprise","isIndex":false,"type":"page","pattern":"^\\/en\\/insights\\/rag-vs-finetuning-enterprise\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"insights","dynamic":false,"spread":false}],[{"content":"rag-vs-finetuning-enterprise","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/insights/rag-vs-finetuning-enterprise.astro","pathname":"/en/insights/rag-vs-finetuning-enterprise","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/insights/zero-trust-microservices","isIndex":false,"type":"page","pattern":"^\\/en\\/insights\\/zero-trust-microservices\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"insights","dynamic":false,"spread":false}],[{"content":"zero-trust-microservices","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/insights/zero-trust-microservices.astro","pathname":"/en/insights/zero-trust-microservices","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/insights","isIndex":false,"type":"page","pattern":"^\\/en\\/insights\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/insights.astro","pathname":"/en/insights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".node-indicator[data-astro-cid-gm5vy3hn]{background-color:#4cd6ff;width:4px;height:4px;position:absolute;top:0;left:0}.glass-panel[data-astro-cid-gm5vy3hn]{backdrop-filter:blur(12px);background:#1c202699}.gradient-text[data-astro-cid-gm5vy3hn]{background:linear-gradient(135deg,#4cd6ff 0%,#006178 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text}\n"}],"routeData":{"route":"/en/n8n-workflows","isIndex":false,"type":"page","pattern":"^\\/en\\/n8n-workflows\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"n8n-workflows","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/n8n-workflows.astro","pathname":"/en/n8n-workflows","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/portfolio/ai-operational-ticketing","isIndex":false,"type":"page","pattern":"^\\/en\\/portfolio\\/ai-operational-ticketing\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"ai-operational-ticketing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/portfolio/ai-operational-ticketing.astro","pathname":"/en/portfolio/ai-operational-ticketing","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/portfolio/fintech-zero-trust-audit","isIndex":false,"type":"page","pattern":"^\\/en\\/portfolio\\/fintech-zero-trust-audit\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"fintech-zero-trust-audit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/portfolio/fintech-zero-trust-audit.astro","pathname":"/en/portfolio/fintech-zero-trust-audit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/portfolio/logistics-api-gateway","isIndex":false,"type":"page","pattern":"^\\/en\\/portfolio\\/logistics-api-gateway\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"logistics-api-gateway","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/portfolio/logistics-api-gateway.astro","pathname":"/en/portfolio/logistics-api-gateway","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/portfolio","isIndex":false,"type":"page","pattern":"^\\/en\\/portfolio\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/portfolio.astro","pathname":"/en/portfolio","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services/ai-automation","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/ai-automation\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"ai-automation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/ai-automation.astro","pathname":"/en/services/ai-automation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/ai-computer-vision","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/ai-computer-vision\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"ai-computer-vision","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/ai-computer-vision.astro","pathname":"/en/services/ai-computer-vision","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services/audit-it","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/audit-it\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"audit-it","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/audit-it.astro","pathname":"/en/services/audit-it","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/business-website","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/business-website\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"business-website","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/business-website.astro","pathname":"/en/services/business-website","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/chatbot-ai","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/chatbot-ai\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"chatbot-ai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/chatbot-ai.astro","pathname":"/en/services/chatbot-ai","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/consulting","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/consulting\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"consulting","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/consulting.astro","pathname":"/en/services/consulting","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services/cyber-security","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/cyber-security\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"cyber-security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/cyber-security.astro","pathname":"/en/services/cyber-security","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/ecommerce-solutions","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/ecommerce-solutions\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"ecommerce-solutions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/ecommerce-solutions.astro","pathname":"/en/services/ecommerce-solutions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/integrasi-api","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/integrasi-api\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"integrasi-api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/integrasi-api.astro","pathname":"/en/services/integrasi-api","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/mobile-app-dev","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/mobile-app-dev\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"mobile-app-dev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/mobile-app-dev.astro","pathname":"/en/services/mobile-app-dev","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/saas-web-dev","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/saas-web-dev\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"saas-web-dev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/saas-web-dev.astro","pathname":"/en/services/saas-web-dev","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services/software-development","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/software-development\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"software-development","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/software-development.astro","pathname":"/en/services/software-development","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services/system-integration","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/system-integration\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"system-integration","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/system-integration.astro","pathname":"/en/services/system-integration","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/en/services/website-bisnis","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/website-bisnis\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}],[{"content":"website-bisnis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/website-bisnis.astro","pathname":"/en/services/website-bisnis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en/services","isIndex":false,"type":"page","pattern":"^\\/en\\/services\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services.astro","pathname":"/en/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".glass-panel[data-astro-cid-jak2je3n]{backdrop-filter:blur(20px);background:#10141a99}.bg-grid[data-astro-cid-jak2je3n]{background-image:linear-gradient(90deg,#4cd6ff0d 1px,#0000 1px),linear-gradient(#4cd6ff0d 1px,#0000 1px);background-size:40px 40px}\n"}],"routeData":{"route":"/en/solutions","isIndex":false,"type":"page","pattern":"^\\/en\\/solutions\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"solutions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/solutions.astro","pathname":"/en/solutions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/insights/high-concurrency-postgres","isIndex":false,"type":"page","pattern":"^\\/insights\\/high-concurrency-postgres\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}],[{"content":"high-concurrency-postgres","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/high-concurrency-postgres.astro","pathname":"/insights/high-concurrency-postgres","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/insights/rag-vs-finetuning-enterprise","isIndex":false,"type":"page","pattern":"^\\/insights\\/rag-vs-finetuning-enterprise\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}],[{"content":"rag-vs-finetuning-enterprise","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/rag-vs-finetuning-enterprise.astro","pathname":"/insights/rag-vs-finetuning-enterprise","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/insights/zero-trust-microservices","isIndex":false,"type":"page","pattern":"^\\/insights\\/zero-trust-microservices\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}],[{"content":"zero-trust-microservices","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights/zero-trust-microservices.astro","pathname":"/insights/zero-trust-microservices","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/insights","isIndex":false,"type":"page","pattern":"^\\/insights\\/?$","segments":[[{"content":"insights","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/insights.astro","pathname":"/insights","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".node-indicator[data-astro-cid-7shhhr4u]{background-color:#4cd6ff;width:4px;height:4px;position:absolute;top:0;left:0}.glass-panel[data-astro-cid-7shhhr4u]{backdrop-filter:blur(12px);background:#1c202699}.gradient-text[data-astro-cid-7shhhr4u]{background:linear-gradient(135deg,#4cd6ff 0%,#006178 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text}\n"}],"routeData":{"route":"/n8n-workflows","isIndex":false,"type":"page","pattern":"^\\/n8n-workflows\\/?$","segments":[[{"content":"n8n-workflows","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/n8n-workflows.astro","pathname":"/n8n-workflows","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/portfolio/ai-operational-ticketing","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/ai-operational-ticketing\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"ai-operational-ticketing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio/ai-operational-ticketing.astro","pathname":"/portfolio/ai-operational-ticketing","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/portfolio/fintech-zero-trust-audit","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/fintech-zero-trust-audit\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"fintech-zero-trust-audit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio/fintech-zero-trust-audit.astro","pathname":"/portfolio/fintech-zero-trust-audit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/portfolio/logistics-api-gateway","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/logistics-api-gateway\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"logistics-api-gateway","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio/logistics-api-gateway.astro","pathname":"/portfolio/logistics-api-gateway","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/portfolio","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/produk-digital/pesanan/[order_code]/pembayaran","isIndex":false,"type":"page","pattern":"^\\/produk-digital\\/pesanan\\/([^/]+?)\\/pembayaran\\/?$","segments":[[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"pesanan","dynamic":false,"spread":false}],[{"content":"order_code","dynamic":true,"spread":false}],[{"content":"pembayaran","dynamic":false,"spread":false}]],"params":["order_code"],"component":"src/pages/produk-digital/pesanan/[order_code]/pembayaran.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/produk-digital/pesanan/[order_code]","isIndex":false,"type":"page","pattern":"^\\/produk-digital\\/pesanan\\/([^/]+?)\\/?$","segments":[[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"pesanan","dynamic":false,"spread":false}],[{"content":"order_code","dynamic":true,"spread":false}]],"params":["order_code"],"component":"src/pages/produk-digital/pesanan/[order_code].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/produk-digital/[slug]/pesan","isIndex":false,"type":"page","pattern":"^\\/produk-digital\\/([^/]+?)\\/pesan\\/?$","segments":[[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"pesan","dynamic":false,"spread":false}]],"params":["slug"],"component":"src/pages/produk-digital/[slug]/pesan.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/produk-digital/[slug]","isIndex":false,"type":"page","pattern":"^\\/produk-digital\\/([^/]+?)\\/?$","segments":[[{"content":"produk-digital","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/produk-digital/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/produk-digital","isIndex":false,"type":"page","pattern":"^\\/produk-digital\\/?$","segments":[[{"content":"produk-digital","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/produk-digital.astro","pathname":"/produk-digital","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/ai-computer-vision","isIndex":false,"type":"page","pattern":"^\\/services\\/ai-computer-vision\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"ai-computer-vision","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/ai-computer-vision.astro","pathname":"/services/ai-computer-vision","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services/ai-otomatisasi","isIndex":false,"type":"page","pattern":"^\\/services\\/ai-otomatisasi\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"ai-otomatisasi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/ai-otomatisasi.astro","pathname":"/services/ai-otomatisasi","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services/audit-it","isIndex":false,"type":"page","pattern":"^\\/services\\/audit-it\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"audit-it","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/audit-it.astro","pathname":"/services/audit-it","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/chatbot-ai","isIndex":false,"type":"page","pattern":"^\\/services\\/chatbot-ai\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"chatbot-ai","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/chatbot-ai.astro","pathname":"/services/chatbot-ai","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services/cyber-security","isIndex":false,"type":"page","pattern":"^\\/services\\/cyber-security\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"cyber-security","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/cyber-security.astro","pathname":"/services/cyber-security","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/ecommerce-solutions","isIndex":false,"type":"page","pattern":"^\\/services\\/ecommerce-solutions\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"ecommerce-solutions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/ecommerce-solutions.astro","pathname":"/services/ecommerce-solutions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/integrasi-api","isIndex":false,"type":"page","pattern":"^\\/services\\/integrasi-api\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"integrasi-api","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/integrasi-api.astro","pathname":"/services/integrasi-api","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services/integrasi-sistem","isIndex":false,"type":"page","pattern":"^\\/services\\/integrasi-sistem\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"integrasi-sistem","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/integrasi-sistem.astro","pathname":"/services/integrasi-sistem","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/konsultasi","isIndex":false,"type":"page","pattern":"^\\/services\\/konsultasi\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"konsultasi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/konsultasi.astro","pathname":"/services/konsultasi","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/mobile-app-dev","isIndex":false,"type":"page","pattern":"^\\/services\\/mobile-app-dev\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"mobile-app-dev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/mobile-app-dev.astro","pathname":"/services/mobile-app-dev","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services/pengembangan-software","isIndex":false,"type":"page","pattern":"^\\/services\\/pengembangan-software\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"pengembangan-software","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/pengembangan-software.astro","pathname":"/services/pengembangan-software","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/saas-web-dev","isIndex":false,"type":"page","pattern":"^\\/services\\/saas-web-dev\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"saas-web-dev","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/saas-web-dev.astro","pathname":"/services/saas-web-dev","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes marquee{0%{transform:translate(0)}to{transform:translate(calc(-50% - 1.5rem))}}.animate-marquee[data-astro-cid-sinx5f5j]{width:max-content;animation:25s linear infinite marquee}:root{--app-surface-container-low:#f8fafc}:root.dark{--app-surface-container-low:#111827}\n"},{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":"@keyframes shimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}.shimmer[data-astro-cid-todj5d2e]{position:relative;overflow:hidden}.shimmer[data-astro-cid-todj5d2e]:after{content:\"\";background:linear-gradient(90deg,#0000,#fff3,#0000);width:100%;height:100%;animation:2s infinite shimmer;position:absolute;top:0;left:0}\n.faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/website-bisnis","isIndex":false,"type":"page","pattern":"^\\/services\\/website-bisnis\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"website-bisnis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/website-bisnis.astro","pathname":"/services/website-bisnis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":"@keyframes shimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}.shimmer[data-astro-cid-todj5d2e]{position:relative;overflow:hidden}.shimmer[data-astro-cid-todj5d2e]:after{content:\"\";background:linear-gradient(90deg,#0000,#fff3,#0000);width:100%;height:100%;animation:2s infinite shimmer;position:absolute;top:0;left:0}\n.faq-answer[data-astro-cid-7synugci]{transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease-in-out}.faq-icon[data-astro-cid-7synugci]{transition:transform .4s cubic-bezier(.4,0,.2,1),color .3s}.animate-reveal[data-astro-cid-7synugci]{opacity:0;animation:.8s cubic-bezier(.2,.8,.2,1) forwards reveal-up;transform:translateY(20px)}@keyframes reveal-up{to{opacity:1;transform:translateY(0)}}.partner-cta-section[data-astro-cid-5qozopxs]:after{content:\"\";pointer-events:none;z-index:5;background-image:repeating-linear-gradient(0deg,#0000,#0000 2px,#00000008 2px 4px);position:absolute;inset:0}.service-rec-card[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low);border:1px solid var(--app-outline-variant)}.service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000026}:root.dark .service-rec-card[data-astro-cid-5qozopxs]:hover{box-shadow:0 20px 40px -12px #00000080}.service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.85}:root.dark .service-rec-card[data-astro-cid-5qozopxs] img[data-astro-cid-5qozopxs]{opacity:.65}.card-body[data-astro-cid-5qozopxs]{background-color:var(--app-surface-container-low)}.card-title[data-astro-cid-5qozopxs]{color:var(--app-on-surface)}.service-rec-card[data-astro-cid-5qozopxs]:hover .card-title[data-astro-cid-5qozopxs]{color:var(--app-primary-fixed-dim)}.card-desc[data-astro-cid-5qozopxs]{color:var(--app-on-surface-variant)}.category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#0369a1;backdrop-filter:blur(12px);background-color:#0284c733;border:1px solid #0284c74d}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=ai]{color:#4cd6ff;background-color:#4cd6ff33;border-color:#4cd6ff4d}.category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#047857;backdrop-filter:blur(12px);background-color:#0596692e;border:1px solid #05966947}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=infra]{color:#6ee7b7;background-color:#34d3992e;border-color:#34d39947}.category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#6d28d9;backdrop-filter:blur(12px);background-color:#7c3aed29;border:1px solid #7c3aed40}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=dev]{color:#c4b5fd;background-color:#a78bfa2e;border-color:#a78bfa47}.category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#be123c;backdrop-filter:blur(12px);background-color:#e11d4824;border:1px solid #e11d4838}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=consult]{color:#fda4af;background-color:#fb71852e;border-color:#fb718547}.category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#b45309;backdrop-filter:blur(12px);background-color:#d9770629;border:1px solid #d9770640}:root.dark .category-badge[data-astro-cid-5qozopxs][data-color=website]{color:#fcd34d;background-color:#fbbf242e;border-color:#fbbf2447}\n"}],"routeData":{"route":"/services/website-umkm","isIndex":false,"type":"page","pattern":"^\\/services\\/website-umkm\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"website-umkm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/website-umkm.astro","pathname":"/services/website-umkm","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"},{"type":"inline","content":".glass-panel[data-astro-cid-p7bpkpvw]{backdrop-filter:blur(20px);background:#10141a99}.bg-grid[data-astro-cid-p7bpkpvw]{background-image:linear-gradient(90deg,#4cd6ff0d 1px,#0000 1px),linear-gradient(#4cd6ff0d 1px,#0000 1px);background-size:40px 40px}\n"}],"routeData":{"route":"/solutions","isIndex":false,"type":"page","pattern":"^\\/solutions\\/?$","segments":[[{"content":"solutions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solutions.astro","pathname":"/solutions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/BaseLayout.7jk86UV8.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://veintech.id","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/portfolio/ai-operational-ticketing.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio/ai-operational-ticketing.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/portfolio/fintech-zero-trust-audit.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio/fintech-zero-trust-audit.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/portfolio/logistics-api-gateway.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio/logistics-api-gateway.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights/high-concurrency-postgres.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/insights/high-concurrency-postgres.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights/rag-vs-finetuning-enterprise.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/insights/rag-vs-finetuning-enterprise.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights/zero-trust-microservices.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/insights/zero-trust-microservices.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/ai-automation.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/ai-otomatisasi.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/audit-it.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/audit-it.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/cyber-security.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/cyber-security.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/software-development.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/pengembangan-software.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/system-integration.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/integrasi-sistem.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/produk-digital/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/produk-digital/pesanan.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/careers.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/download/[token].astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/about.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/blog.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/careers.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/contact.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/insights.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/n8n-workflows.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/portfolio.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/ai-computer-vision.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/business-website.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/chatbot-ai.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/consulting.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/ecommerce-solutions.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/integrasi-api.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/mobile-app-dev.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/saas-web-dev.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/services/website-bisnis.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/en/solutions.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/insights.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/n8n-workflows.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/portfolio.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/[slug]/pesan.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/pesanan/[order_code].astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/produk-digital/pesanan/[order_code]/pembayaran.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/ai-computer-vision.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/chatbot-ai.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/ecommerce-solutions.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/integrasi-api.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/konsultasi.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/mobile-app-dev.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/saas-web-dev.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/website-bisnis.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/services/website-umkm.astro",{"propagation":"none","containsHead":true}],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/solutions.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.DkevzCz4.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_DS5V7T-N.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","@astrojs/node/server.js":"entry.mjs","\u0000virtual:astro:page:src/pages/api/download/license/[filename]@_@ts":"chunks/_filename__CvbyEjbV.mjs","\u0000virtual:astro:page:src/pages/produk-digital/pesanan/[order_code]@_@astro":"chunks/_order_code__8X8ypI-j.mjs","\u0000virtual:astro:page:src/pages/produk-digital/[slug]@_@astro":"chunks/_slug__CXDrF0uw.mjs","\u0000virtual:astro:page:src/pages/download/[token]@_@astro":"chunks/_token__DrU87ykE.mjs","\u0000virtual:astro:page:src/pages/en/about@_@astro":"chunks/about_B3eosTC3.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_DFlr-Y7P.mjs","\u0000virtual:astro:page:src/pages/en/services/ai-automation@_@astro":"chunks/ai-automation_DNK09s8J.mjs","\u0000virtual:astro:page:src/pages/services/ai-computer-vision@_@astro":"chunks/ai-computer-vision_B2d06mvL.mjs","\u0000virtual:astro:page:src/pages/en/services/ai-computer-vision@_@astro":"chunks/ai-computer-vision_CJvLm6AO.mjs","\u0000virtual:astro:page:src/pages/portfolio/ai-operational-ticketing@_@astro":"chunks/ai-operational-ticketing_-HZStdY2.mjs","\u0000virtual:astro:page:src/pages/en/portfolio/ai-operational-ticketing@_@astro":"chunks/ai-operational-ticketing_CfVAWPNt.mjs","\u0000virtual:astro:page:src/pages/services/ai-otomatisasi@_@astro":"chunks/ai-otomatisasi_gCn6CLM_.mjs","\u0000virtual:astro:page:src/pages/en/services/audit-it@_@astro":"chunks/audit-it_Bsff2vkR.mjs","\u0000virtual:astro:page:src/pages/services/audit-it@_@astro":"chunks/audit-it_DwfZWhMU.mjs","\u0000virtual:astro:page:src/pages/blog@_@astro":"chunks/blog_B4nZX5RG.mjs","\u0000virtual:astro:page:src/pages/en/blog@_@astro":"chunks/blog_DbJEiUHv.mjs","\u0000virtual:astro:page:src/pages/en/services/business-website@_@astro":"chunks/business-website_Weyee1DS.mjs","\u0000virtual:astro:page:src/pages/careers@_@astro":"chunks/careers_BYo62rGT.mjs","\u0000virtual:astro:page:src/pages/en/careers@_@astro":"chunks/careers_DGRJSziq.mjs","\u0000virtual:astro:page:src/pages/en/services/chatbot-ai@_@astro":"chunks/chatbot-ai_BIwg1-L9.mjs","\u0000virtual:astro:page:src/pages/services/chatbot-ai@_@astro":"chunks/chatbot-ai_Bo6uc_28.mjs","\u0000virtual:astro:page:src/pages/api/orders/[id]/confirm@_@ts":"chunks/confirm_DtKb0Ioo.mjs","\u0000virtual:astro:page:src/pages/en/services/consulting@_@astro":"chunks/consulting_D7ra7yHS.mjs","\u0000virtual:astro:page:src/pages/contact@_@astro":"chunks/contact_BH2ujPV2.mjs","\u0000virtual:astro:page:src/pages/en/contact@_@astro":"chunks/contact_DpU0FnVD.mjs","\u0000virtual:astro:page:src/pages/services/cyber-security@_@astro":"chunks/cyber-security_CB981_TS.mjs","\u0000virtual:astro:page:src/pages/en/services/cyber-security@_@astro":"chunks/cyber-security_TYvack03.mjs","\u0000virtual:astro:page:src/pages/admin/produk-digital/dashboard@_@astro":"chunks/dashboard_B2VvshAo.mjs","\u0000virtual:astro:page:src/pages/services/ecommerce-solutions@_@astro":"chunks/ecommerce-solutions_BclQ6oxo.mjs","\u0000virtual:astro:page:src/pages/en/services/ecommerce-solutions@_@astro":"chunks/ecommerce-solutions_DZr3JdXo.mjs","\u0000virtual:astro:page:src/pages/portfolio/fintech-zero-trust-audit@_@astro":"chunks/fintech-zero-trust-audit_B1ZA43or.mjs","\u0000virtual:astro:page:src/pages/en/portfolio/fintech-zero-trust-audit@_@astro":"chunks/fintech-zero-trust-audit_D4d9t8SH.mjs","\u0000virtual:astro:page:src/pages/api/admin/license/generate@_@ts":"chunks/generate_DEfyPYSv.mjs","\u0000virtual:astro:page:src/pages/insights/high-concurrency-postgres@_@astro":"chunks/high-concurrency-postgres_DkpEB2Xh.mjs","\u0000virtual:astro:page:src/pages/en/insights/high-concurrency-postgres@_@astro":"chunks/high-concurrency-postgres_UkL69gwj.mjs","\u0000virtual:astro:page:src/pages/en/index@_@astro":"chunks/index_ErNMFdeV.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_oTzifzI3.mjs","\u0000virtual:astro:page:src/pages/en/insights@_@astro":"chunks/insights_DN4Yh8Ay.mjs","\u0000virtual:astro:page:src/pages/insights@_@astro":"chunks/insights_DbxzGsFu.mjs","\u0000virtual:astro:page:src/pages/en/services/integrasi-api@_@astro":"chunks/integrasi-api_Bazo4ZuK.mjs","\u0000virtual:astro:page:src/pages/services/integrasi-api@_@astro":"chunks/integrasi-api_D_X-HQTz.mjs","\u0000virtual:astro:page:src/pages/services/integrasi-sistem@_@astro":"chunks/integrasi-sistem_Das1vf9z.mjs","\u0000virtual:astro:page:src/pages/services/konsultasi@_@astro":"chunks/konsultasi_Blu0kbFz.mjs","\u0000virtual:astro:page:src/pages/admin/login@_@astro":"chunks/login_BBnAgsWH.mjs","\u0000virtual:astro:page:src/pages/en/portfolio/logistics-api-gateway@_@astro":"chunks/logistics-api-gateway_D-0TqWVK.mjs","\u0000virtual:astro:page:src/pages/portfolio/logistics-api-gateway@_@astro":"chunks/logistics-api-gateway_DA2dLaG9.mjs","\u0000virtual:astro:page:src/pages/api/admin/logout@_@ts":"chunks/logout_CTsFEVVt.mjs","\u0000virtual:astro:page:src/pages/services/mobile-app-dev@_@astro":"chunks/mobile-app-dev_Be2WHviM.mjs","\u0000virtual:astro:page:src/pages/en/services/mobile-app-dev@_@astro":"chunks/mobile-app-dev_DBfxkKxo.mjs","\u0000virtual:astro:page:src/pages/en/n8n-workflows@_@astro":"chunks/n8n-workflows_BYN53wMp.mjs","\u0000virtual:astro:page:src/pages/n8n-workflows@_@astro":"chunks/n8n-workflows_CH0_b8C7.mjs","\u0000virtual:astro:page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_DoenjxrB.mjs","\u0000virtual:astro:page:src/pages/produk-digital/pesanan/[order_code]/pembayaran@_@astro":"chunks/pembayaran_DBAEh_cP.mjs","\u0000virtual:astro:page:src/pages/services/pengembangan-software@_@astro":"chunks/pengembangan-software_C-C5N7tB.mjs","\u0000virtual:astro:page:src/pages/produk-digital/[slug]/pesan@_@astro":"chunks/pesan_BL6eScDG.mjs","\u0000virtual:astro:page:src/pages/admin/produk-digital/pesanan@_@astro":"chunks/pesanan_BFrG4QjI.mjs","\u0000virtual:astro:page:src/pages/portfolio@_@astro":"chunks/portfolio_BYpS8n2Y.mjs","\u0000virtual:astro:page:src/pages/en/portfolio@_@astro":"chunks/portfolio_D7IMGrgy.mjs","\u0000virtual:astro:page:src/pages/produk-digital@_@astro":"chunks/produk-digital_X-5G5Jad.mjs","\u0000virtual:astro:page:src/pages/en/insights/rag-vs-finetuning-enterprise@_@astro":"chunks/rag-vs-finetuning-enterprise_BRDwaybI.mjs","\u0000virtual:astro:page:src/pages/insights/rag-vs-finetuning-enterprise@_@astro":"chunks/rag-vs-finetuning-enterprise_BnloZ9SV.mjs","\u0000virtual:astro:page:src/pages/en/services/saas-web-dev@_@astro":"chunks/saas-web-dev_CQvfMytP.mjs","\u0000virtual:astro:page:src/pages/services/saas-web-dev@_@astro":"chunks/saas-web-dev_CRUYBdTw.mjs","\u0000virtual:astro:page:src/pages/en/services@_@astro":"chunks/services_Cq3kQpuz.mjs","\u0000virtual:astro:page:src/pages/services@_@astro":"chunks/services_DWRAjyPW.mjs","/Users/telkomdev-rahadi/Documents/VeinTech/Web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp__bMWWZVB.mjs","\u0000virtual:astro:page:src/pages/en/services/software-development@_@astro":"chunks/software-development_COmxrPmg.mjs","\u0000virtual:astro:page:src/pages/solutions@_@astro":"chunks/solutions_CA500XCI.mjs","\u0000virtual:astro:page:src/pages/en/solutions@_@astro":"chunks/solutions_CDdKPtV3.mjs","\u0000virtual:astro:page:src/pages/en/services/system-integration@_@astro":"chunks/system-integration_BRD82yca.mjs","\u0000virtual:astro:page:src/pages/api/admin/orders/[id]/upload-license@_@ts":"chunks/upload-license_C00NLjDI.mjs","\u0000virtual:astro:page:src/pages/api/admin/orders/[id]/verify@_@ts":"chunks/verify_CSTEfxRr.mjs","\u0000virtual:astro:page:src/pages/api/download/verify@_@ts":"chunks/verify_ph_tYxf6.mjs","\u0000virtual:astro:page:src/pages/en/services/website-bisnis@_@astro":"chunks/website-bisnis_C9aOJxj5.mjs","\u0000virtual:astro:page:src/pages/services/website-bisnis@_@astro":"chunks/website-bisnis_DcPM_8gy.mjs","\u0000virtual:astro:page:src/pages/services/website-umkm@_@astro":"chunks/website-umkm_Ma4D_vxd.mjs","\u0000virtual:astro:page:src/pages/insights/zero-trust-microservices@_@astro":"chunks/zero-trust-microservices_BcXmbdKs.mjs","\u0000virtual:astro:page:src/pages/en/insights/zero-trust-microservices@_@astro":"chunks/zero-trust-microservices_DOCH3nhw.mjs","/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/FlashSaleBanner.astro?astro&type=script&index=0&lang.ts":"_astro/FlashSaleBanner.astro_astro_type_script_index_0_lang.B7B35ypN.js","/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/produk-digital/ProdukDetailContent.astro?astro&type=script&index=0&lang.ts":"_astro/ProdukDetailContent.astro_astro_type_script_index_0_lang.DA-kgpWz.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/FlashSaleBanner.astro?astro&type=script&index=0&lang.ts","function e(){let e=document.getElementById(`countdown-timer`);if(!e)return;let t=parseInt(e.dataset.totalSeconds||`171000`)*1e3,n=document.getElementById(`hours`),r=document.getElementById(`minutes`),i=document.getElementById(`seconds`);function a(){let e=t-Date.now()%t,a=Math.floor(e/1e3),o=Math.floor(a/3600),s=Math.floor(a%3600/60),c=a%60;n&&(n.textContent=o.toString().padStart(2,`0`)),r&&(r.textContent=s.toString().padStart(2,`0`)),i&&(i.textContent=c.toString().padStart(2,`0`))}setInterval(a,1e3),a()}document.addEventListener(`astro:page-load`,e),e();"],["/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/produk-digital/ProdukDetailContent.astro?astro&type=script&index=0&lang.ts","function e(){let e=document.getElementById(`main-preview-img`),t=document.getElementById(`prev-slide`),n=document.getElementById(`next-slide`),r=document.querySelectorAll(`.gallery-thumb`),i=document.getElementById(`lightbox-modal`),a=document.getElementById(`lightbox-main-img`),o=document.getElementById(`lightbox-prev`),s=document.getElementById(`lightbox-next`),c=document.querySelectorAll(`.lightbox-thumb`),l=document.getElementById(`close-lightbox`);if(!e||!r.length)return;let u=0,d=t=>{t<0&&(t=r.length-1),t>=r.length&&(t=0),u=t,e.src=r[u].src,a&&(a.src=r[u].src),r.forEach((e,t)=>{t===u?(e.classList.add(`border-blue-500`,`border-2`),e.classList.remove(`border-slate-200`,`dark:border-slate-700`,`border`)):(e.classList.remove(`border-blue-500`,`border-2`),e.classList.add(`border-slate-200`,`dark:border-slate-700`,`border`))}),c.forEach((e,t)=>{t===u?(e.classList.add(`border-blue-500`,`opacity-100`),e.classList.remove(`border-transparent`,`opacity-50`)):(e.classList.remove(`border-blue-500`,`opacity-100`),e.classList.add(`border-transparent`,`opacity-50`))}),r[u].scrollIntoView&&r[u].scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`center`}),c[u]&&c[u].scrollIntoView&&c[u].scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`center`})};r.forEach((e,t)=>{e.addEventListener(`click`,()=>d(t))}),c.length>0&&c.forEach((e,t)=>{e.addEventListener(`click`,()=>d(t))}),t&&t.addEventListener(`click`,()=>d(u-1)),n&&n.addEventListener(`click`,()=>d(u+1)),o&&o.addEventListener(`click`,()=>d(u-1)),s&&s.addEventListener(`click`,()=>d(u+1)),e.parentElement.addEventListener(`click`,e=>{e.target.closest(`button`)||i&&(i.classList.remove(`hidden`),i.classList.add(`flex`),document.body.style.overflow=`hidden`,d(u))}),l&&l.addEventListener(`click`,()=>{i.classList.add(`hidden`),i.classList.remove(`flex`),document.body.style.overflow=``})}document.addEventListener(`DOMContentLoaded`,()=>{e()}),document.addEventListener(`astro:page-load`,()=>{e()});"]],"assets":["/favicon.ico","/favicon.svg","/logo.png","/logo.svg","/opengraph.png","/robots.txt","/veintools_logo.png","/produk/veintools/Screenshot 2026-07-21 at 09.02.16.png","/produk/veintools/photoproduk.png","/produk/veintools/photoproduk1.png","/produk/veintools/photoproduk2.png","/produk/veintools/photoproduk3.png","/produk/veintools/photoproduk4.png","/produk/veintools/photoproduk5.png","/produk/veintools/photoproduk6.png","/produk/veintools/photoproduk7.png","/produk/veintools/photoproduk8.png","/uploads/licenses/VD-20260721-5E548D.veinlicense","/uploads/licenses/VD-20260721-BB5A06.veinlicense","/produk/veintools/installers/veintools-desktop_0.1.0_aarch64.dmg","/produk/veintools/installers/veintools-desktop_0.1.0_x64-setup .exe","/produk/veintools/installers/veintools-desktop_0.1.0_x64_en-US.msi","/_astro/BaseLayout.7jk86UV8.css"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["id","en"],"defaultLocale":"id","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"WHtcJu8AfljREHYiWYhuyhIrgnocYIJ+i2ITR+nFt6A=","sessionConfig":{"driver":"unstorage/drivers/fs-lite","options":{"base":"/Users/telkomdev-rahadi/Documents/VeinTech/Web/node_modules/.astro/sessions"}},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_DS5V7T-N.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
//#endregion
//#region node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region \0virtual:astro-node:config
var _virtual_astro_node_config_exports = /* @__PURE__ */ __exportAll({
	bodySizeLimit: () => bodySizeLimit,
	client: () => client,
	experimentalDisableStreaming: () => false,
	host: () => false,
	mode: () => mode,
	port: () => port,
	server: () => server,
	staticHeaders: () => false
});
var mode = "standalone";
var client = "file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/dist/client/";
var server = "file:///Users/telkomdev-rahadi/Documents/VeinTech/Web/dist/server/";
var port = 4321;
var bodySizeLimit = 1073741824;
//#endregion
//#region node_modules/astro/dist/core/app/createOutgoingHttpHeaders.js
var createOutgoingHttpHeaders = (headers) => {
	if (!headers) return;
	const nodeHeaders = Object.fromEntries(headers.entries());
	if (Object.keys(nodeHeaders).length === 0) return;
	if (headers.has("set-cookie")) {
		const cookieHeaders = headers.getSetCookie();
		if (cookieHeaders.length > 1) nodeHeaders["set-cookie"] = cookieHeaders;
	}
	return nodeHeaders;
};
//#endregion
//#region node_modules/astro/dist/core/app/node.js
function createRequestFromNodeRequest(req, { skipBody = false, allowedDomains = [], bodySizeLimit, port: serverPort } = {}) {
	const controller = new AbortController();
	const protocol = "encrypted" in req.socket && req.socket.encrypted ? "https" : "http";
	const hostname = typeof req.headers.host === "string" ? req.headers.host : typeof req.headers[":authority"] === "string" ? req.headers[":authority"] : serverPort ? `localhost:${serverPort}` : "localhost";
	let url;
	try {
		url = new URL(`${protocol}://${hostname}${req.url}`);
	} catch {
		url = new URL(`${protocol}://${hostname}`);
	}
	const options = {
		method: req.method || "GET",
		headers: makeRequestHeaders(req),
		signal: controller.signal
	};
	if (options.method !== "HEAD" && options.method !== "GET" && skipBody === false) Object.assign(options, makeRequestBody(req, bodySizeLimit));
	const request = new Request(url, options);
	wireAbortController(req, controller);
	const untrustedHostname = req.headers.host ?? req.headers[":authority"];
	const validatedHostname = validateHost(typeof untrustedHostname === "string" ? untrustedHostname : void 0, protocol, allowedDomains);
	const validatedForwardedHost = validateForwardedHeaders(void 0, getFirstForwardedValue(req.headers["x-forwarded-host"]), void 0, allowedDomains).host;
	const clientIp = (validatedHostname !== void 0 || validatedForwardedHost !== void 0 ? getFirstForwardedValue(req.headers["x-forwarded-for"]) : void 0) || req.socket?.remoteAddress;
	if (clientIp) Reflect.set(request, clientAddressSymbol, clientIp);
	return request;
}
function wireAbortController(req, controller) {
	const socket = getRequestSocket(req);
	if (socket && typeof socket.on === "function") {
		const existingCleanup = getAbortControllerCleanup(req);
		if (existingCleanup) existingCleanup();
		let cleanedUp = false;
		const removeSocketListener = () => {
			if (typeof socket.off === "function") socket.off("close", onSocketClose);
			else if (typeof socket.removeListener === "function") socket.removeListener("close", onSocketClose);
		};
		const cleanup = () => {
			if (cleanedUp) return;
			cleanedUp = true;
			removeSocketListener();
			controller.signal.removeEventListener("abort", cleanup);
			Reflect.deleteProperty(req, nodeRequestAbortControllerCleanupSymbol);
		};
		const onSocketClose = () => {
			cleanup();
			if (!controller.signal.aborted) controller.abort();
		};
		socket.on("close", onSocketClose);
		controller.signal.addEventListener("abort", cleanup, { once: true });
		Reflect.set(req, nodeRequestAbortControllerCleanupSymbol, cleanup);
		if (socket.destroyed) onSocketClose();
	}
}
async function writeResponse(source, destination) {
	const { status, headers, body, statusText } = source;
	if (!(destination instanceof Http2ServerResponse)) destination.statusMessage = statusText;
	destination.writeHead(status, createOutgoingHttpHeaders(headers));
	const cleanupAbortFromDestination = getAbortControllerCleanup(destination.req ?? void 0);
	if (cleanupAbortFromDestination) {
		const runCleanup = () => {
			cleanupAbortFromDestination();
			if (typeof destination.off === "function") {
				destination.off("finish", runCleanup);
				destination.off("close", runCleanup);
			} else {
				destination.removeListener?.("finish", runCleanup);
				destination.removeListener?.("close", runCleanup);
			}
		};
		destination.on("finish", runCleanup);
		destination.on("close", runCleanup);
	}
	if (!body) return destination.end();
	try {
		const reader = body.getReader();
		destination.on("close", () => {
			reader.cancel().catch((err) => {
				console.error("There was an uncaught error in the middle of the stream while rendering %s.", destination.req.url, err);
			});
		});
		let result = await reader.read();
		while (!result.done) {
			destination.write(result.value);
			result = await reader.read();
		}
		destination.end();
	} catch (err) {
		destination.write("Internal server error", () => {
			err instanceof Error ? destination.destroy(err) : destination.destroy();
		});
	}
}
function makeRequestHeaders(req) {
	const headers = new Headers();
	for (const [name, value] of Object.entries(req.headers)) {
		if (value === void 0) continue;
		if (Array.isArray(value)) for (const item of value) headers.append(name, item);
		else headers.append(name, value);
	}
	return headers;
}
function makeRequestBody(req, bodySizeLimit) {
	if (req.body !== void 0) {
		if (typeof req.body === "string" && req.body.length > 0) return { body: Buffer.from(req.body) };
		if (req.body instanceof ArrayBuffer || ArrayBuffer.isView(req.body)) return { body: req.body };
		if (typeof req.body === "object" && req.body !== null && Object.keys(req.body).length > 0) return { body: Buffer.from(JSON.stringify(req.body)) };
		if (typeof req.body === "object" && req.body !== null && typeof req.body[Symbol.asyncIterator] !== "undefined") return asyncIterableToBodyProps(req.body, bodySizeLimit);
	}
	return asyncIterableToBodyProps(req, bodySizeLimit);
}
function asyncIterableToBodyProps(iterable, bodySizeLimit) {
	return {
		body: bodySizeLimit != null ? limitAsyncIterable(iterable, bodySizeLimit) : iterable,
		duplex: "half"
	};
}
async function* limitAsyncIterable(iterable, limit) {
	let received = 0;
	for await (const chunk of iterable) {
		const byteLength = chunk instanceof Uint8Array ? chunk.byteLength : typeof chunk === "string" ? Buffer.byteLength(chunk) : 0;
		received += byteLength;
		if (received > limit) throw new Error(`Body size limit exceeded: received more than ${limit} bytes`);
		yield chunk;
	}
}
function getAbortControllerCleanup(req) {
	if (!req) return void 0;
	const cleanup = Reflect.get(req, nodeRequestAbortControllerCleanupSymbol);
	return typeof cleanup === "function" ? cleanup : void 0;
}
function getRequestSocket(req) {
	if (req.socket && typeof req.socket.on === "function") return req.socket;
	const http2Socket = req.stream?.session?.socket;
	if (http2Socket && typeof http2Socket.on === "function") return http2Socket;
}
function resolveClientDir(options) {
	const clientURLRaw = new URL(options.client);
	const serverURLRaw = new URL(options.server);
	const rel = path.relative(url.fileURLToPath(serverURLRaw), url.fileURLToPath(clientURLRaw));
	const serverFolder = path.basename(options.server);
	let serverEntryFolderURL = path.dirname(import.meta.url);
	let previous = "";
	while (!serverEntryFolderURL.endsWith(serverFolder)) {
		if (serverEntryFolderURL === previous) throw new Error(`[@astrojs/node] Could not find the server directory "${serverFolder}" by walking up from "${import.meta.url}". This can happen when the server entry point is bundled into a single file (e.g. with esbuild) so that import.meta.url no longer contains the original "${serverFolder}" path segment. When bundling the server entry, make sure the output path contains a "${serverFolder}" directory segment, or avoid bundling the server entry entirely.`);
		previous = serverEntryFolderURL;
		serverEntryFolderURL = path.dirname(serverEntryFolderURL);
	}
	const serverEntryURL = serverEntryFolderURL + "/entry.mjs";
	const clientURL = new URL(appendForwardSlash(rel), serverEntryURL);
	return url.fileURLToPath(clientURL);
}
//#endregion
//#region node_modules/@astrojs/node/dist/serve-app.js
async function readErrorPageFromDisk(client, status) {
	const filePaths = [`${status}.html`, `${status}/index.html`];
	for (const filePath of filePaths) {
		const fullPath = path.join(client, filePath);
		let stream;
		try {
			stream = createReadStream(fullPath);
			await new Promise((resolve, reject) => {
				stream.once("open", () => resolve());
				stream.once("error", reject);
			});
			const webStream = Readable.toWeb(stream);
			return new Response(webStream, { headers: { "Content-Type": "text/html; charset=utf-8" } });
		} catch {
			stream?.destroy();
		}
	}
}
function createAppHandler(app, options) {
	const als = new AsyncLocalStorage();
	const logger = app.adapterLogger;
	process.on("unhandledRejection", (reason) => {
		const requestUrl = als.getStore();
		logger.error(`Unhandled rejection while rendering ${requestUrl}`);
		console.error(reason);
	});
	const client = resolveClientDir(options);
	const prerenderedErrorPageFetch = async (url) => {
		const { pathname } = new URL(url);
		if (pathname.endsWith("/404.html") || pathname.endsWith("/404/index.html")) {
			const response = await readErrorPageFromDisk(client, 404);
			if (response) return response;
		}
		if (pathname.endsWith("/500.html") || pathname.endsWith("/500/index.html")) {
			const response = await readErrorPageFromDisk(client, 500);
			if (response) return response;
		}
		return new Response(null, { status: 404 });
	};
	const effectiveBodySizeLimit = options.bodySizeLimit === 0 || options.bodySizeLimit === Number.POSITIVE_INFINITY ? void 0 : options.bodySizeLimit;
	return async (req, res, next, locals) => {
		let request;
		try {
			request = createRequestFromNodeRequest(req, {
				allowedDomains: app.getAllowedDomains?.() ?? [],
				bodySizeLimit: effectiveBodySizeLimit,
				port: options.port
			});
		} catch (err) {
			logger.error(`Could not render ${req.url}`);
			console.error(err);
			res.statusCode = 500;
			res.end("Internal Server Error");
			return;
		}
		const routeData = app.match(request, true);
		if (routeData && !(routeData.type === "page" && routeData.prerender)) await writeResponse(await als.run(request.url, () => app.render(request, {
			addCookieHeader: true,
			locals,
			routeData,
			prerenderedErrorPageFetch
		})), res);
		else if (next) {
			const cleanup = getAbortControllerCleanup(req);
			if (cleanup) cleanup();
			return next();
		} else await writeResponse(await app.render(request, {
			addCookieHeader: true,
			prerenderedErrorPageFetch
		}), res);
	};
}
//#endregion
//#region node_modules/@astrojs/node/dist/log-listening-on.js
var wildcardHosts = /* @__PURE__ */ new Set([
	"0.0.0.0",
	"::",
	"0000:0000:0000:0000:0000:0000:0000:0000"
]);
async function logListeningOn(logger, server, configuredHost) {
	await new Promise((resolve) => server.once("listening", resolve));
	const protocol = server instanceof https.Server ? "https" : "http";
	const host = getResolvedHostForHttpServer(configuredHost);
	const { port } = server.address();
	const address = getNetworkAddress(protocol, host, port);
	if (host === void 0 || wildcardHosts.has(host)) logger.info(`Server listening on 
  local: ${address.local[0]} 	
  network: ${address.network[0]}
`);
	else logger.info(`Server listening on ${address.local[0]}`);
}
function getResolvedHostForHttpServer(host) {
	if (host === false) return "localhost";
	else if (host === true) return;
	else return host;
}
function getNetworkAddress(protocol = "http", hostname, port, base) {
	const NetworkAddress = {
		local: [],
		network: []
	};
	Object.values(os.networkInterfaces()).flatMap((nInterface) => nInterface ?? []).filter((detail) => detail && detail.address && detail.family === "IPv4").forEach((detail) => {
		let host = detail.address.replace("127.0.0.1", hostname === void 0 || wildcardHosts.has(hostname) ? "localhost" : hostname);
		if (host.includes(":")) host = `[${host}]`;
		const url = `${protocol}://${host}:${port}${base ? base : ""}`;
		if (detail.address.includes("127.0.0.1")) NetworkAddress.local.push(url);
		else NetworkAddress.network.push(url);
	});
	return NetworkAddress;
}
//#endregion
//#region node_modules/@astrojs/node/dist/serve-static.js
function resolveStaticPath(client, urlPath) {
	const filePath = path.join(client, urlPath);
	const resolved = path.resolve(filePath);
	const resolvedClient = path.resolve(client);
	if (resolved !== resolvedClient && !resolved.startsWith(resolvedClient + path.sep)) return {
		filePath: resolved,
		isDirectory: false
	};
	let isDirectory = false;
	try {
		isDirectory = fs.lstatSync(filePath).isDirectory();
	} catch {}
	return {
		filePath: resolved,
		isDirectory
	};
}
function createStaticHandler(app, options, headersMap) {
	const client = resolveClientDir(options);
	return (req, res, ssr) => {
		if (req.url) {
			let fullUrl = req.url;
			if (req.url.includes("#")) fullUrl = fullUrl.slice(0, req.url.indexOf("#"));
			const [urlPath, urlQuery] = fullUrl.split("?");
			let fsPath = app.removeBase(urlPath);
			try {
				fsPath = decodeURI(fsPath);
			} catch {}
			const { isDirectory } = resolveStaticPath(client, fsPath);
			const hasSlash = urlPath.endsWith("/");
			let pathname = urlPath;
			if (headersMap && headersMap.length > 0) {
				const request = createRequestFromNodeRequest(req, { port: options.port });
				const routeData = app.match(request, true);
				if (routeData && routeData.prerender) {
					const baselessPathname = prependForwardSlash$1(app.removeBase(urlPath));
					const matchedRoute = headersMap.find((header) => header.pathname.includes(baselessPathname));
					if (matchedRoute) for (const header of matchedRoute.headers) res.setHeader(header.key, header.value);
				}
			}
			switch (app.manifest.trailingSlash) {
				case "never":
					if (isDirectory && urlPath !== "/" && hasSlash) {
						pathname = urlPath.slice(0, -1) + (urlQuery ? "?" + urlQuery : "");
						res.statusCode = 301;
						res.setHeader("Location", pathname);
						return res.end();
					}
					if (isDirectory && !hasSlash) pathname = `${urlPath}/index.html`;
					break;
				case "ignore":
					if (isDirectory && !hasSlash) pathname = `${urlPath}/index.html`;
					break;
				case "always":
					if (!hasSlash && !hasFileExtension(urlPath) && !isInternalPath(urlPath)) {
						pathname = urlPath + "/" + (urlQuery ? "?" + urlQuery : "");
						res.statusCode = 301;
						res.setHeader("Location", pathname);
						return res.end();
					}
					break;
			}
			pathname = prependForwardSlash$1(app.removeBase(pathname));
			const normalizedPathname = path.posix.normalize(pathname);
			const stream = send(req, normalizedPathname, {
				root: client,
				dotfiles: normalizedPathname.startsWith("/.well-known/") ? "allow" : "deny",
				extensions: app.manifest.buildFormat === "file" || app.manifest.buildFormat === "preserve" ? ["html"] : []
			});
			let forwardError = false;
			stream.on("error", (err) => {
				if (forwardError) {
					const status = "statusCode" in err ? err.statusCode : 500;
					if (status >= 500) console.error(err.toString());
					res.writeHead(status);
					res.end(status >= 500 ? "Internal server error" : "");
					return;
				}
				ssr();
			});
			stream.on("file", () => {
				forwardError = true;
			});
			stream.on("stream", () => {
				if (normalizedPathname.startsWith(`/${app.manifest.assetsDir}/`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
			});
			stream.pipe(res);
		} else ssr();
	};
}
function prependForwardSlash$1(pth) {
	return pth.startsWith("/") ? pth : "/" + pth;
}
//#endregion
//#region node_modules/@astrojs/node/dist/standalone.js
var hostOptions = (host) => {
	if (typeof host === "boolean") return host ? "0.0.0.0" : "localhost";
	return host;
};
function standalone(app, options, headersMap) {
	const port = process.env.PORT ? Number(process.env.PORT) : options.port ?? 8080;
	const host = process.env.HOST ?? hostOptions(options.host);
	const server = createServer(createStandaloneHandler(app, {
		...options,
		port
	}, headersMap), host, port);
	server.server.listen(port, host);
	if (process.env.ASTRO_NODE_LOGGING !== "disabled") app.pipeline.getLogger().then(() => logListeningOn(app.adapterLogger, server.server, host));
	server.server.on("close", () => {
		app.logger.close();
	});
	return {
		server,
		done: server.closed()
	};
}
function createStandaloneHandler(app, options, headersMap) {
	const appHandler = createAppHandler(app, options);
	const staticHandler = createStaticHandler(app, options, headersMap);
	return (req, res) => {
		try {
			decodeURI(req.url);
		} catch {
			res.writeHead(400);
			res.end("Bad request.");
			return;
		}
		staticHandler(req, res, () => appHandler(req, res));
	};
}
function createServer(listener, host, port) {
	let httpServer;
	if (process.env.SERVER_CERT_PATH && process.env.SERVER_KEY_PATH) httpServer = https.createServer({
		key: fs.readFileSync(process.env.SERVER_KEY_PATH),
		cert: fs.readFileSync(process.env.SERVER_CERT_PATH)
	}, listener);
	else httpServer = http.createServer(listener);
	enableDestroy(httpServer);
	const closed = new Promise((resolve, reject) => {
		httpServer.addListener("close", resolve);
		httpServer.addListener("error", reject);
	});
	return {
		server: httpServer,
		host,
		port,
		closed() {
			return closed;
		},
		async stop() {
			await new Promise((resolve, reject) => {
				httpServer.destroy((err) => err ? reject(err) : resolve(void 0));
			});
		}
	};
}
var app = createApp({ streaming: true });
var headersMap = void 0;
var handler = createStandaloneHandler(app, _virtual_astro_node_config_exports, headersMap);
var startServer = () => standalone(app, _virtual_astro_node_config_exports, headersMap);
if (process.env.ASTRO_NODE_AUTOSTART !== "disabled") startServer();
//#endregion
export { handler, _virtual_astro_node_config_exports as options, startServer };
