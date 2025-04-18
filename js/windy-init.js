window.initializeWindyMap = function () {
    window.getUserLocation()
        .then(coords => {
            const options = {
                key: 'qWTrpxASuSCZoZbnMyCQCrfzuCp5JUJ9', // ваш Point Forecast API та Map Forecast ключ
                lat: coords.lat,
                lon: coords.lon,
                zoom: 10,        // початковий рівень
                overlay: 'wind'
            };

            const waitForSDK = () => {
                if (typeof windyInit !== 'function') {
                    setTimeout(waitForSDK, 200);
                    return;
                }

                windyInit(options, windyAPI => {
                    const { map, pickerForecast } = windyAPI;

                    // гранулярний zoom до street level
                    map.setZoom(18);

                    //// маркер вашої позиції
                    //L.popup([coords.lat, coords.lon])
                    //    .addTo(map)
                    //    .bindPopup("📍 Ви тут")
                    //    .openPopup();
                });
            };
            waitForSDK();
        })
        .catch(err => console.error("Помилка геолокації:", err));
};
