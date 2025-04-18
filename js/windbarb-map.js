window.initWindBarbMap = async function () {
    console.log('initWindBarbMap() called');
    console.log('L.WindBarb:', L?.WindBarb);

    // 1) Створюємо карту (поки з дефолтними координатами)
    const map = L.map('windBarbMap').setView([48.5, 31.0], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    let marker;

    async function updateBarb() {
        try {
            const { lat, lon } = await window.getUserLocation();

            // 2) Дістаємо поточний вітер
            const url = `https://api.open-meteo.com/v1/forecast?` +
                `latitude=${lat}&longitude=${lon}` +
                `&current_weather=true&windspeed_unit=kmh`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const { current_weather: cw } = await res.json();

            // 3) Перевірка плагіна
            if (!L.WindBarb || typeof L.WindBarb.icon !== 'function') {
                console.error('WindBarb plugin not loaded or wrong version');
                return;
            }

            // 4) Створюємо іконку
            const icon = L.WindBarb.icon({
                speed: cw.windspeed,      // км/год
                deg: cw.winddirection,  // градуси
                pointRadius: 5,
                barbSpacing: 8
            });

            // 5) Оновлюємо маркер
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([lat, lon], { icon })
                .addTo(map)
                .bindPopup(`Wind: ${cw.windspeed} km/h`)
                .openPopup();
        }
        catch (err) {
            console.error('WindBarb update failed:', err);
        }
    }

    updateBarb();
    setInterval(updateBarb, 5000);
};
