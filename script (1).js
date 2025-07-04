// ===================== MENU =====================
const menuKey = "daftarMenu";
const pesananKey = "pesananSelesai";
const pendapatanKey = "dataPendapatan";

function loadMenu() {
  const menu = JSON.parse(localStorage.getItem(menuKey)) || [];
  const list = document.getElementById("daftar-menu");
  if (list) {
    list.innerHTML = "";
    menu.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>Rp${item.harga}</td>
        <td><button onclick="hapusMenu(${index})">Hapus</button></td>
      `;
      list.appendChild(row);
    });
  }

  const select = document.getElementById("pilih-menu");
  if (select) {
    select.innerHTML = '<option value="">-- Pilih Menu --</option>';
    menu.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${item.nama} (Rp${item.harga})`;
      select.appendChild(option);
    });
  }
}

function tambahMenu(event) {
  event.preventDefault();
  const nama = document.getElementById("nama-menu").value;
  const harga = parseInt(document.getElementById("harga-menu").value);
  if (nama && harga) {
    const menu = JSON.parse(localStorage.getItem(menuKey)) || [];
    menu.push({ nama, harga });
    localStorage.setItem(menuKey, JSON.stringify(menu));
    loadMenu();
    document.getElementById("form-menu").reset();
  }
}

function hapusMenu(index) {
  const menu = JSON.parse(localStorage.getItem(menuKey)) || [];
  menu.splice(index, 1);
  localStorage.setItem(menuKey, JSON.stringify(menu));
  loadMenu();
}

// ===================== PEMBAYARAN =====================
let pesanan = [];

function tambahPesanan(event) {
  event.preventDefault();
  const menuList = JSON.parse(localStorage.getItem(menuKey)) || [];
  const index = document.getElementById("pilih-menu").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  if (index !== "" && jumlah > 0) {
    const item = menuList[index];
    const subtotal = item.harga * jumlah;
    pesanan.push({ nama: item.nama, harga: item.harga, jumlah, subtotal });
    tampilkanPesanan();
  }
}

function tampilkanPesanan() {
  const tbody = document.getElementById("daftar-pesanan");
  let total = 0;
  tbody.innerHTML = "";
  pesanan.forEach(p => {
    total += p.subtotal;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.nama}</td>
      <td>${p.jumlah}</td>
      <td>Rp${p.subtotal}</td>
    `;
    tbody.appendChild(row);
  });
  document.getElementById("total-harga").textContent = "Rp" + total;
  document.getElementById("bayar-section").style.display = "block";
  document.getElementById("selesai").style.display = "inline";
}

function hitungKembalian() {
  const totalText = document.getElementById("total-harga").textContent.replace("Rp", "");
  const total = parseInt(totalText);
  const dibayar = parseInt(document.getElementById("uang-dibayar").value);
  const hasil = document.getElementById("hasil-bayar");

  if (dibayar >= total) {
    const kembali = dibayar - total;
    hasil.textContent = "Kembalian: Rp" + kembali;
  } else {
    hasil.textContent = "Alert! Uang tidak mencukupi!";
  }
}

function simpanPendapatan() {
  if (pesanan.length === 0) return;
  const totalText = document.getElementById("total-harga").textContent.replace("Rp", "");
  const total = parseInt(totalText);
  const data = JSON.parse(localStorage.getItem(pendapatanKey)) || [];
  const now = new Date().toLocaleString();
  data.push({ waktu: now, total, item: pesanan });
  localStorage.setItem(pendapatanKey, JSON.stringify(data));
  alert("Pembayaran disimpan!");
  pesanan = [];
  window.location.reload();
}

// ===================== PENDAPATAN =====================
function tampilkanPendapatan() {
  const data = JSON.parse(localStorage.getItem(pendapatanKey)) || [];
  const list = document.getElementById("tabel-pendapatan");
  let totalSemua = 0;
  if (list) {
    list.innerHTML = "";
    data.forEach(d => {
      totalSemua += d.total;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${d.waktu}</td>
        <td>Rp${d.total}</td>
      `;
      list.appendChild(row);
    });
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = \`
      <td><strong>Total Keseluruhan</strong></td>
      <td><strong>Rp\${totalSemua}</strong></td>
    \`;
    list.appendChild(totalRow);
  }
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("form-menu")) {
    loadMenu();
    document.getElementById("form-menu").addEventListener("submit", tambahMenu);
  }
  if (document.getElementById("form-pembayaran")) {
    loadMenu();
    document.getElementById("form-pembayaran").addEventListener("submit", tambahPesanan);
    document.getElementById("selesai").addEventListener("click", simpanPendapatan);
  }
  if (document.getElementById("tabel-pendapatan")) {
    tampilkanPendapatan();
  }
});