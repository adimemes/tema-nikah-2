document.getElementById("formUcapan").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah halaman refresh

  // Ambil data dari form
  const nama = document.getElementById("inputNama").value;
  const ucapan = document.getElementById("inputUcapan").value;
  const kehadiran = document.querySelector(
    "input[name='kehadiran']:checked"
  ).value;

  // Validasi sederhana
  if (nama === "" || ucapan === "" || !kehadiran) {
    alert("Harap lengkapi semua data!");
    return;
  }

  // Data yang akan dikirim
  const data = {
    nama: nama,
    ucapan: ucapan,
    kehadiran: kehadiran,
  };

  // Kirim data menggunakan fetch API
  fetch("api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  })
    .then((response) => response.json()) // Parse JSON dari server
    .then((result) => {
      if (result.statusCode === 200) {
        alert("Ucapan berhasil dikirim!");
        document.getElementById("formUcapan").reset(); // Reset form

        // Update daftar ucapan tanpa memuat ulang halaman
        addUcapanToList(nama, ucapan, kehadiran);
      } else {
        alert("Gagal mengirim ucapan. Silakan coba lagi.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    });
});

// Fungsi untuk menambah ucapan ke dalam daftar tanpa memuat ulang halaman
function addUcapanToList(nama, ucapan, kehadiran) {
  const listUcapan = document.getElementById("listUcapan");

  // Membuat elemen baru untuk ucapan
  const ucapanElement = document.createElement("div");

  // Menambahkan kelas-kelas styling sesuai dengan style yang Anda inginkan
  ucapanElement.classList.add(
    "bg-black",
    "border",
    "border-black",
    "rounded-xl",
    "p-6",
    "backdrop-blur-sm",
    "mb-4",
    "transition-all"
  );

  ucapanElement.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between mx-8">
          <h3 class="font-semibold text-[#FFE2B9]">${nama}</h3>
          <span class="text-sm text-[#FFE2B9] italic">
            ${
              kehadiran === "Hadir"
                ? "Hadir"
                : kehadiran === "Tidak Hadir"
                ? "Tidak Hadir"
                : "Masih Ragu"
            }
          </span>
        </div>
        <!-- Menambahkan break-words dan word-break untuk teks ucapan -->
        <p class="text-white/80 break-words leading-relaxed" style="word-break: break-word; overflow-wrap: break-word;">
          ${ucapan}
        </p>
      </div>
    `;
  listUcapan.prepend(ucapanElement); 
}

// Fungsi untuk mengambil komentar terbaru saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", fetchComments);

function fetchComments() {
  fetch("api.php")
    .then((response) => response.json()) // Ambil JSON dari server
    .then((data) => {
      const listUcapan = document.getElementById("listUcapan");

      // Kosongkan daftar ucapan sebelum menambah yang baru
      listUcapan.innerHTML = "";

      // Menambahkan ucapan yang sudah ada di database
      data.forEach((ucapan) => {
        const ucapanElement = document.createElement("div");
        ucapanElement.classList.add(
          "bg-black",
          "border",
          "border-black",
          "rounded-xl",
          "p-6",
          "backdrop-blur-sm",
          "mb-4",
          "transition-all"
        );
        ucapanElement.innerHTML = `
        <div class="space-y-2">
            <div class="flex items-center justify-between mx-8">
                <h3 class="font-semibold text-[#FFE2B9]">${ucapan.nama}</h3>
                <span class="text-sm text-[#FFE2B9] italic">
                    ${
                      ucapan.kehadiran === "Hadir"
                        ? "Hadir"
                        : ucapan.kehadiran === "Tidak Hadir"
                        ? "Tidak Hadir"
                        : "Masih Ragu"
                    }
                </span>
            </div>
            <!-- Menambahkan break-words dan word-break untuk teks ucapan -->
            <p class="text-white/80 break-words leading-relaxed" style="word-break: break-word; overflow-wrap: break-word;">
                ${ucapan.ucapan}
            </p>
        </div>
    `;
        listUcapan.appendChild(ucapanElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
}
