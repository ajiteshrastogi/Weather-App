document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const humidityDisplay = document.getElementById('humidity');
    const windSpeedDisplay = document.getElementById('wind-speed');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = "9bc92dafb4acc79a2ffde87c2f0efb9d";
    

     // it may throw an error
    // server/database is always in another continent

    getWeatherBtn.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });
    
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        try {
        const response = await fetch(url);
            if (response.ok) {
                const data = await response.json(); 
                console.log(data);
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error); 
        }
    }
    
    function displayWeatherData(data){
        const {name, main, wind, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Tempreature : ${main.temp}°C`;
        humidityDisplay.textContent = `Humidity : ${main.humidity}`
        windSpeedDisplay.textContent = `Wind Speed: ${wind.speed}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;        
        
        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
})