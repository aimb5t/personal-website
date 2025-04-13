function updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.getElementById('datetime');
    
    // Format date as dd/mm/yyyy
    const date = now.toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    
    // Format time
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    dateTimeElement.textContent = `${date} ${time}`;
}

// Update date once per day
updateDateTime();
setInterval(updateDateTime, 86400000); // 24 hours

// You could add temperature functionality here by integrating with a weather API
// For now, let's just show a placeholder
async function updateTemperature() {
    const WEATHER_API_KEY = 'f360f44b1e14f8d377ad774b0261a09c';
    const TORONTO_COORDS = {
        lat: 43.6532,
        lon: -79.3832
    };

    const tempElement = document.getElementById('temperature');
    if (!tempElement) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${TORONTO_COORDS.lat}&lon=${TORONTO_COORDS.lon}&units=metric&appid=${WEATHER_API_KEY}`
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        tempElement.textContent = `${temperature}°`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        tempElement.textContent = '--°';
    }
}

// Initial calls
updateDateTime();
updateTemperature();

// Update intervals
setInterval(updateDateTime, 60000); // Update every minute
setInterval(updateTemperature, 1800000); // Update every 30 minutes 
setInterval(updateTemperature, 1800000); 