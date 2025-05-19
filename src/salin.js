    // Seleksi semua tombol dan nomor rekening
    const buttons = document.querySelectorAll('.salin-rekening');
    const rekeningElements = document.querySelectorAll('.rekening');

    // Tambahkan event listener untuk setiap tombol
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Salin teks rekening ke clipboard
            const rekeningText = rekeningElements[index].innerText;
            navigator.clipboard.writeText(rekeningText)
                .then(() => {
                })
                .catch(err => {
                    console.error('Gagal menyalin teks:', err);
                });
        });
    });