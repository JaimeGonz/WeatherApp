const request = require("request");

const geocodification = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamFpbWVnb256IiwiYSI6ImNrcDM3MXplbDFxNWkyd3FxanJ5dGZiOHUifQ.IfCQE2S0guGwYWlR_C5jSw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "No es posible contactar al servicio de geolocalización",
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        "No es posible encontrar la ubicación, intenta de nuevo",
        undefined
      );
    } else {
      longitude = body.features[0].center[0];
      latitude = body.features[0].center[1];
      callback(undefined, {
        longitude: longitude,
        latitude: latitude,
      });
    }
  });
};

module.exports = geocodification;
