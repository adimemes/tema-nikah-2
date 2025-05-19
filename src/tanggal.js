document.addEventListener("DOMContentLoaded", function () {
  const dateSection = document.getElementById("date-section");
  const dayCounter = document.getElementById("day-counter");

  // Variable untuk tracking animasi di level global
  let hasAnimated = false;

  function startCounter() {
    let counter = 1;
    const target = 4;
    const interval = 200;

    const countUp = setInterval(() => {
      if (counter <= target) {
        dayCounter.textContent = counter < 10 ? `0${counter}` : counter;
        counter++;
      } else {
        clearInterval(countUp);
      }
    }, interval);
  }

  // Intersection Observer untuk memantau elemen
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Hanya jalankan jika belum pernah dianimasikan
          dateSection.classList.add("visible");
          startCounter();
          hasAnimated = true; // Set flag menjadi true dan tidak akan pernah direset

          // Optional: Disconnect observer karena kita tidak perlu memantau lagi
          observer.disconnect();
        } else if (!entry.isIntersecting) {
          // Hanya remove class visible, tapi tidak reset hasAnimated
          dateSection.classList.remove("visible");
        }
      });
    },
    {
      // Opsi tambahan untuk mengontrol kapan observer trigger
      threshold: 0.5, // Trigger ketika 50% elemen terlihat
    }
  );

  // Mulai memantau elemen
  observer.observe(dateSection);
});
