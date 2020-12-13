const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJ5YW5wZWFib2R5IiwiYSI6ImNraWttOGFrbTBiN3kyeXU2ZXI2YzhuZG8ifQ.W4HLZWYgsCrzz2s7n4LdKQ&lmit=1'

    request({ url: url, json:true }, (error, response) => {    
        if (error) {
            callback('Could not connect to location services.')
        } else if (response.body.features.length === 0) {
            callback('Could not find location.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode