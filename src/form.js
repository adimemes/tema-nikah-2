// Initialize messages array
let messages = [];

// Pastikan DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
  // Form submission handler
  const form = document.getElementById("formUcapan");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default form submission

      // Get form values
      const nama = document.getElementById("inputNama").value.trim();
      const ucapan = document.getElementById("inputUcapan").value.trim();
      const kehadiran = document.querySelector(
        'input[name="kehadiran"]:checked'
      );

      // Validasi input
      if (!nama || !ucapan || !kehadiran) {
        alert("Mohon isi semua field yang diperlukan");
        return;
      }

      // Create new message object
      const newMessage = {
        id: Date.now(),
        name: nama,
        message: ucapan,
        attendance: kehadiran.value,
      };

      // Add to messages array
      messages.unshift(newMessage);

      // Update display
      renderMessages();

      // Reset form
      form.reset();

      // Log untuk debugging
      console.log("Pesan baru ditambahkan:", newMessage);
      console.log("Semua pesan:", messages);
    });
  } else {
    console.error("Form tidak ditemukan!");
  }
});

// Function to render messages
// Function to render messages
function renderMessages() {
  const container = document.getElementById("listUcapan");
  if (!container) {
    console.error("Container ucapan tidak ditemukan!");
    return;
  }

  container.innerHTML = messages
    .map((msg) => {
      // Garis pemisah jika pesan lebih dari 100 kata
      const separator =
        msg.message.split(/\s+/).length > 100 ? '<hr class="separator" />' : "";

      return `
          <div class="bg-[#1C1C1C] border border-black/55 rounded-xl p-6 backdrop-blur-sm mb-4 transition-all">
            <div class="space-y-2">
                <div class="flex items-center justify-between mx-8">
                    <h3 class="font-semibold text-[#AF8003]">${msg.name}</h3>
                    <span class="text-sm text-[#AF8003] italic">
                        ${
                          msg.attendance === "Hadir"
                            ? "Hadir"
                            : msg.attendance === "Tidak Hadir"
                            ? "Tidak hadir"
                            : "Masih Ragu"
                        }
                    </span>
                </div>
                <!-- Tambahkan break-words dan word-break -->
                <p class="text-white/80 break-words leading-relaxed" style="word-break: break-word; overflow-wrap: break-word;">
                  ${msg.message}
                </p>
                ${separator}
            </div>
        </div>
        `;
    })
    .join("");
}

// Input validation
const inputNama = document.getElementById("inputNama");
const inputUcapan = document.getElementById("inputUcapan");

if (inputNama && inputUcapan) {
  inputNama.addEventListener("input", function () {
    if (this.value.length > 50) {
      this.value = this.value.slice(0, 50);
    }
  });

  inputUcapan.addEventListener("input", function () {
    if (this.value.length > 200) {
      this.value = this.value.slice(0, 200);
    }
  });
}

// Styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    #listUcapan {
        padding: 1rem;
        scrollbar-color: #AF8003openBtn  ;
    }

    /* Styling Scrollbar */
    #listUcapan::-webkit-scrollbar {
        width: 6px;
    }

    #listUcapan::-webkit-scrollbar-track {
        background: #ffffff ; /* Warna track scrollbar */
        border-radius: 3px;
    }

    #listUcapan::-webkit-scrollbar-thumb {
        border-radius: 3px;
    }

    /* Animasi FadeIn */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    #listUcapan > div {
        animation: fadeIn 0.3s ease-out;
    }
`;
document.head.appendChild(styleSheet);