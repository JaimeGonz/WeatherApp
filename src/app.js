const { response } = require("express");
const express = require("express");
const app = express();

//Ruta estática public
app.use(express.static("public"));

// Establecer motor de vista Handlebars
app.set("view engine", "hbs");

// Para hacer uso de partials
const hbs = require("hbs");
const path = require("path");

const geocodification = require("./utils/geocodification");
const pronostico = require("./utils/pronostico");

hbs.registerPartials(path.join(__dirname, "../", "/views/partials"));

// Configure server
app.use(express.json());

// Configure port
const PORT = process.env.PORT || 5000;

// set routes to listen
app.get("/", function (req, res) {
  // response.send("¡Hola mundo!")
  res.render("index", {
    title: "Weather App",
    name: "Jaime González",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Jaime González",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Jaime González",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "ForecastWeather",
    name: "Jaime González",
  });
});

app.get("/getweather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You have to provide an address",
    });
  }

  geocodification(req.query.address, (error, data) => {
    if (error) {
      return console.log("Error: ", error);
    }

    pronostico(data.latitude, data.longitude, (error, data) => {
      if (error) {
        return console.log("Error: ", error);
      }
      console.log("El clima es " + data.weather_description);
      console.log("La temperatura es de " + data.temperature + "°C");
      console.log(
        "Sin embargo, se percibe una temperatura de " + data.feelslike + "°C"
      );
      console.log("La probabilidad de lluvia es de " + data.precip + "%");
      console.log("Región: "+ data.region);
      console.log("Country: "+ data.country);
      res.send({
        weather_description: data.weather_description,
        temperature: data.temperature,
        feelslike: data.feelslike,
        precip: data.precip,
        region: data.region,
        country: data.country,
      });
    });
  });

  // En caso de que exista el query string con el parámetro address
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jaime González",
    errorMessage: "Page not found",
  });
});

// Listener
app.listen(PORT, () => {
  console.log("Server running at ", PORT);
});
