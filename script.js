// Data menu
const MENU = {
  kopi: [
    { nama: "Espresso", harga: 22000, desc: "Double shot, rasa cokelat gelap dan karamel." },
    { nama: "Kopi Susu Sangrai", harga: 28000, desc: "Espresso, susu segar, gula aren." },
    { nama: "Flat White", harga: 30000, desc: "Espresso dengan susu steam yang halus." },
    { nama: "V60 Gayo", harga: 35000, desc: "Seduh manual, aroma buah dan rempah." }
  ],
  nonkopi: [
    { nama: "Cokelat Panas", harga: 27000, desc: "Cokelat 70% dengan susu." },
    { nama: "Teh Tarik Jahe", harga: 22000, desc: "Teh hitam, jahe, susu kental manis." },
    { nama: "Matcha Latte", harga: 32000, desc: "Matcha Uji dengan susu oat atau sapi." }
  ],
  makanan: [
    { nama: "Roti Bakar Srikaya", harga: 24000, desc: "Roti tebal, srikaya, mentega." },
    { nama: "Croissant Almond", harga: 29000, desc: "Dipanggang tiap pagi." },
    { nama: "Nasi Goreng Kampung", harga: 38000, desc: "Telur mata sapi dan kerupuk." }
  ]
};

const rupiah = n => "Rp" + n.toLocaleString("id-ID");
const daftar = document.getElementById("menu-list");

function tampilkanMenu(kategori) {
  daftar.innerHTML = "";
  MENU[kategori].forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="nama">${item.nama}</span><span class="harga">${rupiah(item.harga)}</span><span class="desc">${item.desc}</span>`;
    daftar.appendChild(li);
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    tampilkanMenu(tab.dataset.kategori);
  });
});
tampilkanMenu("kopi");

// Navigasi mobile
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Status buka/tutup (waktu Jakarta)
function cekStatus() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  const weekend = now.getDay() === 0 || now.getDay() === 6;
  const jam = now.getHours() + now.getMinutes() / 60;
  const [buka, tutup] = weekend ? [8, 23] : [7, 22];
  const el = document.getElementById("status-buka");
  el.textContent = jam >= buka && jam < tutup
    ? `Buka sekarang, tutup pukul ${tutup}.00`
    : `Tutup sekarang, buka pukul ${buka}.00`;
}
cekStatus();

// Form reservasi -> WhatsApp (ganti nomor di bawah)
const NOMOR_WA = "6281234567890";
document.getElementById("form-reservasi").addEventListener("submit", e => {
  e.preventDefault();
  const nama = e.target.nama.value.trim();
  const tamu = e.target.tamu.value;
  const pesan = document.getElementById("pesan-form");
  if (!nama) { pesan.textContent = "Isi nama kamu dulu."; return; }
  if (tamu < 1 || tamu > 12) { pesan.textContent = "Jumlah orang harus 1 sampai 12."; return; }
  pesan.textContent = "";
  const teks = encodeURIComponent(`Halo Kedai Sangrai, saya ${nama}, ingin pesan meja untuk ${tamu} orang.`);
  window.open(`https://wa.me/${NOMOR_WA}?text=${teks}`, "_blank", "noopener");
});
