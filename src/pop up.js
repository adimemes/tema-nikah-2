// Seleksi semua link dengan class popup-link
const popupLinks = document.querySelectorAll(".popup-link");

// Modal dan elemen gambar di modal
const popupModal = document.getElementById("popupModal");
const popupImage = document.getElementById("popupImage");

// Tombol navigasi
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Array untuk menyimpan semua gambar
const imageSources = Array.from(popupLinks).map((link) =>
  link.getAttribute("href")
);
let currentIndex = 0; // Indeks gambar saat ini

// Tambahkan event listener untuk setiap link
popupLinks.forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Mencegah tindakan default link
    currentIndex = index; // Set indeks gambar saat ini
    openPopup(imageSources[currentIndex]); // Buka modal dengan gambar
  });
});

// Fungsi untuk membuka modal
function openPopup(src) {
  popupImage.src = src; // Tampilkan gambar di modal
  popupModal.classList.remove("hidden"); // Tampilkan modal
}

// Fungsi untuk menutup modal
function closePopup() {
  popupModal.classList.add("hidden"); // Sembunyikan modal
}

// Fungsi untuk berpindah ke gambar sebelumnya
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length; // Pergi ke indeks sebelumnya
  openPopup(imageSources[currentIndex]); // Tampilkan gambar
});

// Fungsi untuk berpindah ke gambar berikutnya
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageSources.length; // Pergi ke indeks berikutnya
  openPopup(imageSources[currentIndex]); // Tampilkan gambar
});

// Tutup modal saat klik di luar gambar
popupModal.addEventListener("click", (e) => {
  if (e.target === popupModal) closePopup();
});
