console.log("Running Js from client side");

const address = document.querySelector("input");
const button = document.querySelector("#submit");
const weather_description = document.querySelector("#weather_description");
const temperature = document.querySelector("#temperature");
const precip = document.querySelector("#precip");
const feelslike = document.querySelector("#feelslike");
const image = document.querySelector("#img_weather");
const zone = document.querySelector("#location");
const body = document.querySelector("body");

button.addEventListener("click", (e) => {
  const location = address.value;
  console.log(location);

  fetch("http://localhost:5000/getweather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        weather_description.textContent = data.error;
      } else {

        zone.innerHTML = "Tiempo en "+ data.region +", "+ data.country;

        weather_description.innerHTML = data.weather_description;

        if (data.weather_description == "Nublado" || data.weather_description == "Parcialmente nublado") {
          // image.src = "img/parcialmente-nublado.png";
          image.classList.toggle("nublado")
        }
        if (data.weather_description == "Tormenta") {
          // image.src = "img/tormenta2.png";
          image.classList.toggle("tormenta")
          body.classList.toggle("tormenta-bg");
        }
        if (data.weather_description == "Claro" || data.weather_description == "Soleado") {
          // image.src = "img/soleado.png";
          image.classList.toggle("soleado")
          body.classList.toggle("soleado-bg");
        }

        temperature.innerHTML = data.temperature + "°";
        precip.innerHTML = data.precip + "% de probabilidad de lluvia";
        feelslike.innerHTML = "Real Feel " + data.feelslike + "°";
      }
    });
  });
});
