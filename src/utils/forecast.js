const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=abaffe632e4853bc855f670878831ba8&query=' + longitude + ',' + latitude + '&units=f'

    request({ url: url, json:true }, (error, response) => {    
        if (error) {
            callback('Could not connect to weather service.')
        } else if (response.body.error) {
            callback('Could not get forecast.')
        } else {
            let fTemp = response.body.current.temperature
            let cTemp = ((fTemp - 32) * 5/9)
            callback(undefined, 'It is currently ' + response.body.current.weather_descriptions[0] + '. The current temp is ' + response.body.current.temperature + ' (' + Math.round(cTemp) + 'c).')
        }
    })
}

module.exports = forecast