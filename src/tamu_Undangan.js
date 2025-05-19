document.addEventListener('DOMContentLoaded', function () {
    // Function to get URL parameters
    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            nama: urlParams.get('n') || '',
            pronoun: urlParams.get('p') || ''
        };
    }

    // Function to format guest name
    function formatGuestName(nama, pronoun) {
        let formattedName = '';

        if (pronoun && nama) {
            formattedName = `${pronoun} ${nama}`;
        } else if (nama) {
            formattedName = `${nama}`;
        } else {
            formattedName = ' Tamu Undangan';
        }

        return formattedName.trim();
    }

    // Get parameters and update the DOM
    const { nama, pronoun } = getUrlParams();
    const guestNameElement = document.getElementById('guest-name');

    if (guestNameElement) {
        guestNameElement.textContent = formatGuestName(nama, pronoun);
    }

    // If you need to update a form field with the name
    const namaInput = document.getElementById('nama');
    if (namaInput) {
        namaInput.value = nama;
    }
});