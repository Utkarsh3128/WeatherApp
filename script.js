const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weather = document.querySelector(".weather-box");
const details = document.querySelector(".weather-details");
const errorMsg = document.querySelector(".error");

search.addEventListener("click", () => {
  const APIKey = "9f22d97df8ed6b96a7d6fa94570cb82b";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json()) // this is the raw data and we have to convert into readable format
    .then((json) => {
      if (json.cod === "404") { 
        container.style.height = "400px";
        weather.style.display = "none";
        details.style.display = "none";
        errorMsg.style.display = "block";
        errorMsg.classList.add("fadeIn");
        return;
      }

      errorMsg.style.display = "none";
      errorMsg.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/sun.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloudy.jpg";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weather.style.display = "";
      details.style.display = "";
      weather.classList.add("fadeIn");
      details.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
