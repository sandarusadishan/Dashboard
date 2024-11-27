const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

function getWeather() {
    const cityName = $('#city-input').val().trim() || 'Colombo';
    const fullUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(fullUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    $('#city-name').text(`Weather in ${data.name}`);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').text(` ${data.main.temp}°C`);
    $('#description').text(`☁️ ${data.weather[0].description}`);
    $('#wind').text(`🌬️ Wind: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    $('#weather').removeClass('d-none');
    $('#extra').html(`
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>📊 Pressure: ${data.main.pressure} hPa</p>
    `);
    renderChart();
    addWeatherEffects(data.weather[0].main);
}

function addWeatherEffects(weatherMain) {
    const extraInfo = $('#extra');
    let message = '';
    if (weatherMain.toLowerCase() === 'rain') {
        message = '<p><i class="fas fa-umbrella"></i> Rainy day, bring an umbrella!</p>';
    } else if (weatherMain.toLowerCase() === 'clear') {
        message = '<p><i class="fas fa-sun"></i> Clear skies, enjoy the sunshine!</p>';
    } else if (weatherMain.toLowerCase() === 'clouds') {
        message = '<p><i class="fas fa-cloud"></i> Partly cloudy, a comfortable day.</p>';
    } else {
        message = '<p><i class="fas fa-question"></i> Weather conditions may vary.</p>';
    }
    extraInfo.append(message);
}

function renderChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'saturday'],
            datasets: [{
                label: 'Climate Change (°C)',
                data: [12, 9, 3, 5, 12, 17,8],
                backgroundColor: ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#8bc34a'],
                borderColor: '#24762b',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
