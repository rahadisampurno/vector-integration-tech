import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { T as createAstro, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_B0MT1nrk.mjs";
import { t as createComponent } from "./compiler_DnNyo6ID.mjs";
import { t as $$BaseLayout } from "./BaseLayout_CROTEY_l.mjs";
import { i as products, n as downloadAccesses, r as orders, t as db } from "./db_Bdm_bksG.mjs";
import { asc, desc, eq, sql } from "drizzle-orm";
//#region src/components/admin/AdminOrdersContent.astro
createAstro("https://veintech.id");
var $$AdminOrdersContent = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminOrdersContent;
	const searchParams = Astro.url.searchParams;
	const page = parseInt(searchParams.get("page") || "1") || 1;
	const limit = 10;
	const offset = (page - 1) * limit;
	const statusFilter = searchParams.get("status") || "ALL";
	const orderStatusCondition = statusFilter !== "ALL" ? eq(orders.status, statusFilter) : void 0;
	const sortParam = searchParams.get("sort") || "desc";
	const sortOrder = sortParam === "asc" ? asc(orders.created_at) : desc(orders.created_at);
	const allOrders = db.select({
		order: orders,
		product: products,
		access: downloadAccesses
	}).from(orders).leftJoin(products, eq(orders.product_id, products.id)).leftJoin(downloadAccesses, eq(orders.id, downloadAccesses.order_id)).where(orderStatusCondition).orderBy(sortOrder).limit(limit).offset(offset).all();
	const countResult = db.select({ count: sql`count(*)` }).from(orders).where(orderStatusCondition).get();
	const totalCount = countResult ? Number(countResult.count) : 0;
	const totalPages = Math.ceil(totalCount / limit) || 1;
	return renderTemplate`${maybeRenderHead($$result)}<section class="pt-32 pb-24 bg-surface min-h-screen text-on-surface"><div class="max-w-[1440px] mx-auto px-6 md:px-12"><div class="mb-8 flex justify-between items-end"><div><h1 class="text-3xl font-headline font-bold mb-2">Daftar Pesanan</h1><p class="text-on-surface-variant">Kelola dan verifikasi pesanan produk digital.</p></div></div><div class="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center"><form method="GET" class="flex flex-col sm:flex-row gap-4 w-full" id="filterForm"><div class="flex items-center gap-2"><label class="text-sm font-bold whitespace-nowrap">Filter Status:</label><select name="status" class="bg-surface border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary-fixed" onchange="document.getElementById('filterForm').submit()"><option value="ALL"${addAttribute(statusFilter === "ALL", "selected")}>Semua Status</option><option value="WAITING_PAYMENT"${addAttribute(statusFilter === "WAITING_PAYMENT", "selected")}>Menunggu Pembayaran</option><option value="PAYMENT_CONFIRMATION_SENT"${addAttribute(statusFilter === "PAYMENT_CONFIRMATION_SENT", "selected")}>Perlu Verifikasi</option><option value="DOWNLOAD_READY"${addAttribute(statusFilter === "DOWNLOAD_READY", "selected")}>Siap Download</option><option value="WAITING_LICENSE"${addAttribute(statusFilter === "WAITING_LICENSE", "selected")}>Menunggu Lisensi</option><option value="COMPLETED"${addAttribute(statusFilter === "COMPLETED", "selected")}>Selesai</option></select></div><div class="flex items-center gap-2"><label class="text-sm font-bold whitespace-nowrap">Urutkan:</label><select name="sort" class="bg-surface border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary-fixed" onchange="document.getElementById('filterForm').submit()"><option value="desc"${addAttribute(sortParam === "desc", "selected")}>Terbaru ke Terlama (DESC)</option><option value="asc"${addAttribute(sortParam === "asc", "selected")}>Terlama ke Terbaru (ASC)</option></select></div><input type="hidden" name="page" value="1"></form></div><div class="bg-surface-container border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm"><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-surface-container-high text-on-surface-variant text-sm border-b border-outline-variant/30"><th class="py-4 px-6 font-bold">Waktu</th><th class="py-4 px-6 font-bold">Nomor Pesanan</th><th class="py-4 px-6 font-bold">Pembeli & Produk</th><th class="py-4 px-6 font-bold">Total</th><th class="py-4 px-6 font-bold">Status</th><th class="py-4 px-6 font-bold text-center">Aksi</th></tr></thead><tbody class="text-sm">${allOrders.map(({ order, product, access }) => renderTemplate`<tr class="border-b border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors"><td class="py-4 px-6 text-on-surface-variant whitespace-nowrap">${new Date(order.created_at).toLocaleString("id-ID", {
		dateStyle: "short",
		timeStyle: "short"
	})}</td><td class="py-4 px-6 font-mono font-medium">${order.order_code}</td><td class="py-4 px-6"><p class="font-bold">${order.customer_name}</p><p class="text-xs text-on-surface-variant">WA: ${order.whatsapp}</p>${order.referral_code && renderTemplate`<p class="text-[11px] font-bold text-orange-600 bg-orange-100 inline-block px-1.5 py-0.5 rounded mt-1">REF: ${order.referral_code}</p>`}${order.sender_name && renderTemplate`<div class="mt-2 p-1.5 bg-blue-50 border border-blue-100 rounded text-xs"><p class="font-medium text-blue-800">Bank: ${order.sender_bank}</p><p class="text-blue-600">a.n ${order.sender_name}</p></div>`}<p class="text-xs text-slate-600 mt-1 font-medium">${product?.name}</p></td><td class="py-4 px-6 font-bold">Rp ${order.total_amount.toLocaleString("id-ID")}</td><td class="py-4 px-6"><span${addAttribute(`inline-block px-2 py-1 rounded-md text-xs font-bold ${order.status === "PAID" || order.status === "DOWNLOAD_READY" ? "bg-green-500/10 text-green-600" : order.status === "COMPLETED" ? "bg-teal-500/10 text-teal-600" : order.status === "WAITING_LICENSE" ? "bg-orange-500/10 text-orange-600" : order.status === "WAITING_PAYMENT" ? "bg-yellow-500/10 text-yellow-600" : order.status === "PAYMENT_CONFIRMATION_SENT" ? "bg-blue-500/10 text-blue-600" : "bg-slate-500/10 text-slate-600"}`, "class")}>${order.status}</span></td><td class="py-4 px-6 text-center">${(order.status === "PAYMENT_CONFIRMATION_SENT" || order.status === "PAYMENT_REVIEW") && renderTemplate`<button class="verify-btn bg-primary text-on-primary text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"${addAttribute(order.id, "data-id")}>Verifikasi</button>`}${order.status === "DOWNLOAD_READY" && renderTemplate`<button class="send-access-btn bg-surface-container-highest text-on-surface text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-surface-container-highest transition-colors"${addAttribute(order.whatsapp, "data-phone")}${addAttribute(order.customer_name, "data-name")}${addAttribute(product?.name, "data-product")}${addAttribute(access?.raw_code || "TIDAK TERSEDIA", "data-code")}${addAttribute(access?.raw_token || "", "data-token")}${addAttribute(order.order_code, "data-order-code")}${addAttribute(access?.expires_at ? new Date(access.expires_at).toLocaleString("id-ID", {
		dateStyle: "long",
		timeStyle: "short"
	}) : "Tidak Diketahui", "data-expires")}${addAttribute(access?.max_downloads || 3, "data-max")}>Kirim Akses</button>`}${order.status === "WAITING_LICENSE" && renderTemplate`<button class="upload-license-btn bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-orange-700 transition-colors mt-2"${addAttribute(order.id, "data-id")}${addAttribute(order.whatsapp, "data-phone")}${addAttribute(order.customer_name, "data-name")}${addAttribute(product?.name, "data-product")}${addAttribute(order.order_code, "data-order-code")}>Upload Lisensi</button>`}</td></tr>`)}${allOrders.length === 0 && renderTemplate`<tr><td colspan="6" class="py-12 text-center text-on-surface-variant">Belum ada pesanan masuk.</td></tr>`}</tbody></table></div>${totalPages > 1 && renderTemplate`<div class="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-outline-variant/30 gap-4"><p class="text-sm text-on-surface-variant">Menampilkan Halaman <span class="font-bold text-on-surface">${page}</span> dari <span class="font-bold text-on-surface">${totalPages}</span></p><div class="flex gap-2"><a${addAttribute(`?page=${page - 1}&status=${statusFilter}&sort=${sortParam}`, "href")}${addAttribute(`px-4 py-2 text-sm font-bold rounded-lg border border-outline-variant/50 hover:bg-surface-container-high transition-colors ${page <= 1 ? "opacity-50 pointer-events-none" : ""}`, "class")}>Sebelumnya</a><a${addAttribute(`?page=${page + 1}&status=${statusFilter}&sort=${sortParam}`, "href")}${addAttribute(`px-4 py-2 text-sm font-bold rounded-lg border border-outline-variant/50 hover:bg-surface-container-high transition-colors ${page >= totalPages ? "opacity-50 pointer-events-none" : ""}`, "class")}>Selanjutnya</a></div></div>`}</div></div><!-- Modal Kirim Akses --><div id="accessModal" class="fixed inset-0 z-50 bg-black/60 hidden items-center justify-center p-4"><div class="bg-surface rounded-2xl w-full max-w-md p-6 shadow-2xl"><div class="flex justify-between items-center mb-4"><h3 class="text-xl font-bold font-headline">Detail Akses & Kirim WA</h3><button id="closeAccessModal" class="text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined">close</span></button></div><div class="mb-4 p-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl flex justify-between items-center gap-4"><div class="min-w-0"><p class="text-sm text-on-surface-variant mb-1">Kode Download</p><p class="font-mono text-lg font-black text-slate-900 tracking-wider truncate" id="modalRawCode">...</p></div><button id="copyCodeBtn" class="shrink-0 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 bg-white shadow-sm flex items-center justify-center" title="Salin Kode"><span class="material-symbols-outlined text-[18px]">content_copy</span></button></div><div class="mb-6 p-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl flex justify-between items-center gap-4"><div class="min-w-0"><p class="text-sm text-on-surface-variant mb-1">Link Akses</p><p class="font-mono text-sm font-bold text-slate-700 truncate" id="modalRawLink">...</p></div><button id="copyLinkBtn" class="shrink-0 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 bg-white shadow-sm flex items-center justify-center" title="Salin Link"><span class="material-symbols-outlined text-[18px]">content_copy</span></button></div><button id="btnSendWa" class="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1ebd5c] transition-colors">Kirim via WhatsApp</button></div></div><!-- Modal Upload Lisensi --><div id="licenseModal" class="fixed inset-0 z-50 bg-black/60 hidden items-center justify-center p-4"><div class="bg-surface rounded-2xl w-full max-w-md p-6 shadow-2xl"><div class="flex justify-between items-center mb-4"><h3 class="text-xl font-bold font-headline">Upload File Lisensi</h3><button id="closeLicenseModal" class="text-slate-400 hover:text-slate-600"><span class="material-symbols-outlined">close</span></button></div><p class="text-sm text-on-surface-variant mb-4">Pilih file lisensi (.key, .lic) untuk pesanan <span id="licenseOrderCode" class="font-bold text-slate-800"></span></p><input type="file" id="licenseFileInput" class="w-full text-sm text-slate-500 mb-6 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"><button id="btnUploadLicense" class="w-full bg-primary text-on-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">Upload & Proses</button><button id="btnSendLicenseWa" class="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hidden items-center justify-center gap-2 hover:bg-[#1ebd5c] transition-colors mt-4">Kirim via WhatsApp</button></div></div></section><script>
  const accessModal = document.getElementById('accessModal');
  const closeAccessModal = document.getElementById('closeAccessModal');
  const modalRawCode = document.getElementById('modalRawCode');
  const modalRawLink = document.getElementById('modalRawLink');
  const btnSendWa = document.getElementById('btnSendWa');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');

  // License Modal Elements
  const licenseModal = document.getElementById('licenseModal');
  const closeLicenseModal = document.getElementById('closeLicenseModal');
  const licenseFileInput = document.getElementById('licenseFileInput');
  const btnUploadLicense = document.getElementById('btnUploadLicense');
  const btnSendLicenseWa = document.getElementById('btnSendLicenseWa');
  const licenseOrderCodeSpan = document.getElementById('licenseOrderCode');

  if (closeAccessModal) {
    closeAccessModal.addEventListener('click', () => {
      accessModal.classList.add('hidden');
      accessModal.classList.remove('flex');
    });
  }

  if (closeLicenseModal) {
    closeLicenseModal.addEventListener('click', () => {
      licenseModal.classList.add('hidden');
      licenseModal.classList.remove('flex');
      window.location.reload(); // Reload in case it was uploaded
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalRawCode.innerText);
      const icon = copyCodeBtn.querySelector('span');
      icon.innerText = 'check';
      icon.classList.add('text-green-600');
      setTimeout(() => { icon.innerText = 'content_copy'; icon.classList.remove('text-green-600'); }, 1500);
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalRawLink.innerText);
      const icon = copyLinkBtn.querySelector('span');
      icon.innerText = 'check';
      icon.classList.add('text-green-600');
      setTimeout(() => { icon.innerText = 'content_copy'; icon.classList.remove('text-green-600'); }, 1500);
    });
  }

  document.querySelectorAll('.send-access-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const b = e.currentTarget;
      const code = b.getAttribute('data-code');
      const token = b.getAttribute('data-token');
      const phone = b.getAttribute('data-phone');
      const name = b.getAttribute('data-name');
      const product = b.getAttribute('data-product');
      const orderCode = b.getAttribute('data-order-code');
      const expires = b.getAttribute('data-expires');
      const maxDls = b.getAttribute('data-max');
      const baseUrl = window.location.origin;

      modalRawCode.innerText = code === 'TIDAK TERSEDIA' ? 'Sistem lama (Tidak direkam)' : code;
      modalRawLink.innerText = token ? \`\${baseUrl}/download/\${token}\` : 'Tidak Tersedia';

      btnSendWa.onclick = () => {
        const url = token ? \`\${baseUrl}/download/\${token}\` : 'Tidak Tersedia';
        const msg = \`Halo \${name},

Pembayaran Anda untuk produk \${product} telah berhasil kami verifikasi.

Berikut akses download produk Anda:

Nomor Pesanan
\${orderCode}

Link Download
\${url}

Kode Download
\${code}

Cara mengunduh:

1. Buka link download di atas.
2. Masukkan Kode Download.
3. Tekan tombol Verifikasi.
4. Setelah berhasil, tekan Unduh Produk.

Informasi penting:

• Link download berlaku sampai \${expires}.
• Batas download maksimal \${maxDls} kali.
• Kode download hanya untuk pembeli dan tidak boleh dibagikan.
• Pastikan file selesai diunduh sebelum menutup halaman.

Khusus untuk VeinTools Desktop:

Setelah aplikasi selesai diinstal, VeinTools akan menampilkan Kode Perangkat. Silakan kirimkan Kode Perangkat tersebut kepada kami agar lisensi aktivasi dapat dibuat.

Jika mengalami kendala saat download, instalasi, atau aktivasi, silakan balas pesan ini.

Terima kasih telah berbelanja di VeinTech.\`;
        window.open(\`https://wa.me/\${phone.replace(/^0/, '62')}?text=\${encodeURIComponent(msg)}\`, '_blank');
      };

      accessModal.classList.remove('hidden');
      accessModal.classList.add('flex');
    });
  });

  document.querySelectorAll('.upload-license-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const b = e.currentTarget;
      const orderId = b.getAttribute('data-id');
      const orderCode = b.getAttribute('data-order-code');
      const phone = b.getAttribute('data-phone');
      const name = b.getAttribute('data-name');
      const product = b.getAttribute('data-product');
      const baseUrl = window.location.origin;

      licenseOrderCodeSpan.innerText = orderCode;
      
      // Reset state
      licenseFileInput.value = '';
      btnUploadLicense.classList.remove('hidden');
      btnUploadLicense.classList.add('flex');
      btnSendLicenseWa.classList.add('hidden');
      btnSendLicenseWa.classList.remove('flex');
      btnUploadLicense.innerText = 'Upload & Proses';

      btnUploadLicense.onclick = async () => {
        const file = licenseFileInput.files[0];
        if (!file) {
          alert('Silakan pilih file lisensi terlebih dahulu!');
          return;
        }

        btnUploadLicense.innerText = 'Uploading...';
        btnUploadLicense.disabled = true;

        const formData = new FormData();
        formData.append('license_file', file);

        try {
          const res = await fetch(\`/api/admin/orders/\${orderId}/upload-license\`, {
            method: 'POST',
            body: formData
          });
          const data = await res.json();

          if (data.success) {
            btnUploadLicense.classList.add('hidden');
            btnUploadLicense.classList.remove('flex');
            btnSendLicenseWa.classList.remove('hidden');
            btnSendLicenseWa.classList.add('flex');

            btnSendLicenseWa.onclick = () => {
              const url = \`\${baseUrl}\${data.license_url}\`;
              const msg = \`Halo \${name},

Lisensi Anda untuk produk \${product} telah berhasil dibuat!

Silakan download file lisensi Anda pada link berikut:
\${url}

Cara Aktivasi:
1. Ekstrak file lisensi jika dalam bentuk ZIP.
2. Buka aplikasi VeinTools Desktop.
3. Klik tombol Aktivasi Lisensi.
4. Pilih file lisensi yang baru saja diunduh.

Terima kasih telah berbelanja di VeinTech!\`;
              window.open(\`https://wa.me/\${phone.replace(/^0/, '62')}?text=\${encodeURIComponent(msg)}\`, '_blank');
              window.location.reload();
            };
          } else {
            alert('Upload gagal: ' + data.error);
            btnUploadLicense.innerText = 'Upload & Proses';
            btnUploadLicense.disabled = false;
          }
        } catch (err) {
          alert('Terjadi kesalahan jaringan.');
          btnUploadLicense.innerText = 'Upload & Proses';
          btnUploadLicense.disabled = false;
        }
      };

      licenseModal.classList.remove('hidden');
      licenseModal.classList.add('flex');
    });
  });
  document.querySelectorAll('.verify-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      if(!confirm('Verifikasi pembayaran ini? Sistem akan mengenerate akses download secara otomatis.')) return;
      
      const id = e.target.getAttribute('data-id');
      const originalText = e.target.innerText;
      e.target.innerText = 'Loading...';
      e.target.disabled = true;

      try {
        const res = await fetch(\`/api/admin/orders/\${id}/verify\`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          alert(\`Berhasil diverifikasi!\\nKode Download: \${data.download_code}\\nLink: /download/\${data.download_token}\\n\\nKirim ke pembeli.\`);
          window.location.reload();
        } else {
          alert('Gagal: ' + data.error);
          e.target.innerText = originalText;
          e.target.disabled = false;
        }
      } catch (err) {
        alert('Terjadi kesalahan jaringan.');
        e.target.innerText = originalText;
        e.target.disabled = false;
      }
    });
  });
<\/script>`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/components/admin/AdminOrdersContent.astro", void 0);
//#endregion
//#region src/pages/admin/produk-digital/pesanan.astro
var pesanan_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Pesanan,
	file: () => $$file,
	url: () => $$url
});
var $$Pesanan = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin - Daftar Pesanan" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "AdminOrdersContent", $$AdminOrdersContent, {})}` })}`;
}, "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/produk-digital/pesanan.astro", void 0);
var $$file = "/Users/telkomdev-rahadi/Documents/VeinTech/Web/src/pages/admin/produk-digital/pesanan.astro";
var $$url = "/admin/produk-digital/pesanan";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/produk-digital/pesanan@_@astro
var page = () => pesanan_exports;
//#endregion
export { page };
