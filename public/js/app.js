const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherLocation = document.querySelector('#weather-location')
const weatherDetails = document.querySelector('#weather-details')

// Check for saved location
const savedLocation = localStorage.getItem('weather-location')

const getWeatherFromAPI = () => {
    const location = search.value
    weatherLocation.textContent = 'Loading...'
    weatherDetails.textContent = ''

    // Get the data from the weather api
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {     
            if (data.error) {
                 weatherLocation.textContent = data.error
            } else {
                weatherLocation.textContent = data.location
                weatherDetails.textContent = data.forecast

                localStorage.setItem('weather-location', location)
            }
        })
    })
}

// If we have a saved location, use it
if (savedLocation) {
    search.value = savedLocation;    
    getWeatherFromAPI()
}

// Submit listener
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeatherFromAPI()    
})