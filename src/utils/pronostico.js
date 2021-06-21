const request = require("request");
const translate = require("@iamtraction/google-translate");

const pronostico = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=05630058b08dcb6e9bab33f91c7f1056&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  let weather_description;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("No es posible contactar al servicio de pronóstico", undefined);
    } else if (body.current.length === 0) {
      callback(
        "No es posible encontrar la ubicación, intenta de nuevo",
        undefined
      );
    } else {
      console.log(body);
      weather_description = body.current.weather_descriptions[0];
      translate(weather_description, { from: "en", to: "es" })
        .then((res) => {
          callback(undefined, {
            temperature: body.current.temperature,
            feelslike: body.current.feelslike,
            precip: body.current.precip,
            weather_description: res.text,
            region: body.location.region,
            country: body.location.country
          });
        })
        .catch((err) => {
          if (err) {
            callback(undefined, {
              temperature: body.current.temperature,
              feelslike: body.current.feelslike,
              precip: body.current.precip,
              weather_description: weather_description,
              region: body.location.region,
              country: body.location.country,
            });
          }
        });
    }
  });
};

module.exports = pronostico;
