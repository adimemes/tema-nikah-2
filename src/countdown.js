    // Target tanggal dan waktu akhir
    const countdownTarget = new Date("2025-06-04T00:00:00").getTime(); // Ganti dengan tanggal target

    // Update countdown setiap 1 detik
    const timerInterval = setInterval(() => {
        // Waktu saat ini
        const now = new Date().getTime();

        // Selisih waktu antara target dan sekarang
        const timeRemaining = countdownTarget - now;

        // Konversi waktu menjadi hari, jam, menit, dan detik
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update elemen HTML
        document.querySelector(".hari p").textContent = days < 10 ? `0${days}` : days;
        document.querySelector(".jam p").textContent = hours < 10 ? `0${hours}` : hours;
        document.querySelector(".menit p").textContent = minutes < 10 ? `0${minutes}` : minutes;
        document.querySelector(".detik p").textContent = seconds < 10 ? `0${seconds}` : seconds;

        // Hentikan timer jika waktu telah habis
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.querySelector(".hari p").textContent = "00";
            document.querySelector(".jam p").textContent = "00";
            document.querySelector(".menit p").textContent = "00";
            document.querySelector(".detik p").textContent = "00";
        }
    }, 1000);