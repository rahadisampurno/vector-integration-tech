import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { T as createAstro, _ as defineScriptVars, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_D6pk7xqm.mjs";
import { i as products, n as downloadAccesses, r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { eq } from "drizzle-orm";
import { createHash } from "node:crypto";
//#region src/components/produk-digital/DownloadContent.astro
createAstro("https://veintech.id");
var $$DownloadContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DownloadContent;
	const { token } = Astro.props;
	if (!token) return Astro.redirect("/produk-digital/not-found");
	const tokenHash = createHash("sha256").update(token).digest("hex");
	const access = db.select().from(downloadAccesses).where(eq(downloadAccesses.token_hash, tokenHash)).get();
	if (!access) return Astro.redirect("/produk-digital/not-found?error=invalid_token");
	const isExpired = /* @__PURE__ */ new Date() > new Date(access.expires_at);
	const order = db.select().from(orders).where(eq(orders.id, access.order_id)).get();
	const product = order ? db.select().from(products).where(eq(products.id, order.product_id)).get() : null;
	if (!order || !product) return Astro.redirect("/produk-digital/not-found");
	const obfuscatedName = order.customer_name.split(" ").map((p) => p.length > 2 ? p.substring(0, 2) + "*".repeat(p.length - 2) : p).join(" ");
	return renderTemplate`${maybeRenderHead($$result)}<section class="pt-32 pb-24 bg-surface min-h-screen text-on-surface flex items-center justify-center"><div class="max-w-xl w-full px-6"><div class="bg-surface-container p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-xl relative overflow-hidden"><!-- Decorative background --><div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div><div class="text-center mb-8 relative z-10"><div class="w-28 h-28 bg-surface border border-outline-variant rounded-2xl mx-auto mb-6 flex items-center justify-center p-1.5 shadow-md overflow-hidden"><img${addAttribute(product.thumbnail_url || "/logo.svg", "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover rounded-xl"></div><h1 class="text-2xl md:text-3xl font-headline font-bold mb-2">Unduh Produk Anda</h1><p class="text-on-surface-variant mb-2">Akses file digital yang telah Anda beli secara aman.</p><p class="text-xs text-on-surface-variant font-bold bg-surface-container-high inline-block px-3 py-1 rounded-full border border-outline-variant/30">Link berlaku selama 30 hari dan maksimal 5 kali unduhan. Hubungi admin untuk memperbarui akses.</p></div>${isExpired ? renderTemplate`<div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center mb-8 relative z-10"><span class="material-symbols-outlined text-red-500 text-4xl mb-2">error</span><h3 class="font-bold text-red-600 mb-1">Tautan Kedaluwarsa</h3><p class="text-sm text-red-500/80 mb-4">Masa berlaku tautan unduhan ini telah habis.</p><a href="https://wa.me/6287787290712" target="_blank" class="text-sm font-bold bg-white text-red-600 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">Hubungi Admin</a></div>` : access.download_count >= access.max_downloads ? renderTemplate`<div class="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center mb-8 relative z-10"><span class="material-symbols-outlined text-red-500 text-4xl mb-2">block</span><h3 class="font-bold text-red-600 mb-1">Batas Unduhan Tercapai</h3><p class="text-sm text-red-500/80 mb-4">Anda telah mencapai batas maksimal unduhan (${access.max_downloads} kali).</p><a href="https://wa.me/6287787290712" target="_blank" class="text-sm font-bold bg-white text-red-600 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">Minta Perpanjangan</a></div>` : renderTemplate`<div class="relative z-10"><div class="bg-surface border border-outline-variant/50 rounded-xl p-5 mb-8 flex justify-between items-center shadow-sm"><div><p class="text-xs text-on-surface-variant font-medium mb-1">Produk</p><p class="font-bold text-blue-700">${product.name}</p></div><div class="text-right"><p class="text-xs text-on-surface-variant font-medium mb-1">Pembeli</p><p class="font-bold">${obfuscatedName}</p></div></div><div id="verifySection"><label for="downloadCode" class="block text-sm font-bold text-center mb-4">Masukkan kode download yang dikirim melalui WhatsApp.</label><div class="flex flex-col gap-4"><input type="text" id="downloadCode" placeholder="VT-XXXX-XXXX" class="w-full bg-surface border-2 border-outline-variant rounded-xl px-4 py-4 text-center text-xl tracking-[0.25em] font-mono font-bold uppercase focus:outline-none focus:border-primary-fixed focus:ring-4 focus:ring-primary-fixed/20 transition-all shadow-inner"><button id="verifyBtn" class="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">Verifikasi Kode</button></div><p id="errorMsg" class="text-red-500 text-sm text-center font-medium mt-4 hidden"></p></div><div id="successSection" class="hidden flex-col items-center text-center"><div class="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4"><span class="material-symbols-outlined text-3xl">check_circle</span></div><h3 class="text-xl font-bold mb-2">Kode Valid!</h3><div class="bg-surface border border-outline-variant/30 rounded-xl w-full p-4 mb-6 text-left"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary-fixed text-2xl">description</span><div><span class="block font-bold text-sm">Berkas Unduhan / Akses ${product.name}</span><span class="block text-xs text-on-surface-variant">Tautan aman dan terenkripsi</span></div></div></div><div id="downloadButtonsContainer" class="w-full flex flex-col gap-3 mb-4"><!-- Buttons will be injected here by JS --></div>${product.slug === "veintools-desktop" && renderTemplate`<div class="space-y-4"><div class="text-sm bg-surface-container-high border border-outline-variant/30 rounded-xl p-4 text-left"><p class="font-bold mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm text-yellow-500">info</span> Penting</p><p class="text-on-surface-variant">Setelah instalasi, VeinTools perlu diaktifkan pada perangkat Anda. Petunjuk aktivasi akan tampil saat aplikasi pertama kali dibuka.</p></div><div class="text-sm bg-blue-50 border border-blue-200 rounded-xl p-6 text-left shadow-sm mt-6"><h3 class="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2"><span class="material-symbols-outlined">menu_book</span>Panduan Instalasi VeinTools Desktop</h3><p class="text-blue-800 mb-6 leading-relaxed">Selamat datang di VeinTools! Karena aplikasi kami dibuat khusus (Custom Desktop App) dan didistribusikan secara mandiri, sistem operasi komputer Anda (Mac/Windows) mungkin akan menampilkan peringatan keamanan saat pertama kali aplikasi dibuka. <br><br><strong>Hal ini sangat normal dan aman.</strong> Berikut adalah panduan langkah demi langkah untuk menginstal VeinTools di komputer Anda:</p><div class="space-y-6"><!-- File Information --><div class="bg-slate-50 rounded-xl border border-slate-200 p-4 shadow-sm text-sm"><div class="grid grid-cols-2 gap-2 text-slate-700"><div><strong>Versi Aplikasi:</strong> v1.0.0</div><div><strong>Rilis:</strong> Juli 2026</div><div class="col-span-2 mt-1"><strong>SHA-256 Checksum:</strong><code class="block bg-slate-200 p-1.5 rounded text-xs mt-1 break-all select-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></div></div></div><!-- Windows Guide --><div class="bg-white rounded-xl border border-blue-100 p-5 shadow-sm"><h4 class="font-bold text-blue-900 mb-3 flex items-center gap-2 text-base"><span class="material-symbols-outlined">window</span> Pengguna Windows</h4><p class="text-blue-800 mb-4 leading-relaxed">Karena aplikasi didistribusikan secara mandiri, Anda mungkin akan melihat layar biru <i>"Windows protected your PC"</i> (Windows SmartScreen) saat pertama kali mencoba menjalankan file <code class="bg-blue-50 px-1 py-0.5 rounded text-blue-600">.exe</code>.</p><p class="font-bold text-blue-900 mb-2">Langkah-Langkah Instalasi:</p><ol class="list-decimal pl-5 text-blue-800 space-y-2 mb-2"><li><strong>Download & Buka Installer:</strong> Klik ganda pada file installer Windows (<code class="bg-blue-50 px-1 py-0.5 rounded text-blue-600">.exe</code>).</li><li><strong>Melewati SmartScreen:</strong> Jika muncul peringatan keamanan SmartScreen:<ul class="list-disc pl-5 mt-1 space-y-1"><li>Klik <strong>"More info"</strong> (Info lebih lanjut) di bawah teks peringatan.</li><li>Lalu klik <strong>"Run anyway"</strong> (Tetap jalankan).</li></ul></li><li><strong>Ikuti Proses Instalasi:</strong> Lanjutkan instalasi dengan menekan <strong>Next</strong> hingga selesai.</li><li><strong>Selesai!</strong> Buka VeinTools dari Shortcut di Desktop atau Start Menu Anda.</li></ol></div><!-- Activation Guide --><div class="bg-white rounded-xl border border-blue-100 p-5 shadow-sm"><h4 class="font-bold text-blue-900 mb-3 flex items-center gap-2 text-base"><span class="material-symbols-outlined">vpn_key</span> Langkah Selanjutnya: Aktivasi Lisensi</h4><p class="text-blue-800 mb-3 leading-relaxed">Setelah aplikasi berhasil terbuka, Anda akan disambut oleh halaman "Aktifkan VeinTools".</p><ol class="list-decimal pl-5 text-blue-800 space-y-2"><li>Pada halaman tersebut, Anda akan melihat <strong>Kode Perangkat (Installation ID)</strong> Anda.</li><li>Klik tombol <strong>Salin ID</strong> atau <strong>Kirim Kode ke Admin</strong>.</li><li>Kirimkan kode tersebut ke WhatsApp Admin VeinTools.</li><li>Admin akan membalas dengan memberikan sebuah file berakhiran <code class="bg-blue-50 px-1 py-0.5 rounded text-blue-600">.veinlicense</code>.</li><li>Kembali ke aplikasi VeinTools, klik <strong>Pilih File Lisensi</strong>, lalu masukkan file yang dikirimkan oleh Admin.</li><li><strong>Selamat!</strong> VeinTools Anda sudah aktif dan siap digunakan.</li></ol></div></div></div></div>`}</div></div>`}<div class="mt-8 text-center text-sm text-on-surface-variant relative z-10 border-t border-outline-variant/30 pt-6">Jika mengalami kendala, <a href="https://wa.me/6287787290712" target="_blank" class="text-primary-fixed font-bold hover:underline">Hubungi Bantuan</a>.</div></div></div></section><script>(function(){${defineScriptVars({ token })}
  const verifyBtn = document.getElementById('verifyBtn');
  const codeInput = document.getElementById('downloadCode');
  const errorMsg = document.getElementById('errorMsg');
  const verifySection = document.getElementById('verifySection');
  const successSection = document.getElementById('successSection');
  const downloadButtonsContainer = document.getElementById('downloadButtonsContainer');
  
  if(codeInput) {
    // Auto uppercase & formatting
    codeInput.addEventListener('input', (e) => {
      let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
      e.target.value = val;
    });
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', async () => {
      const code = codeInput.value;
      if (!code) return;
      
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = 'Memverifikasi...';
      errorMsg.classList.add('hidden');
      
      try {
        const res = await fetch('/api/download/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, code })
        });
        
        const data = await res.json();
        
        if (data.success) {
          verifySection.classList.add('hidden');
          successSection.classList.remove('hidden');
          successSection.classList.add('flex');
          
          if (data.files && data.files.length > 0) {
            downloadButtonsContainer.innerHTML = '';
            data.files.forEach(file => {
              const a = document.createElement('a');
              a.href = file.url;
              a.download = '';
              a.className = "w-full bg-surface-container-highest border border-outline-variant text-on-surface font-bold py-4 rounded-xl hover:bg-primary hover:text-on-primary hover:border-primary transition-colors shadow-sm flex items-center justify-center gap-2";
              a.innerHTML = \`<span class="material-symbols-outlined">\${file.icon || 'download'}</span> Unduh \${file.name}\`;
              downloadButtonsContainer.appendChild(a);
            });
          }
        } else {
          errorMsg.textContent = data.error || 'Kode salah. Silakan coba lagi.';
          errorMsg.classList.remove('hidden');
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = 'Verifikasi Kode';
        }
      } catch (err) {
        errorMsg.textContent = 'Terjadi kesalahan jaringan.';
        errorMsg.classList.remove('hidden');
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = 'Verifikasi Kode';
      }
    });
  }
})();<\/script>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/produk-digital/DownloadContent.astro", void 0);
//#endregion
//#region src/pages/download/[token].astro
var _token__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Token,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://veintech.id");
var $$Token = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Token;
	const { token } = Astro.params;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Unduh Produk Digital - VeinTech" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "DownloadContent", $$DownloadContent, { "token": token })}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/download/[token].astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/download/[token].astro";
var $$url = "/download/[token]";
//#endregion
//#region \0virtual:astro:page:src/pages/download/[token]@_@astro
var page = () => _token__exports;
//#endregion
export { page };
