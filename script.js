// Script Interaktif untuk New Joglo Banteran

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. Untuk Halaman Pembayaran
  // ===================================
  const form = document.querySelector("form");
  const daftarPesanan = document.getElementById("daftar-pesanan");
  const totalHargaEl = document.getElementById("total-harga");
  let total = 0;

  if (form && daftarPesanan && totalHargaEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nama = form.nama.value;
      const harga = parseInt(form.harga.value);

      if (!nama || isNaN(harga)) return;

      const item = document.createElement("li");
      item.textContent = `${nama} - Rp${harga.toLocaleString()}`;
      daftarPesanan.appendChild(item);

      total += harga;
      totalHargaEl.textContent = `Total: Rp${total.toLocaleString()}`;

      form.reset();
    });
  }

  // ===================================
  // 2. Untuk Halaman Menu
  // ===================================
  const formMenu = document.getElementById("form-menu");
  const tabelMenu = document.getElementById("tabel-menu");

  if (formMenu && tabelMenu) {
    formMenu.addEventListener("submit", (e) => {
      e.preventDefault();

      const namaMenu = formMenu.nama.value;
      const hargaMenu = formMenu.harga.value;

      if (!namaMenu || !hargaMenu) return;

      const row = tabelMenu.insertRow();
      row.innerHTML = `
        <td>${namaMenu}</td>
        <td>Rp${parseInt(hargaMenu).toLocaleString()}</td>
        <td><button class="hapus">Hapus</button></td>
      `;

      formMenu.reset();
    });

    tabelMenu.addEventListener("click", (e) => {
      if (e.target.classList.contains("hapus")) {
        e.target.closest("tr").remove();
      }
    });
  }

  // ===================================
  // 3. Untuk Halaman Pendapatan
  // ===================================
  const totalPendapatanEl = document.getElementById("total-pendapatan");

  if (totalPendapatanEl) {
    // Simulasi hitung pendapatan berdasarkan total dari halaman pembayaran
    totalPendapatanEl.textContent = `Total Pendapatan Hari Ini: Rp${total.toLocaleString()}`;
  }
});
